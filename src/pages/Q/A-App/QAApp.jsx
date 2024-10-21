import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../../signupPage/styles/style.module.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import { getPublicTopics, createNewTopics } from "../../../services"; 

const QAApp = () => {
  const [publicTopics, setPublicTopics] = useState([]); 
  const [newTopic, setNewTopic] = useState(""); 
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm();


  useEffect(() => {
    getPublicTopics()
      .then((response) => {
        setPublicTopics(response.data.public_topics); 
      })
      .catch((error) => {
        console.error("Error fetching public topics:", error);
      });
  }, []);


  const onSubmit = (data) => {
    const token = localStorage.getItem("token") 
    const payload = new FormData();
    payload.append("topic_name", data.topicDesc); 
    payload.append("is_private", data.isPrivate || false); 
    if (data.shareCode) {
      payload.append("share_code", data.shareCode); 
    }
    if (data.document && data.document[0]) {
      payload.append("file", data.document[0]); 
    }

      setLoading(true);
    
    createNewTopics(payload, token)
      .then((response) => {
        setPublicTopics((prevTopics) => [...prevTopics, data.topicDesc]); 
        setNewTopic(data.topicDesc); 
        console.log(response.data.message); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error creating new topic:", error); 
      })
  };

  return (
    <div className={styles.DivMainContainer}>
      <form className={styles.DivSubContainer} onSubmit={handleSubmit(onSubmit)}>
        <h1>AskAI Q/A App</h1>
        <h2>Create a Topic</h2>
        <div className={styles.formContainer2}>
         
          <div className={styles.FormGroup}>
            <label>Select an existing topic (optional):</label>
            <select className={styles.InputField} defaultValue={newTopic}>
              {publicTopics.length > 0 ? (
                publicTopics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))
              ) : (
                <option>No topics available</option>
              )}
            </select>
          </div>


          <div className={styles.FormGroup5}>
            <label>Or enter a new topic name (max 35 characters)</label>
            <input
              type="text"
              maxLength={35}
              {...register("topicDesc", {
                required: "Topic description is required",
              })}
              className={styles.InputField}
            />
            <span className={styles.absoluteMaxLength}>0/35</span>
            {errors.topicDesc && (
              <p className={styles.ErrorText}>{errors.topicDesc.message}</p>
            )}
          </div>

          <div className={styles.FormGroup1}>
            <input type="checkbox" {...register("isPrivate")} />
            <label>Set as Private Topic</label>
          </div>

          <div className={styles.FormGroup}>
            <label>Or enter a share code to access a shared private topic:</label>
            <input type="text" {...register("shareCode")} className={styles.InputField} />
          </div>

          <div className={styles.FormGroup}>
            <label>Upload a document (optional):</label>
            <div className={styles.uploadContainer}>
              <div className={styles.dragDrop2}>
                <div>
                  <MdOutlineCloudUpload style={{ fontSize: "30px" }} />
                </div>
                <div className={styles.dragDrop}>
                  <span>Drag and drop file here</span>
                  <p>Limit 200MB per file • PDF, DOCX</p>
                </div>
              </div>
              <input
                type="file"
                {...register("document")}
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
          <button type="submit" className={styles.SubmitButton} disabled={loading}>
              {loading ? "Submitting..." : "Submit Topic"}
            </button>
            <button type="button" className={styles.SubmitButton}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QAApp;
