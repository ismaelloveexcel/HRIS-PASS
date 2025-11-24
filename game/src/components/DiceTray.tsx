interface DiceTrayProps {
  value: number | null;
  isRolling: boolean;
  disabled?: boolean;
  currentPlayerName?: string;
  onRoll: () => void;
}

export const DiceTray = ({ value, isRolling, disabled, currentPlayerName, onRoll }: DiceTrayProps) => (
  <div className="dice-tray">
    <p className="dice-label">
      {currentPlayerName ? `${currentPlayerName}'s roll` : 'Roll the die'}
    </p>
    <div className={['dice', isRolling ? 'dice-rolling' : ''].join(' ').trim()}>
      {value ?? '—'}
    </div>
    <button className="roll-button" onClick={onRoll} disabled={disabled || isRolling}>
      {isRolling ? 'Rolling…' : 'Roll Dice'}
    </button>
  </div>
);
