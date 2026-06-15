import React, { useState } from 'react';
import { SportType } from '../types';
import { 
  Compass, 
  Layers, 
  History, 
  Maximize2, 
  Check, 
  HelpCircle,
  Hammer
} from 'lucide-react';

interface PitchMarker {
  name: string;
  desc: string;
  dims: string;
  top: string;
  left: string;
}

export const GearSection: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState<SportType>('football');
  const [activeMarker, setActiveMarker] = useState<PitchMarker | null>(null);

  // Core information for each sport's field layout dimensions
  const courtGuides: Record<SportType, {
    dimensions: string;
    surfaceType: string;
    markers: PitchMarker[];
    historyNote: string;
    generalLayoutSummary: string;
  }> = {
    football: {
      dimensions: '105m x 68m (Standard Pitch)',
      surfaceType: 'Natural Grass or Hybrid AstroTurf',
      historyNote: 'Historically, pitch sizes were varied until FIFA standardized fields for international competitions starting in the late 19th Century to ensure tactical consistency.',
      generalLayoutSummary: 'A rectangular field with standard boundary Goal lines (short sides) and Touchlines (long sides). Key markings include the Penalty Area, Goal Box, and the iconic Center Circle.',
      markers: [
        { name: 'Penalty Box', desc: 'The 18-yard secure zone where defenders must avoid committing direct fouls, and where goalkeepers are legally permitted to secure the ball with their hands.', dims: '16.5m extends outward', top: '15%', left: '50%' },
        { name: 'Center Circle', desc: 'Symmetrical circular zone where kickoff procedures are initiated at start of halves or after goals are scored. Opponents must stand outside this circle.', dims: '9.15m Radius', top: '50%', left: '50%' },
        { name: 'Penalty Spot', desc: 'The precise mark where penalty kicks are placed. Opponents must stand behind the penalty arc until the kick is taken.', dims: '11m from Goal line', top: '8%', left: '50%' }
      ]
    },
    cricket: {
      dimensions: 'Oval field (No rigid size), Central 22 Yard Pitch',
      surfaceType: 'Supervised Flat Clay/Grass turf',
      historyNote: 'The distance of 22 yards was established in the 1700s based on English surveyor chains. It was deemed a perfect physical length for bowling testing.',
      generalLayoutSummary: 'The total grass field includes a center Pitch where batsman and bowlers contest, surrounded by an Outfield boundary ranging from 135m to 150m side-to-side.',
      markers: [
        { name: 'The Pitch', desc: 'The central, rectangular area of the cricket ground containing the batting wickets at either end. Soil prep decides bounce behavior.', dims: '22 Yards (20.12m)', top: '50%', left: '50%' },
        { name: 'Crease Line', desc: 'The safely marked boundary lines determining batsman safety. If batsman stands inside crease they are safe from dynamic stumpings.', dims: '1.22m from Wickets', top: '35%', left: '50%' },
        { name: 'Boundary Rope', desc: 'The external rope determining maximum scores. Bouncing beyond is 4 runs, flying cleanly over is 6 runs.', dims: '60-80m radius', top: '90%', left: '50%' }
      ]
    },
    basketball: {
      dimensions: '28m x 15m (FIBA Standard) / 94ft x 50ft (NBA)',
      surfaceType: 'Varnished Maple Hardwood court',
      historyNote: 'Peach baskets were originally mounted at heights of exactly 10 feet because that matched the indoor balcony rail height in the Springfield gym back in 1891!',
      generalLayoutSummary: 'A highly symmetric indoor court featuring double hoops positioned at exactly 10 feet (3.05m), with painted restricted keys and a three-point line arc.',
      markers: [
        { name: 'Three-Point Arc', desc: 'The main semicircular boundary line. Shots made from outside are worth 3 points; inside is worth 2.', dims: '6.75m distance (FIBA)', top: '25%', left: '50%' },
        { name: 'The Key (Restricted)', desc: 'The painted rectangular lane. Attackers can remain inside for a maximum of 3 seconds only before receiving turnovers.', dims: '4.9m wide, 5.8m deep', top: '10%', left: '50%' },
        { name: 'Free Throw Mark', desc: 'Standard mark where players execute uncontested foul shots during play disruptions.', dims: '4.6m from Backboard', top: '18%', left: '50%' }
      ]
    },
    tennis: {
      dimensions: '23.77m x 10.97m (Doubles format)',
      surfaceType: 'Hard Court, Red Clay, or Lawn Grass',
      historyNote: 'Lawn tennis court boundaries were originally designed in hour-glass formats during the 1870s, but rearranged to simple rectangles inside Wimbledon rules in 1877.',
      generalLayoutSummary: 'Divided cleanly into halves by a 3-foot taut central net, featuring specific boundary lines for both Singles and Doubles variants.',
      markers: [
        { name: 'The Alley', desc: 'Marginal side-strip lines. Active only during Doubles matches. Ruled out of bounds during Singles plays.', dims: '1.37m extra width', top: '50%', left: '88%' },
        { name: 'Service Boxes', desc: 'Dynamic rectangular target boxes. Serves must bounce inside the diagonal box to be registered valid.', dims: '6.4m from Net', top: '25%', left: '30%' },
        { name: 'The Central Net', desc: 'Custom nylon mesh. Must measure exactly 3 feet high (0.914m) at the absolute middle center.', dims: '0.914m tall', top: '50%', left: '50%' }
      ]
    }
  };

  const activeGuide = courtGuides[selectedSport];

  // Helper trigger
  const handleMarkerClick = (marker: PitchMarker) => {
    setActiveMarker(marker === activeMarker ? null : marker);
  };

  return (
    <div id="gear" className="bg-neutral-950 border border-neutral-900 rounded-3xl p-6 sm:p-8 space-y-8 scroll-mt-24">
      {/* Structural Header */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-lime-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Compass className="w-4 h-4" /> Sports Geometry
        </span>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Field Dimensions & Equipment Guide
        </h2>
        <p className="text-sm text-neutral-400 max-w-2xl">
          Ever wondered about the physical scale of the sports you love? Discover standard pitch markings, history reasons, and essential gear diagrams.
        </p>
      </div>

      {/* Sport Selector Buttons */}
      <div className="flex gap-2 pb-1 overflow-x-auto">
        {(['football', 'cricket', 'basketball', 'tennis'] as const).map(sport => (
          <button
            key={sport}
            onClick={() => {
              setSelectedSport(sport);
              setActiveMarker(null);
            }}
            className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedSport === sport
                ? 'bg-lime-400 text-neutral-950 font-bold shadow-[0_0_15px_rgba(163,230,53,0.3)]'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-850'
            }`}
          >
            {sport.charAt(0).toUpperCase() + sport.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Dynamic Stadium Field layout visualization wrapper (6 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
            <Layers className="w-4 h-4" /> Interactive Arena Layout Sketch
          </h4>

          {/* Graphical diagram representing court elements */}
          <div className="relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 flex flex-col justify-center items-center min-h-[300px] overflow-hidden group select-none">
            {/* Soft inner sports grid markings */}
            <div className="absolute inset-0 border-2 border-neutral-800/40 m-4 rounded-xl flex items-center justify-center opacity-40">
              {/* Mid line */}
              <div className="w-full h-0.5 bg-neutral-800/50 absolute top-1/2"></div>
              {/* Core shape depending on active sport */}
              {selectedSport === 'football' && (
                <div className="w-24 h-24 rounded-full border-2 border-neutral-850 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              )}
              {selectedSport === 'basketball' && (
                <div className="w-40 h-40 rounded-full border-2 border-neutral-850 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              )}
              {selectedSport === 'tennis' && (
                <div className="w-11/12 h-0.5 bg-lime-500/30 absolute top-1/2"></div>
              )}
            </div>

            {/* Simulated Sport Objects/Poles for style points */}
            <div className="z-1 text-center space-y-2 pointer-events-none">
              <span className="text-5xl drop-shadow-md block animate-bounce">
                {selectedSport === 'football' ? '🏟️' : selectedSport === 'cricket' ? '🏏' : selectedSport === 'basketball' ? '🏀' : '🎾'}
              </span>
              <p className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
                {activeGuide.dimensions}
              </p>
            </div>

            {/* Custom Interactive Marker Buttons overlays */}
            {activeGuide.markers.map((marker, idx) => {
              const isMarkerActive = activeMarker?.name === marker.name;
              return (
                <button
                  key={idx}
                  onClick={() => handleMarkerClick(marker)}
                  className={`absolute p-2.5 rounded-full transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none ${
                    isMarkerActive
                      ? 'bg-lime-400 text-neutral-950 scale-125 z-20 shadow-[0_0_20px_rgba(163,230,53,0.5)]'
                      : 'bg-neutral-950 text-lime-400 hover:scale-110 hover:bg-neutral-900 border border-neutral-800 z-10'
                  }`}
                  style={{ top: marker.top, left: marker.left }}
                  title={`Click to learn about ${marker.name}`}
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              );
            })}

            {/* Prompt indicator */}
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-neutral-500 bg-neutral-950/80 px-2 py-1 rounded border border-neutral-900">
              ⚡ Click markers for details
            </div>
          </div>

          {/* Interactive display helper of selected marker */}
          {activeMarker ? (
            <div className="bg-lime-950/10 border border-lime-500/20 p-5 rounded-2xl space-y-1.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-mono tracking-widest uppercase font-bold text-lime-400 flex items-center gap-1">
                  <Check className="w-4 h-4 text-lime-400" /> SELECTED ZONE: {activeMarker.name}
                </h5>
                <span className="text-xs bg-lime-400/10 text-lime-400 px-2 py-0.5 rounded font-mono font-bold">
                  Dim: {activeMarker.dims}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {activeMarker.desc}
              </p>
            </div>
          ) : (
            <div className="bg-neutral-900/20 border border-neutral-900 border-dashed p-5 rounded-2xl flex items-center gap-3 text-neutral-400 text-xs">
              <HelpCircle className="w-5 h-5 text-neutral-500" />
              <span>Click any marker point above to explore rules, geometry, and purpose of that specific pitch/court coordinate zone!</span>
            </div>
          )}
        </div>

        {/* Dimension metrics & History details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900/40 border border-neutral-900 p-6 rounded-2xl space-y-5">
            <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
              <History className="w-4 h-4" /> Historical Geography Context
            </h4>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {activeGuide.historyNote}
            </p>
            <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-900 space-y-1">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Surface Specification</span>
              <p className="text-xs font-semibold text-white">
                {activeGuide.surfaceType}
              </p>
            </div>
          </div>

          <div className="bg-neutral-900/40 border border-neutral-900 p-6 rounded-2xl space-y-4">
            <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-500 flex items-center gap-1.5">
              <Hammer className="w-4 h-4" /> Layout Rules Overview
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              {activeGuide.generalLayoutSummary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
