import React from 'react';
import { Star, GitFork, Book } from 'lucide-react';

const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 shadow-2xl">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-purple-600 rounded-full shadow-lg shadow-purple-600/50"></span>
        Top Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-blue-500/30 transition-all group relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 overflow-hidden">
                <Book className="w-4 h-4 text-blue-500 shrink-0" />
                <h4 className="font-bold text-white truncate group-hover:text-blue-400 transition-colors">
                  {repo.name}
                </h4>
              </div>
              {repo.language && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                  {repo.language}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 line-clamp-2 mb-4 h-10 leading-relaxed group-hover:text-gray-400 transition-colors">
              {repo.description || "No description provided."}
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
              <div className="flex items-center gap-1.5 group-hover:text-orange-400 transition-colors">
                <Star className="w-4 h-4 text-orange-500" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1.5 group-hover:text-blue-400 transition-colors">
                <GitFork className="w-4 h-4 text-blue-500" />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default RepoList;
