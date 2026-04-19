import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Twitter, BookOpen, Bookmark, BookmarkCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { addBookmark } from '../services/firestore';

const ProfileCard = ({ user, onBookmarkSaved }) => {
  const { currentUser } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!user) return null;

  const handleBookmark = async () => {
    if (!currentUser || isSaving) return;
    setIsSaving(true);
    try {
      await addBookmark(currentUser.uid, user);
      setIsBookmarked(true);
      if (onBookmarkSaved) onBookmarkSaved();
    } catch (error) {
      console.error("Error saving bookmark:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 mb-8 shadow-2xl overflow-hidden relative group">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] -mr-32 -mt-32"></div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
          <img
            src={user.avatar_url}
            alt={user.name}
            className="relative w-32 h-32 rounded-full border-4 border-[#121214] shadow-2xl object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">{user.name || user.login}</h2>
              <p className="text-lg text-blue-500 font-medium">@{user.login}</p>
            </div>
            
            <button
              onClick={handleBookmark}
              disabled={isBookmarked || isSaving}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${
                isBookmarked 
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20'
              } disabled:opacity-80`}
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isBookmarked ? (
                <>
                  <BookmarkCheck className="w-5 h-5" />
                  <span>Bookmarked</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  <span>Bookmark</span>
                </>
              )}
            </button>
          </div>

          <p className="text-gray-400 mb-6 text-lg max-w-2xl leading-relaxed">
            {user.bio || "This developer hasn't added a bio yet."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 font-medium">
            {user.location && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <LinkIcon className="w-4 h-4 text-gray-600" />
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors truncate">
                  {user.blog}
                </a>
              </div>
            )}
            {user.twitter_username && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Twitter className="w-4 h-4 text-gray-600" />
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
                  @{user.twitter_username}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <BookOpen className="w-4 h-4 text-gray-600" />
              <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
