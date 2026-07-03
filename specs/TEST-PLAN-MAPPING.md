# Test Plan to Playwright Spec Mapping

This document maps every scenario in `specs/TEST-PLAN.md` to the actual Playwright spec files and test names in the repository. Use it for traceability when adding, updating, or debugging tests.

## Conventions

- **Plan ID**: Scenario number from `TEST-PLAN.md`.
- **Spec file**: Path to the grouped Playwright spec that contains the test.
- **Test name**: The `test('...')` title inside the spec file.
- **Status**:
  - ✅ Implemented — a test exists that exercises the scenario.
  - ⚠️ Partial — covered, but assertions are weak or incomplete.
  - ❌ Missing — no dedicated coverage for the scenario.

## Core Functionality

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.1 | Initial Page Load | `tests/core/initial-render.spec.ts` | `Initial Page Load` | ✅ | Asserts title, subtitle, default count, generate button, footer, and MDR container. |
| 1.2 | Increment Paragraph Count | `tests/core/increment-decrement.spec.ts` | `Increment Paragraph Count` | ✅ | Clicks increment twice, asserts values 4 and 5. |
| 1.3 | Decrement Paragraph Count | `tests/core/increment-decrement.spec.ts` | `Decrement Paragraph Count` | ✅ | Clicks decrement once, asserts value 2. |
| 1.4 | Minimum Paragraph Count Enforcement | `tests/core/increment-decrement.spec.ts` | `Minimum Paragraph Count Enforcement` | ✅ | Clicks decrement 5 times, asserts value stays at 1, no error. |
| 1.5 | Maximum Paragraph Count Enforcement | `tests/core/increment-decrement.spec.ts` | `Maximum Paragraph Count Enforcement` | ✅ | Clicks increment 12 times, asserts value stays at 10, no error. |
| 1.6 | Text Generation | `tests/core/text-generation.spec.ts` | `Text Generation` | ✅ | Asserts generated text, copy button, MDR removal, and exactly 3 paragraphs. |
| 1.7 | Generate Single Paragraph | `tests/core/text-generation.spec.ts` | `Generate Single Paragraph` | ✅ | Sets input to 1, asserts exactly 1 paragraph. |
| 1.8 | Generate Maximum Paragraphs | `tests/core/text-generation.spec.ts` | `Generate Maximum Paragraphs` | ✅ | Sets input to 10, asserts exactly 10 paragraphs. |
| 1.9 | Text Regeneration Clears Previous | `tests/core/text-generation.spec.ts` | `Text Regeneration Clears Previous` | ✅ | Compares paragraph contents before and after regeneration. |
| 1.10 | Copy Generated Text | `tests/core/text-generation.spec.ts` | `Copy Generated Text` | ✅ | Verifies COPIED state and validates clipboard contents when permissions allow. |
| 1.11 | Clipboard Error Handling | `tests/core/clipboard-error.spec.ts` | `Clipboard Error Handling` | ✅ | Mocks clipboard failure; asserts error message, ERROR button, disabled state. |
| 1.12 | Input Validation - Valid Values | `tests/core/input-validation.spec.ts` | `Input Validation - Valid Values` | ✅ | Generates with 5 and 10 and asserts exact paragraph counts. |
| 1.13 | Input Validation - Invalid Values | `tests/core/input-validation.spec.ts` | `Input Validation - Invalid Values` | ✅ | Tests 11, 0, -5, and `abc`; asserts error message and `aria-invalid`. |
| 1.14 | Input Validation - Decimal Values | `tests/core/input-decimal-values.spec.ts` | `Input Validation - Decimal Values` | ✅ | Types 3.5, asserts error, then corrects to 3 and verifies 3 paragraphs. |
| 1.15 | Input State Synchronization | `tests/core/input-validation.spec.ts` | `Input State Synchronization` | ✅ | Types 7, increments to 8, decrements twice to 6. |

## Accessibility

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.16 | Keyboard Navigation | `tests/accessibility/keyboard.spec.ts` | `Keyboard Navigation` | ✅ | Verifies Tab order through input, increment, decrement, generate, and copy button (Chromium). |
| 1.17 | ARIA Labels | `tests/accessibility/keyboard.spec.ts` | `ARIA Labels` | ✅ | Checks increment, decrement, generate, and copy button labels. |
| 1.18 | Error Accessibility | `tests/accessibility/keyboard.spec.ts` | `Error Accessibility` | ✅ | Asserts `aria-invalid`, `role=alert`, and `aria-describedby`. |
| 1.19 | Screen Reader Compatibility | `tests/accessibility/keyboard.spec.ts` | `Screen Reader Compatibility` | ✅ | Checks headings, main region, and generated paragraph visibility. |

## Visual

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.20 | MDR Numbers Animation | `tests/visual/mdr-animation.spec.ts` | `MDR Numbers Animation` | ✅ | Asserts MDR container is visible and populated, has CSS transitions, and disappears after generation. |
| 1.21 | Cursor Animation | `tests/visual/cursor-animation.spec.ts` | `Cursor Animation` | ✅ | Verifies generate button contains cursor character and toggles over time. |
| 1.22 | Terminal Aesthetic | `tests/visual/responsive.spec.ts` | `Terminal Aesthetic` | ✅ | Asserts exact body/terminal colors and monospace font family. |
| 1.23 | Mobile Responsive Layout | `tests/visual/responsive.spec.ts` | `Mobile Responsive Layout` | ✅ | Sets 375x667 viewport, asserts visibility, enabled button, and no horizontal overflow. |
| 1.24 | Tablet Responsive Layout | `tests/visual/responsive.spec.ts` | `Tablet Responsive Layout` | ✅ | Sets 768x1024 viewport, asserts visibility. |
| 1.25 | Desktop Responsive Layout | `tests/visual/responsive.spec.ts` | `Desktop Responsive Layout` | ✅ | Sets 1280x800 viewport, asserts centered max-width container. |

