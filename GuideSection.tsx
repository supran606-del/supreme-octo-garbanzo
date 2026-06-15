export type SportType = 'football' | 'cricket' | 'basketball' | 'tennis';

export interface ScoreEvent {
  time: string;
  player: string;
  type: string; // e.g. "Goal", "Wicket", "3-Pointer", "Ace"
  detail?: string;
}

export interface MatchStats {
  possession?: string; // or team stats
  shotsOnTarget?: [number, number];
  fouls?: [number, number];
  wickets?: [number, number];
  overs?: [string, string];
  runs?: [number, number];
  rebounds?: [number, number];
  assists?: [number, number];
  aces?: [number, number];
  doubleFaults?: [number, number];
}

export interface Match {
  id: string;
  sport: SportType;
  tournament: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: string | number;
  awayScore: string | number;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  time: string; // e.g. "82'", "Overs: 14.2", "Q3 4:12", "Set 3"
  venue: string;
  color: string; // accent color hex/tailwind class
  events: ScoreEvent[];
  stats: MatchStats;
}

export interface NewsItem {
  id: string;
  sport: SportType;
  title: string;
  summary: string;
  time: string;
  author: string;
  views: number;
}

export interface PlayerPosition {
  name: string;
  role: string;
}

export interface Equipment {
  name: string;
  purpose: string;
  importance: 'Essential' | 'Recommended' | 'Optional';
}

export interface SportGuide {
  sport: SportType;
  displayName: string;
  tagline: string;
  history: string;
  objective: string;
  playersCount: string;
  fieldDimensions: string;
  positions: PlayerPosition[];
  equipment: Equipment[];
  basicRules: string[];
}

export interface FAQItem {
  id: string;
  sport: SportType | 'general';
  question: string;
  answer: string;
}

export interface UserPreferences {
  favoriteSports: SportType[];
  favoriteTeams: string[];
}

export interface User {
  username: string;
  email: string;
  fullName: string;
  avatarEmoji: string;
  preferences: UserPreferences;
  createdAt: string;
}

export interface UpcomingEvent {
  id: string;
  sport: SportType;
  category: 'IPL' | 'FIFA' | 'CRICKET WORLD CUP' | 'T25' | 'T20' | 'ICC'; // Allowed categories
  tournament: string;
  matchName: string;
  homeTeam: string;
  awayTeam: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM (local/venue time)
  extendedDateStr: string; // formatted date (e.g., Saturday, Jun 20, 2026)
  venue: string;
  status: 'SCHEDULED' | 'CONFIRMED';
  details: string;
}

