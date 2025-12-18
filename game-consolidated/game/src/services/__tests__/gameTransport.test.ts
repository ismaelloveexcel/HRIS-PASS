import { describe, expect, it, vi } from 'vitest';
import { gameTransport, type TransportEvent } from '../gameTransport';

describe('gameTransport', () => {
  it('broadcasts events to subscribers', () => {
    const spy = vi.fn();
    const unsubscribe = gameTransport.subscribe(spy);
    const event: TransportEvent = { type: 'roll', payload: { playerId: 1, value: 6 } };

    gameTransport.publish(event);
    expect(spy).toHaveBeenCalledWith(event);
    unsubscribe();
    gameTransport.clear();
  });
});
