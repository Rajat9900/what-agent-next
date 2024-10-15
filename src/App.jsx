
import './App.css'
import HomePage from './pages/homePage/HomePage'
import Login from './pages/loginPage/login'
import QAApp from './pages/Q/A-App/QAApp'
import SignUpPage from './pages/signupPage/SignUpPage'
import { Route, Routes } from 'react-router-dom'
function App() {


  return (
    <>
  <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/homePage" element={<HomePage />} />
  <Route path="/signUp" element={<SignUpPage />} />
  <Route path="/qaApp" element={<QAApp/>} />
  </Routes>
      </>
  )
}

export default App
