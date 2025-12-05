# Personal House & Garden System

A fully-playable web experience that gives every player a persistent home, garden, forge laboratory, and Tamagotchi-inspired pet. It is designed to run on Replit with zero backend work—state is persisted locally via Zustand + `localStorage`, and the entire experience ships as a Vite + React app.

## Recommended stack

- **React 18 + TypeScript + Vite (SWC)** — fast HMR on Replit, zero-config builds.
- **Zustand (with `persist`)** — state management for rooms, garden grid, forge progress, pet stats, and achievements.
- **Custom SVG asset pack** — handcrafted furniture, plants, animals, and pet skins (no placeholder boxes).
- **CSS utility tokens** — keeps the UI cohesive while allowing mood presets to recolor the whole scene.

This stack keeps the project lightweight enough for Replit while still supporting complex editors, drag-and-drop furniture placement, live pet simulation, and the Doodle-God-style crafting system.

## Features

- **House atelier**
  - Four rooms (living room, cinema corner, arcade den, bedroom) with drag-to-move furniture, tint controls, wall/floor palettes, and roof highlights.
  - Furniture catalog grows as you forge new items or clear achievements (e.g., cinema rug after watching a movie).
  - Mood presets instantly recolor the world (Sunrise Glow, Rainy Cozy, Nightfall Biolume, etc.).

- **Garden steward**
  - 7×7 layout grid where each tile can hold a plant, decoration, or habitat (flower beds, palm trees, veggie patches, ponds, lantern fences, animals, seasonal decor).
  - Garden care buttons record rituals (watering, feeding) and unlock achievements that grant new catalog entries.

- **Element forge & story props**
  - Drag-and-drop inspired system where any two discovered elements can be fused (Fire + Wood → Lantern, Clay + Canvas → Scrapbook, Story Spark + Light → Doodle Projector, etc.).
  - Forge outputs unlock furniture, garden entities, pet skins, mood presets, and interactive story props that store shared notes/doodles.

- **Weather & seasonal rituals**
  - Real-time clock drives sunrise/day/evening/night moods with particle weather (rain, mist, lantern festivals) and gentle stat bonuses.
  - Seasonal events (Ramadan lantern week, Winter Stargaze) deliver mailbox quests plus exclusive forge elements (Ramadan Glow, Frostfire).

- **Pet habitat (Tamagotchi loop)**
  - Persistent pet with hunger, happiness, energy, and cleanliness stats that decay over time.
  - Actions (feed, play, groom, rest) raise stats and count toward achievements.
  - Multiple unlockable pet skins (Sproutling, Luma Bloom, Meadow Guardian).

- **Arcade + cinema bonding**
  - Built-in tic-tac-toe cabinet in the arcade den counts toward shared achievements.
  - Cinema lounge launches the Movies2Watch portal in a new tab and logs every screening into the scrapbook automatically.

- **Photo studio & scrapbook**
  - Capture captioned snapshots with stickers; entries sync into the Memory Album beside the discovery log.
  - Story props (campfire, projector, scrapbook) let you pin jokes, sketches, or “audio note” descriptions per forged keepsake.

- **Memories & mailbox**
  - Discovery log records forge success, achievements, photo captures, and cinema nights.
  - Mailbox items deliver rewards (e.g., tutorial letter, seasonal festival invites).

## Running on Replit

1. **Create a new Replit project** using the Node.js template.
2. **Upload or clone** this repository into the Replit workspace (e.g., `git clone <repo-url>`).
3. In the Replit shell, run:
   ```bash
   npm install
   npm run dev:full   # runs Vite + Node backend together
   ```
4. Replit will expose the Vite preview on port `3000` and the API/WebSocket server on port `4000`. The front-end still works offline, but the backend now handles shared saves and realtime sync.

## Local development

```bash
npm install
npm run dev        # start Vite dev server
npm run server     # start Node backend only
npm run dev:full   # run both via concurrently
npm run build      # type-check + production build
```

## Backend sync (multiplayer foundation)

- `/server/index.ts` hosts an Express + Socket.IO service that stores world snapshots inside `server/data/worlds.json`.
- REST endpoints:
  - `POST /api/world/join` → create/join a world code, returns session token + state.
  - `GET /api/world/:code` → fetch the latest state (used for hydration/offline recovery).
  - `POST /api/world/:code/state` → persist the full snapshot (requires session token).
- Socket events:
  - `world:join` joins a realtime room (validates session) and streams `world:state`.
  - `world:update` pushes state changes to everyone else in the room.
- The server is ready for integrating true co-editing, shared quests, and other multiplayer touches. Client wiring happens next so both of you can edit the same world simultaneously from different browsers.

## Extending the experience

- Hook `useGameStore` into a real backend (Supabase, Firebase, or your own API) by swapping the Zustand `persist` middleware with network calls.
- Add multiplayer visits by syncing garden/house layouts via websockets.
- Introduce seasonal content drops by appending new SVG assets to the catalogs and gating them behind limited-time achievements.

Enjoy turning everyday rituals into a tiny, persistent universe!