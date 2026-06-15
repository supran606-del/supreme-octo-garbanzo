import { Match, NewsItem, SportGuide, FAQItem } from '../types';

export const initialMatches: Match[] = [
  {
    id: 'm1',
    sport: 'football',
    tournament: 'Champions League - Group Stage',
    homeTeam: 'Madrid United',
    awayTeam: 'Munich FC',
    homeScore: 2,
    awayScore: 1,
    status: 'LIVE',
    time: "74'",
    venue: 'Stadio de Santiago, Madrid',
    color: '#22c55e', // Emerald
    events: [
      { time: "18'", player: "K. Benzema", type: "Goal", detail: "Header from corner" },
      { time: "41'", player: "L. Sane", type: "Goal", detail: "Left-foot blast" },
      { time: "63'", player: "V. Junior", type: "Goal", detail: "Solo counter attack" }
    ],
    stats: {
      possession: "53% - 47%",
      shotsOnTarget: [6, 4],
      fouls: [8, 11]
    }
  },
  {
    id: 'm2',
    sport: 'cricket',
    tournament: 'T20 World Super League',
    homeTeam: 'India Kings',
    awayTeam: 'Australia Aces',
    homeScore: '168/4',
    awayScore: '144/2',
    status: 'LIVE',
    time: '15.4 Overs',
    venue: 'Melbourne Cricket Ground',
    color: '#a855f7', // Purple/Cyan custom pop
    events: [
      { time: '2.4 Overs', player: 'R. Sharma', type: 'Six', detail: 'Slogged over mid-wicket' },
      { time: '8.1 Overs', player: 'V. Kohli', type: 'Four', detail: 'Exquisite cover drive' },
      { time: '11.5 Overs', player: 'M. Starc', type: 'Wicket', detail: 'Bowled clean, 148km/h!' }
    ],
    stats: {
      overs: ['15.4', '14.0'],
      runs: [168, 144],
      wickets: [4, 2]
    }
  },
  {
    id: 'm3',
    sport: 'basketball',
    tournament: 'Pro Basketball Finals',
    homeTeam: 'LA Vipers',
    awayTeam: 'Boston Anchors',
    homeScore: 98,
    awayScore: 101,
    status: 'LIVE',
    time: 'Q4 2:45',
    venue: 'Viper Dome, Los Angeles',
    color: '#eab308', // Amber
    events: [
      { time: 'Q4 8:20', player: 'L. James', type: 'Dunk', detail: 'Fastbreak alley-oop' },
      { time: 'Q4 5:10', player: 'J. Brown', type: '3-Pointer', detail: 'Step-back corner three' },
      { time: 'Q4 3:15', player: 'A. Davis', type: 'Block', detail: 'Denied at the rim' }
    ],
    stats: {
      rebounds: [41, 45],
      assists: [24, 28]
    }
  },
  {
    id: 'm4',
    sport: 'tennis',
    tournament: 'London Grand Slam - Finals',
    homeTeam: 'Carlos Alcaraz',
    awayTeam: 'Novak Djokovic',
    homeScore: '2 | 6 | 4',
    awayScore: '1 | 3 | 5',
    status: 'LIVE',
    time: 'Set 3 - Deuce',
    venue: 'Centre Court, London',
    color: '#ec4899', // Pink
    events: [
      { time: 'Set 1', player: 'C. Alcaraz', type: 'Ace', detail: '132mph outbound serve' },
      { time: 'Set 2', player: 'N. Djokovic', type: 'Break Point', detail: 'Double backhand return' },
      { time: 'Set 3 5-4', player: 'C. Alcaraz', type: 'Deuce', detail: '24-shot epic baseline rally' }
    ],
    stats: {
      aces: [9, 7],
      doubleFaults: [2, 1]
    }
  },
  {
    id: 'm5',
    sport: 'football',
    tournament: 'Premier League',
    homeTeam: 'London Gunners',
    awayTeam: 'Manchester Devils',
    homeScore: 0,
    awayScore: 0,
    status: 'UPCOMING',
    time: 'Today 12:30 PM',
    venue: 'Gunners Arena, London',
    color: '#22c55e',
    events: [],
    stats: {}
  },
  {
    id: 'm6',
    sport: 'cricket',
    tournament: 'The Ashes Test',
    homeTeam: 'England',
    awayTeam: 'Australia',
    homeScore: '342 & 102/2',
    awayScore: '298',
    status: 'FINISHED',
    time: 'Match Won by ENG',
    venue: 'Lord\'s, London',
    color: '#a855f7',
    events: [],
    stats: {}
  }
];

