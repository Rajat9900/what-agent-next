import { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/homePage/HomePage";
import Login from "./pages/loginPage/Login";
import QAApp from "./pages/Q/A-App/QAApp";
import SignUpPage from "./pages/signupPage/SignUpPage";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/homePage" element={<HomePage onLogout={handleLogout} />} />
            <Route path="/qaApp" element={<QAApp />} />
            <Route path="*" element={<Navigate to="/homePage" replace />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
