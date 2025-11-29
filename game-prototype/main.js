import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.163.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/controls/OrbitControls.js";

const container = document.querySelector("#experience");
const rollButton = document.querySelector("#rollButton");
const diceValueEl = document.querySelector("#diceValue");
const tileValueEl = document.querySelector("#tileValue");
const turnValueEl = document.querySelector("#turnValue");
const ladderValueEl = document.querySelector("#ladderValue");
const snakeValueEl = document.querySelector("#snakeValue");
const accuracyValueEl = document.querySelector("#accuracyValue");
const tipTextEl = document.querySelector("#tipText");
const logListEl = document.querySelector("#logList");
const quizModal = document.querySelector("#quizModal");
const quizCategoryEl = document.querySelector("#quizCategory");
const quizQuestionEl = document.querySelector("#quizQuestion");
const quizAnswersEl = document.querySelector("#quizAnswers");
const quizTimerEl = document.querySelector("#quizTimer");
const toastEl = document.querySelector("#toast");

const BOARD_SIZE = 10;
const TOTAL_TILES = BOARD_SIZE * BOARD_SIZE;
const TILE_SIZE = 1;

const snakes = [
  { head: 16, tail: 6, category: "STEM", timer: 18 },
  { head: 48, tail: 26, category: "Game Lore", timer: 16 },
  { head: 62, tail: 19, category: "Squid Trivia", timer: 20 },
  { head: 88, tail: 24, category: "Pattern Memory", timer: 17 },
  { head: 95, tail: 75, category: "Lightning Math", timer: 12 },
];

const ladders = [
  { start: 3, end: 22 },
  { start: 11, end: 49 },
  { start: 20, end: 39 },
  { start: 36, end: 58 },
  { start: 44, end: 65 },
  { start: 71, end: 92 },
];

const tips = [
  "Snakes trigger lifeline quizzes—ace them to convert snakes into ladders for a turn.",
  "Orbit the camera (drag) or pinch/scroll to inspect distant tiles.",
  "Exact rolls matter: overshooting tile 100 keeps you in place, so plan boosts wisely.",
  "Answering quizzes quickly improves your confidence buff and slows future timers.",
  "Use ladders to skip danger clusters—hover over tall bamboo spires to plot safe paths.",
];

const questionBank = [
  {
    prompt: "Which geometric shape appears on Squid Game guard masks to signal authority?",
    choices: ["Circle", "Square", "Triangle", "Pentagon"],
    answer: 1,
    topic: "Squid Trivia",
  },
  {
    prompt: "A VR die is rolled and shows an even number. Which of these could NOT appear?",
    choices: ["6", "4", "3", "2"],
    answer: 2,
    topic: "Lightning Math",
  },
  {
    prompt: "What color typically signals a safe tile in the classic board?",
    choices: ["Emerald", "Scarlet", "Gold", "Charcoal"],
    answer: 0,
    topic: "Pattern Memory",
  },
  {
    prompt: "The Squid Game 'Glass Bridge' challenge tests which skill the most?",
    choices: [
      "Guessing probability",
      "Arm strength",
      "Memory recall",
      "Singing on pitch",
    ],
    answer: 0,
    topic: "Squid Trivia",
  },
  {
    prompt: "Which planet takes the least time to orbit the sun?",
    choices: ["Venus", "Mars", "Mercury", "Earth"],
    answer: 2,
    topic: "STEM",
  },
  {
    prompt: "Finish the pattern: 2, 4, 6, __?",
    choices: ["7", "8", "10", "12"],
    answer: 1,
    topic: "Pattern Memory",
  },
  {
    prompt: "In VR comfort mode, which feature reduces motion sickness?",
    choices: [
      "Lower frame rate",
      "Vignette during movement",
      "Higher brightness",
      "Random camera shakes",
    ],
    answer: 1,
    topic: "Wellness",
  },
  {
    prompt: "What do ladders represent in Ascend: Serpent Trials?",
    choices: [
      "Skill progress boosts",
      "Random penalties",
      "Spectator seats",
      "Inventory slots",
    ],
    answer: 0,
    topic: "Game Lore",
  },
];

