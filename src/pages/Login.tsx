import React, { useState } from "react";
import { signInWithGoogle, logOut } from "../lib/firebase";
import { User } from "firebase/auth";
import { Loader2, LogOut } from "lucide-react";

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const loggedInUser = await signInWithGoogle();
    setUser(loggedInUser);
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    await logOut();
    setUser(null);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome to Social Media App
        </h1>
        {user ? (
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{user.displayName}</h2>
            <p className="text-gray-600">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className={`w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Sign in with Google"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
