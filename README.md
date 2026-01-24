# Lumon Ipsum Generator

A Severance-themed Lorem Ipsum text generator that creates placeholder text inspired by the mysterious world of Lumon Industries. Please enjoy all paragraphs equally.

**Live Demo:** [lumonipsum.com](https://www.lumonipsum.com)

## Features

- Generate 1-10 paragraphs of Severance-themed placeholder text
- Authentic Lumon Industries phrases mixed with standard filler text
- Retro terminal aesthetic with CRT scanline effects
- MDR-style animated number display
- One-click copy to clipboard
- Fully responsive design
- PWA-ready with manifest and icons

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with coverage |
| `npm run test:watch` | Run tests in watch mode |

## Technology Stack

- **Framework:** Next.js 15 with App Router
- **UI:** React 19, TypeScript (strict mode)
- **Styling:** Tailwind CSS with custom design tokens
- **Fonts:** VT323 (primary), IBM Plex Mono, Geist, Geist Mono
- **Analytics:** Vercel Analytics & Speed Insights
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel (automatic from main branch)

## Project Structure

```
lumonipsum/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main generator component
│   ├── page.test.tsx      # Page tests
│   ├── layout.tsx         # Root layout with fonts/meta
│   ├── globals.css        # Design system & terminal styles
│   ├── icon.svg           # Favicon
│   ├── robots.ts          # SEO robots configuration
│   ├── sitemap.ts         # Dynamic sitemap
│   └── structured-data.tsx # JSON-LD schema markup
├── lib/
│   └── lumon-ipsum.ts     # Text generation algorithm
├── ui/                     # Reusable UI components
│   ├── button.tsx         # Lumon-styled button
│   ├── input.tsx          # Number input with arrows
│   ├── terminal-screen.tsx # CRT terminal container
│   └── generated-text.tsx # Output display with copy
├── features/
│   └── mdr-numbers.tsx    # Animated MDR number display
├── hooks/
│   ├── use-cursor-animation.ts  # Blinking cursor effect
│   └── use-mdr-animation.ts     # Number shifting animation
├── types/                  # TypeScript definitions
└── public/                 # Static assets
    ├── lumon-globe.svg    # Open Graph image
    └── manifest.json      # PWA manifest
```

## Design System

The UI uses a corporate-retro palette inspired by Lumon Industries terminals:

| Variable | Hex | Usage |
|----------|-----|-------|
| `--clarity` | `#f3ffff` | Hover states, emphasis |
| `--protocol` | `#afcbd6` | Primary text, borders |
| `--membrane` | `#beb780` | Accent (unused currently) |
| `--system` | `#79a6b9` | Secondary elements |
| `--sector` | `#20464f` | Component backgrounds |
| `--archive` | `#0e1a26` | Page background |

Key CSS classes:
- `.terminal-screen` - CRT monitor effect with scanlines
- `.lumon-button` - Corporate button with hover states
- `.lumon-input` - Minimal number input
- `.generated-text` - Output container

## Text Generation

The `generateLumonIpsum()` function creates authentic-feeling placeholder text:

- **Paragraphs:** 4-6 sentences each
- **Sentences:** 8-18 words with proper punctuation
- **Content mix:**
  - 30% chance per sentence to include a Lumon phrase
  - 15% chance to use Lumon-specific filler words
  - Standard words fill the remainder
- **Phrases include:** "The work is mysterious and important", "Please enjoy each paragraph equally", "Your outie loves you", and many more

## SEO & Metadata

The app includes comprehensive SEO optimization:
- Open Graph and Twitter Card meta tags
- Structured data (JSON-LD) for rich snippets
- Dynamic sitemap generation
- Robots.txt configuration
- PWA manifest with theme colors

## Testing

```bash
# Run all tests with coverage report
npm run test

# Watch mode for development
npm run test:watch
```

Tests cover:
- Main page interactions and state
- UI component rendering and accessibility
- Text generation logic
- Custom hooks behavior

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

---

*The work is mysterious and important.*