export const mockNews: NewsItem[] = [
  {
    id: 'n1',
    sport: 'football',
    title: 'De Bruyne orchestrates magnificent derby triumph',
    summary: 'A sensational midfield display guided Manchester to an ultimate 4-1 victory over rivals on Saturday, closing the gap at the top of the table.',
    time: '15 mins ago',
    author: 'Sarah Jenkins',
    views: 1240
  },
  {
    id: 'n2',
    sport: 'cricket',
    title: 'Sensational final over finishes bowler off at the crease',
    summary: 'Under extreme pressure, India managed a last-ball run out to clinch the historic bilateral series against South Africa in a crowded stadium.',
    time: '45 mins ago',
    author: 'Rajiv Sen',
    views: 3120
  },
  {
    id: 'n3',
    sport: 'tennis',
    title: 'The rising teenager: A star and future champion is born',
    summary: 'Analytic review on the modern tennis strategies employed by Alcaraz to defeat Djokovic in London, showing unprecedented court speed and topspin.',
    time: '1 hour ago',
    author: 'Michael Croft',
    views: 940
  },
  {
    id: 'n4',
    sport: 'basketball',
    title: 'Vipers secure top play-off seed with spectacular shooting display',
    summary: 'Draining 18 three-pointers, the Los Angeles team overwhelmed rival defense systems in a masterclass of pacing and spacing.',
    time: '2 hours ago',
    author: 'Marcus Vance',
    views: 2050
  },
  {
    id: 'n5',
    sport: 'football',
    title: 'Pre-season transfers: Key defensive prospects to watch',
    summary: 'An depth study of young defensive prodigies across South America and Europe who are highly coveted by top European heavyweights this summer.',
    time: '4 hours ago',
    author: 'Daniel V.',
    views: 890
  }
];

