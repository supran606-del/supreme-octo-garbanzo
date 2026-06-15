import React, { useState, useEffect } from 'react';
import { Match, SportType, User } from '../types';
import { 
  Tv, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  Percent, 
  Disc, 
  Calendar,
  Dot,
  Volume2,
  Star
} from 'lucide-react';

interface ScoreboardProps {
  matches: Match[];
  selectedSport: SportType | 'all' | 'feed';
  setSelectedSport: (sport: SportType | 'all' | 'feed') => void;
  onQuickBetMock?: (match: Match) => void;
  user: User | null;
  onToggleTeamFollow: (teamName: string) => void;
  onTriggerAuthModal?: () => void;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({ 
  matches, 
  selectedSport, 
  setSelectedSport, 
  user, 
  onToggleTeamFollow,
  onTriggerAuthModal 
}) => {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);
  const [pulsingMatchIds, setPulsingMatchIds] = useState<Record<string, boolean>>({});

  // Detect score changes to trigger an aesthetic flash effect
  const prevScoresRef = React.useRef<Record<string, string>>({});

  useEffect(() => {
    const nextPulsing: Record<string, boolean> = {};
    let changed = false;

    matches.forEach(m => {
      const uniqueScoreKey = `${m.homeScore}-${m.awayScore}`;
      const prevScore = prevScoresRef.current[m.id];
      if (prevScore && prevScore !== uniqueScoreKey) {
        nextPulsing[m.id] = true;
        changed = true;
      }
    });

    if (changed) {
      setPulsingMatchIds(prev => ({ ...prev, ...nextPulsing }));
      // Clear pulse after 2 seconds
      const timer = setTimeout(() => {
        setPulsingMatchIds({});
      }, 2000);

      // Save scores to ref
      matches.forEach(m => {
        prevScoresRef.current[m.id] = `${m.homeScore}-${m.awayScore}`;
      });

      return () => clearTimeout(timer);
    } else {
      // First run or no changes, just update or populate the ref
      matches.forEach(m => {
        prevScoresRef.current[m.id] = `${m.homeScore}-${m.awayScore}`;
      });
    }
  }, [matches]);

  const toggleExpand = (id: string) => {
    setExpandedMatchId(expandedMatchId === id ? null : id);
  };

  const filteredMatches = selectedSport === 'all'
    ? matches
    : selectedSport === 'feed'
      ? matches.filter(m => {
          if (!user) return false;
          const favSports = user.preferences.favoriteSports || [];
          const favTeams = user.preferences.favoriteTeams || [];
          return favSports.includes(m.sport) || favTeams.includes(m.homeTeam) || favTeams.includes(m.awayTeam);
        })
      : matches.filter(m => m.sport === selectedSport);

  const sportTabs: { id: SportType | 'all' | 'feed'; label: string; color: string; icon: string }[] = [];
  
  sportTabs.push({ id: 'all', label: 'All Leagues', color: 'bg-lime-500', icon: '🏆' });
  
  if (user) {
    sportTabs.push({ id: 'feed', label: 'My Feed ⭐', color: 'bg-yellow-500', icon: '✨' });
  } else {
    sportTabs.push({ id: 'feed', label: 'My Feed (Login)', color: 'bg-neutral-800', icon: '🔒' });
  }

  sportTabs.push(
    { id: 'football', label: 'Football', color: 'bg-emerald-500', icon: '⚽' },
    { id: 'cricket', label: 'Cricket', color: 'bg-purple-500', icon: '🏏' },
    { id: 'basketball', label: 'Basketball', color: 'bg-amber-500', icon: '🏀' },
    { id: 'tennis', label: 'Tennis', color: 'bg-pink-500', icon: '🎾' }
  );

