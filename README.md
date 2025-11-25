# Ascend: Serpent Trials – Floating Island Quiz Ladders

This workspace now packages two parallel workstreams:

- **HRIS documentation** – the Baynunah employee hub blueprints remain untouched for reference.
- **Ascend: Serpent Trials** – a new playable prototype inspired by the attached Squid Game x Snake & Ladder concept notes.

## Game Overview

Ascend reimagines Snakes & Ladders as a living floating island with:

- Dynamic day–night skybox shifts, neon guard towers, and shark surge callouts.
- Deterministic dice logic with ladders, snakes, and mystery tiles that grant tokens, immunity, or storm drifts.
- Lifeline quizzes for every snake encounter. Answer correctly to turn snakes into ladders; fail and the megashark drags you back.
- HUD + event feed that mirrors the narrative beats described in `3D_Snake_Ladder_VR_Game.md`.

## Project Structure

```
/game                     # React + TypeScript prototype (Vite)
  ├─ src/data             # Board + quiz banks
  ├─ src/hooks            # Game loop state machine
  └─ src/components       # UI + ambience widgets
GAME_REVIEW_AND_ENHANCEMENTS.md
3D_Snake_Ladder_VR_Game.md
...existing HRIS blueprints
```

## Running the Prototype

```bash
cd game
npm install
npm run dev   # open the localhost URL shown in the terminal
```

For a production bundle run `npm run build`; assets output to `game/dist`.

## Next Steps

- Port the logic into Unity URP with XR Interaction Toolkit for true VR ladders/dice throws.
- Wire the quiz system to a managed service (Firebase/PlayFab) and sync dice rolls via Photon/Unity Netcode.
- Extend the question bank and mystery tile effects for classroom packs or seasonal events.