const state = {
  currentTile: 1,
  turns: 0,
  ladders: 0,
  snakesHit: 0,
  quizzesAttempted: 0,
  quizzesCorrect: 0,
  isAnimating: false,
  awaitingQuiz: false,
  hasWon: false,
  timeOfDay: 0.15,
};

let pawn;
const pawnBaseHeight = 0.35;
let boardGroup;
const boardTiles = [];
let highlightedTile = null;
let quizTimerId = null;
let toastTimerId = null;
let tipIndex = 0;

const warmColor = new THREE.Color(0xffc37c);
const coolColor = new THREE.Color(0x61a8ff);
const waterDawn = new THREE.Color(0x0b1a32);
const waterNight = new THREE.Color(0x16376b);

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x040714, 0.08);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  120
);
camera.position.set(6, 8, 8);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.maxPolarAngle = Math.PI * 0.48;
controls.minDistance = 7;
controls.maxDistance = 16;
controls.target.set(0, 0, 0);

const sunLight = new THREE.DirectionalLight(0xfff1c1, 1.1);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(1024, 1024);
sunLight.position.set(-4, 6, 5);
scene.add(sunLight);

const fillLight = new THREE.HemisphereLight(0x4ec9ff, 0x080312, 0.65);
scene.add(fillLight);

const neonLight = new THREE.PointLight(0xff4f8a, 0.55, 25);
neonLight.position.set(0, 1.8, 0);
scene.add(neonLight);

const waterMaterial = new THREE.MeshPhysicalMaterial({
  color: waterDawn.clone(),
  transparent: true,
  opacity: 0.85,
  roughness: 0.4,
  metalness: 0.1,
  clearcoat: 0.5,
  clearcoatRoughness: 0.35,
});

const water = new THREE.Mesh(
  new THREE.CircleGeometry(BOARD_SIZE * 0.95, 64),
  waterMaterial
);
water.rotation.x = -Math.PI / 2;
water.position.y = -0.08;
scene.add(water);

const island = new THREE.Mesh(
  new THREE.CylinderGeometry(BOARD_SIZE * 0.7, BOARD_SIZE * 0.9, 0.6, 48, 1, true),
  new THREE.MeshStandardMaterial({
    color: 0x1a223d,
    metalness: 0.2,
    roughness: 0.85,
    side: THREE.DoubleSide,
  })
);
island.position.y = -0.45;
island.receiveShadow = true;
scene.add(island);

boardGroup = new THREE.Group();
scene.add(boardGroup);

createBoard();
createLadders();
createSnakes();
createPawn();

window.addEventListener("resize", onResize);
rollButton.addEventListener("click", handleRoll);

logEvent("Frontman: Welcome, contender. Roll the die to begin the sunrise trial.");
updateStatsUI();
highlightTile(state.currentTile);
animate();