export const sportGuides: SportGuide[] = [
  {
    sport: 'football',
    displayName: 'Football (Soccer)',
    tagline: 'The beautiful game played with rhythm, speed, and standard tactics.',
    history: 'Ancient relative games existed in China and Mesoamerica, but modern association football was systemized in 1863 in England with the establishment of the Football Association (FA). It has since exploded to become the world\'s most popular sport with billions of fans.',
    objective: 'To navigate a sphere into the opponent’s rectangular goal using any part of the body except the hands and arms, scoring more goals than the opposition within 90 minutes.',
    playersCount: '11 players per team on the pitch (including 1 goalkeeper).',
    fieldDimensions: 'Typically 100–110m long by 64–75m wide.',
    positions: [
      { name: 'Goalkeeper (GK)', role: 'The last line of defense, authorized to use hands inside the penalty box to prevent opponent goals.' },
      { name: 'Defenders (CB, LB, RB)', role: 'Form defensive screens to block attackers, clear crosses, and initiate backline distribution.' },
      { name: 'Midfielders (CM, CDM, CAM)', role: 'Connect defense and attack, control possession tempo, and disrupt opponent plays.' },
      { name: 'Forwards (ST, Wingers)', role: 'Positioned close to opponent box to score goals, exploit gaps, and press opposing defenders.' }
    ],
    equipment: [
      { name: 'Football Ball', purpose: 'Standard spherical synthetic leather inflated ball (Size 5 for adults).', importance: 'Essential' },
      { name: 'Cleated Boots', purpose: 'Provide vital stud-traction on natural or artificial grass surfaces.', importance: 'Essential' },
      { name: 'Shin Guards', purpose: 'Required internal protective sleeves guarding player shins from harsh tackles.', importance: 'Essential' },
      { name: 'Goalkeeper Gloves', purpose: 'Cushioned latex grip gloves for stopping fast-moving balls.', importance: 'Recommended' }
    ],
    basicRules: [
      'Offside Rule: An attacking player cannot be closer to the opponent’s goal line than both the ball and the second-last opponent when the ball is passed to them.',
      'No Handballs: Field players cannot intentionally touch the ball with their arms or hands.',
      'Fouls & Cards: Careless tackles lead to direct free kicks. Yellow cards serve as cautions, and Red cards result in immediate expulsion without player replacement.',
      'Match Duration: Consists of two halves of 45 minutes, plus stoppage time added by referees.'
    ]
  },
  {
    sport: 'cricket',
    displayName: 'Cricket',
    tagline: 'A game of strategy, precision, and classic athletic focus.',
    history: 'Originating in south-east England in the 16th century, cricket became England\'s national sport in the 18th century and was subsequently exported worldwide through the British Empire. Standard formats now include Test matches (5 days), One-Day Internationals (ODIs), and fast-paced Twenty20s (T20s).',
    objective: 'The batting side aims to score as many runs as possible by hitting the bowled ball and running between wickets, while the bowling/fielding side aims to dismiss batters and restrict runs.',
    playersCount: '11 players per team on field.',
    fieldDimensions: 'The entire round/oval field has no fixed dimensions, but features a central 22-yard (20.12m) rectangular pitch.',
    positions: [
      { name: 'Bowler', role: 'Delivers the ball overarm towards the batter with the aim of hitting the wickets or inducing an error.' },
      { name: 'Wicketkeeper', role: 'Stands directly behind the batter\'s wickets to catch missed deliveries, edge deflections, or perform stumpings.' },
      { name: 'Slip Fielders', role: 'Stand close to the wicketkeeper to secure quick catches from bat edges.' },
      { name: 'Outfielders', role: 'Patrol wide boundaries to prevent boundaries and catch high airborne hits.' }
    ],
    equipment: [
      { name: 'Cricket Bat', purpose: 'Flat-fronted willow-wood blade with cane handle used to strike the ball.', importance: 'Essential' },
      { name: 'Cricket Ball', purpose: 'Hard, leather-covered cork ball. Red for Tests, white for limited-overs.', importance: 'Essential' },
      { name: 'Batting Pads & Helmet', purpose: 'Reinforced protective armor shielding against high-velocity ball impacts.', importance: 'Essential' },
      { name: 'Wicket/Stumps Set', purpose: 'Three wooden stumps topped with two bails at each end of the pitch.', importance: 'Essential' }
    ],
    basicRules: [
      'Dismissals (Outs): Batters can be dismissed via Bowled (ball hits stumps), Caught, Leg Before Wicket (LBW), Run Out, or Stumped.',
      'Runs Generation: Scorers earn runs by physical runs across the pitch, or boundaries (4 runs for bouncing boundary, 6 runs for direct hit aerial boundary).',
      'The Over: A bowler delivers 6 consecutive legal balls from one end, after which a different bowler takes over from the opposite end.',
      'Innings: Teams take turns batting and bowling based on the selected game format.'
    ]
  },
  {
    sport: 'basketball',
    displayName: 'Basketball',
    tagline: 'Fast-paced, high-flying court action with continuous motion.',
    history: 'Invented in December 1891 by Dr. James Naismith, a Canadian physical education instructor, in Springfield, Massachusetts, as an indoor winter sport. It was played with a peach basket and a soccer ball, eventually evolving into the high-precision professional leagues like the NBA.',
    objective: 'To shoot a synthetic ball through an elevated hoop (10 feet high) mounted on backboards at either end of a polished rectangular court, scoring more points than the opponents.',
    playersCount: '5 active players per team on the court.',
    fieldDimensions: 'Standard court is 94 feet long by 50 feet wide (NBA) or 28m x 15m (FIBA).',
    positions: [
      { name: 'Point Guard (PG)', role: 'The team playmaker who controls ball distribution, sets up offensive plays, and directs team rhythm.' },
      { name: 'Shooting Guard (SG)', role: 'Specializes in outside perimeter shooting, perimeter defense, and driving to the rim.' },
      { name: 'Small Forward (SF)', role: 'Versatile athlete with scoring ability, rebounding talent, and defensive agility across spots.' },
      { name: 'Power Forward (PF)', role: 'Plays near the low post, focusing on physical defense, rebounds, and interior shooting.' },
      { name: 'Center (C)', role: 'Usually the tallest player, serving as rim protector, shot blocker, and post-up scorer.' }
    ],
    equipment: [
      { name: 'Basketball Ball', purpose: 'Standard bouncable spherical leather or composite ball (Size 7 for men).', importance: 'Essential' },
      { name: 'Basketball Hoop & Net', purpose: '10-foot tall structural metal rim with dangling white nylon net.', importance: 'Essential' },
      { name: 'Court Shoes', purpose: 'High-top shoes offering crucial ankle support and rubber traction on hardwood floors.', importance: 'Essential' },
      { name: 'Mouthguard', purpose: 'Protects teeth from unintended physical elbows in the crowded paint area.', importance: 'Recommended' }
    ],
    basicRules: [
      'Dribbling & Traveling: A player must bounce the ball while walking or running. Taking steps without dribbling results in a traveling turnover.',
      'Point Scoring: Shots inside the arc count as 2 points, shots outside the arc count as 3 points, and uncontested free throws count as 1 point.',
      'Shot Clock: Possession is timed (typically 24 seconds to launch a shot hitting the rim).',
      'Fouls limit: Personal physical contacts are penalized. Accumulating 5 or 6 fouls disqualifies the player for the match duration.'
    ]
  },
  {
    sport: 'tennis',
    displayName: 'Tennis',
    tagline: 'A classic test of individual endurance, mental grit, and technical precision.',
    history: 'Evolved from "Jeu de paume" (game of the palm) in 12th century France, which involved hitting a ball with hands. Modern lawn tennis was popularized in Victorian England in the 1870s and is now played on grass, clay, and hard courts in international Grand Slams.',
    objective: 'To strike a felt-covered hollow rubber ball over a central 3-foot net into the opponent\'s court boundaries, in a manner that prevents them from executing a valid return.',
    playersCount: 'Singles (1 vs 1) or Doubles (2 vs 2).',
    fieldDimensions: 'Rectangular court: 78 feet (23.77m) long; 27 feet wide for singles and 36 feet wide for doubles.',
    positions: [
      { name: 'Server', role: 'Initiates play by tossing and launching the ball diagonally across the net into the opponent’s service box.' },
      { name: 'Receiver', role: 'Stands ready to return the server\'s serve, returning it deep into opponent turf.' }
    ],
    equipment: [
      { name: 'Tennis Racket', purpose: 'Aerodynamic frame strung with carbon-nylon strings used to strike tennis balls.', importance: 'Essential' },
      { name: 'Tennis Balls', purpose: 'Pressurized optic-yellow felt-covered hollow rubber balls.', importance: 'Essential' },
      { name: 'Tennis Shoes', purpose: 'Flat-sole shoes designed for lateral sliding, stopping, and court traction.', importance: 'Essential' },
      { name: 'Overgrips & Dampeners', purpose: 'Absorb hand sweat and reduce painful racket string vibrations.', importance: 'Recommended' }
    ],
    basicRules: [
      'The Bounce: The ball must bounce only once on your side before you hit it back. You can also volley the ball in the air (except on returns).',
      'Scoring System: Progresses from Love (0) to 15, 30, 40, to game point. Expressed as: "15-all" or "Deuce" (40-40, requiring a 2-point lead to win).',
      'Sets & Match: A Set is won by the first player to win 6 games (with a 2-game margin). Matches are usually played either Best of 3 or Best of 5 sets.',
      'In/Out Boundaries: Balls landing directly on boundary lines are ruled "In". Any ball landing outside is out.'
    ]
  }
];

