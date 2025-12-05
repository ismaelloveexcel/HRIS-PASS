import { useEffect, useMemo, useState } from 'react';

import './App.css';

import AchievementPanel from './components/achievements/AchievementPanel';
import ForgeLab from './components/forge/ForgeLab';
import GardenView from './components/garden/GardenView';
import HouseView from './components/house/HouseView';
import MemoryAlbum from './components/memory/MemoryAlbum';
import MoodBoard from './components/mood/MoodBoard';
import PetHabitat from './components/pet/PetHabitat';
import { useGameStore, getMoodById } from './state/useGameStore';

const sections = [
  { id: 'house', label: 'House' },
  { id: 'garden', label: 'Garden' },
  { id: 'forge', label: 'Forge' },
  { id: 'pet', label: 'Pet' },
  { id: 'memories', label: 'Memories' },
];

function App() {
  const [activeSection, setActiveSection] = useState('house');

  const {
    stats,
    gardenTiles,
    unlockedElements,
    visitWorld,
    activeMoodId,
  } = useGameStore((state) => ({
    stats: state.stats,
    gardenTiles: state.gardenTiles,
    unlockedElements: state.unlockedElements,
    visitWorld: state.visitWorld,
    activeMoodId: state.activeMoodId,
  }));

  useEffect(() => {
    visitWorld();
  }, [visitWorld]);

  const filledTiles = useMemo(() => gardenTiles.filter((tile) => tile.contentId).length, [gardenTiles]);
  const mood = getMoodById(activeMoodId);

  const renderSection = () => {
    switch (activeSection) {
      case 'garden':
        return (
          <>
            <GardenView />
            <PetHabitat />
          </>
        );
      case 'forge':
        return (
          <>
            <ForgeLab />
            <MemoryAlbum />
          </>
        );
      case 'pet':
        return <PetHabitat />;
      case 'memories':
        return (
          <>
            <AchievementPanel />
            <MemoryAlbum />
          </>
        );
      case 'house':
      default:
        return (
          <>
            <HouseView />
            <div className="section-grid">
              <MoodBoard />
              <AchievementPanel />
            </div>
          </>
        );
    }
  };

  return (
    <div className="app-shell" style={{ background: mood?.gradient ?? 'var(--gradient-sky)' }}>
      <div className="app-frame">
        <div className="hero-panel">
          <div>
            <p className="badge">Personal House & Garden</p>
            <h1>Build a cozy shared universe</h1>
            <p>
              Every login becomes a ritual: redecorate the living room, plant new flowers, forge
              silly inventions, and care for the glowing pet. Everything saves—so memories pile up.
            </p>
            <div className="hero-actions">
              <button type="button" onClick={() => setActiveSection('house')}>
                Jump to house
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setActiveSection('forge')}
              >
                Visit forge
              </button>
            </div>
          </div>
          <div className="split-panel" style={{ minWidth: 260 }}>
            <div className="stat-card">
              <span>Garden tiles alive</span>
              <span className="stat-value">{filledTiles}</span>
            </div>
            <div className="stat-card">
              <span>Forge discoveries</span>
              <span className="stat-value">{stats.forgeCombos}</span>
            </div>
            <div className="stat-card">
              <span>Elements ready</span>
              <span className="stat-value">{unlockedElements.length}</span>
            </div>
          </div>
        </div>
        <div className="tab-bar">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className={`tab-button ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
        {renderSection()}
      </div>
    </div>
  );
}

export default App;