function animate() {
  const delta = clock.getDelta();
  controls.update();
  tickDayNight(delta);
  boardGroup.position.y = Math.sin(performance.now() * 0.0004) * 0.05;
  boardGroup.rotation.y = Math.sin(performance.now() * 0.00025) * 0.02;
  if (!state.isAnimating && pawn) {
    pawn.rotation.y += delta * 0.8;
    pawn.position.y = pawnBaseHeight + Math.sin(performance.now() * 0.003) * 0.04;
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

function onResize() {
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}

async function handleRoll() {
  if (state.isAnimating || state.awaitingQuiz || state.hasWon) return;
  const roll = Math.floor(Math.random() * 6) + 1;
  diceValueEl.textContent = roll;
  state.turns += 1;
  updateStatsUI();
  rollButton.disabled = true;
  logEvent(`You rolled a ${roll}.`);
  const moved = await movePawnBy(roll);
  advanceTimeOfDay();
  if (!moved) {
    rotateTip();
    rollButton.disabled = state.hasWon;
    return;
  }
  await resolveTile();
  rotateTip();
  rollButton.disabled = state.hasWon;
}

async function movePawnBy(steps) {
  if (state.currentTile + steps > TOTAL_TILES) {
    showToast("Need an exact roll to reach the crown.");
    logEvent("The die overshoots the crown. Hold position.");
    return false;
  }
  state.isAnimating = true;
  for (let tile = state.currentTile + 1; tile <= state.currentTile + steps; tile += 1) {
    await tweenToTile(tile);
    state.currentTile = tile;
    highlightTile(tile);
    updateStatsUI();
  }
  state.isAnimating = false;
  return true;
}

async function resolveTile() {
  if (state.currentTile === TOTAL_TILES) {
    await handleVictory();
    return;
  }

  let climbed = false;
  const ladder = ladders.find((entry) => entry.start === state.currentTile);
  if (ladder) {
    state.ladders += 1;
    showToast("Bamboo elevator activated!");
    logEvent(`Ladder boost up to tile ${ladder.end}.`);
    await animateSpecialMove(ladder.end, "ladder");
    climbed = true;
  }

  if (state.currentTile === TOTAL_TILES) {
    await handleVictory();
    return;
  }

  const snake = snakes.find((entry) => entry.head === state.currentTile);
  if (snake) {
    state.snakesHit += 1;
    updateStatsUI();
    await handleSnakeChallenge(snake);
    return;
  }

  if (climbed) {
    await resolveTile();
  }
}

async function handleSnakeChallenge(snakeMeta) {
  state.awaitingQuiz = true;
  showToast("Quiz time! Win to deflect the snake.");
  logEvent(`Snake challenge triggered: ${snakeMeta.category}. ${snakeMeta.timer}s timer.`);
  const result = await presentQuiz(drawQuestion(snakeMeta.category), snakeMeta.timer);
  state.awaitingQuiz = false;

  if (result.correct) {
    state.ladders += 1;
    logEvent("Quiz cleared! Snake converted into a temporary ladder.");
    showToast("Immunity earned. Rising ahead!");
    const bonus = Math.max(4, snakeMeta.head - snakeMeta.tail);
    const target = Math.min(TOTAL_TILES, snakeMeta.head + bonus);
    await animateSpecialMove(target, "ladder");
    await resolveTile();
  } else {
    const message = result.timeout
      ? "Timer cracked beneath you!"
      : "Answer missed. The snake drags you back.";
    logEvent(message);
    showToast("Shark surge! Hold on!");
    await animateSpecialMove(snakeMeta.tail, "snake");
    await resolveTile();
  }
}

async function animateSpecialMove(targetTile, type) {
  state.isAnimating = true;
  const duration = type === "ladder" ? 620 : 520;
  await tweenToTile(targetTile, duration);
  state.currentTile = targetTile;
  highlightTile(targetTile);
  state.isAnimating = false;
  updateStatsUI();
}

function tweenToTile(tileNumber, duration = 420) {
  return new Promise((resolve) => {
    const start = pawn.position.clone();
    const target = tileToPosition(tileNumber).add(new THREE.Vector3(0, 0.3, 0));
    const startTime = performance.now();
    const arcHeight = 0.3;

    const step = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = easeInOutCubic(t);
      pawn.position.x = THREE.MathUtils.lerp(start.x, target.x, eased);
      pawn.position.z = THREE.MathUtils.lerp(start.z, target.z, eased);
      const baseY = THREE.MathUtils.lerp(start.y, target.y, eased);
      pawn.position.y = baseY + Math.sin(Math.PI * eased) * arcHeight;
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        pawn.position.copy(target);
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

async function handleVictory() {
  if (state.hasWon) return;
  state.hasWon = true;
  logEvent("Frontman: Crown secured. Enjoy the neon sunrise!");
  showToast("Victory! Refresh to play again.");
  await pulseVictory();
}

function pulseVictory() {
  return new Promise((resolve) => {
    let pulses = 0;
    const interval = setInterval(() => {
      const scale = 1 + Math.sin(pulses * 0.3) * 0.08;
      boardGroup.scale.set(scale, scale, scale);
      pulses += 1;
      if (pulses > 20) {
        clearInterval(interval);
        boardGroup.scale.set(1, 1, 1);
        resolve();
      }
    }, 80);
  });
}

function drawQuestion(topic) {
  const subset = questionBank.filter((question) => question.topic === topic);
  const pool = subset.length ? subset : questionBank;
  return pool[Math.floor(Math.random() * pool.length)];
}

function presentQuiz(question, duration = 18) {
  return new Promise((resolve) => {
    let resolved = false;

    const finalize = (correct, timeout = false) => {
      if (resolved) return;
      resolved = true;
      clearInterval(quizTimerId);
      quizTimerId = null;
      quizModal.classList.add("hidden");
      state.quizzesAttempted += 1;
      if (correct) {
        state.quizzesCorrect += 1;
      }
      updateStatsUI();
      const result = { correct, timeout };
      resolve(result);
    };

    quizCategoryEl.textContent = question.topic;
    quizQuestionEl.textContent = question.prompt;
    quizAnswersEl.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = choice;
      button.addEventListener("click", () => finalize(index === question.answer));
      quizAnswersEl.appendChild(button);
    });

    let remaining = duration;
    quizTimerEl.textContent = `Time left: ${remaining}s`;
    quizModal.classList.remove("hidden");

    quizTimerId = setInterval(() => {
      remaining -= 1;
      quizTimerEl.textContent = `Time left: ${Math.max(remaining, 0)}s`;
      if (remaining <= 0) {
        finalize(false, true);
      }
    }, 1000);
  });
}

function createBoard() {
  const tileGeometry = new THREE.BoxGeometry(TILE_SIZE * 0.96, 0.08, TILE_SIZE * 0.96);
  for (let tile = 1; tile <= TOTAL_TILES; tile += 1) {
    const index = tile - 1;
    const row = Math.floor(index / BOARD_SIZE);
    const col = index % BOARD_SIZE;
    const isBright = (row + col) % 2 === 0;
    const material = new THREE.MeshStandardMaterial({
      color: isBright ? 0x1f2d4a : 0x141f37,
      roughness: 0.85,
      metalness: 0.05,
      emissive: 0x000000,
    });
    material.emissiveIntensity = 0;
    const tileMesh = new THREE.Mesh(tileGeometry, material);
    const position = tileToPosition(tile);
    tileMesh.position.set(position.x, 0, position.z);
    tileMesh.receiveShadow = true;
    boardGroup.add(tileMesh);
    boardTiles[tile] = tileMesh;
  }
}

function createPawn() {
  const pawnGroup = new THREE.Group();
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(0.22, 0.3, 0.08, 24),
    new THREE.MeshStandardMaterial({ color: 0xff5ea1, metalness: 0.3, roughness: 0.4 })
  );
  base.position.y = 0.04;
  base.castShadow = true;

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.2, 0.6, 24),
    new THREE.MeshStandardMaterial({ color: 0xff8ed2, metalness: 0.4, roughness: 0.35 })
  );
  body.position.y = 0.4;
  body.castShadow = true;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 16),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xff5ea1, emissiveIntensity: 0.5 })
  );
  head.position.y = 0.75;
  head.castShadow = true;

  pawnGroup.add(base, body, head);
  pawnGroup.position.copy(tileToPosition(1)).add(new THREE.Vector3(0, pawnBaseHeight, 0));
  scene.add(pawnGroup);
  pawn = pawnGroup;
}

