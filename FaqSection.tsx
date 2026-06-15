import React, { useState } from 'react';
import { sportGuides } from '../utils/mockData';
import { SportType } from '../types';
import { 
  Dribbble, 
  Map, 
  History, 
  Users, 
  ListTodo, 
  Backpack, 
  UserSquare2,
  BookmarkCheck
} from 'lucide-react';

export const GuideSection: React.FC = () => {
  const [activeGuideSport, setActiveGuideSport] = useState<SportType>('football');
  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'equipment' | 'rules'>('overview');

  const selectedGuide = sportGuides.find(g => g.sport === activeGuideSport) || sportGuides[0];

  const getSportAccentColors = (sport: SportType) => {
    switch (sport) {
      case 'football': return 'border-emerald-500 text-emerald-400 bg-emerald-950/20';
      case 'cricket': return 'border-purple-500 text-purple-400 bg-purple-950/20';
      case 'basketball': return 'border-amber-500 text-amber-400 bg-amber-950/20';
      case 'tennis': return 'border-pink-500 text-pink-400 bg-pink-950/20';
    }
  };

  return (
    <div id="guide" className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-8 scroll-mt-24">
      {/* Title block */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <BookmarkCheck className="w-4 h-4 animate-bounce" /> Learn the Arenas
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          How to Play Guides
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          New to the match? Browse our easy-to-read masterclasses explaining rules, core player dynamics, and field tactics for beginners.
        </p>
      </div>

      {/* Sport Selector Carousel */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 border-b border-neutral-900">
        {sportGuides.map((guide) => {
          const isSelected = activeGuideSport === guide.sport;
          const sportsEmoji = guide.sport === 'football' ? '⚽' : guide.sport === 'cricket' ? '🏏' : guide.sport === 'basketball' ? '🏀' : '🎾';
          
          return (
            <button
              key={guide.sport}
              onClick={() => {
                setActiveGuideSport(guide.sport);
                setActiveTab('overview');
              }}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isSelected
                  ? 'bg-neutral-900 text-white border-b-2 border-lime-400 shadow-md font-bold'
                  : 'text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200'
              }`}
            >
              <span className="text-lg">{sportsEmoji}</span>
              <span>{guide.displayName}</span>
            </button>
          );
        })}
      </div>

      {/* Primary Grid Layout (Sidebar tabs + main detail card) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Sidebar Tabs */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
          {(['overview', 'positions', 'equipment', 'rules'] as const).map((tab) => {
            const label = {
              overview: 'Overview & History',
              positions: 'Player Positions',
              equipment: 'Gear & Equipment',
              rules: 'Core Basic Rules'
            }[tab];

            const Icon = {
              overview: History,
              positions: Users,
              equipment: Backpack,
              rules: ListTodo
            }[tab];

            const isSelected = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-neutral-900 text-lime-400 border border-neutral-800 shadow-sm'
                    : 'text-neutral-400 hover:bg-neutral-900/30 hover:text-neutral-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-lime-400' : 'text-neutral-550'}`} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Detail Display Block */}
        <div className="lg:col-span-3 bg-neutral-900/30 border border-neutral-900 p-6 rounded-2xl space-y-6">
          
          {/* Header block within Detail */}
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="text-lg">
                {selectedGuide.sport === 'football' ? '⚽' : selectedGuide.sport === 'cricket' ? '🏏' : selectedGuide.sport === 'basketball' ? '🏀' : '🎾'}
              </span>
              {selectedGuide.displayName} Masterclass
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 italic">
              "{selectedGuide.tagline}"
            </p>
          </div>

          <hr className="border-neutral-900" />

          {/* Render Tab Contents */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-2.5">
                <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
                  <History className="w-4 h-4" /> Origin Story & History
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  {selectedGuide.history}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-850 space-y-1.5">
                  <h5 className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 flex items-center gap-1">
                    <Dribbble className="w-3.5 h-3.5 text-lime-400" /> Core Objective
                  </h5>
                  <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                    {selectedGuide.objective}
                  </p>
                </div>

                <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-850 space-y-1.5">
                  <h5 className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 flex items-center gap-1">
                    <Map className="w-3.5 h-3.5 text-lime-400" /> Setup & Team scale
                  </h5>
                  <p className="text-xs text-neutral-305 text-neutral-350 font-normal leading-relaxed">
                    <strong>Opponents:</strong> {selectedGuide.playersCount}
                    <br />
                    <strong>Dimensions:</strong> {selectedGuide.fieldDimensions}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'positions' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Users className="w-4 h-4" /> Key Squad Positions
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedGuide.positions.map((pos, i) => (
                  <div key={i} className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-900 hover:border-neutral-850 transition-colors space-y-1">
                    <span className="text-xs font-mono text-lime-400 font-bold flex items-center gap-1">
                      <UserSquare2 className="w-3.5 h-3.5 text-neutral-505" /> {pos.name}
                    </span>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pos.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'equipment' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Backpack className="w-4 h-4" /> Recommended Apparel & Gear Checklist
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedGuide.equipment.map((item, i) => (
                  <div key={i} className="flex items-start justify-between bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm font-semibold text-neutral-100">
                        {item.name}
                      </p>
                      <p className="text-[11px] text-neutral-400">
                        {item.purpose}
                      </p>
                    </div>
                    <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded leading-none ${
                      item.importance === 'Essential' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/10' 
                        : item.importance === 'Recommended'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {item.importance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4 animate-fadeIn">
              <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
                <ListTodo className="w-4 h-4" /> Golden Pitch & Court Rules
              </h4>

              <div className="space-y-2">
                {selectedGuide.basicRules.map((rule, i) => (
                  <div key={i} className="flex gap-3 bg-neutral-900/20 p-4 rounded-xl border border-neutral-900 items-start">
                    <span className="flex items-center justify-center w-5.5 h-5.5 rounded bg-lime-500/10 text-lime-400 font-mono text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      <strong>{rule.split(':')[0]}:</strong>{rule.split(':')[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
