import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork, Users, Code2, LayoutDashboard } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import StatsCard from './components/StatsCard';
import LanguageChart from './components/LanguageChart';
import RepoList from './components/RepoList';
import InsightPanel from './components/InsightPanel';
import { Loader } from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import { fetchUserProfile, fetchUserRepos } from './services/githubApi';

const App = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async (username) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const [userData, reposData] = await Promise.all([
        fetchUserProfile(username),
        fetchUserRepos(username)
      ]);
      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.response?.status === 404 ? 'User not found' : 'Failed to fetch data');
      setUser(null);
      setRepos([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const languageStats = useMemo(() => {
    if (!repos.length) return [];
    const counts = repos.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [repos]);

  const developerScore = useMemo(() => {
    if (!user || !repos) return null;

    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const repoScore = Math.min(user.public_repos * 0.5, 20);
    const starScore = Math.min(totalStars * 2, 40);
    const followerScore = Math.min(user.followers * 1, 20);
    
    // Activity score based on recent updates
    const recentUpdates = repos.slice(0, 5).filter(repo => {
      const lastUpdate = new Date(repo.updated_at);
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      return lastUpdate > oneMonthAgo;
    }).length;
    const activityScore = recentUpdates * 4; // Max 20

    const total = Math.round(repoScore + starScore + followerScore + activityScore);
    
    let type = 'beginner';
    let label = 'Beginner / Low Activity';
    
    if (total > 70) {
      type = 'strong';
      label = '🔥 Strong Developer';
    } else if (total > 35) {
      type = 'active';
      label = '⚡ Active Contributor';
    }

    return { value: total, type, label, totalStars };
  }, [user, repos]);

  const smartInsights = useMemo(() => {
    if (!user || !repos || !languageStats.length) return [];
    
    const insights = [];
    const topLang = languageStats[0].name;
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    insights.push(`Mostly works with ${topLang} and ${languageStats[1]?.name || 'related'} technologies.`);
    
    if (totalStars > 100) {
      insights.push(`High popularity with over ${totalStars} total stars across repositories.`);
    } else if (totalStars > 0) {
      insights.push(`Building a steady following with ${totalStars} stars.`);
    }

    const lastUpdate = new Date(repos[0]?.updated_at);
    const weeksAgo = Math.floor((new Date() - lastUpdate) / (1000 * 60 * 60 * 24 * 7));
    
    if (weeksAgo <= 1) {
      insights.push("Highly consistent contributor with very recent activity.");
    } else if (weeksAgo > 8) {
      insights.push("Low recent activity; hasn't updated repositories in over 2 months.");
    }

    if (user.followers > 100) {
      insights.push("Significant community influence with a large follower base.");
    }

    return insights;
  }, [user, repos, languageStats]);

  return (
    <div className="min-h-screen pb-20">
      <Header />
      
      <main className="container mx-auto px-4">
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Loader />
            </motion.div>
          ) : error ? (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ErrorMessage message={error} />
            </motion.div>
          ) : user ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <ProfileCard user={user} />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard icon={Star} label="Total Stars" value={developerScore?.totalStars || 0} color="orange" />
                <StatsCard icon={GitFork} label="Total Forks" value={repos.reduce((s, r) => s + r.forks_count, 0)} color="blue" />
                <StatsCard icon={Users} label="Followers" value={user.followers} color="purple" />
                <StatsCard icon={Code2} label="Public Repos" value={user.public_repos} color="emerald" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <LanguageChart data={languageStats} />
                  <RepoList repos={repos} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-28">
                    <InsightPanel score={developerScore} insights={smartInsights} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : !hasSearched && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-slate-400"
            >
              <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm mb-6">
                <LayoutDashboard className="w-12 h-12 text-slate-200" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Ready to Radar?</h2>
              <p className="max-w-xs text-center">Search for any GitHub username to get intelligent developer insights.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
