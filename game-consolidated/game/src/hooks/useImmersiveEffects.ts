import { useEffect, useRef, type MutableRefObject } from 'react';
import type confetti from 'canvas-confetti';
import type { ImmersiveEvent } from '../types';

type ConfettiFn = typeof confetti;

type EventWithConfetti = Extract<ImmersiveEvent, { type: 'ladder' | 'quiz-correct' | 'victory' }>['type'];

const CONFETTI_COLORS: Record<EventWithConfetti, string[]> = {
  ladder: ['#6efff2', '#9dffdc', '#8fb4ff'],
  'quiz-correct': ['#ff7b9c', '#ffd36a', '#ffffff'],
  victory: ['#6efff2', '#ffc15e', '#ffffff', '#7d7bff'],
};

const HAPTIC_PATTERNS: Partial<Record<ImmersiveEvent['type'], number | number[]>> = {
  'dice-roll': [10, 40, 20],
  ladder: [12, 60, 18],
  'snake-bite': [40, 60, 40],
  victory: [30, 40, 30, 40, 80],
};

const withAudioContext = (ctxRef: MutableRefObject<AudioContext | null>, cb: (ctx: AudioContext) => void) => {
  if (typeof window === 'undefined') return;
  const AudioConstructor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioConstructor) return;
  if (!ctxRef.current) {
    ctxRef.current = new AudioConstructor();
  }
  if (ctxRef.current.state === 'suspended') {
    void ctxRef.current.resume();
  }
  cb(ctxRef.current);
};

const playDiceRattle = (ctx: AudioContext) => {
  const duration = 0.45;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 6;
  filter.frequency.value = 420;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.6, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
};

const playSnakeHiss = (ctx: AudioContext) => {
  const duration = 0.8;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 0.5 - 0.25) * (1 - i / data.length);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 1800;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.35, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + duration);
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start();
};

const playLadderWhoosh = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + 0.35);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.5);
};

const playQuizDing = (ctx: AudioContext) => {
  const playTone = (freq: number, offset = 0) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime + offset);
    gain.gain.exponentialRampToValueAtTime(0.4, ctx.currentTime + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + offset + 0.25);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + offset);
    osc.stop(ctx.currentTime + offset + 0.3);
  };
  playTone(960);
  playTone(1280, 0.08);
};

const playVictoryFanfare = (ctx: AudioContext) => {
  const freqs = [392, 523.25, 659.25];
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8 + idx * 0.05);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + idx * 0.05);
    osc.stop(ctx.currentTime + 0.9 + idx * 0.05);
  });
};

const launchConfetti = async (
  type: EventWithConfetti,
  confettiPromiseRef: MutableRefObject<Promise<ConfettiFn> | null>,
  confettiFnRef: MutableRefObject<ConfettiFn | null>,
) => {
  if (typeof window === 'undefined') return;
  if (!confettiPromiseRef.current) {
    confettiPromiseRef.current = import('canvas-confetti').then((module) => (module.default ?? module));
  }
  const confettiFn = (confettiFnRef.current ?? (await confettiPromiseRef.current)) as ConfettiFn;
  confettiFnRef.current = confettiFn;
  confettiFn({
    particleCount: type === 'victory' ? 200 : 110,
    spread: type === 'quiz-correct' ? 90 : 65,
    decay: 0.9,
    ticks: type === 'victory' ? 320 : 200,
    origin: { y: 0.6 },
    scalar: type === 'victory' ? 1.2 : 0.9,
    colors: CONFETTI_COLORS[type],
  });
};

const triggerHaptics = (type: ImmersiveEvent['type']) => {
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;
  const pattern = HAPTIC_PATTERNS[type];
  if (!pattern) return;
  navigator.vibrate(pattern);
};

const playSoundForEvent = (ctxRef: MutableRefObject<AudioContext | null>, event: ImmersiveEvent) => {
  switch (event.type) {
    case 'dice-roll':
      withAudioContext(ctxRef, playDiceRattle);
      break;
    case 'snake-warning':
      withAudioContext(ctxRef, playSnakeHiss);
      break;
    case 'ladder':
      withAudioContext(ctxRef, playLadderWhoosh);
      break;
    case 'quiz-correct':
      withAudioContext(ctxRef, playQuizDing);
      break;
    case 'victory':
      withAudioContext(ctxRef, playVictoryFanfare);
      break;
    case 'snake-bite':
      withAudioContext(ctxRef, playSnakeHiss);
      break;
    default:
      break;
  }
};

export const useImmersiveEffects = (event: ImmersiveEvent | null) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const confettiPromiseRef = useRef<Promise<ConfettiFn> | null>(null);
  const confettiFnRef = useRef<ConfettiFn | null>(null);

  useEffect(() => {
    if (!event) return;
    playSoundForEvent(audioCtxRef, event);
    triggerHaptics(event.type);
    if (event.type === 'ladder' || event.type === 'quiz-correct' || event.type === 'victory') {
      void launchConfetti(event.type, confettiPromiseRef, confettiFnRef);
    }
  }, [event]);
};
