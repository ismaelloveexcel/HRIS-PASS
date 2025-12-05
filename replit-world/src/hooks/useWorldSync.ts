import { useEffect, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';

import { SOCKET_URL } from '../config';
import { saveWorld } from '../api/worldClient';
import type { WorldSession, WorldSnapshot } from '../state/types';
import { useGameStore, pickWorldSnapshot } from '../state/useGameStore';

const SYNC_INTERVAL_MS = 1500;

export const useWorldSync = (session: WorldSession | null) => {
  const isApplyingRemote = useRef(false);
  const socketRef = useRef<Socket | null>(null);
  const flushTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingSnapshot = useRef<WorldSnapshot | null>(null);

  // Wire websocket connection
  useEffect(() => {
    if (!session) return;
    const socket = io(SOCKET_URL, { transports: ['websocket'] });
    socketRef.current = socket;

    const applySnapshot = (snapshot: WorldSnapshot) => {
      isApplyingRemote.current = true;
      useGameStore.getState().loadWorldSnapshot(snapshot);
      isApplyingRemote.current = false;
    };

    socket.emit('world:join', session);
    socket.on('world:state', applySnapshot);
    socket.on('world:update', applySnapshot);
    socket.on('world:error', (message: string) => console.warn(message));

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session]);

  // Push updates to backend + peers
  useEffect(() => {
    if (!session) return;

    const flush = async () => {
      if (!pendingSnapshot.current) return;
      const snapshot = pendingSnapshot.current;
      pendingSnapshot.current = null;
      flushTimeout.current = null;
      try {
        await saveWorld(session.worldCode, session.token, snapshot);
        socketRef.current?.emit('world:update', {
          worldCode: session.worldCode,
          token: session.token,
          world: snapshot,
        });
      } catch (error) {
        console.error('Failed to sync world', error);
      }
    };

    const unsubscribe = useGameStore.subscribe((state) => {
      if (isApplyingRemote.current) return;
      pendingSnapshot.current = pickWorldSnapshot(state);
      if (!flushTimeout.current) {
        flushTimeout.current = setTimeout(flush, SYNC_INTERVAL_MS);
      }
    });

    return () => {
      unsubscribe();
      if (flushTimeout.current) {
        clearTimeout(flushTimeout.current);
        flushTimeout.current = null;
      }
    };
  }, [session]);
};
