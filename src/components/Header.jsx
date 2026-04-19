import React from 'react';
import { Radar, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <header className="py-4 mb-8 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20">
            <Radar className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">
            Repo<span className="text-blue-500">Radar</span>
          </h1>
        </div>

        {currentUser && (
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>{currentUser.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-all text-sm font-medium border border-white/5"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
