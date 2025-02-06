import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth(); // useAuth is a custom hook that gives access to authentication data/function anywhere in the app
  return user ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    // AuthProvide wraps entire application to provide authentication context
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
