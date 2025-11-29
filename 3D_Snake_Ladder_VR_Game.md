## Project Snapshot
- **Working Title:** *Ascend: Serpent Trials*
- **Platforms:** Meta Quest (Quest 2/3/Pro) + iOS/Android (AR + 3D touch controls)
- **Audience:** 9–16 year-olds looking for replayable learning games; VR enthusiasts who like party games inspired by classic board IP.

## Experience Pillars
1. **Tactile Board Presence:** The board is carved into a floating island that drifts above a glowing ocean. Transparent tiles reveal circling sharks below, adding thrill each time a pawn teeters near the edge. Sculpted snakes coil around palm trees while ladders extend as bamboo elevators hugging the island rim.
2. **High-stakes Trivia Lifelines:** Landing on a snake triggers a “Red Light” challenge room. Beat the quiz to stay in place; fail and watch the snake drag you backwards.
3. **Squid Game Drama:** Guards, neon lighting, and round masks frame the lifeline events. Quiz time is limited by a looming “glass bridge” timer; wrong answers crack the floor beneath you.
4. **Sunrise-to-Sunset Drama:** Matches play through an accelerated day-night cycle—warm sunrise for opening turns, golden hour intensity mid-game, and high-contrast neon nights for final rolls.
5. **Player-first Guidance:** Context-aware onboarding, readable UI, and proactive comfort settings teach mechanics within 90 seconds while letting players customize locomotion, narration, and quiz pace before their first roll.

## Player Journey & Onboarding
- **Arrival Cinematic:** Players awaken on a shore as the island assembles around them. A masked host walks them through hand poses for rolling dice while HUD cards highlight where to focus.
- **Guided First Match:** The opening three turns are curated—micro-ladders rigged to guarantee one early win, followed by a safe snake that demonstrates the quiz room without punishing the player.
- **Adaptive Tutorials:** Help cards float beside any element the player dwells on. If someone fails two quizzes in a row, the host offers a slower-paced “practice snake” with unlimited retries.
- **Progressive Feature Unlocks:** Multiplayer voice, AR projection, and cosmetic management unlock after the player wins their first solo match, preventing information overload on day one.

## UX Feedback & Interface Systems
- **Readable HUD Layer:** Dice results, tile previews, and quiz timers sit on a curved panel anchored to the player’s wrist in VR and the bottom edge on mobile. Panels automatically scale based on distance to prevent eye strain.
- **Emotive Miniatures:** Pawns emote with tiny holographic faces that change when landing on bonus tiles or snakes, providing quick emotional cues for spectators.
- **Celebration Stack:** Each ladder, quiz win, and level-up triggers layered feedback—particle burst on the board, spatialized cheer audio, and a short log entry in the event ticker so players can catch up if they glanced away.
- **Dynamic Difficulty Balancer:** Behind the scenes, quiz difficulty nudges ±1 tier depending on recent accuracy and time-to-answer, smoothing frustration without eliminating challenge.
- **Session Recap:** At match end, a cinematic timeline replays pivotal moves, highlighting clutch quiz saves and near-misses to reinforce memorable beats.

## Accessibility, Safety & Comfort
- **Comfort Presets:** “Steady,” “Cinematic,” and “Express” bundles tune camera sway, vignette strength, locomotion animation speed, and haptic intensity. Players can swap anytime from a pause radial menu.
- **Audio & Subtitle Controls:** Full voiceover volume sliders, spatial mix toggle, and large-print subtitles with color-coded speakers keep quiz narration legible on all devices.
- **Color & Contrast Options:** Board materials auto-adjust for color-vision deficiencies (deuteranopia, protanopia, tritanopia) and maintain WCAG AA contrast on UI cards.
- **Session Guardrails:** Playtime reminders every 20 minutes, optional break prompts, and a “calm mode” that mutes shark jump-scares for younger players.
- **Safety Bubble:** In VR lobbies, a quick gesture hides other avatars and mutes voice chat, borrowed from Quest safety standards.

## Floating Island Atmosphere
- **Environmental Storytelling:** The island is dotted with mini-temples, shark warning drums, and Squid Game guard towers that telescope out of the sand. Each snake mouth aligns with a cliffside slide that threatens to fling players toward the shark-infested waters.
- **Shark Layer:** Animated megasharks breach whenever a player fails a quiz or falls down a snake, reinforcing the stakes while keeping the tone adventurous rather than scary.
- **Dynamic Skybox:** Clouds streak across the horizon and the sun traverses the sky every match. Lighting subtly changes quiz rooms, so sunrise quizzes feel calmer while nighttime ones pulse with neon outlines inspired by Squid Game aesthetics.

## Core Loop
1. Roll (motion-based in VR; swipe/tap dice on mobile).
2. Move pawn via physics-driven conveyors / animation rails.
3. Resolve tile event (ladder, snake, mystery tile).
4. If snake tile: enter lifeline microchallenge (quiz + reflex mini-interaction).
5. Earn rewards (credits, cosmetic unlocks, knowledge XP).

## Snake Lifeline + Quiz Layer
- **Trigger:** Whenever a player lands on a snake head.
- **Flow:**
  1. Player is lifted into a Squid Game “Observation Cube”.
  2. Host NPC (frontman style) delivers context + question theme.
  3. Quiz types: multiple choice, order sequencing, “repeat the pattern while answering”.
  4. Success = immunity; snake becomes a temporary ladder for that player.
  5. Failure = classic snake penalty, but distance scales with difficulty and plays a “shark surge” sequence where the pawn nearly splashes before being yanked back to its new tile.
