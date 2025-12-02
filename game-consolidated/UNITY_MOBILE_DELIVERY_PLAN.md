# Ascend Mobile 3D Delivery Plan

## Objective & Scope
Deliver a high-fidelity, non-VR 3D version of *Ascend: Serpent Trials* optimized for iOS and Android handsets in four aggressive weeks. The build must preserve the floating-island atmosphere, high-stakes quiz beats, and shark-laced spectacle from the VR brief while remaining single-player and offline-friendly for the initial milestone.

## Assets & Systems Ready to Port
- **Core Game Loop** – The React hook already encodes deterministic dice, tile resolution, snake quizzes, and reward logic that can be translated straight into Unity services (`useGameEngine` state machine, event log, immunity handling).
- **Board Layout Data** – Ladder, snake, and mystery tile definitions exist as structured data (`board.ts`), providing immediate ScriptableObject seeds.
- **Quiz Bank & Themes** – Question objects and category filters (`questions.ts`) define the minimum schema for Unity quiz databases or remote packs.
- **UI/UX Beats** – The React UI demonstrates the intended HUD, event feed cadence, shark alerts, and victory flows, serving as reference for Unity UI Toolkit layouts.

## Unity Architecture Blueprint
1. **Scene Structure**
   - `BootScene` → initializes services, loads player prefs, selects quality tier.
   - `AscendBoardScene` → main cinematic board with dice, ladders/snakes, shark ocean, event feed, and quiz room portals.
   - `QuizRoomAdditive` → lightweight additive scene for encapsulated quiz presentation (Timeline-controlled spawn/teardown).

2. **Core Systems (C# Services / ScriptableObjects)**
   - `GameStateController` – runs deterministic turn order, dice rolls, and tile resolution mirroring the React hook logic.
   - `BoardDefinition` ScriptableObject – stores BOARD_SIZE, ladder/snake/mystery arrays authored in editor.
   - `QuizRepository` ScriptableObject – local bank with theme/difficulty filters plus stub for future Firebase/PlayFab feeds.
   - `CinematicDirector` – orchestrates Cinemachine blends for dice slow-mo, snake falls, ladder climbs, shark breaches.
   - `FXService` – pools VFX Graph/particle prefabs (glass shards, neon pulses, foam spray) and exposes Reduced-FX toggles.
   - `AudioSuite` – manages adaptive music stems (sunrise/day/night) and spatial SFX for snakes, sharks, quizzes, UI.
   - `InputRouter` – unifies tap, drag, and optional controller support; includes haptic events for compatible devices.
   - `UIFacade` – binds HUD widgets (turn display, credits, shark alert, quiz modal) via Unity UI Toolkit responsive layouts.

3. **Data & Addressables**
   - Store board/quiz/FX configurations as Addressable assets for quick iteration and later remote updates.
   - Separate asset groups per quality tier (e.g., `High` = full particle density, `Medium` = simplified materials, `Low` = baked textures).

## Visual & FX Implementation
- **Environment** – Sculpt a single floating atoll with vertex-painted moss, emissive guard towers, and transparent glass tiles revealing a looping shark tank. Water shader uses planar reflections on high-tier devices and cubemap fallback on low-tier.
- **Snakes & Ladders** – Skinned meshes with 2–3 hero animations each (idle, engage, resolve). Snakes feature emissive scale accents and procedural slither along splines; ladders unfold with bamboo elevator beats.
- **Sky & Lighting** – Gradient sky dome plus volumetric clouds driving a four-phase day-night loop. Use baked lightmaps for sunrise/day, then dynamic tinting + spotlights for golden/neon phases.
- **Shark Layer** – Instanced shark meshes with Timeline-controlled breach animations, water spray particles, and screen-space droplets for dramatic penalties.
- **Quiz Rooms** – Additive platforms rising from the ocean with guard silhouettes, glass-floor crack shaders, and spotlight rigs synced to the timer.
- **Post FX** – URP bloom, color curves, limited depth-of-field (quiz only), chromatic pulses for risk moments. Provide Reduced Motion toggle that disables camera shakes and heavy particles.

## Mobile Optimization Strategy
- **Performance Targets** – 60 FPS on flagship (A15/M3, Snapdragon 8 Gen 1+), graceful 30 FPS fallback on mid-range (A13, Snapdragon 778G).
- **Quality Presets** – Auto-select based on device score; expose manual override. Differences include shadow cascades (2/1/0), reflection quality, particle spawn counts, and post-processing toggles.
- **Asset Budgets** – Board <150k tris, snakes/ladders <15k tris each, pawns <5k tris, textures atlased to ≤2K per material set. Audio streamed, quiz assets unloaded between encounters.
- **Adaptive Performance Hooks** – Integrate Unity Adaptive Performance package for thermal throttling alerts; reduce FX density when sustained device temperature rises.
- **Testing Matrix** – iPhone 12/13/15, iPad Air M1, Pixel 6/8, Galaxy S21/S24, plus Moto G series for low-tier validation.

## Accelerated 4-Week Schedule
- **Week 1 – Systems & Greybox**
  - Stand up URP project, Addressables, Cinemachine, Timeline, and foundational services (GameStateController, BoardDefinition, QuizRepository).
  - Block out island, tiles, dice, quiz portal volumes; port React logic into C#; run deterministic tests.
  - Deliverable: Greybox build on iOS/Android with functional loop, placeholder art.
- **Week 2 – Visual Fidelity & FX**
  - Finalize board, snakes, ladders, shark meshes; implement shaders, sky cycle, water, neon lighting.
  - Author Cinemachine blends, Timeline sequences, FXService pools; integrate adaptive music and SFX pass.
  - Deliverable: Internal milestone showcasing “breathtaking” cinematics on flagship devices.
- **Week 3 – Content & Mobile Polish**
  - Populate full quiz bank, economy hooks, shark alert UI, accessibility toggles, localization scaffolding.
  - Implement graphics presets, Reduced Motion/FX switches, LODs, mesh batching, memory profiling.
  - Deliverable: Feature-complete candidate with quality settings validated on mid-tier phones.
- **Week 4 – QA & Release Prep**
  - Regression + soak tests, crash/ANR monitoring, performance tuning, gameplay telemetry stubs.
  - Produce store assets (screens, trailer capture), legal/compliance checklist, soft-launch build + changelog.
  - Deliverable: Submission-ready mobile build and documentation.

## Risks & Mitigations
- **Art Throughput** – Limited time for bespoke assets; mitigate by prioritizing one hero board + modular snake/ladder kits that can be recolored later.
- **Thermal Constraints** – High shader load can throttle devices; include aggressive quality auto-scaling and Reduced FX fallback early.
- **Quiz Content Depth** – Prototype uses small bank; schedule parallel content authoring or integrate CSV import to expand quickly.
- **Team Bandwidth** – Four-week push assumes dedicated engineer + tech artist + 3D artist; extend timeline if resources split across other projects.

## Next Steps
1. Approve this scope/schedule and secure the minimum team lineup.
2. Kick off Sprint 0: clone Unity starter repo, configure URP project, and migrate board/question data into ScriptableObjects.
3. Begin Week 1 backlog while locking art briefs for the floating island, snakes, ladders, and shark cinematics.
