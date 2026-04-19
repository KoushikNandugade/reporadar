import React from 'react';
import { motion } from 'framer-motion';
import { History, Bookmark, Trash2, ExternalLink, User } from 'lucide-react';

const DashboardSection = ({ recentSearches, bookmarks, onSearchClick, onDeleteBookmark }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Recent Searches */}
      <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <History className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold text-white">Recent Searches</h3>
        </div>
        
        <div className="space-y-3">
          {recentSearches.length > 0 ? (
            recentSearches.map((search) => (
              <button
                key={search.id}
                onClick={() => onSearchClick(search.username)}
                className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                  <span className="text-gray-300 font-medium group-hover:text-white transition-colors">
                    {search.username}
                  </span>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-4 text-center">No recent searches yet.</p>
          )}
        </div>
      </div>

      {/* Bookmarks */}
      <div className="bg-[#121214] border border-white/5 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-6">
          <Bookmark className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-white">Bookmarked Developers</h3>
        </div>

        <div className="space-y-3">
          {bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl group"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => onSearchClick(bookmark.username)}
                >
                  <img 
                    src={bookmark.avatar_url} 
                    alt={bookmark.username} 
                    className="w-8 h-8 rounded-full border border-white/10"
                  />
                  <div>
                    <p className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">
                      {bookmark.name || bookmark.username}
                    </p>
                    <p className="text-xs text-gray-500">@{bookmark.username}</p>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteBookmark(bookmark.id)}
                  className="p-2 hover:bg-red-500/10 text-gray-600 hover:text-red-500 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm py-4 text-center">No bookmarks saved.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