export const faqList: FAQItem[] = [
  {
    id: 'f1',
    sport: 'football',
    question: 'What happens during an extra time or penalty shootout?',
    answer: 'In knockout matches where scores are tied after 90 minutes, two additional 15-minute extra-time halves are played. If they remain tied, a penalty shootout occurs where 5 players from each side take penalty shots consecutively to decide a winner.'
  },
  {
    id: 'f2',
    sport: 'football',
    question: 'What is VAR and how does it work?',
    answer: 'VAR stands for Video Assistant Referee. A team of remote officials monitors live multi-angle camera feeds to assist the pitch referee on crucial decisions: clear-cut goals, penalty checks, direct red cards, and mistaken identity.'
  },
  {
    id: 'f3',
    sport: 'cricket',
    question: 'How are cricket formats different from each other?',
    answer: 'There are three primary international formats: Test matches (5 days, white uniforms, red ball, unlimited overs of patience), One-Day Internationals (ODIs, 50 overs per side, colored kits), and Twenty20s (T20s, 20 overs per side, fast-paced power hitting).'
  },
  {
    id: 'f4',
    sport: 'cricket',
    question: 'What is the Duck-worth Lewis Stern (DLS) method?',
    answer: 'DLS is a mathematical formula used to calculate target scores and decide outcomes in weather-interrupted limited-overs matches, continuously factoring in remaining overs and wickets in hand.'
  },
  {
    id: 'f5',
    sport: 'basketball',
    question: 'What is the "Three-Second Rule" in basketball?',
    answer: 'An attacking player cannot remain inside the opponent’s key (the painted free-throw lane area) for more than three consecutive seconds while their team is in possession of the ball.'
  },
  {
    id: 'f6',
    sport: 'basketball',
    question: 'What constitutes a technical foul vs a personal foul?',
    answer: 'Personal fouls involve physical contact (holding, pushing, tripping). Technical fouls do not involve contact and are awarded for unsportsmanlike conduct, arguing with officials, or delay of game, resulting in one free-throw and ball possession.'
  },
  {
    id: 'f7',
    sport: 'tennis',
    question: 'What is a tiebreak and when is it played?',
    answer: 'If the score in a set reaches 6-6, a tiebreak game is played to determine the set winner. The first player to reach 7 points with a margin of 2 points wins the tiebreak (and the set, 7-6).'
  },
  {
    id: 'f8',
    sport: 'tennis',
    question: 'Why are tennis court surfaces so different?',
    answer: 'There are three main surface types: Clay (slow bounce, heavy top-spin, sliding-friendly), Grass (extremely fast bounce, low ball trajectory, serve-and-volley style), and Hard courts (neutral, standard bounce, predictable, good for all styles).'
  },
  {
    id: 'f9',
    sport: 'general',
    question: 'How does sportScore estimate live score updates?',
    answer: 'sportScore features an automated, real-time simulated update engine. It mimics real-world sports occurrences (goals, wickets, baskets, and set points) to provide an interactive playground that mirrors actual championship conditions.'
  }
];

