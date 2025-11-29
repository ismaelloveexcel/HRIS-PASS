import type { TimeOfDay } from '../types';

interface SkyboxProps {
  timeOfDay: TimeOfDay;
}

export const Skybox = ({ timeOfDay }: SkyboxProps) => (
  <div className={['skybox', `sky-${timeOfDay}`].join(' ')} aria-hidden />
);
