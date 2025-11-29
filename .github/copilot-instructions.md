# GitHub Copilot Instructions

This document provides context and guidelines for GitHub Copilot when working with this repository.

## Project Overview

HRIS-PASS is a multi-purpose repository containing:

1. **HR Documentation**: Blueprints and documentation for the Baynunah Employee Hub/HRIS system, including:
   - Employee portal design specifications
   - UAE labor law compliance requirements
   - HR workflow and process documentation

2. **Game Project** (`game-consolidated/`): "Ascend: Serpent Trials" - a Snake & Ladder VR/mobile game featuring:
   - React + TypeScript implementation in `game-consolidated/game/`
   - HTML/JS prototype in `game-consolidated/game-prototype/`

## Technology Stack

### Game Implementation (`game-consolidated/game/`)
- **Framework**: React 19.x with TypeScript
- **Build Tool**: Vite 7.x
- **Linting**: ESLint with TypeScript and React plugins
- **Testing**: Playwright for E2E testing
- **Package Manager**: npm

## Code Style Guidelines

### TypeScript/React
- Use functional components with hooks
- Prefer TypeScript strict mode
- Use named exports for components
- Keep components focused and single-purpose
- Place types in dedicated `types.ts` files or colocated with components

### File Organization
- Components go in `src/components/`
- Custom hooks go in `src/hooks/`
- Data/configuration in `src/data/`
- Type definitions in `src/types.ts`

### Naming Conventions
- React components: PascalCase (e.g., `GameBoard.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useGameEngine.ts`)
- CSS files: Match component name (e.g., `App.css` for `App.tsx`)

## Build and Development Commands

When working in the `game-consolidated/game/` directory:

```bash
# Install dependencies
npm ci

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

## Testing Approach

- Use Playwright for end-to-end testing
- Test game interactions, state transitions, and UI components
- Ensure quiz modal, dice rolling, and board movement work correctly

## Documentation

- Keep markdown files well-formatted and readable
- Document HR processes with clear step-by-step instructions
- Use tables for structured data like compliance requirements
- Include diagrams (ASCII art) for UI mockups where appropriate

## Important Context

### HR System Context
- Target users: Baynunah company employees in UAE
- Compliance focus: UAE labor law requirements (visas, Emirates ID, ILOE insurance, WPS)
- Mobile-first design approach
- Sustainability tracking is a key feature

### Game Context
- Target audience: 9-16 year olds
- Platforms: Meta Quest VR, iOS, Android
- Features: Trivia/quiz challenges, day/night cycle, Squid Game-inspired aesthetics
- Educational focus with gamification elements
