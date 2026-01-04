# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Setup commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm run start

# Code linting
npm run lint
```

## Project overview

This is a Next.js 15 application that generates Severance-themed Lorem Ipsum text. The application uses the App Router with TypeScript and Tailwind CSS.

### Key Components

- **Main Page** (`app/page.tsx`): Client-side React component with state management for paragraph count, text generation, and clipboard functionality
- **Text Generator** (`lib/lumon-ipsum.ts`): Core logic that generates Severance-themed placeholder text by mixing Lumon phrases with common words
- **MDR Numbers Component** (`features/mdr-numbers.tsx`): Animated component that displays shifting numbers with opacity and position effects when no text is generated
- **UI Components** (`ui/`): Reusable UI components including Button (`ui/button.tsx`), Input (`ui/input.tsx`), TerminalScreen (`ui/terminal-screen.tsx`), and GeneratedText (`ui/generated-text.tsx`)
- **Custom Hooks** (`hooks/`): React hooks for animations including cursor animation (`hooks/use-cursor-animation.ts`) and MDR animation (`hooks/use-mdr-animation.ts`)
- **Layout** (`app/layout.tsx`): Root layout with multiple Google Fonts (Geist, Geist Mono, IBM Plex Mono, VT323)
- **SEO/Metadata Files**: `app/robots.ts`, `app/sitemap.ts`, `app/structured-data.tsx` for search engine optimization and metadata
- **App Icon** (`app/icon.svg`): SVG icon for the application
- **Tests** (`app/page.test.tsx`): Unit tests for the main page component

### Text Generation Logic

The `generateLumonIpsum` function in `lib/lumon-ipsum.ts` creates paragraphs by:

- Using a curated list of Lumon/Severance-specific phrases
- Mixing these with common English words and Lumon-themed filler words
- Generating 4-6 sentences per paragraph with 8-18 words per sentence
- 30% chance to include a Lumon phrase per sentence
- 15% chance to use Lumon-specific filler words

### Styling and Theming

- Uses Tailwind CSS with custom terminal-like styling
- Corporate/retro theme with cyan accents (`#afcbd6`) on dark background (`#0e1a26`)
- Monospace fonts for terminal aesthetic
- Custom CSS classes for terminal screen, buttons, and inputs

### State Management

Simple React state management using useState hooks:

- Paragraph count (1-10 range)
- Generated text array
- Copy status
- Cursor animation state

## Technology Stack

- Next.js 15 with App Router
- React 19
- TypeScript (strict mode enabled)
- Tailwind CSS
- Google Fonts: Geist, Geist Mono, IBM Plex Mono, VT323

## Path Aliases

Uses `@/*` for root-level imports as configured in `tsconfig.json`.

## Deployment

Configured for Vercel deployment with automatic deploys from the main branch.

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
