# Strat Landing Page

A modern landing page built with TanStack Router and React.

## Tech Stack

- **Framework**: [TanStack Router](https://tanstack.com/router) with React 19
- **Build Tool**: Vite
- **Styling**: CSS Modules with PostCSS
- **Type Safety**: TypeScript
- **Code Quality**: ESLint, Prettier, Stylelint

## Development

Install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

This starts your app in development mode at `http://localhost:3000`, rebuilding assets on file changes.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production and run TypeScript compiler
- `pnpm serve` - Preview production build
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm lint` - Lint and fix code with ESLint
- `pnpm test` - Run tests with Vitest

## Project Structure

```
strat-landing/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable React components
│   ├── routes/      # File-based routing
│   ├── styles/      # Global CSS files
│   └── utils/       # Utility functions
└── ...config files
```

## Features

- Modern gradient landing page design
- Fully responsive layout
- CSS Modules for component styling
- SEO optimized with meta tags
- Type-safe routing with TanStack Router
- Pre-commit hooks with lint-staged
