import { useEffect, useRef } from 'react';
import type { TimeOfDay } from '../types';

const frequencyMap: Record<TimeOfDay, number> = {
  sunrise: 220,
  daylight: 320,
  golden: 260,
  neon: 180,
};

export const useSoundscape = (timeOfDay: TimeOfDay) => {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const AudioCtor =
      window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return;

    const ensureContext = (seedFrequency: number) => {
      if (!ctxRef.current) {
        ctxRef.current = new AudioCtor();
      }
      if (ctxRef.current.state === 'suspended') {
        void ctxRef.current.resume();
      }
      if (!gainRef.current) {
        gainRef.current = ctxRef.current.createGain();
        gainRef.current.gain.value = 0.0001;
        gainRef.current.connect(ctxRef.current.destination);
      }
      if (!oscRef.current) {
        oscRef.current = ctxRef.current.createOscillator();
        oscRef.current.type = 'sine';
        oscRef.current.frequency.value = seedFrequency;
        oscRef.current.connect(gainRef.current);
        oscRef.current.start();
      }
    };

    const handleUserIntent = () => {
      ensureContext(frequencyMap[timeOfDay]);
    };

    window.addEventListener('pointerdown', handleUserIntent, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handleUserIntent);
      oscRef.current?.stop();
      oscRef.current?.disconnect();
      gainRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ctxRef.current || !gainRef.current || !oscRef.current) return;
    const ctx = ctxRef.current;
    const gain = gainRef.current;
    const osc = oscRef.current;

    osc.frequency.linearRampToValueAtTime(frequencyMap[timeOfDay], ctx.currentTime + 0.4);
    gain.gain.linearRampToValueAtTime(0.0025, ctx.currentTime + 1.2);
  }, [timeOfDay]);
};
