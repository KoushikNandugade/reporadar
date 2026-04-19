import React from 'react';
import { Users, MapPin, Link as LinkIcon, Twitter, BookOpen } from 'lucide-react';

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="glass-card p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <img
            src={user.avatar_url}
            alt={user.name}
            className="relative w-32 h-32 rounded-full border-4 border-white shadow-xl"
          />
        </div>

        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-slate-900 mb-1">{user.name || user.login}</h2>
            <p className="text-lg text-blue-600 font-medium">@{user.login}</p>
          </div>

          <p className="text-slate-600 mb-6 text-lg max-w-2xl leading-relaxed">
            {user.bio || "This developer hasn't added a bio yet."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500 font-medium">
            {user.location && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{user.location}</span>
              </div>
            )}
            {user.blog && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <LinkIcon className="w-4 h-4 text-slate-400" />
                <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors truncate">
                  {user.blog}
                </a>
              </div>
            )}
            {user.twitter_username && (
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Twitter className="w-4 h-4 text-slate-400" />
                <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  @{user.twitter_username}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Joined {new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 min-w-[140px]">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <span className="block text-2xl font-bold text-slate-900">{user.public_repos}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Repositories</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
            <span className="block text-2xl font-bold text-slate-900">{user.followers}</span>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Followers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
