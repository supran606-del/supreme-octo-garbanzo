import React, { useState } from 'react';
import { NewsItem, SportType, User } from '../types';
import { MessageSquare, Eye, Clock, ArrowUpRight, Share2, Star } from 'lucide-react';

interface NewsSectionProps {
  news: NewsItem[];
  user: User | null;
  onTriggerAuthModal?: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ news, user, onTriggerAuthModal }) => {
  const [selectedSportFilter, setSelectedSportFilter] = useState<'all' | 'feed' | SportType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredNews = selectedSportFilter === 'all' 
    ? news 
    : selectedSportFilter === 'feed'
      ? news.filter(item => user?.preferences.favoriteSports.includes(item.sport))
      : news.filter(item => item.sport === selectedSportFilter);

  const handleShare = (id: string) => {
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getSportBadgeBg = (sport: SportType) => {
    switch (sport) {
      case 'football': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'cricket': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'basketball': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'tennis': return 'bg-pink-500/10 text-pink-400 border-pink-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Category header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
          ⚡ Trending Sports News Hub
        </h2>
        
        {/* Inline news sport filters */}
        <div className="flex gap-1.5 text-xs font-semibold overflow-x-auto pb-1 max-w-[50%] xs:max-w-none scrollbar-none">
          {user ? (
            <button
              onClick={() => setSelectedSportFilter('feed')}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedSportFilter === 'feed'
                  ? 'bg-neutral-850 text-lime-400 font-bold'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Recommended ⭐
            </button>
          ) : (
            <button
              onClick={() => onTriggerAuthModal?.()}
              className="px-2.5 py-1 rounded-md transition-colors text-neutral-500 hover:text-neutral-300 whitespace-nowrap cursor-pointer"
              title="Log in to view personalized news feed"
            >
              Recommended 🔒
            </button>
          )}

          {(['all', 'football', 'cricket', 'basketball', 'tennis'] as const).map(f => (
            <button
              key={f}
              onClick={() => setSelectedSportFilter(f)}
              className={`px-2.5 py-1 rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedSportFilter === f
                  ? 'bg-neutral-850 text-white font-bold'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List */}
      {filteredNews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 bg-neutral-950 rounded-2xl border border-neutral-900 text-center space-y-2">
          <span className="text-2xl">⚡</span>
          <p className="text-neutral-400 text-xs">No active news feeds matching your favorite sports yet.</p>
          <button 
            onClick={() => setSelectedSportFilter('all')}
            className="text-[10px] font-semibold text-lime-400 underline hover:text-lime-300 cursor-pointer"
          >
            Show general news flow
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNews.map((article) => {
            const isFavoriteSport = user?.preferences.favoriteSports.includes(article.sport);
            return (
              <div
                key={article.id}
                className="group bg-neutral-950 hover:bg-neutral-900/40 border border-neutral-900 hover:border-neutral-800 p-5 rounded-2xl transition-all duration-300 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="space-y-3.5 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getSportBadgeBg(article.sport)}`}>
                      {article.sport}
                    </span>
                    {isFavoriteSport && (
                      <span className="text-[9px] bg-lime-400/10 text-lime-400 font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5 uppercase">
                        <Star className="w-2.5 h-2.5 fill-lime-400" /> Favorite Sport
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-600" /> {article.time}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-neutral-100 group-hover:text-white transition-colors tracking-tight font-display">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                      {article.summary}
                    </p>
                  </div>

                  {/* Author & Interactions indicators */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-neutral-500 font-medium">
                      By {article.author}
                    </span>
                    
                    <div className="flex items-center space-x-4 text-xs font-mono text-neutral-500">
                      <span className="flex items-center gap-1 hover:text-neutral-300 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                        {article.views}
                      </span>
                      <button 
                        onClick={() => handleShare(article.id)}
                        className="flex items-center gap-1 text-neutral-505 hover:text-lime-400 cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        {copiedId === article.id ? 'Copied Link!' : 'Share'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Visual Thumbnail replacement */}
                <div className="hidden md:flex flex-col items-center justify-center w-32 bg-neutral-900/60 rounded-xl border border-neutral-850 p-2 text-center group-hover:bg-neutral-900 transition-colors">
                  <span className="text-2xl mb-1">
                    {article.sport === 'football' ? '⚽' : article.sport === 'cricket' ? '🏏' : article.sport === 'basketball' ? '🏀' : '🎾'}
                  </span>
                  <span className="text-[10px] font-mono text-lime-400 font-semibold tracking-wider uppercase flex items-center gap-1">
                    sportScore <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
