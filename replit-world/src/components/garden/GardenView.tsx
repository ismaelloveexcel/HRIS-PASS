import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { gardenCatalog } from '../../data/garden';
import { useGameStore, getGardenItemById } from '../../state/useGameStore';
import type { GardenTile } from '../../state/types';

const categories: { id: 'plant' | 'decor' | 'habitat'; label: string }[] = [
  { id: 'plant', label: 'Plants' },
  { id: 'decor', label: 'Decor' },
  { id: 'habitat', label: 'Habitats' },
];

const GardenView = () => {
  const [editing, setEditing] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]['id']>('plant');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { gardenTiles, unlockedGarden, setGardenTile, registerGardenCare } = useGameStore((state) => ({
    gardenTiles: state.gardenTiles,
    unlockedGarden: state.unlockedGarden,
    setGardenTile: state.setGardenTile,
    registerGardenCare: state.registerGardenCare,
  }));

  const unlockedSet = useMemo(() => new Set(unlockedGarden), [unlockedGarden]);

  const palette = useMemo(
    () =>
      gardenCatalog.filter((entry) => entry.category === selectedCategory).map((entry) => ({
        entry,
        locked: !unlockedSet.has(entry.id),
      })),
    [selectedCategory, unlockedSet],
  );

  const handleTileClick = (tile: GardenTile) => {
    if (!editing) return;
    if (!selectedItemId) {
      setGardenTile(tile.slot, null, 'empty');
      return;
    }
    const catalog = getGardenItemById(selectedItemId);
    if (!catalog) return;
    setGardenTile(tile.slot, catalog.id, catalog.category);
    if (catalog.category === 'plant') {
      registerGardenCare('plant');
    }
    if (catalog.category === 'habitat') {
      registerGardenCare('feed');
    }
  };

  const handleCareAction = (type: 'water' | 'feed') => {
    registerGardenCare(type === 'water' ? 'plant' : 'feed');
  };

  return (
    <div className="panel">
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Garden & pet habitat</p>
          <h2>Garden Steward</h2>
          <p className="panel-subtitle">Lay out paths, nurture trees, and invite animals into the ecosystem.</p>
        </div>
        <button type="button" onClick={() => setEditing((prev) => !prev)}>
          {editing ? 'Preview garden' : 'Edit garden'}
        </button>
      </div>
      <div className="split-panel garden">
        <div>
          <div className="garden-grid">
            {gardenTiles.map((tile) => {
              const content = tile.contentId ? getGardenItemById(tile.contentId) : null;
              return (
                <div key={tile.slot} className="garden-tile" onClick={() => handleTileClick(tile)}>
                  {content ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: content.svg }}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <span className="tile-label">Tap to place</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="control-row" style={{ marginTop: 16, gap: 8 }}>
            <button type="button" onClick={() => handleCareAction('water')}>
              Water shared trees
            </button>
            <button type="button" onClick={() => handleCareAction('feed')}>
              Feed habitat pals
            </button>
          </div>
        </div>
        <div className="control-stack">
          <div className="control-row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                className={classNames('tab-button', { active: selectedCategory === category.id })}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSelectedItemId(null);
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="catalog-grid scroll-area">
            {palette.map(({ entry, locked }) => (
              <div
                key={entry.id}
                className={classNames('catalog-card', {
                  locked,
                  selected: selectedItemId === entry.id,
                })}
              >
                <div dangerouslySetInnerHTML={{ __html: entry.svg }} />
                <strong>{entry.label}</strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{entry.description}</p>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => setSelectedItemId(entry.id)}
                >
                  {locked ? 'Unlock via quests' : selectedItemId === entry.id ? 'Selected' : 'Use' }
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenView;
