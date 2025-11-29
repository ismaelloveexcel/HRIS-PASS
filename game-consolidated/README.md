# Game-Consolidated: Ascend - Serpent Trials

This folder contains all game-related files consolidated from various branches and repositories owned by ismaelloveexcel, organized for easier maintenance and development.

## Contents

### Root-Level Files

| File | Original Location | Description |
|------|-------------------|-------------|
| `3D_Snake_Ladder_VR_Game.md` | HRIS-PASS (main branch) | Core game design document describing the "Ascend: Serpent Trials" VR/mobile game concept |
| `GAME_REVIEW_AND_ENHANCEMENTS.md` | HRIS-PASS (cursor/review-enhance-and-build-game-gpt-5.1-codex-high-e966) | Review document with enhancement plans and quality goals |
| `ascend-preview.png` | HRIS-PASS (cursor/review-enhance-and-build-game-gpt-5.1-codex-high-e966) | Preview screenshot of the game |
| `ascend-dist.zip` | HRIS-PASS (cursor/review-enhance-and-build-game-gpt-5.1-codex-high-e966) | Built distribution package (~68KB) |
| `ascend-source.zip` | HRIS-PASS (cursor/review-enhance-and-build-game-gpt-5.1-codex-high-e966) | Source archive (~48KB) |

### game/ Directory (React + TypeScript Implementation)

The main game implementation using React, TypeScript, and Vite.

| Path | Description |
|------|-------------|
| `game/package.json` | Project dependencies including React, TypeScript, Vite |
| `game/package-lock.json` | Lock file for dependencies |
| `game/index.html` | HTML entry point |
| `game/vite.config.ts` | Vite build configuration |
| `game/tsconfig.json` | TypeScript configuration |
| `game/tsconfig.app.json` | TypeScript app configuration |
| `game/tsconfig.node.json` | TypeScript Node configuration |
| `game/eslint.config.js` | ESLint configuration |
| `game/.gitignore` | Git ignore rules |
| `game/README.md` | Game-specific README with detailed setup instructions |
| `game/public/vite.svg` | Vite logo asset |
| `game/src/App.tsx` | Main React application component |
| `game/src/App.css` | Application styles |
| `game/src/main.tsx` | React entry point |
| `game/src/index.css` | Global styles |
| `game/src/types.ts` | TypeScript type definitions for game entities |
| `game/src/vite-env.d.ts` | Vite TypeScript environment declarations |
| `game/src/assets/react.svg` | React logo asset |
| `game/src/components/DiceTray.tsx` | Dice rolling component |
| `game/src/components/EventFeed.tsx` | Game event display component |
| `game/src/components/GameBoard.tsx` | Main game board visualization |
| `game/src/components/PlayerHud.tsx` | Player HUD display |
| `game/src/components/QuizModal.tsx` | Quiz challenge modal |
| `game/src/components/SharkAlert.tsx` | Shark warning alert component |
| `game/src/components/Skybox.tsx` | Dynamic skybox with day/night cycle |
| `game/src/components/VictoryBanner.tsx` | Victory celebration banner |
| `game/src/data/board.ts` | Board configuration (snakes, ladders) |
| `game/src/data/questions.ts` | Quiz questions database |
| `game/src/hooks/useGameEngine.ts` | Core game logic hook |

**Original Source:** HRIS-PASS repository, branch `cursor/review-enhance-and-build-game-gpt-5.1-codex-high-e966`

### game-prototype/ Directory (HTML/JS Prototype)

An alternative lightweight HTML/JavaScript prototype.

| Path | Description |
|------|-------------|
| `game-prototype/README.md` | Prototype documentation |
| `game-prototype/index.html` | HTML entry point |
| `game-prototype/main.js` | JavaScript game logic |
| `game-prototype/styles.css` | CSS styles |

**Original Source:** HRIS-PASS repository, branch `cursor/review-and-build-game-gpt-5.1-codex-high-8f56`

## How to Run

### Main React Game (game/)

1. Navigate to the game directory:
   ```bash
   cd game-consolidated/game
   ```

2. Install dependencies:
   ```bash
   npm ci
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

#### Available npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

### HTML Prototype (game-prototype/)

Simply open `game-prototype/index.html` in a web browser - no build step required.

## Repositories Scanned

| Repository | Status | Game Files Found |
|------------|--------|-----------------|
| ismaelloveexcel/HRIS-PASS | ✅ Accessible | Yes - main branch + cursor branches |
| ismaelloveexcel/BaynunahHRDigitalPass | ✅ Accessible | None |
| ismaelloveexcel/BaynunahHRDigitalPass-1 | ✅ Accessible | None (HR portal app) |
| ismaelloveexcel/HR-PORTAL | ✅ Accessible | None (zip archives only) |
| ismaelloveexcel/Option2 | ⚠️ Empty repository | None |
| ismaelloveexcel/passportal261125-1- | ✅ Accessible | None |
| ismaelloveexcel/ismaelloveexcel | ⚠️ Empty repository | None |
| ismaelloveexcel/baynunah-digital-card-platform | ❌ Does not exist | N/A |

## Large Binary Assets

All files in this consolidation are under 5MB. No Git LFS is required at this time.

| File | Size |
|------|------|
| `game/package-lock.json` | ~113 KB |
| `ascend-dist.zip` | ~68 KB |
| `ascend-source.zip` | ~48 KB |
| All other files | < 25 KB each |

## Notes for Unity/Unreal Development

The game design document (`3D_Snake_Ladder_VR_Game.md`) outlines a full VR/mobile game targeting:
- **Platforms:** Meta Quest (Quest 2/3/Pro), iOS, Android
- **Engine:** Unity with URP (Universal Render Pipeline)
- **Networking:** Photon Fusion or Unity Netcode

If transitioning to Unity/Unreal:
1. Install Git LFS for managing 3D assets (`.fbx`, `.glb`, `.unity`, `.uasset`)
2. Configure XR Interaction Toolkit for VR support
3. Set up cloud quiz service (Firebase/PlayFab)

## Missing Pieces for Full Game

To make this a complete, production-ready game:

- [ ] **3D Assets:** Board models, snake/ladder meshes, character pawns, particle effects
- [ ] **Audio:** Background music, sound effects, voice overs
- [ ] **Unity Project:** Full Unity URP project with XR toolkit integration
- [ ] **Backend:** Quiz service API, player progression system, analytics
- [ ] **Multiplayer:** Photon Fusion or Unity Netcode setup
- [ ] **Testing:** Unit tests, integration tests, VR comfort testing
- [ ] **CI/CD:** Build automation for Quest APK, iOS/Android mobile builds

## File Conflicts

No filename conflicts were encountered during consolidation.

---

*Consolidated on: 2025-11-29*
*Source Repository: https://github.com/ismaelloveexcel/HRIS-PASS*
