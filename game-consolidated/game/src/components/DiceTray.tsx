interface DiceTrayProps {
  value: number | null;
  isRolling: boolean;
  disabled?: boolean;
  currentPlayerName?: string;
  onRoll: () => void;
  shakeHintVisible?: boolean;
  shakeHintNeedsPermission?: boolean;
  onEnableShake?: () => void;
  canShake?: boolean;
}

export const DiceTray = ({
  value,
  isRolling,
  disabled,
  currentPlayerName,
  onRoll,
  shakeHintVisible,
  shakeHintNeedsPermission,
  onEnableShake,
  canShake,
}: DiceTrayProps) => (
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
    <div className="dice-meta">
      {shakeHintNeedsPermission && canShake ? (
        <button type="button" className="shake-enable" onClick={() => onEnableShake?.()}>
          Enable shake roll
        </button>
      ) : null}
      {shakeHintVisible ? <span className="shake-hint">Shake your phone to roll</span> : null}
    </div>
  </div>
);