- **Question Pools:** STEM, pop culture, Squid Game lore, custom classroom packs.
- **Difficulty Scaling:** Later snakes require two linked questions; co-op mode lets teammates whisper hints via proximity voice.

## Squid Game Integration Concepts
- **Visual Motifs:** Pink guard NPCs man lookout towers along the island edge; quiz rooms rise from underwater shafts shaped like iconic sets (Glass Bridge, Tug-of-War platforms).
- **Mini-challenges:** Some ladders lead to “Prize Vaults” inspired by Squid Game piggy bank—collect tokens to spend on skins.
- **Limited-time Events:** Seasonal “Glass Bridge Gauntlet” where ladders are replaced by chance-based tiles riffing on the show’s tension.
- **Narrative Hook:** Players wash ashore on the floating island as contestants in a benevolent Squid Game remix, competing for knowledge crowns rather than survival while sharks patrol the depths as a symbolic reminder to keep moving.

## Platform-Specific Notes
### Meta Quest
- **Locomotion:** Stationary board with room-scale gestures; dice roll by physically throwing a tracked die object toward the island center.
- **Interaction:** Hand tracking for selecting answers; haptic feedback when snakes grab the avatar or when sharks brush past the island base.
- **Immersion Beats:** Depth audio layers crashing waves, distant shark splashes, and the frontman voice overhead. Real-time lighting shifts sell the sunrise-to-sunset arc inside the headset.

### Mobile (Phones & Tablets)
- **Camera Modes:** Default is isometric 3D with a sweeping sunrise-to-sunset gradient; optional AR mode projects the board on tables.
- **Controls:** Tap-to-roll, drag pawn, large quiz buttons with emojis for faster comprehension.
- **Multiplayer:** Async turns via push notifications; quiz segments playable in real-time with quick-match timers.

## Game Modes
- **Solo Campaign:** Procedural boards with escalating Squid Game narratives plus unique island weather presets (stormy dusk, clear sunrise, neon midnight).
- **Party VR:** Up to 4 players in the same Quest lobby, taking turns on a shared island hovering between them while sharks react to every failed quiz in real time.
- **Cross-platform Online:** Turn-based ladder leagues; quiz responses happen simultaneously to reduce downtime.
- **Education Packs:** Teachers upload quiz sets; snakes transform into pop quizzes relevant to class material.

## Social Play & Live Events
- **Cross-platform Lobbies:** Lobby kiosks show which friends are online and which platform they’re on, and let players jump into “drop-in guest” slots without restarting a match.
- **Spectator Casting:** Mobile viewers can join as commentators, triggering emoji fireworks or slow-motion replays when someone nails a quiz streak.
- **Seasonal Showdowns:** Monthly “Glass Bridge” events temporarily swap ladders for twin-path gambles, with leaderboard rewards and unique quiz categories.
- **Teacher & Parent Hubs:** Education packs include ready-made match templates plus reporting dashboards that summarize accuracy per topic, making remote supervision friendly.
- **Cosmetic Storylines:** Unlockable skins arrive with bite-sized lore entries so cosmetics feel like narrative rewards instead of pure monetization beats.

## Progression & Monetization
- **Meta Progression:** Earn “Glass Tokens” used to unlock avatars, snake skins, dice trails.
- **Battle Pass Seasons:** Themed after Squid Game challenges; reward tracks include VR room decor and mobile UI skins.
- **IAP:** Cosmetic-only; optional quiz pack DLC (licensed curriculum or pop culture packs).
- **Parental Controls:** Disable IAP, restrict online chat, review quiz topics.

## Technical Blueprint
- **Engine:** Unity (URP) with shared asset bundles; XR Interaction Toolkit for Quest, standard touch UI for mobile.
- **Networking:** Photon Fusion or Unity Netcode with relay; deterministic dice logic to keep sync.
- **Quiz Service:** Cloud-hosted (Firebase/PlayFab) delivering question sets, difficulty tiers, analytics.
- **Data:** Progress synced via platform accounts; offline mode caches quiz seeds.
- **AI/ML (Optional):** Personalize quiz difficulty by tracking accuracy rate per category.

## Production Roadmap (High Level)
1. **Concept Preproduction (2–3 weeks):** finalize art bible, Squid Game tie-in approvals, question schema.
2. **Vertical Slice (10 weeks):** single board, one VR environment, quiz prototype, cross-platform dice roll sync.
3. **Alpha (6 weeks):** add ladders, multiple snake quiz types, AR mobile mode, account system.
4. **Beta (8 weeks):** content polish, multiplayer stability, monetization hooks, parental dashboard.
5. **Launch:** feature-complete board variations, seasonal event ready; run marketing beats targeting VR creators + kid-friendly influencers.

## Risks & Mitigations
- **Licensing:** Squid Game elements require clear legal boundaries—focus on homage rather than direct IP unless licensed.
- **Comfort in VR:** Limit camera motion, offer teleport-free experience, add comfort vignette during snakes/ladders.
- **Quiz Fatigue:** Rotate mechanics, integrate voiceover hints, reward even failed attempts with partial XP.
- **Cross-platform Sync:** Build deterministic board logic, server-authoritative question timers to avoid cheating.
