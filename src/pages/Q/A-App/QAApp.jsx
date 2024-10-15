import React from "react";
import { useState } from "react";
import styles from "../../signupPage/styles/style.module.css";
import { useForm } from "react-hook-form";

import { MdOutlineCloudUpload } from "react-icons/md";

const QAApp = () => {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className={styles.DivMainContainer}>
      <form className={styles.DivSubContainer}>
        <h1>AskAI Q/A App</h1>
        {/* <div> */}
        <h2>Create a Topic</h2>
        <div className={styles.formContainer2}>
          <div className={styles.FormGroup}>
            <label>Select an existing topic (optional):</label>

            <select className={styles.InputField}>
              <option>Test Topic 2</option>
              <option>Test Topic 1</option>
              <option>Skin Cancer</option>
            </select>
          </div>

          <div className={styles.FormGroup5}>
            <label>Or enter a new topic name (max 35 characters)</label>
            <input
              type="text"
              maxLength={35}
              {...register("topicDesc", { required: "topics description is required" })}
              className={styles.InputField}
            />
            <span className={styles.absoluteMaxLength}> 0/35
   </span>
            {errors.topicDesc && (
              <p className={styles.ErrorText}>{errors.topicDesc.message}</p>
            )}
          </div>
          <div className={styles.FormGroup1}>
            <input
              type="checkbox"
            
            />
            <label>Upload a document (optional):</label>
            
          </div>
          <div className={styles.FormGroup}>
            <label>
              Or enter a share code to access a shared private topic:
            </label>
            <input
              type="text"
             className={styles.InputField}
            />
            
          </div>

          <div className={styles.FormGroup}>
        <label>Upload a document (optional):</label>


        <div className={styles.uploadContainer}>
           
          <div className={styles.dragDrop2}>
            <div ><MdOutlineCloudUpload style={{fontSize: "30px"}}/></div>
          <div className={styles.dragDrop}>
            <span>Drag and drop file here</span>
            <p>Limit 200MB per file • PDF, DOCX</p>
          </div>
          </div>

      
          <input
            type="file"
            {...register("document", {
              required: false, 
            })}
            className={styles.inputField3}
            id="fileUpload"
              accept=".pdf,.docx"
          />
          <label htmlFor="fileUpload" className={styles.browseFiles}>
            Browse files
          </label>
        </div>
</div>

          <div className={styles.btnForm1}>
            <button type="submit" className={styles.SubmitButton}>
              Submit Topic
            </button>
            <button className={styles.SubmitButton}>Cancel</button>
          </div>
        
        </div>
      </form>
    </div>
  );
};

export default QAApp;
