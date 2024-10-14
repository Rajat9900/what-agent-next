
import './App.css'
import HomePage from './pages/homePage/HomePage'
import Login from './pages/loginPage/login'
import SignUpPage from './pages/signupPage/SignUpPage'
import { Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/homePage" element={<HomePage />} />
  <Route path="/signUp" element={<SignUpPage />} />
  </Routes>
      </>
  )
}

export default App
