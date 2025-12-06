# Updated Files Documentation

This document describes the files that have been updated or will need to be merged to integrate the bonding game feature with the main game.

## Core Application Updates

### src/App.tsx
**Changes Required:**
- Add routing for bonding game features (garden, cinema)
- Import and integrate bonding game components
- Add navigation to bonding game sections
- Initialize world sync on app start

### src/App.css
**Changes Required:**
- Add styles for bonding game UI elements
- Garden panel styles
- Cinema lounge styles
- Responsive layouts for new features

## Component Updates

### src/components/garden/GardenView.tsx
**Changes Required:**
- Integrate CaretakerPanel component
- Add world sync for garden state
- Display real-time garden updates
- Handle multi-user interactions

### src/components/cinema/CinemaLounge.tsx
**Changes Required:**
- Integrate CinemaBucketList component
- Integrate HyperbeamEmbed component
- Add session management
- Handle viewer interactions

## State Management Updates

### src/state/types.ts
**Changes Required:**
- Add GardenState type definition
- Add CinemaState type definition
- Add WorldState type definition
- Add SessionState type definition
- Extend existing GameState with bonding features

### src/state/useGameStore.ts
**Changes Required:**
- Add garden state slice
- Add cinema state slice
- Add world state slice
- Add session state slice
- Add actions for bonding game features
- Integrate with useWorldSync hook

### src/state/defaultWorld.ts
**Changes Required:**
- Define default garden configuration
- Define default cinema configuration
- Define default world state
- Add reset functionality for bonding features

## Server Updates

### server/index.ts
**Changes Required:**
- Add REST API endpoints for world state
  - GET /api/world - Get current world state
  - POST /api/world - Update world state
  - GET /api/sessions - Get active sessions
  - POST /api/sessions - Create new session
  - DELETE /api/sessions/:id - End session
- Add middleware for session validation
- Integrate worldStore module
- Add error handling for API routes

## Configuration Updates

### tsconfig.server.json
**Changes Required:**
- Configure TypeScript for server code
- Set module resolution for Node.js
- Add type definitions path
- Configure build output directory

### package.json
**Changes Required:**
- Add Hyperbeam SDK dependency
- Add server dependencies (Express, etc.)
- Add WebSocket library (optional, for future real-time features)
- Add development scripts for running server
- Update build scripts to include server build

### package-lock.json
**Changes Required:**
- Lock versions for new dependencies
- Ensure compatibility across packages

## Documentation Updates

### README.md (Root)
**Changes Required:**
- Add bonding game section
- Document new features (garden, cinema)
- Add setup instructions for server
- Add environment variables documentation
- Update architecture diagram (if any)

---

## Integration Checklist

When integrating these files, ensure:

- [ ] All imports are properly resolved
- [ ] Types are consistent across files
- [ ] State management is properly connected
- [ ] API endpoints are documented
- [ ] Error handling is comprehensive
- [ ] Environment variables are documented
- [ ] Tests are updated/added (if applicable)
- [ ] Documentation is updated
- [ ] Build process includes all new files
- [ ] Development workflow is documented

## Migration Notes

If these files are coming from `/workspace/replit-world/`, you may need to:

1. Update import paths to match the new structure
2. Verify all dependencies are listed in package.json
3. Check for any Replit-specific configurations that need adjustment
4. Update any hardcoded URLs or paths
5. Ensure environment variables are properly configured
6. Test the integration thoroughly

---

*This documentation should be updated as files are integrated.*