// Helper to simulate live score ticks
export function updateSimulatedMatches(currMatches: Match[]): Match[] {
  return currMatches.map(match => {
    if (match.status !== 'LIVE') return match;

    // Slight chance of an event happening
    const seed = Math.random();
    if (seed > 0.85) {
      // Something happened! Let's update depending on the sport
      const updatedMatch = { ...match };
      
      switch (match.sport) {
        case 'football': {
          const isHome = Math.random() > 0.5;
          const homeScoreVal = typeof updatedMatch.homeScore === 'number' ? updatedMatch.homeScore : 0;
          const awayScoreVal = typeof updatedMatch.awayScore === 'number' ? updatedMatch.awayScore : 0;
          
          if (isHome) {
            updatedMatch.homeScore = homeScoreVal + 1;
            updatedMatch.events = [
              { time: `${parseInt(updatedMatch.time) + 1}'`, player: "Scorer Team Home", type: "Goal", detail: "Brilliant clinical finish!" },
              ...updatedMatch.events
            ];
          } else {
            updatedMatch.awayScore = awayScoreVal + 1;
            updatedMatch.events = [
              { time: `${parseInt(updatedMatch.time) + 1}'`, player: "Scorer Team Away", type: "Goal", detail: "Deflected bullet shot" },
              ...updatedMatch.events
            ];
          }
          
          // Increment time minute
          const currentMin = parseInt(updatedMatch.time);
          if (currentMin >= 90) {
            updatedMatch.status = 'FINISHED';
            updatedMatch.time = 'FT';
          } else {
            updatedMatch.time = `${currentMin + 1}'`;
          }

          // slightly shift stats
          if (updatedMatch.stats.shotsOnTarget) {
            const index = isHome ? 0 : 1;
            updatedMatch.stats.shotsOnTarget[index] += 1;
          }
          break;
        }
        case 'cricket': {
          // Update overs and runs
          // E.g. '168/4'
          const homeScoreStr = String(updatedMatch.homeScore);
          const [runsStr, wicketsStr] = homeScoreStr.split('/');
          let runs = parseInt(runsStr) || 0;
          let wickets = parseInt(wicketsStr) || 0;

          const currentOversStr = updatedMatch.time.replace(' Overs', '');
          let oversFloat = parseFloat(currentOversStr) || 0;
          
          // Add runs or a wicket
          const isWicket = Math.random() > 0.88;
          if (isWicket && wickets < 10) {
            wickets += 1;
            updatedMatch.events = [
              { time: `${oversFloat} Ov`, player: "Bowler", type: "Wicket", detail: "Caught in deep mid-wicket" },
              ...updatedMatch.events
            ];
          } else {
            const scoredRuns = [1, 2, 4, 6][Math.floor(Math.random() * 4)];
            runs += scoredRuns;
            if (scoredRuns >= 4) {
              updatedMatch.events = [
                { time: `${oversFloat} Ov`, player: "Batter", type: scoredRuns === 6 ? "Six" : "Four", detail: "Stunning hit!" },
                ...updatedMatch.events
              ];
            }
          }

          // advance overs
          let oversWhole = Math.floor(oversFloat);
          let oversBalls = Math.round((oversFloat - oversWhole) * 10);
          oversBalls += 1;
          if (oversBalls >= 6) {
            oversWhole += 1;
            oversBalls = 0;
          }
          const nextOversStr = `${oversWhole}.${oversBalls}`;
          
          updatedMatch.homeScore = `${runs}/${wickets}`;
          updatedMatch.time = `${nextOversStr} Overs`;

          if (oversWhole >= 20) {
            updatedMatch.status = 'FINISHED';
            updatedMatch.time = 'Match Finished';
          }

          if (updatedMatch.stats.overs && updatedMatch.stats.runs && updatedMatch.stats.wickets) {
            updatedMatch.stats.overs[0] = nextOversStr;
            updatedMatch.stats.runs[0] = runs;
            updatedMatch.stats.wickets[0] = wickets;
          }
          break;
        }
        case 'basketball': {
          const isHome = Math.random() > 0.5;
          const homeScoreVal = typeof updatedMatch.homeScore === 'number' ? updatedMatch.homeScore : 0;
          const awayScoreVal = typeof updatedMatch.awayScore === 'number' ? updatedMatch.awayScore : 0;
          const points = Math.random() > 0.6 ? 3 : 2;

          if (isHome) {
            updatedMatch.homeScore = homeScoreVal + points;
            updatedMatch.events = [
              { time: "Q4", player: "LA Star", type: points === 3 ? "3-Pointer" : "Layup", detail: `Excellent score for +${points}` },
              ...updatedMatch.events
            ];
          } else {
            updatedMatch.awayScore = awayScoreVal + points;
            updatedMatch.events = [
              { time: "Q4", player: "Boston Star", type: points === 3 ? "3-Pointer" : "Jumper", detail: `Quick response for +${points}` },
              ...updatedMatch.events
            ];
          }

          // slightly update rebounds/assists
          if (updatedMatch.stats.assists) {
            const index = isHome ? 0 : 1;
            updatedMatch.stats.assists[index] += Math.random() > 0.5 ? 1 : 0;
          }
          break;
        }
        case 'tennis': {
          // Tennis score update
          // Simulated by set notation
          const scoreStr = String(updatedMatch.homeScore); // "2 | 6 | 4"
          const awayStr = String(updatedMatch.awayScore); // "1 | 3 | 5"
          
          let homeSets = scoreStr.split('|').map(s => parseInt(s.trim()));
          let awaySets = awayStr.split('|').map(s => parseInt(s.trim()));

          const homeGames = homeSets[2];
          const awayGames = awaySets[2];

          const isHome = Math.random() > 0.5;
          if (isHome) {
            let nextG = homeGames + 1;
            if (nextG >= 6 && nextG - awayGames >= 2) {
              homeSets[2] = nextG;
              // set won, start next or finished
              updatedMatch.status = 'FINISHED';
              updatedMatch.time = 'Match Won by ESP';
            } else {
              homeSets[2] = nextG;
            }
          } else {
            let nextG = awayGames + 1;
            if (nextG >= 6 && nextG - homeGames >= 2) {
              awaySets[2] = nextG;
              updatedMatch.status = 'FINISHED';
              updatedMatch.time = 'Match Won by SRB';
            } else {
              awaySets[2] = nextG;
            }
          }

          updatedMatch.homeScore = homeSets.join(' | ');
          updatedMatch.awayScore = awaySets.join(' | ');
          
          if (updatedMatch.status !== 'FINISHED') {
            updatedMatch.time = `Set 3 - Game ${homeSets[2]}-${awaySets[2]}`;
          }

          if (updatedMatch.stats.aces) {
            updatedMatch.stats.aces[isHome ? 0 : 1] += Math.random() > 0.8 ? 1 : 0;
          }
          break;
        }
      }

      return updatedMatch;
    }

    return match;
  });
}
