import { useState, useEffect, useRef ,  } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import {
  getAllChats,
  sendMessageToChat,
  createNewChat,
  deleteChatSession,
  getChatMessages,
  logout,
  getAllChatsForTopic,
} from "../../services";
import styles from "./styles/style.module.css";



const HomePage = (props) => {
  const [thinkingSubmit, setThinkingSubmit] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [isLeftContainerOpen, setIsLeftContainerOpen] = useState(true);
  const [chats, setChats] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const location = useLocation();
  const topicName = location.state?.topicName 
  const sessionIdName = location.state?.sessionId
  useEffect(() => {
    const fetchChatsHistory = async () => {
      try {
        const response = await getAllChats(token);
        await getAllChatsForTopic(topicName )
        if (response.status === 200) {
          setChats(response.data.chats);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
   

    fetchChatsHistory();
  }, [token,topicName ]);

  useEffect(() => {
    console.log("Topic Name from QAApp:", topicName);
  }, [topicName])

  const handleNewChat = async () => {
    try {
      const response = await createNewChat({}, token);
      if (response.status === 201) {
        const newChat = {
          session_id: response.data.session_id,
          label: response.data.label,
          messages: [],
        };
        setChats((prevChats) => [newChat, ...prevChats]);
        setCurrentSessionId(response.data.session_id);
        setCurrentMessages([]);
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
        console.log(response , "response of chat message")
        setThinkingSubmit(false);
       await loadChatMessages(currentSessionId) 
       await getAllChatsForTopic(topicName, token)
        setInputMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setThinkingSubmit(false);
    }
  };

const handleChatTopic = async() => {
try {
  const chatTopic = await getAllChatsForTopic(topicName, token)
  console.log(chatTopic.chats , "chatTopic.chats.messages")
  setCurrentMessages(chatTopic.chats.messages);
}catch (error) {
  console.error("Error fetching topic chats", error);
}
}

  const handleDeleteChat = async (sessionId) => {
    try {
      await deleteChatSession(sessionId, token);
      setChats((prevChats) =>
        prevChats.filter((chat) => chat.session_id !== sessionId)
      );
      if (currentSessionId === sessionId) {
        setCurrentSessionId(null);
        setCurrentMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chat session:", error);
    }
  };

  const loadChatMessages = async (sessionId) => {
    try {
      const messages = await getChatMessages(sessionId, token);
      console.log(messages , "message of qna")
      setCurrentMessages(messages.data.qna);
      setCurrentSessionId(sessionId);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No token found. Please log in first.");
      return;
    }
    try {
      const response = await logout(token);
      if (response.status === 200) {
        props.onLogout();  
        navigate("/");
      }
    } catch (error) {
      console.log(error, "error during logout");
    }
  };

  return (
    <div className={styles.mainDivContainer}>
      <div
        className={`${styles.leftContainer} ${
          !isLeftContainerOpen ? styles.leftContainerClosed : ""
        }`}
      >
        <div className={styles.leftSubContainer}>
        <div className={styles.chatHistoryReset}>
        <p>Are you sure you want to start a new topic? This will reset your chat history.</p>
        <div className={styles.chatHistoryResetSecondDiv}>
          <button>Yes</button>
          <button>Cancel</button>
        </div>
      </div>
          <div className={styles.upperDiv}>
            <div onClick={handleLogout}>
              <button>Logout</button>
            </div>
            <br />
            <div className={styles.leftContNewChat}>
              <button onClick={handleNewChat}
              disabled={topicName}
              
              >New Chat</button>

                <button onClick={() => navigate("/qaApp")}>Create topic</button>
               
        
            </div>
          </div>
          <div className={styles.lowerDiv}>
            <h3>Chats</h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
             {topicName ? (
                <>
                  
                    <div  className={styles.newChatCreatedDiv}>
                      <button onClick={handleChatTopic}>
                      {topicName}
                        </button>
                     <MdDeleteOutline
                    onClick={() => handleDeleteChat(topicName.session_id)}
                         style={{ fontSize: "24px" }}
                   />
                    </div>
                </>
               ) : (
  chats.map((chat) => (
                  <div key={chat.session_id} className={styles.newChatCreatedDiv}>
                      <button onClick={() => loadChatMessages(chat.session_id)}>
                        {chat.label}
                        </button>
                     <MdDeleteOutline
                    onClick={() => handleDeleteChat(chat.session_id)}
                         style={{ fontSize: "24px" }}
                   />
                    </div>
                 ))
                  )}
             
            </div>
          </div>
        </div>
        <div
          className={styles.toggleIcon}
          onClick={() => setIsLeftContainerOpen(!isLeftContainerOpen)}
        >
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
          {currentMessages && (
            <div className={styles.formDetails1}>
              {currentMessages.slice().reverse().map((message, index) => (
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
