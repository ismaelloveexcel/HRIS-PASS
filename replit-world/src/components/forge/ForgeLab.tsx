import { useMemo, useState } from 'react';

import { elementRecipes } from '../../data/elements';
import { useGameStore, getElementById, getRecipeById } from '../../state/useGameStore';
import type { ElementDefinition } from '../../state/types';

const ForgeLab = () => {
  const [first, setFirst] = useState<string | null>(null);
  const [second, setSecond] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('Pick any two elements to experiment.');

  const { unlockedElements, combineElements, discoveredRecipes } = useGameStore((state) => ({
    unlockedElements: state.unlockedElements,
    combineElements: state.combineElements,
    discoveredRecipes: state.discoveredRecipes,
  }));

  const elementOptions = useMemo(
    () =>
      unlockedElements
        .map((id) => getElementById(id))
        .filter((element): element is ElementDefinition => Boolean(element)),
    [unlockedElements],
  );

  const progress = `${discoveredRecipes.length}/${elementRecipes.length} discoveries`;

  const handlePick = (id: string) => {
    if (!first || first === id) {
      setFirst(id);
      if (first === id) {
        setSecond(null);
      }
      return;
    }
    setSecond(id);
  };

  const handleCombine = () => {
    if (!first || !second) {
      setMessage('Choose two ingredients.');
      return;
    }
    const result = combineElements(first, second);
    setMessage(result.message);
    setSecond(null);
  };

  return (
    <div className="panel">
      <div className="control-row" style={{ justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Forge lab</p>
          <h2>Element Forge</h2>
          <p className="panel-subtitle">Blend discoveries to unlock lanterns, moods, and rare decor.</p>
        </div>
        <span className="badge">{progress}</span>
      </div>
      <div className="element-grid">
        {elementOptions.map((element) => (
          <button
            type="button"
            key={element.id}
            className={`element-card ${first === element.id || second === element.id ? 'selected' : ''}`}
            onClick={() => handlePick(element.id)}
          >
            <div dangerouslySetInnerHTML={{ __html: element.icon }} />
            <strong>{element.label}</strong>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{element.description}</p>
          </button>
        ))}
      </div>
      <div className="control-row" style={{ marginTop: 16, gap: 12 }}>
        <button type="button" onClick={handleCombine}>
          Combine {first && second ? `${first} + ${second}` : 'selection'}
        </button>
        <button type="button" className="secondary" onClick={() => { setFirst(null); setSecond(null); }}>
          Clear selection
        </button>
      </div>
      <p style={{ color: 'var(--text-muted)' }}>{message}</p>
      <div className="scroll-area" style={{ maxHeight: 220 }}>
        {discoveredRecipes.map((recipeId) => {
          const recipe = getRecipeById(recipeId);
          if (!recipe) return null;
          return (
            <div key={recipe.id} className="memory-entry">
              <strong>{recipe.result.label}</strong>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{recipe.lore}</p>
            </div>
          );
        })}
        {!discoveredRecipes.length && (
          <p style={{ color: 'var(--text-muted)' }}>No blueprints yet—start mixing!</p>
        )}
      </div>
    </div>
  );
};

export default ForgeLab;
