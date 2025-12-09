# Bonding Game

This directory contains the "Bonding Game" feature - an interactive social experience that combines garden caretaking and cinema lounge activities with real-time world synchronization.

## Overview

The Bonding Game is a multiplayer social feature that allows players to:
- **Garden**: Tend to virtual plants and watch them grow
- **Cinema Lounge**: Watch content together with other players
- **World Synchronization**: Share a persistent world state across sessions

## Directory Structure

```
bonding-game/
├── src/
│   ├── components/
│   │   ├── garden/           # Garden-related UI components
│   │   │   ├── CaretakerPanel.tsx
│   │   │   └── GardenView.tsx
│   │   └── cinema/           # Cinema lounge components
│   │       ├── CinemaBucketList.tsx
│   │       ├── CinemaLounge.tsx
│   │       └── HyperbeamEmbed.tsx
│   ├── api/                  # API client modules
│   │   └── worldClient.ts
│   ├── hooks/                # Custom React hooks
│   │   └── useWorldSync.ts
│   ├── utils/                # Utility functions
│   │   └── session.ts
│   └── state/                # State management
│       ├── types.ts
│       ├── useGameStore.ts
│       └── defaultWorld.ts
├── server/                   # Server-side code
│   ├── index.ts
│   └── worldStore.ts
├── types/                    # TypeScript type definitions
│   └── hyperbeam.d.ts
├── .env.example              # Environment variables template
├── tsconfig.server.json      # Server TypeScript config
├── tsconfig.json            # Client TypeScript config (React)
├── package.json              # Project dependencies
├── vite.config.ts            # Vite build configuration
└── README.md                 # This file
```

## New Files

The following new files are part of this feature:

### Components
- **`src/components/garden/CaretakerPanel.tsx`** - Panel for managing garden activities
- **`src/components/cinema/CinemaBucketList.tsx`** - List of movies/content to watch
- **`src/components/cinema/HyperbeamEmbed.tsx`** - Embedded Hyperbeam browser component

### API & Hooks
- **`src/api/worldClient.ts`** - Client for world state API calls
- **`src/hooks/useWorldSync.ts`** - Hook for synchronizing world state

### Utilities & Server
- **`src/utils/session.ts`** - Session management utilities
- **`server/worldStore.ts`** - Server-side world state persistence

### Configuration & Types
- **`types/hyperbeam.d.ts`** - TypeScript definitions for Hyperbeam integration
- **`.env.example`** - Template for required environment variables
- **`tsconfig.server.json`** - TypeScript configuration for server code

## Updated/Merged Files

The following existing files have been updated to integrate with the bonding game:

### Core Application
- **`src/App.tsx`** - Updated to include bonding game routes/components
- **`src/App.css`** - Updated styles for bonding game UI

### Components
- **`src/components/garden/GardenView.tsx`** - Enhanced garden view with new features
- **`src/components/cinema/CinemaLounge.tsx`** - Enhanced cinema lounge functionality

### State Management
- **`src/state/types.ts`** - Added types for bonding game state
- **`src/state/useGameStore.ts`** - Extended store with bonding game state
- **`src/state/defaultWorld.ts`** - Default world state configuration

### Server & Configuration
- **`server/index.ts`** - Server endpoints for world synchronization
- **`tsconfig.server.json`** - Server TypeScript configuration
- **`package.json`** - Dependencies for Hyperbeam and server features
- **`package-lock.json`** - Locked dependency versions

### Documentation
- **`README.md`** - Updated with bonding game information

## Technology Stack

### Frontend
- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Hyperbeam** - Embedded browser for shared content viewing

### Backend
- **Node.js** - Server runtime
- **Express** - Web server framework
- **World Store** - Custom persistent state management

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Environment Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Configure required environment variables:
   ```
   HYPERBEAM_API_KEY=your_api_key_here
   WORLD_API_URL=your_world_api_url
   ```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend server (if separate)
npm run dev:server
```

## Features

### Garden Caretaker
- Plant and grow virtual plants
- Water and tend to your garden
- Share garden state with other players
- View other players' gardens

### Cinema Lounge
- Browse content bucket list
- Watch videos together in real-time
- Chat while watching (via Hyperbeam)
- Synchronized playback across all viewers

### World Synchronization
- Persistent world state
- Real-time updates across clients
- Session management
- Conflict resolution

## API Integration

### World Client
The `worldClient` module handles all API communication:
- Fetching world state
- Updating world state
- Session management
- Real-time sync

### Hyperbeam Integration
Hyperbeam provides embedded browser functionality:
- Shared viewing sessions
- Real-time interaction
- Multi-user controls

## Development Notes

### State Management
The bonding game extends the existing game store with:
- Garden state (plants, growth stages)
- Cinema state (current video, viewers)
- World state (global shared data)
- Session state (user sessions, connections)

### Server Architecture
The server provides:
- RESTful API endpoints for world state
- WebSocket connections for real-time updates (future)
- Persistent storage for world data
- Session validation and management

## Future Enhancements

- [ ] Add WebSocket support for real-time updates
- [ ] Implement garden progression system
- [ ] Add more cinema features (chat, reactions)
- [ ] Expand world state capabilities
- [ ] Add achievement system
- [ ] Implement social features (friends, invites)

## Source Location

These files were originally developed under `/workspace/replit-world/` and have been organized into this structure for better maintainability and integration with the main game project.

---

*Last updated: 2025-12-06*
