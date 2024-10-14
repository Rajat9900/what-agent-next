import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';  // Eye icons from react-icons
import styles from './styles/style.module.css';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigatetoHome = useNavigate()
  const onSubmit = (data) => {
    console.log(data); 
    navigatetoHome("/homePage")
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
    return navigate("/")
  }

  return (
    <div className={styles.DivMainContainer}>
      <form className={styles.DivSubContainer} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.FormGroup}>
          <label>First Name</label>
          <input 
            type="text" 
            {...register('firstName', { required: 'First Name is required' })} 
            className={styles.InputField} 
          />
          {errors.firstName && <p className={styles.ErrorText}>{errors.firstName.message}</p>}
        </div>

        <div className={styles.FormGroup}>
          <label>Last Name</label>
          <input 
            type="text" 
            {...register('lastName', { required: 'Last Name is required' })} 
            className={styles.InputField} 
          />
          {errors.lastName && <p className={styles.ErrorText}>{errors.lastName.message}</p>}
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
