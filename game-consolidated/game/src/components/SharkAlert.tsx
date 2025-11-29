import type { SharkAlert as SharkAlertType } from '../types';

interface SharkAlertProps {
  alert: SharkAlertType | null;
}

const severityCopy: Record<SharkAlertType['severity'], string> = {
  low: 'glides nearby',
  medium: 'breaches angrily',
  high: 'erupts from the depths',
};

export const SharkAlert = ({ alert }: SharkAlertProps) =>
  alert ? (
    <div className="shark-alert" aria-live="assertive">
      <span role="img" aria-label="shark">
        🦈
      </span>
      <p>
        Megashark {severityCopy[alert.severity]} as {alert.playerName} plunges!
      </p>
    </div>
  ) : null;
