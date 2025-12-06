import { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';

import { furnitureCatalog } from '../../data/furniture';
import { useGameStore, getFurnitureById } from '../../state/useGameStore';
import type { HouseItemInstance, RoomKey } from '../../state/types';

const roomOptions: { id: RoomKey; label: string }[] = [
  { id: 'living-room', label: 'Living Room' },
  { id: 'cinema', label: 'Cinema Corner' },
  { id: 'game-den', label: 'Arcade Nook' },
  { id: 'bedroom', label: 'Dream Bedroom' },
];

const wallPalette = ['#fef3eb', '#fde68a', '#dbeafe', '#0f172a', '#fbcfe8', '#fef08a'];
const floorPalette = ['#ffe4d6', '#d9f99d', '#e0e7ff', '#1d2145', '#f5d0fe', '#bbf7d0'];
const roofPalette = ['#7dd3fc', '#34d399', '#f472b6', '#f97316', '#fde047'];
const tintPalette = ['#ffb7c5', '#9bb9ff', '#ffd166', '#8ce0d4', '#7c3aed', '#f97316', '#34d399', '#fef3c7'];

interface DragState {
  id: string;
  offsetX: number;
  offsetY: number;
}

const HouseView = () => {
  const [editing, setEditing] = useState(true);
  const {
    selectedRoom,
    setSelectedRoom,
    roomThemes,
    roofColor,
    setRoofColor,
    setRoomColor,
    houseItems,
    unlockedFurniture,
    addHouseItem,
    selectedItemId,
    setSelectedItem,
    updateHouseItem,
    removeHouseItem,
  } = useGameStore((state) => ({
    selectedRoom: state.selectedRoom,
    setSelectedRoom: state.setSelectedRoom,
    roomThemes: state.roomThemes,
    roofColor: state.roofColor,
    setRoofColor: state.setRoofColor,
    setRoomColor: state.setRoomColor,
    houseItems: state.houseItems,
    unlockedFurniture: state.unlockedFurniture,
    addHouseItem: state.addHouseItem,
    selectedItemId: state.selectedItemId,
    setSelectedItem: state.setSelectedItem,
    updateHouseItem: state.updateHouseItem,
    removeHouseItem: state.removeHouseItem,
  }));

  const selectedItem = houseItems.find((item) => item.id === selectedItemId);
  const availableFurniture = useMemo(() => {
    const unlockedSet = new Set(unlockedFurniture);
    return furnitureCatalog
      .filter((item) => item.roomAffinity.includes(selectedRoom))
      .map((item) => ({ item, locked: !unlockedSet.has(item.id) }));
  }, [selectedRoom, unlockedFurniture]);

  return (
    <div className="panel">
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Personal house</p>
          <h2>House Atelier</h2>
          <p className="panel-subtitle">Drag, recolor, and remix every room to match your shared rituals.</p>
        </div>
        <button type="button" onClick={() => setEditing((prev) => !prev)}>
          {editing ? 'Preview mode' : 'Edit house'}
        </button>
      </div>
      <div className="split-panel house">
        <div className="canvas-wrapper">
          <RoomTabs selected={selectedRoom} onSelect={setSelectedRoom} />
          <RoomCanvas
            theme={roomThemes[selectedRoom]}
            roofColor={roofColor}
            editing={editing}
            items={houseItems.filter((item) => item.room === selectedRoom)}
            selectedItemId={selectedItemId}
            onSelect={setSelectedItem}
            onMove={(id, coords) => updateHouseItem(id, coords)}
          />
        </div>
        <div className="control-stack">
          {editing ? (
            <>
              <ColorControls
                label="Walls"
                palette={wallPalette}
                value={roomThemes[selectedRoom].walls}
                onChange={(color) => setRoomColor(selectedRoom, 'walls', color)}
              />
              <ColorControls
                label="Floor"
                palette={floorPalette}
                value={roomThemes[selectedRoom].floor}
                onChange={(color) => setRoomColor(selectedRoom, 'floor', color)}
              />
              <ColorControls label="Roof" palette={roofPalette} value={roofColor} onChange={setRoofColor} />
              <div>
                <p style={{ fontWeight: 600 }}>Furniture catalog</p>
                <div className="catalog-grid scroll-area">
                  {availableFurniture.map(({ item, locked }) => (
                    <div key={item.id} className={classNames('catalog-card', { locked })}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                        style={{ color: item.defaultTint }}
                      />
                      <strong>{item.label}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.description}</p>
                      <button
                        type="button"
                        disabled={locked}
                        onClick={() => addHouseItem(item.id, selectedRoom)}
                      >
                        {locked ? 'Unlock via quests' : 'Add to room'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <p style={{ color: 'var(--text-muted)' }}>
                Preview mode hides editing chrome so you can walk your nephew through the latest changes.
              </p>
            </div>
          )}
        </div>
      </div>
      {editing && selectedItem && (
        <SelectedItemPanel
          item={selectedItem}
          onTint={(color) => updateHouseItem(selectedItem.id, { tint: color })}
          onRotate={(rotation) => updateHouseItem(selectedItem.id, { rotation })}
          onScale={(scale) => updateHouseItem(selectedItem.id, { scale })}
          onRemove={() => removeHouseItem(selectedItem.id)}
        />
      )}
    </div>
  );
};

const RoomTabs = ({ selected, onSelect }: { selected: RoomKey; onSelect: (room: RoomKey) => void }) => (
  <div className="control-row" style={{ gap: 8, flexWrap: 'wrap' }}>
    {roomOptions.map((room) => (
      <button
        type="button"
        key={room.id}
        className={classNames('tab-button', { active: selected === room.id })}
        onClick={() => onSelect(room.id)}
      >
        {room.label}
      </button>
    ))}
  </div>
);

interface RoomCanvasProps {
  theme: { walls: string; floor: string };
  roofColor: string;
  editing: boolean;
  items: HouseItemInstance[];
  selectedItemId: string | null;
  onSelect: (id: string | null) => void;
  onMove: (id: string, coords: Partial<Pick<HouseItemInstance, 'x' | 'y'>>) => void;
}

const RoomCanvas = ({ theme, roofColor, editing, items, selectedItemId, onSelect, onMove }: RoomCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragState = useRef<DragState | null>(null);

  const startDrag = (id: string, event: React.PointerEvent<HTMLDivElement>) => {
    if (!editing) return;
    event.stopPropagation();
    onSelect(id);
    const target = items.find((item) => item.id === id);
    if (!target || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percentX = ((event.clientX - rect.left) / rect.width) * 100;
    const percentY = ((event.clientY - rect.top) / rect.height) * 100;
    dragState.current = {
      id,
      offsetX: percentX - target.x,
      offsetY: percentY - target.y,
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  };

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const percentX = ((event.clientX - rect.left) / rect.width) * 100;
    const percentY = ((event.clientY - rect.top) / rect.height) * 100;
    const newX = Math.max(0, Math.min(100, percentX - dragState.current.offsetX));
    const newY = Math.max(0, Math.min(100, percentY - dragState.current.offsetY));
    onMove(dragState.current.id, { x: newX, y: newY });
  };

  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current && (event.target as HTMLElement).hasPointerCapture(event.pointerId)) {
      (event.target as HTMLElement).releasePointerCapture(event.pointerId);
    }
    dragState.current = null;
  };

  return (
    <div className="room-canvas" style={{ background: theme.walls }} ref={containerRef}>
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: '12%',
          right: '12%',
          height: 40,
          borderRadius: 999,
          background: roofColor,
          opacity: 0.5,
        }}
      />
      <div
        className="room-floor"
        style={{ background: theme.floor }}
      />
      {items.map((item) => {
        const catalog = getFurnitureById(item.catalogId);
        if (!catalog) return null;
        return (
          <div
            key={item.id}
            className={classNames('furniture-item', { selected: selectedItemId === item.id })}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${catalog.footprint[0]}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation}deg) scale(${item.scale})`,
              color: item.tint,
            }}
            dangerouslySetInnerHTML={{ __html: catalog.svg }}
            onPointerDown={(event) => startDrag(item.id, event)}
            onPointerMove={handleMove}
            onPointerUp={stopDrag}
          />
        );
      })}
      {!items.length && (
        <p style={{ position: 'absolute', bottom: 24, left: 24, color: 'var(--text-muted)' }}>
          Tip: add a piece from the catalog to start shaping this room.
        </p>
      )}
    </div>
  );
};

const SelectedItemPanel = ({
  item,
  onTint,
  onRotate,
  onScale,
  onRemove,
}: {
  item: HouseItemInstance;
  onTint: (color: string) => void;
  onRotate: (value: number) => void;
  onScale: (value: number) => void;
  onRemove: () => void;
}) => {
  const catalog = getFurnitureById(item.catalogId);
  return (
    <div className="panel" style={{ marginTop: 12 }}>
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Selected item</p>
          <strong>{catalog?.label}</strong>
        </div>
        <button className="secondary" type="button" onClick={onRemove}>
          Remove
        </button>
      </div>
      <div className="control-row">
        <label>Tint</label>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tintPalette.map((color) => (
            <button
              type="button"
              key={color}
              className="color-dot"
              style={{ background: color, borderColor: item.tint === color ? '#2f6bff' : undefined }}
              onClick={() => onTint(color)}
            />
          ))}
        </div>
      </div>
      <div className="control-row">
        <label>Rotation</label>
        <input
          type="range"
          min={-35}
          max={35}
          value={item.rotation}
          onChange={(event) => onRotate(Number(event.target.value))}
        />
      </div>
      <div className="control-row">
        <label>Scale</label>
        <input
          type="range"
          min={0.6}
          max={1.4}
          step={0.05}
          value={item.scale}
          onChange={(event) => onScale(Number(event.target.value))}
        />
      </div>
    </div>
  );
};

const ColorControls = ({
  label,
  palette,
  value,
  onChange,
}: {
  label: string;
  palette: string[];
  value: string;
  onChange: (color: string) => void;
}) => (
  <div>
    <p style={{ fontWeight: 600, marginBottom: 8 }}>{label}</p>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      {palette.map((color) => (
        <button
          type="button"
          key={color}
          className="color-dot"
          style={{
            background: color,
            borderColor: value === color ? '#2f6bff' : undefined,
            boxShadow: value === color ? '0 0 0 4px rgba(47,107,255,0.15)' : undefined,
          }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  </div>
);

export default HouseView;
