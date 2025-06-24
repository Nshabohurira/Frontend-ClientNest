import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Dashboard Pages
import DashboardPage from "./pages/dashboard/DashboardPage";
import OverviewPage from "./pages/dashboard/OverviewPage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";

// Social Pages
import PostsPage from "./pages/social/PostsPage";
import CommentsPage from "./pages/social/CommentsPage";
import SchedulePage from "./pages/social/SchedulePage";
import ConnectorsPage from "./pages/social/ConnectorsPage";

// Settings Pages
import ProfilePage from "./pages/settings/ProfilePage";
import TeamPage from "./pages/settings/TeamPage";
import BillingPage from "./pages/settings/BillingPage";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AppRouterInternal = () => {
  const location = useLocation();
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      {/* Protected Routes */}
      <Route path="/app" element={
        <ProtectedRoute>
          <Layout key={location.pathname} />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/app/dashboard" />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="overview" element={<OverviewPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="comments" element={<CommentsPage />} />
        <Route path="schedule" element={<SchedulePage />} />
        <Route path="connectors" element={<ConnectorsPage />} />
        <Route path="settings/profile" element={<ProfilePage />} />
        <Route path="settings/team" element={<TeamPage />} />
        <Route path="settings/billing" element={<BillingPage />} />
      </Route>
    </Routes>
  );
}

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AppRouterInternal />
    </BrowserRouter>
  );
};

export default AppRouter;
