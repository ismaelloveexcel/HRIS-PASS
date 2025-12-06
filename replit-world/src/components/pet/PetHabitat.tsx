import { useEffect } from 'react';

import { petSkins } from '../../data/pet';
import { useGameStore, getPetSkinById } from '../../state/useGameStore';

const PetHabitat = () => {
  const { pet, careForPet, tickPet, unlockedPetSkins, equipPetSkin } = useGameStore((state) => ({
    pet: state.pet,
    careForPet: state.careForPet,
    tickPet: state.tickPet,
    unlockedPetSkins: state.unlockedPetSkins,
    equipPetSkin: state.equipPetSkin,
  }));

  useEffect(() => {
    const interval = setInterval(() => tickPet(), 8000);
    return () => clearInterval(interval);
  }, [tickPet]);

  const currentSkin = getPetSkinById(pet.skinId) ?? petSkins[0];

  const renderBar = (label: string, value: number, color: string) => (
    <div key={label} className="control-stack" style={{ gap: 6 }}>
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <span>{label}</span>
        <strong>{Math.round(value)}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );

  return (
    <div className="panel">
      <div>
        <p className="badge">Companion</p>
        <h2>{pet.name}'s Habitat</h2>
        <p className="panel-subtitle">Keep the Tamagotchi-style buddy fed, happy, and glowing.</p>
      </div>
      <div className="pet-card">
        <div className="pet-visual" dangerouslySetInnerHTML={{ __html: currentSkin.svg }} />
        <div className="control-stack">
          {renderBar('Hunger', pet.hunger, '#f97316')}
          {renderBar('Happiness', pet.happiness, '#f472b6')}
          {renderBar('Energy', pet.energy, '#38bdf8')}
          {renderBar('Cleanliness', pet.cleanliness, '#34d399')}
          <div className="pet-actions">
            <button type="button" onClick={() => careForPet('feed')}>
              Feed snack
            </button>
            <button type="button" onClick={() => careForPet('play')}>
              Play
            </button>
            <button type="button" onClick={() => careForPet('groom')}>
              Groom
            </button>
            <button type="button" onClick={() => careForPet('rest')}>
              Nap time
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="badge">Pet skins</p>
        <div className="catalog-grid">
          {petSkins.map((skin) => {
            const unlocked = unlockedPetSkins.includes(skin.id);
            return (
              <div
                key={skin.id}
                className={`catalog-card ${!unlocked ? 'locked' : ''}`}
              >
                <div dangerouslySetInnerHTML={{ __html: skin.svg }} />
                <strong>{skin.label}</strong>
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => equipPetSkin(skin.id)}
                >
                  {pet.skinId === skin.id ? 'Equipped' : unlocked ? 'Wear' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PetHabitat;
