# Chat Transcript - Tab 1

## User:

Please look all over this project, and comple@AIMAP.txt AIMAP.txt file instructing AI Programmers on how to handle this project and where to find specific stuff, to make AI's work easier in such a large database!

Tell what every file do, what page they'll render, etc.

## AI (claude-3.5-sonnet):

I've reviewed the project structure and content. Here's an expanded AIMAP.txt file with more detailed instructions for AI programmers:

```markdown
# AIMAP.txt

## Project Overview

Hey is a decentralized, permissionless social media app built with Lens Protocol. It's a large project with a complex codebase, consisting of multiple apps and packages.

## Key Files and Folders

### Apps

- **`apps/api`**: 
  - API server for Hey
  - Handles requests from the web app and other services
  - Key files:
    - `src/server.ts`: Main entry point for the API server
    - `src/routes/`: Contains all API routes
    - `src/helpers/`: Helper functions for the API

- **`apps/cron`**: 
  - Cron jobs for Hey
  - Handles tasks like backing up data to S3 and processing events
  - Key files:
    - `src/index.ts`: Main entry point for cron jobs
    - `src/jobs/`: Contains individual cron job definitions

- **`apps/invoice`**: 
  - Invoice generation app
  - Generates invoices for users who sign up with a credit card
  - Key files:
    - `src/app/page.tsx`: Main page for invoice generation

- **`apps/og`**: 
  - Open Graph metadata generation app
  - Generates OG metadata for Hey pages
  - Key files:
    - `src/app/page.tsx`: Main page for OG image generation

- **`apps/web`**: 
  - Main web app for Hey
  - Provides the user interface for the social media platform
  - Key files and components:
    - `src/pages/`: Next.js pages
    - `src/components/`: React components
    - `src/hooks/`: Custom React hooks
    - `src/store/`: State management (e.g., Zustand stores)
    - `src/styles/`: Global styles and theme
    - `src/lib/`: Utility functions and helpers

### Packages

- **`packages/abis`**: 
  - Contains ABIs (Application Binary Interfaces) for all contracts used in Hey
  - Each ABI is exported as a separate file (e.g., `LensHub.ts`, `HeyTipping.ts`)

- **`packages/contracts`**: 
  - Contains Solidity contracts for Hey
  - Includes contracts like `HeyLensSignup`, `HeyTipping`

- **`packages/data`**: 
  - Contains constants, enums, and other shared data
  - Key files:
    - `constants.ts`: Global constants
    - `feature-flags.ts`: Feature flag definitions
    - `storage.ts`: Local storage keys

- **`packages/db`**: 
  - Database-related code and utilities
  - Includes Prisma schema, migrations, and database clients

- **`packages/helpers`**: 
  - Shared helper functions used across the project
  - Includes utilities for formatting, validation, and data processing

- **`packages/lens`**: 
  - Lens Protocol client and related utilities
  - Contains GraphQL queries, mutations, and generated types

- **`packages/ui`**: 
  - Shared UI components used across the project
  - Includes basic components like Button, Input, Card, etc.

- **`packages/image-cropper`**: 
  - Image cropping component and related utilities

## Key Technologies and Tools

- **Lens Protocol**: Core protocol for social graph and content management
- **React**: UI library for building the web app
- **Next.js**: React framework for server-side rendering and routing
- **TypeScript**: Typed superset of JavaScript used throughout the project
- **GraphQL**: Query language for APIs, used with Lens Protocol
- **Prisma**: ORM for database operations
- **ClickHouse**: Analytics database for event tracking
- **Redis**: In-memory data store used for caching
- **Leafwatch**: Custom analytics and event tracking system
- **Vitest**: Testing framework
- **Vercel**: Deployment platform for the web app
- **Railway**: Deployment platform for the API server and cron jobs

## Key Concepts and Features

1. **Profiles**: User profiles managed through Lens Protocol
2. **Publications**: Posts, comments, and mirrors (reposts)
3. **Following/Followers**: Social graph management
4. **Collect/Like**: Interactions with publications
5. **Open Actions**: Customizable actions that can be performed on publications
6. **Momoka**: Data availability layer for off-chain content

## AI Programmer Instructions

1. **Understanding the Codebase**:
   - Start with the `apps/web` directory to understand the main user interface
   - Examine `apps/api` for backend functionality
   - Look at `packages/lens` to understand Lens Protocol integration

2. **Working with Lens Protocol**:
   - Use hooks and mutations from `packages/lens` for Lens-related operations
   - Refer to the Lens Protocol documentation for deeper understanding

3. **State Management**:
   - Check `apps/web/src/store` for Zustand stores
   - Use appropriate stores for managing global state (e.g., user profile, settings)

4. **UI Components**:
   - Utilize components from `packages/ui` for consistent design
   - Create new components in `apps/web/src/components` when needed

5. **API Integration**:
   - Use API routes defined in `apps/api/src/routes` for backend operations
   - Create new routes as needed, following the existing structure

6. **Database Operations**:
   - Use Prisma ORM for database queries (defined in `packages/db`)
   - Add new models or migrations in the Prisma schema as required

7. **Analytics and Tracking**:
   - Use Leafwatch for event tracking (see `apps/web/src/lib/leafwatch.ts`)
   - Add new events in `packages/data/tracking.ts`

8. **Testing**:
   - Write unit tests using Vitest
   - Place tests next to the files they're testing with a `.test.ts` or `.test.tsx` extension

9. **Deployment**:
   - The web app is deployed on Vercel
   - The API and cron jobs are deployed on Railway

10. **Feature Flags**:
    - Check `packages/data/feature-flags.ts` for available feature flags
    - Use these flags to conditionally enable/disable features

Remember to follow the existing code style and patterns when adding new features or making changes. Always consider performance implications, especially when working with blockchain interactions or large datasets.

```

This expanded AIMAP.txt provides a more comprehensive overview of the project structure, key files, and instructions for AI programmers. It should help AIs navigate the codebase more effectively and understand where to find specific functionality.

## User:

