import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseShakeToRollArgs {
  onShake: () => void;
  canShake: boolean;
}

interface UseShakeToRollResponse {
  hintActive: boolean;
  needsPermission: boolean;
  requestPermission: () => Promise<boolean>;
  isMobileReady: boolean;
}

const SHAKE_THRESHOLD = 17;
const SHAKE_COOLDOWN_MS = 1200;

type DeviceMotionConstructor = (typeof DeviceMotionEvent) & {
  requestPermission?: () => Promise<PermissionState>;
};

const detectMobile = () => {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') return false;
  return /Mobi|Android/i.test(navigator.userAgent) || window.matchMedia('(max-width: 768px)').matches;
};

const getDeviceMotionCtor = (): DeviceMotionConstructor | undefined =>
  typeof window === 'undefined'
    ? undefined
    : ((window as typeof window & { DeviceMotionEvent?: DeviceMotionConstructor }).DeviceMotionEvent ?? undefined);

export const useShakeToRoll = ({ onShake, canShake }: UseShakeToRollArgs): UseShakeToRollResponse => {
  const [permission, setPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [supported, setSupported] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastShakeRef = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const DeviceMotionCtor = getDeviceMotionCtor();
    setSupported(Boolean(DeviceMotionCtor));
    setIsMobile(detectMobile());
    if (DeviceMotionCtor && typeof DeviceMotionCtor.requestPermission !== 'function') {
      setPermission('granted');
    }
  }, []);

  const requestPermission = useCallback(async () => {
    const DeviceMotionCtor = getDeviceMotionCtor();
    if (!DeviceMotionCtor) {
      setPermission('denied');
      return false;
    }
    const maybeRequest = DeviceMotionCtor.requestPermission;
    if (typeof maybeRequest === 'function') {
      try {
        const status = await maybeRequest();
        const normalized = status === 'granted' ? 'granted' : status === 'denied' ? 'denied' : 'unknown';
        setPermission(normalized);
        return status === 'granted';
      } catch {
        setPermission('denied');
        return false;
      }
    }
    setPermission('granted');
    return true;
  }, []);

  useEffect(() => {
    if (!supported || permission !== 'granted' || !canShake || typeof window === 'undefined') return;
    const handleMotion = (event: DeviceMotionEvent) => {
      const accel = event.accelerationIncludingGravity;
      if (!accel) return;
      const x = accel.x ?? 0;
      const y = accel.y ?? 0;
      const z = accel.z ?? 0;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();
      if (magnitude > SHAKE_THRESHOLD && now - lastShakeRef.current > SHAKE_COOLDOWN_MS) {
        lastShakeRef.current = now;
        onShake();
      }
    };
    window.addEventListener('devicemotion', handleMotion);
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [supported, permission, canShake, onShake]);

  const response = useMemo<UseShakeToRollResponse>(
    () => ({
      hintActive: Boolean(isMobile && supported && permission === 'granted' && canShake),
      needsPermission: Boolean(isMobile && supported && permission !== 'granted'),
      requestPermission,
      isMobileReady: Boolean(isMobile && supported),
    }),
    [canShake, isMobile, permission, requestPermission, supported],
  );

  return response;
};