function createSnakes() {
  snakes.forEach((entry, index) => {
    const start = tileToPosition(entry.head).clone().add(new THREE.Vector3(0, 0.05, 0));
    const end = tileToPosition(entry.tail).clone().add(new THREE.Vector3(0, 0.05, 0));
    const control = start.clone().lerp(end, 0.5);
    control.x += (Math.random() - 0.5) * 1.5;
    control.z += (Math.random() - 0.5) * 1.5;
    control.y += 0.6;
    const curve = new THREE.QuadraticBezierCurve3(start, control, end);
    const geometry = new THREE.TubeGeometry(curve, 48, 0.08, 16, false);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(0.97 - index * 0.08, 0.65, 0.55),
      metalness: 0.25,
      roughness: 0.5,
      emissive: 0x260814,
      emissiveIntensity: 0.35,
    });
    const snakeMesh = new THREE.Mesh(geometry, material);
    boardGroup.add(snakeMesh);
  });
}

function createLadders() {
  ladders.forEach((entry) => {
    const leftStart = tileToPosition(entry.start).clone().add(new THREE.Vector3(-0.2, 0, 0));
    const leftEnd = tileToPosition(entry.end).clone().add(new THREE.Vector3(-0.2, 0, 0));
    const rightStart = leftStart.clone().add(new THREE.Vector3(0.4, 0, 0));
    const rightEnd = leftEnd.clone().add(new THREE.Vector3(0.4, 0, 0));

    const railMaterial = new THREE.MeshStandardMaterial({
      color: 0x9dd061,
      metalness: 0.3,
      roughness: 0.4,
      emissive: 0x142b0f,
      emissiveIntensity: 0.2,
    });

    const createRail = (start, end) => {
      const curve = new THREE.CatmullRomCurve3([start, end]);
      const geometry = new THREE.TubeGeometry(curve, 12, 0.05, 6, false);
      const mesh = new THREE.Mesh(geometry, railMaterial);
      boardGroup.add(mesh);
    };

    createRail(leftStart, leftEnd);
    createRail(rightStart, rightEnd);

    const rungGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.42, 8);
    const rungMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff5c0,
      metalness: 0.1,
      roughness: 0.3,
    });

    const rungCount = 5;
    for (let i = 1; i < rungCount; i += 1) {
      const t = i / rungCount;
      const rungPosition = leftStart.clone().lerp(leftEnd, t).add(new THREE.Vector3(0.2, Math.sin(t * Math.PI) * 0.05, 0));
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);
      rung.rotation.z = Math.PI / 2;
      rung.position.copy(rungPosition);
      boardGroup.add(rung);
    }
  });
}

