# Questing Together — Admin Portal

## Code Conventions

### Components
- **Arrow functions only**: use `const MyComponent = () => {}`, never `function MyComponent() {}`
- **1 file = 1 component**: each file exports a single default component
- **Default exports**: always use `export default ComponentName`

### JSX
- **No raw HTML elements**: never use `div`, `span`, `p`, `h1`, etc. directly in JSX
- **Use DS components only**: use `Box`, `Stack`, `HStack`, `Grid`, `Text`, `Heading`, `Label` and all shadcn/ui components
- Layout primitives: `Box`, `Stack` (vertical), `HStack` (horizontal), `Grid`
- Typography: `Heading` (h1-h4), `Text` (p/span), `Label` (uppercase small text)

### File Structure
- UI primitives: `src/components/ui/`
- Shared components: `src/components/`
- Pages: `src/pages/`
- Data: `src/data/`
- Types: `src/types/`

## Tech Stack
- React 19 + TypeScript + Vite
- shadcn/ui + Tailwind CSS v4
- TanStack Query
- React Router
- Supabase
- Bun
