## Project Snapshot
- **Working Title:** *Ascend: Serpent Trials*
- **Platforms:** Meta Quest (Quest 2/3/Pro) + iOS/Android (AR + 3D touch controls)
- **Audience:** 9–16 year-olds looking for replayable learning games; VR enthusiasts who like party games inspired by classic board IP.

## Experience Pillars
1. **Tactile Board Presence:** A floating, holographic 10×10 grid towers above a stylized arena. Players see giant sculpted snakes/ladders twisting through space; ladders double as elevators, snakes as slides.
2. **High-stakes Trivia Lifelines:** Landing on a snake triggers a “Red Light” challenge room. Beat the quiz to stay in place; fail and watch the snake drag you backwards.
3. **Squid Game Drama:** Guards, neon lighting, and round masks frame the lifeline events. Quiz time is limited by a looming “glass bridge” timer; wrong answers crack the floor beneath you.

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
  5. Failure = classic snake penalty, but distance scales with difficulty.
- **Question Pools:** STEM, pop culture, Squid Game lore, custom classroom packs.
- **Difficulty Scaling:** Later snakes require two linked questions; co-op mode lets teammates whisper hints via proximity voice.

## Squid Game Integration Concepts
- **Visual Motifs:** Pink guard NPCs manage quiz rooms; arenas shaped like iconic sets (Glass Bridge, Tug-of-War platforms).
- **Mini-challenges:** Some ladders lead to “Prize Vaults” inspired by Squid Game piggy bank—collect tokens to spend on skins.
- **Limited-time Events:** Seasonal “Glass Bridge Gauntlet” where ladders are replaced by chance-based tiles riffing on the show’s tension.
- **Narrative Hook:** Players are contestants in a benevolent variant of Squid Games, competing for knowledge crowns rather than survival.

## Platform-Specific Notes
### Meta Quest
- **Locomotion:** Stationary board with room-scale gestures; dice roll by physically throwing a tracked die object.
- **Interaction:** Hand tracking for selecting answers; haptic feedback when snakes grab the avatar.
- **Immersion Beats:** Use depth audio (3D spatialized) for snakes hiss behind players, frontman voice overhead.

### Mobile (Phones & Tablets)
- **Camera Modes:** Default is isometric 3D; optional AR mode projects the board on tables.
- **Controls:** Tap-to-roll, drag pawn, large quiz buttons with emojis for faster comprehension.
- **Multiplayer:** Async turns via push notifications; quiz segments playable in real-time with quick-match timers.

## Game Modes
- **Solo Campaign:** Procedural boards with escalating Squid Game narratives.
- **Party VR:** Up to 4 players in the same Quest lobby, taking turns on a shared board floating between them.
- **Cross-platform Online:** Turn-based ladder leagues; quiz responses happen simultaneously to reduce downtime.
- **Education Packs:** Teachers upload quiz sets; snakes transform into pop quizzes relevant to class material.

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
