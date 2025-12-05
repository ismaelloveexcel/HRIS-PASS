import { useState } from 'react';

import { useGameStore } from '../../state/useGameStore';

const stickers = ['⭐️', '🦋', '🎬', '🌿', '🧸', '🎨'];

const PhotoStudio = () => {
  const { capturePhoto, photos } = useGameStore((state) => ({
    capturePhoto: state.capturePhoto,
    photos: state.photos,
  }));
  const [caption, setCaption] = useState('');
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);

  const toggleSticker = (emoji: string) => {
    setSelectedStickers((current) =>
      current.includes(emoji) ? current.filter((item) => item !== emoji) : [...current, emoji],
    );
  };

  const handleCapture = () => {
    if (!caption.trim() && !selectedStickers.length) return;
    capturePhoto({ caption, stickers: selectedStickers, dataUrl: null });
    setCaption('');
    setSelectedStickers([]);
  };

  return (
    <div className="panel">
      <p className="badge">Photo mode</p>
      <h2>Cozy Photo Studio</h2>
      <p className="panel-subtitle">Frame the moment, drop stickers, and send it to the album.</p>
      <div className="photo-frame">
        <div className="photo-preview">
          <p>{caption || 'Caption your shot...'}</p>
          <div>
            {selectedStickers.map((sticker) => (
              <span key={sticker}>{sticker}</span>
            ))}
          </div>
        </div>
      </div>
      <textarea
        rows={2}
        value={caption}
        placeholder="Add a caption (e.g., Campfire giggles)."
        onChange={(event) => setCaption(event.target.value)}
      />
      <div className="control-row" style={{ flexWrap: 'wrap' }}>
        {stickers.map((sticker) => (
          <button
            type="button"
            key={sticker}
            className={`sticker-chip ${selectedStickers.includes(sticker) ? 'active' : ''}`}
            onClick={() => toggleSticker(sticker)}
          >
            {sticker}
          </button>
        ))}
      </div>
      <button type="button" onClick={handleCapture}>
        Capture memory
      </button>
      <small style={{ color: 'var(--text-muted)' }}>Snapshots auto-pin to the Memory Album.</small>
      <div className="photo-strip">
        {photos.slice(-4).map((photo) => (
          <div key={photo.id} className="photo-thumb">
            <p>{photo.caption || 'Untitled'}</p>
            <span>{photo.stickers.join(' ')}</span>
          </div>
        ))}
        {!photos.length && <p style={{ color: 'var(--text-muted)' }}>No photos yet.</p>}
      </div>
    </div>
  );
};

export default PhotoStudio;
