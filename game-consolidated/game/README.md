# Ascend: Serpent Trials

An ultra-mobile polished React + Vite experience inspired by Squid Game tension. Install it as a PWA, shake your phone to roll, and chase the fastest-win leaderboard with a fully expanded 100+ question bank.

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Available Scripts

| Script | Description |
| ------ | ----------- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check and build the production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run deploy` | Build and push the `dist/` folder to GitHub Pages via `gh-pages` |

## Feature Highlights

- **Installable PWA** with offline cache, manifest, and maskable icons generated from the Vite mark.
- **Immersive feedback**: procedural Web Audio cues, canvas-confetti bursts, and device haptics for dice rolls, ladders, quizzes, and victory.
- **Shake-to-roll mobile controls** powered by the DeviceMotion API plus a pulsing on-turn hint.
- **Robust content**: 100+ curated quiz questions across STEM, pop culture, and Squid Game lore categories.
- **Player-focused UX**: high-score tracker via `localStorage`, Web Share button on victory, interactive first-run tutorial, and mobile-first layout refinements.
- **VR readiness**: asset manifest panel, transport bus, and quiz-service abstraction make it easy to swap in real meshes, backend APIs, and multiplayer transports once they’re available.

## Roadmap Scaffolding

| Track | What’s Included Now | How to Extend Later |
| ----- | ------------------- | ------------------- |
| 3D Assets | `AssetPipelinePanel` surfaces the tracked manifest from `src/assets/assetManifest.ts`. | Replace placeholder metadata with actual GLB/FBX URIs and plug into a Unity/Three loader. |
| Audio | `useImmersiveEffects` + `useSoundscape` combine event cues and ambient pads. | Swap procedural synths with streamed stems or FMOD hooks. |
| Quiz Backend | `quizService` and `registerQuizService` wrap the question source in an async API. | Point the service at Firebase/PlayFab once the endpoint is live. |
| Multiplayer | `gameTransport` publishes deterministic turn events. | Replace local echo transport with Photon/Socket transport without touching `useGameEngine`. |
| Testing/CI | Vitest + GitHub Actions workflow ensure lint/build/test gates. | Expand suites with component tests or Quest-device smoke tests. |

## Deploying to GitHub Pages

1. Make sure the `gh-pages` branch is available (the `gh-pages` package will create/update it).
2. Run:
   ```bash
   npm run deploy
   ```
3. Configure the repository’s Pages settings to serve from the `gh-pages` branch / root if it isn’t already.

## Performance Notes

- Canvas confetti is lazy-loaded so it doesn’t bloat the initial bundle.
- Web Audio context spins up only after a user gesture, keeping autoplay policies happy.
- Shake detection is gated behind capability checks and an opt-in permission flow to preserve 60 fps on incompatible devices.
