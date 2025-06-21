import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Landing Page
import LandingPage from "./pages/LandingPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Redirect any dashboard or app routes to landing page */}
        <Route path="/app/*" element={<Navigate to="/" />} />
        <Route path="/dashboard" element={<Navigate to="/" />} />
        
        {/* Catch all other routes and redirect to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
