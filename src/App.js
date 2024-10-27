import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthCallback from "./components/auth/AuthCallback";
import LoginPage from "./components/auth/LoginPage";
import DashboardHome from "./components/dashboard/DashboardHome";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import MealPlanner from "./components/MealPlanner"; // Add this import
import CalendarView from "./calendar/CalendarView";
import EventsPage from "./components/EventsPage";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/callback" element={<AuthCallback />} />

      {/* Private Routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="meals" element={<MealPlanner />} /> {/* Add this route */}
        <Route path="calendar" element={<CalendarView />} />{" "}
        {/* Add this route */}
      </Route>

      {/* Redirect from root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default App;
