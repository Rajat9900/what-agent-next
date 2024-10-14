import React from 'react'
import styles from './styles/style.module.css'
const HomePage = () => {
  return (
    <div className={styles.mainDivContainer}>
 <div className={styles.leftContainer}>
    <div className={styles.leftSubContainer}>
<div>
    <p>Logged is as Ranjana</p>
    </div>   
<div className={styles.upperDiv}>
    <div > <button>Logout</button></div> <br/>
    <div > <button>New Chat</button></div>
    <div > <button>Create Topic</button></div>

</div>
<div className={styles.middleDiv}></div>
<div className={styles.lowerDiv}>
    <h3>Chats</h3>
    <button>New Chat 1</button>
</div>
</div> 
 </div>



 <div className={styles.RightContainer}>
    <form className={styles.formDetails}>
        
        <h1>AskAI Q/A App</h1>
        <div className={styles.inputfieldDiv}>
          <label>Ask any question:</label>
          <input
          type='text'
          />
<div><button className={styles.SubmitButton} type='submit'>Submit</button></div>
        </div>
        
        

    </form>
 </div>
    </div>
  )
}

export default HomePage
