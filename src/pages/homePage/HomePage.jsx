import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/style.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";
import Cookies from 'js-cookie';

const HomePage = () => {
  const [thinkingSubmit, setThinkingSubmit] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [thinkingDiv, setThinkingDiv] = useState(false);
  const [isLeftContainerOpen, setIsLeftContainerOpen] = useState(true);
  const dropdownRef = useRef(null);  // To reference the dropdown element

  const toggleLeftContainer = () => {
    setIsLeftContainerOpen(!isLeftContainerOpen);
  };
  
  const navigate = useNavigate();

  const navigateToQAApp = () => {
    navigate("/qaApp");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setThinkingSubmit(true);
    setThinkingDiv(true);
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

  const navigatetoLogin = useNavigate()

const handleLogout  = () =>{
  localStorage.removeItem('token');
navigatetoLogin('/')
}


  return (
    <div className={styles.mainDivContainer}>
      <div className={`${styles.leftContainer} ${!isLeftContainerOpen ? styles.leftContainerClosed : ''}`}>
        <div className={styles.leftSubContainer}>
          <div>
            <p>Logged in as Ranjana</p>
          </div>
          <div className={styles.upperDiv}>
            <div onClick={handleLogout}>
              <button>Logout</button>
            </div>{" "}
            <br />
            <div className={styles.leftContNewChat}>
              <button>New Chat</button>
              <button onClick={navigateToQAApp}>Create Topic</button>
            </div>
          </div>
          <div className={styles.middleDiv}></div>
          <div className={styles.lowerDiv}>
            <h3>Chats</h3>
            <button>New Chat 1</button>
          </div>
        </div>
        <div className={styles.toggleIcon} onClick={toggleLeftContainer}>
          {isLeftContainerOpen ? <IoIosArrowBack /> : <IoIosArrowForward />}
        </div>
      </div>

      <div className={styles.RightContainer}>
        <form className={styles.formDetails} onSubmit={handleSubmit}>
          <h1>AskAI Q/A App</h1>
          {thinkingSubmit && <p>🤔 Thinking....</p>}{" "}
          <div className={styles.inputfieldDiv}>
            <label>Ask any question:</label>
            <input type="text" />
            <div>
              <button className={styles.SubmitButton} type="submit">
                Submit
              </button>
            </div>
          </div>
          {thinkingDiv && (
            <div className={styles.formDetails1}>
              <div className={styles.inputfieldDiv1}>
                <p><strong>You:</strong> Today's weather</p>
              </div>
              <div className={styles.inputfieldDiv2}>
                <p><strong>AI:</strong> I don't have real-time data access or the ability to check current weather conditions. However, I recommend using a reliable weather website or app like Weather.com, BBC Weather, or a local news station's website to get the most up-to-date information about today's weather.</p>
              </div>
            </div>
          )}
        </form>

        {/* Three Dots Menu */}
        <div className={styles.threeDotsMainDiv}>
          <BsThreeDotsVertical onClick={() => setSmShow(!smShow)} />
          
          {smShow && (
            <div ref={dropdownRef} className={styles.customDropdown}>
              <ul>
                <li>Rerun</li>
                <li>Settings</li><hr/>
                <li>Print</li>
                <li>Record a screencast</li><hr/>
                <li>About</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
