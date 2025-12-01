export type TransportEvent =
  | { type: 'roll'; payload: { playerId: number; value: number } }
  | { type: 'quiz-success'; payload: { playerId: number; snakeStart: number } }
  | { type: 'quiz-failure'; payload: { playerId: number; snakeStart: number } }
  | { type: 'victory'; payload: { playerId: number; turns: number } };

export type TransportHandler = (event: TransportEvent) => void;

export interface GameTransport {
  publish: (event: TransportEvent) => void;
  subscribe: (handler: TransportHandler) => () => void;
  history: TransportEvent[];
  clear: () => void;
}

class LocalEchoTransport implements GameTransport {
  history: TransportEvent[] = [];
  #listeners = new Set<TransportHandler>();

  publish(event: TransportEvent) {
    this.history.push(event);
    this.#listeners.forEach((listener) => listener(event));
  }

  subscribe(handler: TransportHandler) {
    this.#listeners.add(handler);
    return () => this.#listeners.delete(handler);
  }

  clear() {
    this.history = [];
  }
}

export const gameTransport: GameTransport = new LocalEchoTransport();
