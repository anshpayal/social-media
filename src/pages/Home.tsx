import React from "react";
// import { useAuth } from "../context/AuthContext";
import NewsFeed from "../components/NewsFeed";
import Header from "../components/Header";

const Home: React.FC = () => {
  // const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header/>
      <NewsFeed />
    </div>
  );
};

export default Home;
