# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Install dependencies**: `yarn`
- **Development server**: `yarn dev` (runs on http://localhost:5173/)
- **Build**: `yarn build` (includes TypeScript compilation)
- **Lint**: `yarn lint` (ESLint with TypeScript)
- **Generate GraphQL types**: `yarn codegen`

## GraphQL Architecture

This project uses GraphQL with code generation:

- **GraphQL queries/mutations**: Located in `src/graphql/` directory
- **Generated types**: Auto-generated in `src/generated/` (DO NOT EDIT)
- **Schema endpoint**: Available at http://localhost:8080/graphql
- **Naming convention**: Use `select`/`create`/`update`/`delete` prefixes (e.g., `selectExercises`, `createComment`)

After modifying GraphQL files, always run `yarn codegen` to regenerate types and hooks.

## State Management

- **Global state**: Jotai atoms in `src/util/atoms.ts`
- **User authentication**: `userAtom` with session storage
- **JWT tokens**: `tokenAtom` with session storage
- **Exercise composition**: `composeAtom` with Immer for complex state updates
- **Exercise creation**: `createExerciseAtom` with localStorage persistence

## Component Architecture

- **Layout**: Main layout with responsive sidebar in `src/Layout.tsx`
- **Routing**: React Router with authentication guards in `src/App.tsx`
- **Reusable components**: Located in `src/components/`
- **Page components**: Located in `src/pages/`
- **Theme**: Material-UI theme system in `src/theme/`

## Key Dependencies

- **UI Framework**: Material-UI v6 with custom theming
- **State Management**: Jotai with Immer integration
- **GraphQL**: Apollo Client with TypeScript code generation
- **Routing**: React Router v6
- **Forms**: Formik for form handling
- **Drag & Drop**: @dnd-kit for exercise composition
- **Firebase**: Authentication and cloud functions (in `functions/` directory)

## File Organization

- `src/components/`: Reusable React components
- `src/pages/`: Page-level components
- `src/generated/`: Auto-generated GraphQL types (DO NOT EDIT)
- `src/graphql/`: GraphQL query/mutation definitions
- `src/util/`: Utility functions, atoms, and hooks
- `src/theme/`: Material-UI theme configuration
- `functions/`: Firebase Cloud Functions (separate Node.js project)

## Development Workflow

1. Write GraphQL queries in `src/graphql/`
2. Run `yarn codegen` to generate TypeScript types
3. Use generated hooks in React components
4. Always run `yarn lint` before committing changes
5. Use the GraphQL playground at the API endpoint for testing queries

## Authentication

- JWT-based authentication with session storage
- Unauthenticated users are redirected to login/register
- User data is stored in `userAtom` with type safety from generated GraphQL types