  return (
    <div className="space-y-6">
      {/* Sport Category Tab Filters */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
        <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-lime-400 rounded-full animate-pulse"></span>
          Live Score Action Center
        </h2>
        <span className="text-xs font-mono text-neutral-400">
          Auto-Refreshing
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-800">
        {sportTabs.map((tab) => {
          const isSelected = selectedSport === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'feed' && !user) {
                  onTriggerAuthModal?.();
                } else {
                  setSelectedSport(tab.id);
                }
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-neutral-950 border border-neutral-700 text-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.15)] scale-102 font-bold'
                  : 'bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-neutral-205 hover:border-neutral-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {isSelected && <span className="w-1.5 h-1.5 bg-lime-400 rounded-full"></span>}
            </button>
          );
        })}
      </div>

      {/* Score Cards Grid */}
      {filteredMatches.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-neutral-950 rounded-2xl border border-neutral-900 text-center space-y-3">
          <span className="text-3xl">🏜️</span>
          <p className="text-neutral-400 text-sm">No ongoing matches found for this sport at the moment.</p>
          <button 
            onClick={() => setSelectedSport('all')}
            className="text-xs font-semibold text-lime-400 underline hover:text-lime-300"
          >
            Show all categories
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredMatches.map((match) => {
            const isExpanded = expandedMatchId === match.id;
            const isPulsing = pulsingMatchIds[match.id];
            
            // Generate customized dynamic styling and background glow depending on sport accent color
            const getSportAccentStyles = (sport: SportType) => {
              switch (sport) {
                case 'football': return { glow: 'shadow-[inset_0_1px_0_0_rgba(34,197,94,0.15)]', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
                case 'cricket': return { glow: 'shadow-[inset_0_1px_0_0_rgba(168,85,247,0.15)]', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
                case 'basketball': return { glow: 'shadow-[inset_0_1px_0_0_rgba(234,179,8,0.15)]', badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
                case 'tennis': return { glow: 'shadow-[inset_0_1px_0_0_rgba(236,72,153,0.15)]', badge: 'bg-pink-500/20 text-pink-400 border-pink-500/30' };
              }
            };

            const styles = getSportAccentStyles(match.sport);

            return (
              <div
                key={match.id}
                id={`match-card-${match.id}`}
                className={`relative bg-neutral-950 border transition-all duration-500 rounded-2xl overflow-hidden ${
                  isPulsing 
                    ? 'border-lime-400 ring-2 ring-lime-400/50 scale-101 shadow-[0_0_30px_rgba(163,230,53,0.3)] bg-lime-950/20' 
                    : isExpanded 
                      ? 'border-neutral-700 shadow-xl bg-neutral-900/60' 
                      : 'border-neutral-900 hover:border-neutral-800 hover:shadow-lg'
                } ${styles.glow}`}
              >
                {/* Score update notification flash */}
                {isPulsing && (
                  <div className="absolute top-0 left-0 w-full bg-lime-500 text-neutral-950 text-[11px] font-mono font-bold py-1 px-4 flex items-center justify-between z-10 animate-pulse">
                    <span className="flex items-center gap-1.5 uppercase tracking-widest leading-none">
                      <Volume2 className="w-3.5 h-3.5 animate-bounce" /> SCORE CHANGED!
                    </span>
                    <span>{match.homeTeam} vs {match.awayTeam}</span>
                  </div>
                )}

                {/* Card Header information */}
                <div className="px-5 py-4 border-b border-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${styles.badge}`}>
                      {match.sport}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium truncate max-w-40 sm:max-w-64">
                      {match.tournament}
                    </span>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5">
                    {match.status === 'LIVE' ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-mono text-red-500 font-bold tracking-tight">
                          {match.time}
                        </span>
                      </>
                    ) : match.status === 'FINISHED' ? (
                      <span className="text-xs bg-neutral-900 text-neutral-500 px-2 py-0.5 rounded font-semibold">
                        FINAL
                      </span>
                    ) : (
                      <span className="text-xs bg-neutral-900 text-lime-400 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                {/* Interactive Pitch scoreboard body */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    {/* Home Team Column */}
                    <div className="flex-1 space-y-1">
                      {(() => {
                        const isHomeFollowed = user?.preferences.favoriteTeams.includes(match.homeTeam) || false;
                        return (
                          <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!user) {
                                  onTriggerAuthModal?.();
                                } else {
                                  onToggleTeamFollow(match.homeTeam);
                                }
                              }}
                              className="focus:outline-none transition-transform hover:scale-120 cursor-pointer"
                              title={isHomeFollowed ? "Unfollow Team" : "Follow Team"}
                            >
                              <Star className={`w-3.5 h-3.5 ${isHomeFollowed ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600 hover:text-neutral-400'}`} />
                            </button>
                            <span>{match.homeTeam}</span>
                          </h3>
                        );
                      })()}
                      <p className="text-xs text-neutral-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full"></span> Home Turf
                      </p>
                    </div>

                    {/* Numeric Scores center block */}
                    <div className="flex items-center space-x-1 sm:space-x-2 font-mono px-3 py-1 bg-neutral-900/60 rounded-xl border border-neutral-905">
                      {match.status !== 'UPCOMING' ? (
                        <>
                          <span className={`text-xl sm:text-2xl font-bold min-w-[32px] text-center ${isPulsing ? 'text-lime-400 animate-pulse font-extrabold' : 'text-white'}`}>
                            {match.homeScore}
                          </span>
                          <span className="text-neutral-600 font-bold px-1">:</span>
                          <span className={`text-xl sm:text-2xl font-bold min-w-[32px] text-center ${isPulsing ? 'text-lime-400 animate-pulse font-extrabold' : 'text-white'}`}>
                            {match.awayScore}
                          </span>
                        </>
                      ) : (
                        <div className="text-xs text-neutral-400 px-3 py-1.5 text-center font-sans font-medium whitespace-nowrap">
                          {match.time}
                        </div>
                      )}
                    </div>

                    {/* Away Team Column */}
                    <div className="flex-1 text-right space-y-1">
                      {(() => {
                        const isAwayFollowed = user?.preferences.favoriteTeams.includes(match.awayTeam) || false;
                        return (
                          <h3 className="font-display text-base font-bold text-white tracking-tight leading-snug flex items-center justify-end gap-1.5">
                            <span>{match.awayTeam}</span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!user) {
                                  onTriggerAuthModal?.();
                                } else {
                                  onToggleTeamFollow(match.awayTeam);
                                }
                              }}
                              className="focus:outline-none transition-transform hover:scale-120 cursor-pointer"
                              title={isAwayFollowed ? "Unfollow Team" : "Follow Team"}
                            >
                              <Star className={`w-3.5 h-3.5 ${isAwayFollowed ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600 hover:text-neutral-400'}`} />
                            </button>
                          </h3>
                        );
                      })()}
                      <p className="text-xs text-neutral-500 flex items-center justify-end gap-1">
                        Away Spot <span className="w-1.5 h-1.5 bg-neutral-700 rounded-full"></span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-600" />
                      {match.venue}
                    </span>

                    {/* Expand Log Toggle */}
                    {match.status !== 'UPCOMING' && (
                      <button
                        onClick={() => toggleExpand(match.id)}
                        className="flex items-center gap-1.5 text-lime-400 hover:text-lime-300 font-semibold focus:outline-none py-1 px-2.5 rounded-lg hover:bg-neutral-900 transition-all"
                      >
                        {isExpanded ? (
                          <>
                            <span>Hide Timeline</span>
                            <ChevronUp className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Match Event Feed</span>
                            <ChevronDown className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details Panel */}
                {isExpanded && match.status !== 'UPCOMING' && (
                  <div className="bg-neutral-950/60 border-t border-neutral-900 p-5 space-y-5 animate-fadeIn">
                    {/* Game Stats Comparison Grid */}
                    {Object.keys(match.stats).length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-neutral-500" /> Key Match Analytics
                        </h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-neutral-900/60 p-4 rounded-xl border border-neutral-900">
                          {/* Possession */}
                          {match.stats.possession && (
                            <div className="col-span-1 sm:col-span-2 space-y-1.5">
                              <div className="flex justify-between text-[11px] font-mono text-neutral-300">
                                <span>{match.homeTeam} Possession</span>
                                <span className="font-bold text-lime-400">{match.stats.possession}</span>
                              </div>
                              {/* Simple Bar visualization */}
                              <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden flex">
                                <div className="bg-gradient-to-r from-emerald-500 to-lime-400 h-full" style={{ width: match.stats.possession.split('-')[0].trim() }}></div>
                                <div className="bg-neutral-700 h-full flex-1"></div>
                              </div>
                            </div>
                          )}

                          {/* Overs for Cricket */}
                          {match.stats.overs && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Current Over status:</span>
                              <span className="font-mono font-bold text-white">
                                {match.stats.overs[0]} vs {match.stats.overs[1]}
                              </span>
                            </div>
                          )}

                          {/* Shots on Target */}
                          {match.stats.shotsOnTarget && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Shots on Target:</span>
                              <span className="font-mono font-bold text-white">
                                {match.stats.shotsOnTarget[0]} - {match.stats.shotsOnTarget[1]}
                              </span>
                            </div>
                          )}

                          {/* Fouls */}
                          {match.stats.fouls && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Fouls:</span>
                              <span className="font-mono font-bold text-neutral-300">
                                {match.stats.fouls[0]} / {match.stats.fouls[1]}
                              </span>
                            </div>
                          )}

                          {/* Rebounds */}
                          {match.stats.rebounds && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Rebounds:</span>
                              <span className="font-mono font-bold text-white">
                                {match.stats.rebounds[0]} vs {match.stats.rebounds[1]}
                              </span>
                            </div>
                          )}

                          {/* Assists */}
                          {match.stats.assists && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Total Assists:</span>
                              <span className="font-mono font-bold text-white">
                                {match.stats.assists[0]} vs {match.stats.assists[1]}
                              </span>
                            </div>
                          )}

                          {/* Aces / Faults */}
                          {match.stats.aces && (
                            <div className="flex justify-between text-xs py-1 border-b border-neutral-850">
                              <span className="text-neutral-500">Aces landed:</span>
                              <span className="font-mono font-bold text-white">
                                {match.stats.aces[0]} - {match.stats.aces[1]}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Timeline Live Events Feed */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                        <Tv className="w-3.5 h-3.5 text-neutral-500" /> Event Stream Ticker
                      </h4>

                      {match.events.length === 0 ? (
                        <p className="text-xs text-neutral-400 italic">No major events logged yet in this half.</p>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {match.events.map((event, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-3 bg-neutral-900/40 p-3 rounded-lg border border-neutral-900 hover:bg-neutral-900/80 transition-all duration-200"
                            >
                              <span className="text-xs font-mono font-bold text-lime-400 bg-lime-950/40 border border-lime-900/30 px-2 py-0.5 rounded leading-none">
                                {event.time}
                              </span>
                              <div className="flex-1 leading-tight">
                                <p className="text-xs font-semibold text-neutral-100">
                                  {event.player} <span className="text-neutral-400 font-normal">({event.type})</span>
                                </p>
                                {event.detail && (
                                  <p className="text-[11px] text-neutral-400 mt-1">
                                    {event.detail}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
