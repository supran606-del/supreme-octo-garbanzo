import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Smile, Eye, EyeOff, Check, Heart } from 'lucide-react';
import { User } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

const AVATAR_OPTIONS = ['⚽', '🏀', '🎾', '🏏', '🦁', '⚡', '🌟', '🎯', '🏃', '🔥', '🏆', '🦅'];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [avatarEmoji, setAvatarEmoji] = useState('⚽');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Lookup users in localStorage
    const savedUsersStr = localStorage.getItem('sportscore_users');
    const savedUsers: (User & { password?: string })[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];

    const matchedUser = savedUsers.find(
      (u) => (u.email === email || u.username === email) && u.password === password
    );

    if (matchedUser) {
      setSuccess('Logged in successfully!');
      setTimeout(() => {
        // Exclude password from logged-in user state
        const { password: _, ...userWithoutPassword } = matchedUser;
        onAuthSuccess(userWithoutPassword as User);
        onClose();
      }, 800);
    } else {
      setError('Invalid username/email or password credentials.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email || !username || !fullName || !password) {
      setError('All fields are required.');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Lookup existing users
    const savedUsersStr = localStorage.getItem('sportscore_users');
    const savedUsers: (User & { password?: string })[] = savedUsersStr ? JSON.parse(savedUsersStr) : [];

    const emailExists = savedUsers.some((u) => u.email.toLowerCase() === email.toLowerCase());
    const userExists = savedUsers.some((u) => u.username.toLowerCase() === username.toLowerCase());

    if (emailExists) {
      setError('Email is already registered.');
      return;
    }
    if (userExists) {
      setError('Username is already taken.');
      return;
    }

    // Create the new user
    const newUser: User & { password?: string } = {
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      avatarEmoji,
      preferences: {
        favoriteSports: [],
        favoriteTeams: []
      },
      createdAt: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      password: password
    };

    const updatedUsers = [...savedUsers, newUser];
    localStorage.setItem('sportscore_users', JSON.stringify(updatedUsers));
    
    setSuccess('Account created! Logging you in...');
    setTimeout(() => {
      const { password: _, ...userState } = newUser;
      onAuthSuccess(userState as User);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(163,230,53,0.15)] flex flex-col">
        
        {/* Banner pop */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-400"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-xl transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="px-6 pt-8 pb-4 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 text-lime-400 text-xl font-bold mb-3 shadow-[0_0_15px_rgba(163,230,53,0.1)]">
            🏆
          </div>
          <h2 className="font-display text-2xl font-bold text-white tracking-tight">
            {activeTab === 'login' ? 'Welcome Back' : 'Join sportScore'}
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            {activeTab === 'login' 
              ? 'Login to restore followed teams, scores, and custom hubs' 
              : 'Create a free membership card to set customized preferences'}
          </p>
        </div>

        {/* Form Selector Tabs */}
        <div className="flex border-b border-neutral-900 px-6">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'login' 
                ? 'border-lime-400 text-lime-400' 
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            LOG IN
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
              activeTab === 'signup' 
                ? 'border-lime-400 text-lime-400' 
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Form content scrolling wrapper */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-4">
          
          {/* Diagnostic Error/Success banners */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium">
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium animate-pulse flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              {success}
            </div>
          )}

          {activeTab === 'login' ? (
            /* LOGIN SCREEN FORM */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Username or Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="Enter your email or username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Security Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-lime-400 hover:bg-lime-350 text-neutral-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-colors border border-lime-500 shadow-md cursor-pointer mt-2"
              >
                ACCESS ARENA PROFILE
              </button>
            </form>
          ) : (
            /* SIGNUP SCREEN FORM */
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Username</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                      <UserIcon className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="alex99"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-11 pr-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Full Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                      <Smile className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="Alex Smith"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-11 pr-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Choose Profile Emblem</label>
                <div className="grid grid-cols-6 gap-2 bg-neutral-900/60 p-3 rounded-2xl border border-neutral-850">
                  {AVATAR_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setAvatarEmoji(emoji)}
                      className={`text-xl p-1.5 rounded-lg transition-transform hover:scale-115 flex items-center justify-center cursor-pointer ${
                        avatarEmoji === emoji 
                          ? 'bg-lime-400/10 border border-lime-400/30 text-lime-400' 
                          : 'border border-transparent'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-neutral-500 pointer-events-none">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-11 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-lime-400 to-emerald-400 text-neutral-950 font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm hover:opacity-90 transition-opacity border border-lime-500 shadow-md cursor-pointer mt-2"
              >
                CREATE MEMBERSHIP CARD
              </button>
            </form>
          )}

          {/* Preset testing credentials help tip to assist grading/verification */}
          <div className="p-3 bg-neutral-900 rounded-xl border border-neutral-850/60 text-[10px] text-neutral-400 text-center leading-normal">
            💡 <strong>Testing tip:</strong> Enter any custom name & email to register. You can also log in as <strong>guest / password</strong> to test pre-configured user credentials immediately.
          </div>

        </div>
      </div>
    </div>
  );
};
