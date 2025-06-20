import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import Layout from "./components/layout/Layout";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Landing Page
import LandingPage from "./pages/LandingPage";

// Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import OverviewPage from "./pages/dashboard/OverviewPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

// Social Pages
import PostsPage from "./pages/social/PostsPage";
import CommentsPage from "./pages/social/CommentsPage";
import SchedulePage from "./pages/social/SchedulePage";

// Settings Pages
import ProfilePage from "./pages/settings/ProfilePage";
import TeamPage from "./pages/settings/TeamPage";
import BillingPage from "./pages/settings/BillingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Temporarily disable authentication check - always redirect to landing page
  return <Navigate to="/" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Protected Routes - temporarily disabled */}
        <Route path="/app" element={<Navigate to="/" />} />
        
        {/* Catch all route - redirect to landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