## Edge Cases

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.26 | First Time Visit | `tests/edge/edge-cases.spec.ts` | `First Time Visit` | ✅ | Loads in a fresh context, asserts default state, and checks no console errors. |
| 1.27 | Page Refresh | `tests/edge/edge-cases.spec.ts` | `Page Refresh` | ✅ | Sets 7, reloads, asserts count resets to 3. |
| 1.28 | Browser Back Navigation | `tests/edge/browser-back-button.spec.ts` | `Browser Back Navigation` | ✅ | Pushes history state, navigates back, asserts URL and heading. |
| 1.29 | Rapid Generation Clicks | `tests/edge/edge-cases.spec.ts` | `Rapid Generation Clicks` | ✅ | Clicks rapidly and asserts 3 paragraphs with no duplicates. |
| 1.30 | JavaScript Error Handling | `tests/edge/edge-cases.spec.ts` | `JavaScript Error Handling` | ✅ | Generates text and asserts no console/page errors. |
| 1.31 | Special Characters in Generated Text | `tests/edge/special-characters.spec.ts` | `Special Characters in Generated Text` | ✅ | Generates multiple times and asserts no replacement characters or leaked HTML. |
| 1.32 | Large Text Volume | `tests/edge/edge-cases.spec.ts` | `Large Text Volume` | ✅ | Generates 10 paragraphs, asserts no overflow and copy works. |

## Performance

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.33 | Initial Page Load Performance | `tests/performance/performance.spec.ts` | `Initial Page Load Performance` | ✅ | Uses `PerformanceNavigationTiming`, asserts < 3000ms and low CLS. |
| 1.34 | Text Generation Speed | `tests/performance/performance.spec.ts` | `Text Generation Speed` | ✅ | Measures time until generated text appears, asserts < 3000ms. |
| 1.35 | Memory Management | `tests/performance/performance.spec.ts` | `Memory Management` | ✅ | Generates text 50 times, asserts page remains responsive. |

## Browser Compatibility

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.36 | Chromium Browser | `tests/compatibility/basic.spec.ts` | `Chromium smoke test - generate and copy` | ✅ | Runs under the Chromium project. |
| 1.37 | WebKit Browser | `tests/compatibility/basic.spec.ts` | `WebKit smoke test - generate and copy` | ✅ | Runs under the WebKit project. |
| 1.38 | Firefox Browser | `tests/compatibility/basic.spec.ts` | `Firefox smoke test - generate and copy` | ✅ | Runs under the Firefox project. |

## SEO

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.39 | Page Metadata | `tests/seo/seo.spec.ts` | `Page Metadata` | ✅ | Asserts exact title and meta description content. |
| 1.40 | Semantic HTML | `tests/seo/seo.spec.ts` | `Semantic HTML` | ✅ | Asserts `h1` and `main` are visible. |

## Text Generation

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.41 | Generate Exactly One Paragraph | `tests/text-generation/text-generation.spec.ts` | `Generate Exactly One Paragraph` | ✅ | Asserts exactly 1 paragraph with sentences. |
| 1.42 | Generate Five Paragraphs | `tests/text-generation/text-generation.spec.ts` | `Generate Five Paragraphs` | ✅ | Asserts exactly 5 paragraphs. |
| 1.43 | Generate Ten Paragraphs | `tests/text-generation/text-generation.spec.ts` | `Generate Ten Paragraphs` | ✅ | Asserts exactly 10 paragraphs. |
| 1.44 | Sentence Structure | `tests/text-generation/text-generation.spec.ts` | `Sentence Structure` | ✅ | Parses sentences and asserts punctuation and capitalization. |
| 1.45 | Lumon Phrases Inclusion | `tests/text-generation/lumon-content.spec.ts` | `Lumon Phrases Inclusion and Terminology` | ✅ | Generates multiple times and asserts known Lumon phrases appear. |
| 1.46 | Lumon Terminology | `tests/text-generation/lumon-content.spec.ts` | `Lumon Phrases Inclusion and Terminology` | ✅ | Generates multiple times and asserts Lumon-specific terms appear. |
| 1.47 | Text Randomness | `tests/text-generation/text-generation.spec.ts` | `Text Randomness` | ✅ | Compares content across two generations. |
| 1.48 | Paragraph Count Clamping | `tests/text-generation/text-generation.spec.ts` | `Paragraph Count Clamping` | ✅ | Tests 0 and 15 and asserts 1 and 10 paragraphs respectively. |

## Summary

- **Total scenarios**: 48
- **Implemented (✅)**: 48
- **Partial (⚠️)**: 0
- **Missing (❌)**: 0

## Recommended next steps

1. Keep tests green on CI; monitor flaky animations or timing-sensitive assertions.
2. Consider adding visual regression snapshots for the terminal aesthetic if the design stabilizes.
3. Add a shared `tests/utils/console-errors.ts` lint rule to ensure new specs always call `failOnConsoleErrors(page)`.
