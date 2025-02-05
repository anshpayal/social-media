import React from "react";
import { useAuth } from "../context/AuthContext";
import PostForm from "../components/PostForm";
import NewsFeed from "../components/NewsFeed";

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md sticky top-0 z-10 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full mr-2"
          />
          <span className="font-semibold text-lg">
            {user?.displayName || "User"}
          </span>
        </div>
        <button
          onClick={logout}
          className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Post Form */}
      <PostForm />

      {/* News Feed */}
      <NewsFeed />
    </div>
  );
};

export default Home;
