import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user?.email}</h1>
      {user?.photoURL && (
        <img
          src={user.photoURL}
          alt="Profile"
          className="w-20 h-20 rounded-full mb-4"
        />
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
