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

- Use the `AIMAP.txt` file to understand the project structure and key files.
- Use the keywords to help you find relevant information.
- Use the `packages/lens` package to interact with the Lens Protocol.
- Use the `packages/db` package to interact with the database.
- Use the `packages/helpers` package for helper functions.
- Use the `packages/ui` package for UI components.
- Use the `packages/image-cropper` package for image cropping.
- Use the `apps/web` app for the main user interface.
- Use the `apps/api` app for the API server.
- Use the `apps/cron` app for cron jobs.
- Use the `apps/invoice` app for invoice generation.
- Use the `apps/og` app for Open Graph metadata generation.

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

- **Lens Protocol:** - Use the `packages/lens` package to interact with the Lens Protocol. - Use the `useProfileQuery` hook to fetch a profile by ID or handle. - Use the `usePublicationsQuery` hook to fetch publications by profile ID or publication ID. - Use the `useSearchProfilesQuery` hook to search for profiles. - Use the `useSearchPublicationsQuery` hook to search for publications. - Use the `useCreateProfileWithHandle` mutation to create a new profile with a handle. - Use the `useFollowMutation` mutation to follow a profile. - Use the `useUnfollowMutation` mutation to unfollow a profile. - Use the `useBlockMutation` mutation to block a profile. - Use the `useUnblockMutation` mutation to unblock a profile. - Use the `useAddReactionMutation` mutation to like a publication. - Use the `useRemoveReactionMutation` mutation to unlike a publication. - Use the `useMirrorOnchainMutation` mutation to mirror a publication. - Use the `useCommentOnchainMutation` mutation to comment on a publication. - Use the `useQuoteOnchainMutation` mutation to quote a publication. - Use the `useSetProfileMetadataMutation` mutation to update a profile's metadata. - Use the `useCreateOnchainSetProfileMetadataTypedDataMutation` mutation to generate a typed data for updating a profile's metadata. - Use the `useCreateFollowTypedDataMutation` mutation to generate a typed data for following a profile. - Use the `useCreateUnfollowTypedDataMutation` mutation to generate a typed data for unfollowing a profile. - Use the `useCreateBlockProfilesTypedDataMutation` mutation to generate a typed data for blocking a profile. - Use the `useCreateUnblockProfilesTypedDataMutation` mutation to generate a typed data for unblocking a profile. - Use the `useCreateOnchainPostTypedDataMutation` mutation to generate a typed data for creating a new post. - Use the `useCreateOnchainCommentTypedDataMutation` mutation to generate a typed data for creating a new comment. - Use the `useCreateOnchainQuoteTypedDataMutation` mutation to generate a typed data for creating a new quote. - Use the `useBroadcastOnchainMutation` mutation to broadcast a signed typed data to the Lens Protocol. - Use the `useActOnOpenActionMutation` mutation to act on an open action module. - Use the `useCreateActOnOpenActionTypedDataMutation` mutation to generate a typed data for acting on an open action module. - Use the `useProfileRecommendationsQuery` hook to fetch recommended profiles. - Use the `usePublicationBookmarksQuery` hook to fetch bookmarked publications. - Use the `useWhoHaveBlockedQuery` hook to fetch profiles that have blocked the current user. - Use the `useWhoActedOnPublicationQuery` hook to fetch profiles that have acted on a publication. - Use the `useProfileManagersQuery` hook to fetch the managers of a profile. - Use the `useProfileActionHistoryQuery` hook to fetch the action history of a profile. - Use the `useLatestPaidActionsQuery` hook to fetch the latest paid actions. - Use the `useModExplorePublicationsQuery` hook to fetch publications for moderation. - Use the `useModLatestReportsQuery` hook to fetch the latest moderation reports. - Use the `useSearchProfilesLazyQuery` hook to search for profiles. - Use the `useSearchPublicationsLazyQuery` hook to search for publications. - Use the `useOwnedHandlesQuery` hook to fetch the handles owned by an address. - Use the `useFollowRevenuesQuery` hook to fetch the revenue from follows. - Use the `useApprovedModuleAllowanceAmountQuery` hook to fetch the approved allowance amount for a module. - Use the `useGenerateModuleCurrencyApprovalDataQuery` hook to generate a typed data for approving a module. - Use the `useGenerateLensAPIRelayAddressQuery` hook to generate a Lens API relay address. - Use the `useLensTransactionStatusQuery` hook to fetch the status of a Lens transaction. - Use the `useCreateFrameTypedData` query to generate a typed data for a frame. - Use the `useVerifyFrameSignature` query to verify a frame signature. - Use the `useCurrentProfileQuery` hook to fetch the current user's profile. - Use the `useDefaultProfileQuery` hook to fetch the default profile for an address. - Use the `useProfileInterestsOptionsQuery` hook to fetch the available profile interests. - Use the `useStaffPicksQuery` hook to fetch staff picks. - Use the `useNftCollectionsQuery` hook to fetch NFT collections. - Use the `useNftCollectionOwnersQuery` hook to fetch the owners of an NFT collection. - Use the `useNftOwnershipChallenge` mutation to challenge NFT ownership. - Use the `useClaimProfileWithHandle` mutation to claim a profile with a handle. - Use the `useClaimTokens` mutation to claim tokens. - Use the `useChallenge` query to fetch a challenge for authentication. - Use the `useAuthenticate` mutation to authenticate a user. - Use the `useRefresh` mutation to refresh an access token. - Use the `useWalletAuthenticationToProfileAuthentication` mutation to convert a wallet authentication to a profile authentication. - Use the `useBroadcastOnMomoka` mutation to broadcast a signed typed data to Momoka. - Use the `useCommentOnMomoka` mutation to comment on a publication using Momoka. - Use the `useMirrorOnMomoka` mutation to mirror a publication using Momoka. - Use the `usePostOnMomoka` mutation to create a new post using Momoka. - Use the `useQuoteOnMomoka` mutation to quote a publication using Momoka. - Use the `useMomokaTransaction` query to fetch a Momoka transaction. - Use the `useMomokaTransactions` query to fetch Momoka transactions. - Use the `useMomokaSubmitters` query to fetch Momoka submitters. - Use the `useMomokaSummary` query to fetch Momoka summary. - Use the `useCreateMomokaCommentTypedData` mutation to generate a typed data for creating a new comment using Momoka. - Use the `useCreateMomokaMirrorTypedData` mutation to generate a typed data for mirroring a publication using Momoka. - Use the `useCreateMomokaPostTypedData` mutation to generate a typed data for creating a new post using Momoka. - Use the `useCreateMomokaQuoteTypedData` mutation to generate a typed data for quoting a publication using Momoka. - Use the `useBroadcastOnMomoka` mutation to broadcast a signed typed data to Momoka. - Use the `useDidReactOnPublication` query to check if a profile has reacted on a publication. - Use the `useWhoReactedPublication` query to fetch profiles that have reacted on a publication. - Use the `useGetProfileMetadata` query to fetch the metadata of a profile. - Use the `useGetModuleMetadata` query to fetch the metadata of a module. - Use the `useValidatePublicationMetadata` query to validate publication metadata. - Use the `useRefreshPublicationMetadata` mutation to refresh publication metadata. - Use the `useNftGalleriesQuery` hook to fetch NFT galleries. - Use the `useCreateNftGallery` mutation to create a new NFT gallery. - Use the `useUpdateNftGalleryInfo` mutation to update an NFT gallery's info. - Use the `useUpdateNftGalleryItems` mutation to update an NFT gallery's items. - Use the `useUpdateNftGalleryOrder` mutation to update an NFT gallery's item order. - Use the `useDeleteNftGallery` mutation to delete an NFT gallery. - Use the `useInternalAddCuratedTag` mutation to add a curated tag. - Use the `useInternalRemoveCuratedTag` mutation to remove a curated tag. - Use the `useInternalCuratedHandles` query to fetch curated handles. - Use the `useInternalCuratedTags` query to fetch curated tags. - Use the `useInternalCuratedUpdate` mutation to update curated handles or tags. - Use the `useInternalAddInvites` mutation to add invites. - Use the `useInternalInvites` query to fetch invites. - Use the `useInternalBoostProfile` mutation to boost a profile. - Use the `useInternalBoostScore` query to fetch a profile's boost score. - Use the `useInternalClaim` mutation to claim a profile. - Use the `useInternalClaimStatus` query to fetch the claim status of an address. - Use the `useInternalMintHandleAndProfile` mutation to mint a handle and profile. - Use the `useInternalNftIndex` mutation to index NFTs. - Use the `useInternalNftVerify` mutation to verify NFTs. - Use the `useInternalUpdateModuleOptions` mutation to update module options. - Use the `useInternalUpdateProfileStatus` mutation to update a profile's status. - Use the `useInternalAllowedDomains` query to fetch allowed domains. - Use the `useInternalAllowDomain` mutation to allow a domain. - Use the `useInternalForYouFeed` mutation to update the For You feed. - Use the `useInternalPaymentHandleInfo` query to fetch payment handle info. - Use the `useInternalProfileStatus` query to fetch a profile's status. - Use the `useInternalNftIndex` mutation to index NFTs. - Use the `useInternalNftVerify` mutation to verify NFTs. - Use the `useInternalUpdateModuleOptions` mutation to update module options. - Use the `useInternalUpdateProfileStatus` mutation to update a profile's status. - Use the `useIdKitPhoneVerifyWebhook` mutation to verify a phone number using IDKit. - Use the `useNftOwnershipCondition` condition to check if a profile owns an NFT. - Use the `useEoaOwnershipCondition` condition to check if a profile owns an EOA. - Use the `useErc20OwnershipCondition` condition to check if a profile owns an ERC20 token. - Use the `useProfileOwnershipCondition` condition to check if a profile owns a profile. - Use the `useCollectCondition` condition to check if a profile has collected a publication. - Use the `useFollowCondition` condition to check if a profile is following another profile. - Use the `useAdvancedContractCondition` condition to check if a contract function returns a specific value. - Use the `useAndCondition` condition to combine multiple conditions with AND logic. - Use the `useOrCondition` condition to combine multiple conditions with OR logic. - Use the `useCanDecrypt` query to check if a profile can decrypt a publication. - Use the `useCanClaim` query to check if an address can claim a profile. - Use the `useClaimableProfiles` query to fetch claimable profiles. - Use the `useClaimableTokens` query to fetch claimable tokens. - Use the `useClaimableStatus` query to fetch the claim status of an address. - Use the `useGetModuleMetadata` query to fetch the metadata of a module. - Use the `useGetProfileMetadata` query to fetch the metadata of a profile. - Use the `useValidatePublicationMetadata` query to validate publication metadata. - Use the `useRefreshPublicationMetadata` mutation to refresh publication metadata.
  Please look all over this project, and comple@AIMAP.txt AIMAP.txt file instructing AI Programmers on how to handle this project and where to find specific stuff, to make AI's work easier in such a large database!

Tell what every file do, what page they'll render, etc.

Final Codebase Context
I've reviewed the project structure and content. Here's an expanded AIMAP.txt file with more detailed instructions for AI programmers:

Remember to follow the existing code style and patterns when adding new features or making changes. Always consider performance implications, especially when working with blockchain interactions or large datasets.