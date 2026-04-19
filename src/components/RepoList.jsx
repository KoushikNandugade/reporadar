import React from 'react';
import { Star, GitFork, Book } from 'lucide-react';

const RepoList = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  // Take top 6 repos by star count
  const topRepos = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);

  return (
    <div className="glass-card p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-purple-600 rounded-full"></span>
        Top Repositories
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <Book className="w-4 h-4 text-slate-400 shrink-0" />
                <h4 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                  {repo.name}
                </h4>
              </div>
              {repo.language && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                  {repo.language}
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10 leading-relaxed">
              {repo.description || "No description provided."}
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-orange-400" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="w-3.5 h-3.5 text-blue-400" />
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
