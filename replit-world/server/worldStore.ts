import { randomUUID } from 'node:crypto';
import { constants } from 'node:fs';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { createDefaultWorldState } from '../src/state/defaultWorld';
import type { WorldSnapshot } from '../src/state/types';

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const DATA_FILE = path.join(DATA_DIR, 'worlds.json');

interface SessionInfo {
  token: string;
  playerName: string;
  lastSeen: number;
}

export interface WorldRecord {
  code: string;
  state: WorldSnapshot;
  sessions: Record<string, SessionInfo>;
  createdAt: number;
  updatedAt: number;
}

export class WorldStore {
  private worlds: Record<string, WorldRecord> = {};

  async init() {
    await mkdir(DATA_DIR, { recursive: true });
    try {
      await access(DATA_FILE, constants.F_OK);
      const raw = await readFile(DATA_FILE, 'utf-8');
      this.worlds = raw ? (JSON.parse(raw) as Record<string, WorldRecord>) : {};
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        console.error('Failed to load world store', error);
      }
      this.worlds = {};
      await this.persist();
    }
  }

  private async persist() {
    await writeFile(DATA_FILE, JSON.stringify(this.worlds, null, 2), 'utf-8');
  }

  private normalizeCode(code: string) {
    return code.trim().toUpperCase();
  }

  private ensureWorld(code: string): WorldRecord {
    const normalized = this.normalizeCode(code);
    const existing = this.worlds[normalized];
    if (existing) return existing;
    const state = createDefaultWorldState();
    const record: WorldRecord = {
      code: normalized,
      state,
      sessions: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.worlds[normalized] = record;
    return record;
  }

  async joinWorld(code: string, playerName: string) {
    const record = this.ensureWorld(code);
    const token = randomUUID();
    record.sessions[token] = {
      token,
      playerName,
      lastSeen: Date.now(),
    };
    await this.persist();
    return { world: record.state, token };
  }

  async getWorld(code: string) {
    const normalized = this.normalizeCode(code);
    return this.worlds[normalized]?.state ?? null;
  }

  async updateWorld(code: string, token: string, nextState: WorldSnapshot) {
    const normalized = this.normalizeCode(code);
    const record = this.worlds[normalized];
    if (!record) throw new Error('World not found');
    if (!record.sessions[token]) throw new Error('Invalid session');
    record.state = nextState;
    record.updatedAt = Date.now();
    record.sessions[token].lastSeen = record.updatedAt;
    await this.persist();
    return record.state;
  }

  validateSession(code: string, token: string): boolean {
    const normalized = this.normalizeCode(code);
    const record = this.worlds[normalized];
    if (!record) return false;
    return Boolean(record.sessions[token]);
  }
}
