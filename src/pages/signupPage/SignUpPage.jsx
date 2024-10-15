import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from './styles/style.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const SignUpPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigatetoHome = useNavigate()
  const onSubmit = async(data) => {
    try {
      delete data['confirmPassword']
      const response = await axios.post('http://16.171.95.6:5001/signup', data);
      console.log('Signup success:', response.data);
      localStorage.setItem('token', response.data.token);
      navigatetoHome("/homePage"); 
    } catch (error) {
      alert(error.response.data.error, 'Signup failed')
     
    }

  };

  const password = watch('password');


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  const navigate = useNavigate()
  function navigateToLogin(){
    localStorage.removeItem("userSignUp")
    return navigate("/")
  }

  return (
    <div className={styles.DivMainContainer}>
      <form className={styles.DivSubContainer} onSubmit={handleSubmit(onSubmit)}>
      <h1>Sign Up</h1>
        <div className={styles.FormGroup}>
          <label>First Name</label>
          <input 
            type="text" 
            {...register('first_name', { required: 'First Name is required' })} 
            className={styles.InputField} 
          />
          {errors.first_name && <p className={styles.ErrorText}>{errors.first_name.message}</p>}
        </div>

        <div className={styles.FormGroup}>
          <label>Last Name</label>
          <input 
            type="text" 
            {...register('last_name', { required: 'Last Name is required' })} 
            className={styles.InputField} 
          />
          {errors.last_name && <p className={styles.ErrorText}>{errors.last_name.message}</p>}
        </div>

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

        <div className={styles.FormGroup}>
          <label>Confirm Password</label>
          <div className={styles.InputPasswordWrapper}>
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match'
              })} 
              className={styles.InputField} 
            />
            <span onClick={toggleConfirmPasswordVisibility} className={styles.PasswordToggleIcon}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.confirmPassword && <p className={styles.ErrorText}>{errors.confirmPassword.message}</p>}
        </div>

       <div className={styles.btnForm}>
       <button type="submit" className={styles.SubmitButton}>Sign Up</button>
       </div> 
       <div className={styles.btnForm} >
       <button  className={styles.SubmitButton} onClick={navigateToLogin}>Back to Login</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
