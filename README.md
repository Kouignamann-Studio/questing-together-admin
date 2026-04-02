# Questing Together — Admin Portal

Web dashboard to manage game content and monitor rooms for the Questing Together mobile RPG.

## Getting Started

```bash
bun install
bun run dev
```

Opens at `http://localhost:5173`.

## Scripts

| Script | Description |
| --- | --- |
| `bun run dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build |

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **UI**: shadcn/ui + Tailwind CSS v4
- **State**: TanStack Query
- **Routing**: React Router
- **Backend**: Supabase (shared with mobile app)
- **Linting**: Biome
- **Package manager**: Bun

## VFX Tooling

The `/vfx` page now wraps a standalone static VFX tool served from `public/vfx-editor/`.

- The standalone editor is hosted by the admin app.
- The actual game assets are read and updated by linking the game repo root through the browser's File System Access API.
- Quick load, sprite import, and registry regeneration now target the linked game repo instead of files inside this admin repo.

## Adding shadcn Components

```bash
npx shadcn@latest add <component-name>
```

Components are added to `src/components/ui/`. See available components at https://ui.shadcn.com.

## Project Structure

```
src/
├── api/            — Supabase client, query client
├── components/
│   ├── ui/         — shadcn/ui components (auto-generated)
│   └── Layout.tsx  — app shell with sidebar
├── constants/      — shared constants
├── context/        — React contexts
├── features/       — feature modules
├── hooks/          — custom hooks
├── lib/            — utilities (shadcn utils)
├── pages/          — route pages
│   ├── DashboardPage.tsx
│   ├── BiomesPage.tsx
│   ├── EnemiesPage.tsx
│   ├── RiddlesPage.tsx
│   ├── ShopPage.tsx
│   ├── CombatSettingsPage.tsx
│   └── RoomsPage.tsx
├── types/          — TypeScript types
└── utils/          — utilities
```

## Environment Variables

Create a `.env` file:

```
VITE_SUPABASE_URL=https://jjomkrlwakrtshdnsrtu.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Supabase

This admin portal connects to the same Supabase project as the mobile app (`jjomkrlwakrtshdnsrtu`). Game content (biomes, enemies, riddles, shop items) is currently stored as TS files in the mobile repo (`src/content/`). The plan is to migrate this content to Supabase tables managed through this portal.
