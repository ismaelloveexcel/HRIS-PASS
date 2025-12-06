import express, { type Request, type Response } from 'express';
import cors from 'cors';
import http from 'node:http';
import { Server } from 'socket.io';
import { z } from 'zod';

import Hyperbeam from 'hyperbeam';

import { WorldStore } from './worldStore';
import type { WorldSnapshot } from '../src/state/types';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const store = new WorldStore();
await store.init();

const hyperbeamClient = process.env.HYPERBEAM_API_KEY
  ? new Hyperbeam({ apiKey: process.env.HYPERBEAM_API_KEY })
  : null;

const joinSchema = z.object({
  worldCode: z.string().min(1),
  playerName: z.string().min(1),
});

const updateSchema = z.object({
  token: z.string().min(1),
  world: z.custom<WorldSnapshot>(),
});

app.post('/api/world/join', async (req: Request, res: Response) => {
  try {
    const { worldCode, playerName } = joinSchema.parse(req.body);
    const result = await store.joinWorld(worldCode, playerName);
    res.json(result);
  } catch (error) {
    console.error('join error', error);
    res.status(400).json({ error: (error as Error).message });
  }
});

app.get('/api/world/:code', async (req: Request, res: Response) => {
  const world = await store.getWorld(req.params.code);
  if (!world) {
    return res.status(404).json({ error: 'World not found' });
  }
  res.json({ world });
});

app.post('/api/world/:code/state', async (req: Request, res: Response) => {
  try {
    const { token, world } = updateSchema.parse(req.body);
    const updated = await store.updateWorld(req.params.code, token, world);
    io.to(req.params.code.toUpperCase()).emit('world:update', updated);
    res.json({ world: updated });
  } catch (error) {
    console.error('state update error', error);
    res.status(400).json({ error: (error as Error).message });
  }
});

io.on('connection', (socket) => {
  socket.on('world:join', async ({ worldCode, token, playerName }: { worldCode: string; token: string; playerName: string }) => {
    if (!store.validateSession(worldCode, token)) {
      socket.emit('world:error', 'Invalid session');
      return;
    }
    const roomCode = worldCode.toUpperCase();
    socket.join(roomCode);
    socket.emit('world:state', await store.getWorld(roomCode));
    socket.to(roomCode).emit('presence:join', { playerName });
  });

  socket.on('world:update', async ({ worldCode, token, world }: { worldCode: string; token: string; world: WorldSnapshot }) => {
    try {
      const updated = await store.updateWorld(worldCode, token, world);
      socket.to(worldCode.toUpperCase()).emit('world:update', updated);
    } catch (error) {
      socket.emit('world:error', (error as Error).message);
    }
  });

  socket.on('cinema:start', async ({ worldCode, token }: { worldCode: string; token: string }) => {
    if (!hyperbeamClient) {
      socket.emit('world:error', 'Hyperbeam API key missing on server');
      return;
    }
    if (!store.validateSession(worldCode, token)) {
      socket.emit('world:error', 'Invalid session');
      return;
    }
    try {
      const session = await hyperbeamClient.sessions.create({
        url: 'https://movies2watch.cc/home/',
      });
      io.to(worldCode.toUpperCase()).emit('cinema:session', {
        embedUrl: session.embed_url,
        adminToken: session.admin_token,
        sessionId: session.id,
      });
    } catch (error) {
      console.error('Hyperbeam error', error);
      socket.emit('world:error', 'Unable to start Hyperbeam session');
    }
  });

  socket.on('disconnect', () => {
    // handled client-side
  });
});

const PORT = Number(process.env.PORT) || 4000;
server.listen(PORT, () => {
  console.log(`API & realtime server listening on http://localhost:${PORT}`);
});
