import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { getAllChats, sendMessageToChat, createNewChat } from "../../services";
import styles from "./styles/style.module.css";

const HomePage = () => {
  const [thinkingSubmit, setThinkingSubmit] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [isLeftContainerOpen, setIsLeftContainerOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChatsHistory = async () => {
      try {
        const response = await getAllChats(token);
        if (response.status === 200) {
          setChats(response.data.chats);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatsHistory();
  }, [token]);

  const handleNewChat = async () => {
    try {
      const response = await createNewChat({}, token);
      if (response.status === 201) {
        const newChatIndex = chats.length + 1;
        const newChat = {
          session_id: response.data.session_id,
          label: `New Chat ${newChatIndex}`,
          messages: [],
        };

        setChats((prevChats) => [newChat, ...prevChats]);
        setCurrentSessionId(response.data.session_id);
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!currentSessionId || inputMessage.trim() === "") return;
    setThinkingSubmit(true);

    try {
      const response = await sendMessageToChat(
        currentSessionId,
        inputMessage,
        token
      );

      if (response.status === 200) {
        setThinkingSubmit(true);
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.session_id === currentSessionId
              ? {
                  ...chat,
                  messages: [
                    ...chat.messages,
                    {
                      user_message: inputMessage,
                      ai_response: response.data.answer,
                      timestamp: new Date().toISOString(),
                    },
                  ],
                }
              : chat
          )
        );
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setThinkingSubmit(false);
    }
  };

  const deleteChat = (sessionId) => {
    setChats(chats.filter((chat) => chat.session_id !== sessionId));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSmShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleLeftContainer = () => {
    setIsLeftContainerOpen(!isLeftContainerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const currentChat = chats.find(
    (chat) => chat.session_id === currentSessionId
  );

  return (
    <div className={styles.mainDivContainer}>
      <div
        className={`${styles.leftContainer} ${
          !isLeftContainerOpen ? styles.leftContainerClosed : ""
        }`}
      >
        <div className={styles.leftSubContainer}>
          <div>
            <p>Logged in as Ranjana</p>
          </div>
          <div className={styles.upperDiv}>
            <div onClick={handleLogout}>
              <button>Logout</button>
            </div>
            <br />
            <div className={styles.leftContNewChat}>
              <button onClick={handleNewChat}>New Chat</button>
              <button onClick={() => navigate("/qaApp")}>Create Topic</button>
            </div>
          </div>
          <div className={styles.middleDiv}></div>
          <div className={styles.lowerDiv}>
            <h3>Chats</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {chats.map((chat) => (
                <div key={chat.session_id} className={styles.newChatCreatedDiv}>
                  <button onClick={() => setCurrentSessionId(chat.session_id)}>
                    {chat.label}
                  </button>
                  <MdDeleteOutline
                    onClick={() => deleteChat(chat.session_id)}
                    style={{ fontSize: "24px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.toggleIcon} onClick={toggleLeftContainer}>
          {isLeftContainerOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>

      <div className={styles.RightContainer}>
        <form
          className={styles.formDetails}
          onSubmit={(e) => e.preventDefault()}
        >
          <h1>AskAI Q/A App</h1>
          {thinkingSubmit && <p>🤔 Thinking....</p>}
          <div className={styles.inputfieldDiv}>
            <label>Ask any question:</label>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <div>
              <button
                className={styles.SubmitButton}
                onClick={handleSendMessage}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
          {currentChat && (
            <div className={styles.formDetails1}>
              {currentChat.messages.map((message, index) => (
                <div key={index} className={styles.formDetails1}>
                  <div className={styles.inputfieldDiv1}>
                    <p>
                      <strong>You:</strong> {message.user_message}
                    </p>
                  </div>
                  <div className={styles.inputfieldDiv2}>
                    <p>
                      <strong>AI:</strong> {message.ai_response}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Three Dots Menu */}
      </div>
      <div className={styles.threeDotsMainDiv}>
        <BsThreeDotsVertical onClick={() => setSmShow(!smShow)} />
        {smShow && (
          <div ref={dropdownRef} className={styles.customDropdown}>
            <ul>
              <li>Rerun</li>
              <li>Settings</li>
              <hr />
              <li>Print</li>
              <li>Record a screencast</li>
              <hr />
              <li>About</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
