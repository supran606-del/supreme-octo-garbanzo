import { useState, useEffect } from 'react';
import { Match, SportType, User } from './types';
import { initialMatches, mockNews, updateSimulatedMatches } from './utils/mockData';
import { Navbar } from './components/Navbar';
import { Scoreboard } from './components/Scoreboard';
import { NewsSection } from './components/NewsSection';
import { GuideSection } from './components/GuideSection';
import { GearSection } from './components/GearSection';
import { FaqSection } from './components/FaqSection';
import { AuthModal } from './components/AuthModal';
import { ProfilePanel } from './components/ProfilePanel';
import { UpcomingMatches } from './components/UpcomingMatches';
import { 
  Tv, 
  MapPin, 
  Trophy, 
  Activity, 
  Sparkles, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe2,
  Share2,
  CheckCircle2,
  Heart
} from 'lucide-react';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(() => initialMatches);
  const [selectedSport, setSelectedSport] = useState<SportType | 'all' | 'feed'>('all');
  const [activeTab, setActiveTab] = useState<string>('home');
  const [copiedLink, setCopiedLink] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [hasAgreedTerms, setHasAgreedTerms] = useState<boolean>(true);

  // Initialize guest user on mount and restore login session if found
  useEffect(() => {
    const defaultUserEmail = 'guest@sportscore.com';
    const savedUsersStr = localStorage.getItem('sportscore_users');
    const savedUsers = savedUsersStr ? JSON.parse(savedUsersStr) : [];
    
    const hasGuest = savedUsers.some((u: any) => u.email === defaultUserEmail);
    if (!hasGuest) {
      const defaultUser = {
        username: 'guest',
        email: defaultUserEmail,
        fullName: 'Guest Fan',
        avatarEmoji: '🦁',
        preferences: {
          favoriteSports: ['football', 'basketball'] as SportType[],
          favoriteTeams: ['Madrid United', 'LA Vipers']
        },
        createdAt: 'June 2026',
        password: 'password'
      };
      savedUsers.push(defaultUser);
      localStorage.setItem('sportscore_users', JSON.stringify(savedUsers));
    }

    const currentSession = localStorage.getItem('sportscore_current_user');
    if (currentSession) {
      setUser(JSON.parse(currentSession));
    } else {
      // Auto log-in guest to showcase personalized dashboard on initial load
      const guestUser = savedUsers.find((u: any) => u.username === 'guest');
      if (guestUser) {
        const { password, ...guestSafe } = guestUser;
        setUser(guestSafe);
        localStorage.setItem('sportscore_current_user', JSON.stringify(guestSafe));
      }
    }

    // Check Terms Consent
    const agreed = localStorage.getItem('sportscore_terms_agreed');
    if (!agreed) {
      setHasAgreedTerms(false);
    }
  }, []);

  // Live Simulated scores update cycle
  useEffect(() => {
    const scoreTimer = setInterval(() => {
      setMatches(prevMatches => updateSimulatedMatches(prevMatches));
    }, 6000); // Ticks every 6 seconds simulating live sporting events

    return () => clearInterval(scoreTimer);
  }, []);

  const liveMatches = matches.filter(m => m.status === 'LIVE');
  const liveMatchesCount = liveMatches.length;

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('sportscore_current_user', JSON.stringify(updatedUser));

    const savedUsersStr = localStorage.getItem('sportscore_users');
    if (savedUsersStr) {
      const savedUsers = JSON.parse(savedUsersStr);
      const userIndex = savedUsers.findIndex((u: any) => u.username === updatedUser.username);
      if (userIndex !== -1) {
        const passwordMatched = savedUsers[userIndex].password;
        savedUsers[userIndex] = { ...updatedUser, password: passwordMatched };
        localStorage.setItem('sportscore_users', JSON.stringify(savedUsers));
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sportscore_current_user');
    setActiveTab('home');
  };

  const handleToggleTeamFollow = (teamName: string) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    const currentFavs = user.preferences.favoriteTeams || [];
    const updatedFavs = currentFavs.includes(teamName)
      ? currentFavs.filter((t) => t !== teamName)
      : [...currentFavs, teamName];

    handleUpdateUser({
      ...user,
      preferences: {
        ...user.preferences,
        favoriteTeams: updatedFavs,
      },
    });
  };

  const handleShareWebsite = () => {
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] selection:bg-lime-400 selection:text-neutral-950">
      
      {/* Dynamic top-bar ticker notice */}
      <div className="bg-neutral-950 text-[10px] sm:text-xs font-mono py-2 text-center text-neutral-400 border-b border-neutral-900 flex items-center justify-center gap-1.5 px-4 tracking-wide overflow-x-auto whitespace-nowrap">
        <Zap className="w-3.5 h-3.5 text-lime-400 animate-pulse shrink-0" />
        <span>SIMULATING ACTIVE CHAMPIONSHIPS:</span>
        <span className="text-lime-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-850">
          🏆 T20 Cricket Major
        </span>
        <span className="text-lime-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-850">
          ⚽ Champions League Group
        </span>
        <span className="text-lime-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-850">
          🎾 London Grand Slam Finals
        </span>
      </div>

      {/* Sticky Top Navigation Bar */}
      <Navbar 
        activeSection={activeTab} 
        setActiveSection={setActiveTab} 
        liveMatchesCount={liveMatchesCount} 
        user={user}
        onTriggerAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Primary Main Container (Single screen scroll structure) */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* HOMEPAGE VIEW DASHBOARD MAPS */}
        <section id="home" className="space-y-10 scroll-mt-24">
          
          {/* Aesthetic Hero welcome layout */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-850 p-6 sm:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            {/* Visual background atmospheric glows (clean gradients, no slop) */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-lime-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Inner text Content */}
            <div className="space-y-4 max-w-xl z-10">
              <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-850 py-1.5 px-3.5 rounded-full text-xs font-mono text-lime-400 font-bold tracking-tight">
                <Flame className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
                Live Arena Scoring Active
              </div>
              
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                Every Match. <br />
                <span className="bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Every Court Metric.
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Welcome to <strong className="text-neutral-200">sportScore</strong>—your definitive, zero-delay hub tracking live results, squad formations, and golden rulebooks across the world’s major sports. Filter by sport category below to explore.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <button 
                  onClick={() => {
                    document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' });
                    setActiveTab('guide');
                  }}
                  className="bg-lime-400 hover:bg-lime-350 text-neutral-950 text-xs sm:text-sm font-bold px-4.5 py-2.5 rounded-xl transition-all shadow-[0_4px_20px_rgba(163,230,53,0.25)] flex items-center gap-1.5 cursor-pointer hover:scale-102"
                >
                  Explore Rulebooks <ArrowRight className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleShareWebsite}
                  className="bg-neutral-900 hover:bg-neutral-850 text-white border border-neutral-800 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4 text-lime-400" /> : <Share2 className="w-4 h-4 text-neutral-400" />}
                  {copiedLink ? 'Dashboard Copied!' : 'Share Live Board'}
                </button>
              </div>
            </div>

            {/* Quick statistics HUD panel widget */}
            <div className="w-full md:w-auto md:min-w-[260px] bg-neutral-950 p-5 rounded-2xl border border-neutral-850/80 space-y-4 z-10">
              <h4 className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" /> LIVE STREAM TELEMETRY
              </h4>
              
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Ongoing matches</span>
                  <span className="font-mono font-bold text-white bg-red-950/40 text-red-400 px-2 py-0.5 rounded border border-red-900/30">
                    {liveMatchesCount} Live Now
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-neutral-400">Total cover leagues</span>
                  <span className="font-mono font-bold text-neutral-200">
                    120+ Clubs
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-neutral-900 pt-2">
                  <span className="text-neutral-500 font-mono">Ticker Interval</span>
                  <span className="font-mono text-[10px] text-neutral-400 italic">
                    6s Real-Time
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Layout: Left Column = Scoreboards (60%), Right Column = Trending News (40%) */}
          {activeTab === 'profile' && user ? (
            <div id="profile" className="scroll-mt-24">
              <ProfilePanel 
                user={user} 
                onUpdateUser={handleUpdateUser} 
                onLogout={handleLogout} 
              />
            </div>
          ) : activeTab === 'upcoming' ? (
            <div id="upcoming" className="scroll-mt-24">
              <UpcomingMatches />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Live Scoreboards side (7 cols) */}
              <div className="lg:col-span-7 space-y-2">
                <Scoreboard 
                  matches={matches} 
                  selectedSport={selectedSport} 
                  setSelectedSport={setSelectedSport} 
                  user={user}
                  onToggleTeamFollow={handleToggleTeamFollow}
                  onTriggerAuthModal={() => setIsAuthModalOpen(true)}
                />
              </div>

              {/* News & Stats side (5 cols) */}
              <div className="lg:col-span-5 space-y-2">
                <NewsSection 
                  news={mockNews} 
                  user={user} 
                  onTriggerAuthModal={() => setIsAuthModalOpen(true)}
                />
              </div>

            </div>
          )}

        </section>

        {/* HOW TO PLAY SECTION VIEW */}
        <hr className="border-neutral-900" />
        <section className="scroll-mt-24">
          <GuideSection />
        </section>

        {/* THINGS & GEAR DIMENSIONS SECTION VIEW */}
        <hr className="border-neutral-900" />
        <section className="scroll-mt-24">
          <GearSection />
        </section>

        {/* INTERACTIVE FAQ/RULES SECTION VIEW */}
        <hr className="border-neutral-900" />
        <section className="scroll-mt-24">
          <FaqSection />
        </section>

      </main>

      {/* Core Footer Block */}
      <footer className="bg-neutral-950 border-t border-neutral-900 py-12 mt-16 text-neutral-400 text-xs text-center select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Logo brand & tagline */}
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-lime-400" />
              <span className="font-display text-lg font-bold text-white tracking-wide">
                sportScore
              </span>
            </div>
            <p className="max-w-md text-neutral-500 font-light text-[11px] leading-relaxed">
              Serving real-time simulated scoreboard tracking, rules tutorials, and geometry guidelines for modern sports amateurs. Built on high-octane responsive React stack.
            </p>
          </div>

          <hr className="border-neutral-900 max-w-sm mx-auto" />

          {/* Humble Human Labeling footer credentials */}
          <div className="flex flex-wrap items-center justify-between text-neutral-600 border-b border-neutral-900 pb-6 gap-4 text-[10px] uppercase font-mono tracking-wider">
            <div className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-neutral-700" /> Covers Football, Cricket, Basketball & Tennis
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-700" /> NO SIGNUP REQUIRED
            </div>
            <div className="flex items-center gap-1 justify-center">
              Crafted for sports fans with <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </div>
          </div>

          {/* Centered ASEnte outline wordmark and copyright */}
          <div className="flex flex-col items-center justify-center pt-2 space-y-2">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 160 50" className="w-24 h-auto text-neutral-400 hover:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
                <text x="10" y="35" 
                      fontFamily="sans-serif" 
                      fontSize="26" 
                      fontWeight="800" 
                      letterSpacing="4" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1.5">
                  ASEnté
                </text>
                <text x="140" y="16" 
                      fontFamily="sans-serif" 
                      fontSize="9" 
                      fontWeight="bold" 
                      fill="currentColor">
                  TM
                </text>
              </svg>
            </div>
            <p className="text-[10px] tracking-wide text-neutral-550 font-mono uppercase">
              All rights reserved.
            </p>
          </div>

        </div>
      </footer>

      {/* Interactive Authentication popup overlay modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={(u) => {
          setUser(u);
          localStorage.setItem('sportscore_current_user', JSON.stringify(u));
          setActiveTab('profile');
        }} 
      />

      {/* Terms and Conditions Consent Modal for First Time visitors */}
      {!hasAgreedTerms && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
          <div className="relative w-full max-w-sm bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] flex flex-col space-y-6">
            {/* Banner border highlight */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400"></div>

            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-lime-400 text-xl font-bold mb-4 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                📜
              </div>
              <h2 className="font-display text-2xl font-bold text-white tracking-tight">
                Terms & Conditions
              </h2>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Welcome to sportScore! To enter our interactive sports arena, view live simulators, and set customized hubs, you must agree to our Terms of Service.
              </p>
            </div>

            {/* Actions Panel */}
            <div className="bg-neutral-900/40 border border-neutral-900 rounded-2xl p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <span className="text-lime-400 text-sm mt-0.5">✓</span>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  All simulated match tracking and rules data are provided for educational and amateur fun.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-lime-400 text-sm mt-0.5">✓</span>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Your team preferences, follows, and membership card profiles are saved locally on your device.
                </p>
              </div>
            </div>

            {/* Choice triggers */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="https://tandcasente.xo.je/wp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 border border-neutral-800 bg-neutral-900 hover:bg-neutral-850 text-neutral-350 font-bold rounded-xl text-xs sm:text-sm transition-colors text-center inline-flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Read Now
                <span className="text-[10px]">↗</span>
              </a>

              <button
                onClick={() => {
                  localStorage.setItem('sportscore_terms_agreed', 'true');
                  setHasAgreedTerms(true);
                }}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-lime-400 to-emerald-400 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm hover:opacity-95 transition-opacity shadow-lg shadow-lime-950/20 cursor-pointer"
              >
                Agree & Enter
              </button>
            </div>

            <div className="text-[10px] text-neutral-600 text-center font-mono uppercase tracking-wider">
              sportScore Arena Compliance
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
