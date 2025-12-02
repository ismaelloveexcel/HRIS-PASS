# Ascend: Serpent Trials — Prototype Slice

This lightweight prototype visualises the improved UX beats for the 3D Snake & Ladder VR concept. It runs entirely in the browser using Three.js so you can feel the tactile board flow, dice rolls, lifeline quizzes, and the accelerated sunrise-to-neon day/night cycle.

## What’s inside
- Floating 3D board with serpentine numbering, animated sharks’ lagoon, ladders, and neon snakes.
- Holographic pawn with eased movement, bounce arcs, and tile highlighting.
- Dice rolling, overshoot handling (exact roll required), and ladder boosts.
- Snake lifeline quizzes with themed timers, adaptive feedback, and stat tracking.
- HUD panels for stats, rolling guidance, and a dynamic event log for spectators.

## Run locally
```
cd /workspace/game-prototype
npx serve .
# or use any static file server such as `python -m http.server`
```
Then open the printed URL (e.g., http://localhost:3000) in a desktop browser. The build uses native ES modules over a CDN, so no bundling step is required.

## Next build ideas
- Hook in a real quiz service endpoint.
- Add multiplayer sockets to synch dice rolls.
- Streamline input for touch/VR controllers by mapping Roll + Answer gestures.
- Replace primitive snakes/ladders with imported art assets from the visual bible.
