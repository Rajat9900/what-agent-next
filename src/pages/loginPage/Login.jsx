import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/style.module.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const navigatetoHome = useNavigate()

  const onSubmit = async(data) => {
    try {
      const response = await axios.post('https://backendsharebrain.whatagent.net/login', data); 
      localStorage.setItem('token', response.data.token);
      navigatetoHome('/homePage');  
    } catch (error) {
     alert(error.response?.data?.error || 'Login failed');
    }
 
  };
  const navigate = useNavigate()
  const naviagteToSignUp = () =>{
navigate('/signUp')
  }


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className={styles.DivMainContainer}>
      <form className={styles.DivSubContainer} onSubmit={handleSubmit(onSubmit)}>
        <h1>Login</h1>
        <div className={styles.FormGroup}>
          <label>Email</label>
          <input 
            type="email" 
            {...register('email', { required: 'Email is required' })} 
            className={styles.InputField} 
          />
          {errors.email && <p className={styles.ErrorText}>{errors.email.message}</p>}
        </div>
        
        <div className={styles.FormGroup}>
          <label>Password</label>
          <div className={styles.InputPasswordWrapper}>
            <input 
              type={showPassword ? "text" : "password"} 
              {...register('password', { required: 'Password is required' })} 
              className={styles.InputField} 
            />
            <span onClick={togglePasswordVisibility} className={styles.PasswordToggleIcon}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className={styles.ErrorText}>{errors.password.message}</p>}
        </div>
        
<div>
        <button type="submit" className={styles.SubmitButton} >Login</button>
        </div>
<div>
        <button  className={styles.SubmitButton} onClick={naviagteToSignUp}>Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Login;

