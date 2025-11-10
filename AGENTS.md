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
- **Text Generator** (`utils/lumonIpsum.ts`): Core logic that generates Severance-themed placeholder text by mixing Lumon phrases with common words
- **MDR Numbers Component** (`app/components/MDRNumbers.tsx`): Animated component that displays shifting numbers with opacity and position effects when no text is generated
- **Layout** (`app/layout.tsx`): Root layout with multiple Google Fonts (Geist, IBM Plex Mono, VT323)

### Text Generation Logic

The `generateLumonIpsum` function in `utils/lumonIpsum.ts` creates paragraphs by:

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
- Google Fonts: Geist, IBM Plex Mono, VT323

## Path Aliases

Uses `@/*` for root-level imports as configured in `tsconfig.json`.

## Deployment

Configured for Vercel deployment with automatic deploys from the main branch.
