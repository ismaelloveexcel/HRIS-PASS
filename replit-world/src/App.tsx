import { useEffect, useMemo, useState } from 'react';

import './App.css';

import AchievementPanel from './components/achievements/AchievementPanel';
import ArcadeCabinet from './components/arcade/ArcadeCabinet';
import ForgeLab from './components/forge/ForgeLab';
import GardenView from './components/garden/GardenView';
import HouseView from './components/house/HouseView';
import MemoryAlbum from './components/memory/MemoryAlbum';
import MoodBoard from './components/mood/MoodBoard';
import PetHabitat from './components/pet/PetHabitat';
import PhotoStudio from './components/photo/PhotoStudio';
import CinemaLounge from './components/cinema/CinemaLounge';
import SeasonalEventsPanel from './components/season/SeasonalEventsPanel';
import StoryPropsPanel from './components/story/StoryPropsPanel';
import WeatherBar from './components/weather/WeatherBar';
import ParticleField from './components/shared/ParticleField';
import WorldGate from './components/shared/WorldGate';
import { useWorldSync } from './hooks/useWorldSync';
import { fetchWorld } from './api/worldClient';
import { loadSession, clearSession } from './utils/session';
import type { WorldSession } from './state/types';
import { useGameStore, getMoodById } from './state/useGameStore';

const sections = [
  { id: 'house', label: 'House' },
  { id: 'garden', label: 'Garden' },
  { id: 'forge', label: 'Forge' },
  { id: 'pet', label: 'Pet' },
  { id: 'memories', label: 'Memories' },
  { id: 'cinema', label: 'Cinema' },
];

function App() {
  const [activeSection, setActiveSection] = useState('house');
  const [session, setSession] = useState<WorldSession | null>(() => loadSession());
  const [loadingWorld, setLoadingWorld] = useState(Boolean(session));
  const [syncError, setSyncError] = useState<string | null>(null);

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

  useWorldSync(session);

  useEffect(() => {
    if (!session) return;
    let cancelled = false;
    setLoadingWorld(true);
    fetchWorld(session.worldCode)
      .then((snapshot) => {
        if (cancelled) return;
        useGameStore.getState().loadWorldSnapshot(snapshot);
        setLoadingWorld(false);
        setSyncError(null);
      })
      .catch((error) => {
        console.error('Failed to load shared world', error);
        if (cancelled) return;
        setLoadingWorld(false);
        setSyncError('Unable to reach the shared world server. Continuing with local data.');
      });
    return () => {
      cancelled = true;
    };
  }, [session]);

  useEffect(() => {
    if (!session || loadingWorld) return;
    visitWorld();
  }, [visitWorld, session, loadingWorld]);

  const filledTiles = useMemo(() => gardenTiles.filter((tile) => tile.contentId).length, [gardenTiles]);
  const mood = getMoodById(activeMoodId);

  const renderSection = () => {
    switch (activeSection) {
      case 'garden':
        return (
          <>
            <GardenView />
            <div className="section-grid two-up">
              <PetHabitat />
              <SeasonalEventsPanel />
            </div>
          </>
        );
      case 'forge':
        return (
          <>
            <ForgeLab />
            <AchievementPanel />
          </>
        );
      case 'pet':
        return <PetHabitat />;
      case 'memories':
        return (
          <>
            <PhotoStudio />
            <MemoryAlbum />
          </>
        );
      case 'cinema':
        return <CinemaLounge />;
      case 'house':
      default:
        return (
          <>
            <WeatherBar />
            <HouseView />
            <div className="section-grid two-up">
              <MoodBoard />
              <StoryPropsPanel />
            </div>
            <ArcadeCabinet />
          </>
        );
    }
  };

  const handleSession = (newSession: WorldSession) => {
    setSession(newSession);
    setLoadingWorld(false);
  };

  const handleSwitchWorld = () => {
    clearSession();
    setSession(null);
  };

  if (!session) {
    return <WorldGate onSession={handleSession} />;
  }

  if (loadingWorld) {
    return (
      <div className="world-gate">
        <div className="panel" style={{ maxWidth: 420 }}>
          <p className="badge">Sync</p>
          <h2>Loading your shared world…</h2>
          <p className="panel-subtitle">Hang tight while we fetch the latest garden + house state.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell" style={{ background: mood?.gradient ?? 'var(--gradient-sky)' }}>
      <ParticleField />
      <div className="app-frame">
        <div className="hero-panel">
          <div>
            <p className="badge">Personal House & Garden</p>
            <h1>Build a cozy shared universe</h1>
            <p>
              Every login becomes a ritual: redecorate the living room, plant new flowers, forge
              silly inventions, and care for the glowing pet. Everything saves—so memories pile up.
            </p>
            {syncError && <p style={{ color: 'var(--danger)' }}>{syncError}</p>}
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
              <button type="button" className="secondary" onClick={handleSwitchWorld}>
                Switch world
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
            <div className="stat-card">
              <span>World code</span>
              <span className="stat-value">{session.worldCode}</span>
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