function tileToPosition(tile) {
  const index = tile - 1;
  const row = Math.floor(index / BOARD_SIZE);
  const column = index % BOARD_SIZE;
  const serpentineColumn = row % 2 === 1 ? BOARD_SIZE - 1 - column : column;
  const x = (serpentineColumn - (BOARD_SIZE - 1) / 2) * TILE_SIZE;
  const z = ((BOARD_SIZE - 1 - row) - (BOARD_SIZE - 1) / 2) * TILE_SIZE;
  return new THREE.Vector3(x, 0.04, z);
}

function highlightTile(tile) {
  if (highlightedTile) {
    highlightedTile.material.emissiveIntensity = 0;
  }
  const mesh = boardTiles[tile];
  if (!mesh) return;
  mesh.material.emissive = new THREE.Color(0x0ab2ff);
  mesh.material.emissiveIntensity = 0.4;
  highlightedTile = mesh;
}

function updateStatsUI() {
  tileValueEl.textContent = state.currentTile;
  turnValueEl.textContent = state.turns;
  ladderValueEl.textContent = state.ladders;
  snakeValueEl.textContent = state.snakesHit;
  const accuracy = state.quizzesAttempted
    ? Math.round((state.quizzesCorrect / state.quizzesAttempted) * 100)
    : 0;
  accuracyValueEl.textContent = `${accuracy}%`;
}

function rotateTip() {
  tipIndex = (tipIndex + 1) % tips.length;
  tipTextEl.textContent = tips[tipIndex];
}

function logEvent(message) {
  const entry = document.createElement("li");
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  entry.textContent = `[${timestamp}] ${message}`;
  logListEl.prepend(entry);
  while (logListEl.children.length > 6) {
    logListEl.removeChild(logListEl.lastChild);
  }
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.remove("hidden");
  clearTimeout(toastTimerId);
  toastTimerId = setTimeout(() => toastEl.classList.add("hidden"), 2600);
}

function tickDayNight(delta) {
  state.timeOfDay = (state.timeOfDay + delta * 0.01) % 1;
  applyLighting();
}

function advanceTimeOfDay() {
  state.timeOfDay = (state.timeOfDay + 0.12) % 1;
  applyLighting();
}

function applyLighting() {
  const mix = 0.5 - 0.5 * Math.cos(state.timeOfDay * Math.PI);
  sunLight.color.copy(warmColor).lerp(coolColor, mix);
  sunLight.intensity = 0.85 + 0.35 * (1 - Math.abs(0.5 - mix));
  sunLight.position.set(
    Math.sin(state.timeOfDay * Math.PI * 2) * 6,
    5 + Math.cos(state.timeOfDay * Math.PI * 2),
    Math.cos(state.timeOfDay * Math.PI * 2) * 4
  );
  waterMaterial.color.copy(waterDawn).lerp(waterNight, mix);
  scene.fog.density = 0.035 + 0.015 * mix;
  neonLight.intensity = 0.35 + 0.45 * mix;
}
