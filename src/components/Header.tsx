import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCurrentUserData } from '../lib/firebase';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [username, setUsername] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const userData = await getCurrentUserData(user.uid);
        if (userData) {
          setUsername(userData.username);
        }
      }
    };

    fetchUsername();
  }, [user]);

  const defaultAvatar = "https://api.dicebear.com/7.x/avataaars/svg"; // Using DiceBear for default avatar

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/home" className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              SocialApp
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer"
                >
                  <img
                    src={user.photoURL || defaultAvatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = defaultAvatar;
                    }}
                  />
                  <span className="font-medium">@{username || 'loading...'}</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 