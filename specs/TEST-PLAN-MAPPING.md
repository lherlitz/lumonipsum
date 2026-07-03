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
| 1.6 | Text Generation | `tests/core/text-generation.spec.ts` | `Text Generation` | ⚠️ | Only asserts copy button visible; should count paragraphs and assert MDR removed. |
| 1.7 | Generate Single Paragraph | `tests/core/text-generation.spec.ts` | `Generate Single Paragraph` | ⚠️ | Only asserts copy button visible; should count exactly 1 paragraph. |
| 1.8 | Generate Maximum Paragraphs | `tests/core/text-generation.spec.ts` | `Generate Maximum Paragraphs` | ⚠️ | Only asserts copy button visible; should count exactly 10 paragraphs. |
| 1.9 | Text Regeneration Clears Previous | `tests/core/text-generation.spec.ts` | `Text Regeneration Clears Previous` | ✅ | Compares `main` textContent before and after regeneration. |
| 1.10 | Copy Generated Text | `tests/core/text-generation.spec.ts` | `Copy Generated Text` | ⚠️ | Tolerates ERROR state and does not assert clipboard contents. |
| 1.11 | Clipboard Error Handling | `tests/core/text-generation.spec.ts` | — | ❌ | No test mocks or denies clipboard to verify ERROR state. |
| 1.12 | Input Validation - Valid Values | `tests/core/input-validation.spec.ts` | `Input Validation - Valid Values` | ⚠️ | Generates with 5 and 10 but only checks copy button, not paragraph count. |
| 1.13 | Input Validation - Invalid Values | `tests/core/input-validation.spec.ts` | `Input Validation - Invalid Values` | ✅ | Tests 11, 0, -5, and `abc`; asserts error message and `aria-invalid`. |
| 1.14 | Input Validation - Decimal Values | `tests/core/input-validation.spec.ts` | — | ❌ | No test for `3.5` rounding/truncation. |
| 1.15 | Input State Synchronization | `tests/core/input-validation.spec.ts` | `Input State Synchronization` | ✅ | Types 7, increments to 8, decrements twice to 6. |

## Accessibility

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.16 | Keyboard Navigation | `tests/accessibility/keyboard.spec.ts` | `Keyboard Navigation` | ⚠️ | Asserts input is focused after one Tab; should verify full tab order through copy button. |
| 1.17 | ARIA Labels | `tests/accessibility/keyboard.spec.ts` | `ARIA Labels` | ✅ | Checks increment, decrement, generate, and copy button labels. Copy label differs from original plan wording. |
| 1.18 | Error Accessibility | `tests/accessibility/keyboard.spec.ts` | `Error Accessibility` | ✅ | Asserts `aria-invalid`, `role=alert`, and `aria-describedby`. |
| 1.19 | Screen Reader Compatibility | `tests/accessibility/keyboard.spec.ts` | `Screen Reader Compatibility` | ⚠️ | Checks headings and main region; should verify live-region behavior for generated text. |

## Visual

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.20 | MDR Numbers Animation | `tests/visual/responsive.spec.ts` | — | ❌ | No test for MDR animation presence or persistence until generation. |
| 1.21 | Cursor Animation | `tests/core/initial-render.spec.ts` | — | ❌ | No test polls the generate button to verify `_` blinking. |
| 1.22 | Terminal Aesthetic | `tests/visual/responsive.spec.ts` | `Terminal Aesthetic` | ⚠️ | Checks background class and pulse count; should assert exact colors and monospace font. |
| 1.23 | Mobile Responsive Layout | `tests/visual/responsive.spec.ts` | `Mobile Responsive Layout` | ⚠️ | Basic visibility check; should assert no horizontal overflow and clickable buttons. |
| 1.24 | Tablet Responsive Layout | `tests/visual/responsive.spec.ts` | `Tablet Responsive Layout` | ⚠️ | Basic visibility check. |
| 1.25 | Desktop Responsive Layout | `tests/visual/responsive.spec.ts` | `Desktop Responsive Layout` | ⚠️ | Basic visibility check. |

## Edge Cases

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.26 | First Time Visit | `tests/edge/edge-cases.spec.ts` | `First Time Visit` | ⚠️ | Basic load check; should assert no console errors in incognito context. |
| 1.27 | Page Refresh | `tests/edge/edge-cases.spec.ts` | `Page Refresh` | ✅ | Sets 7, reloads, asserts count resets to 3 (matches app behavior). |
| 1.28 | Browser Back Navigation | `tests/edge/edge-cases.spec.ts` | — | ❌ | No test for back-button behavior. |
| 1.29 | Rapid Generation Clicks | `tests/edge/edge-cases.spec.ts` | `Rapid Generation Clicks` | ⚠️ | Clicks rapidly and asserts copy button; should assert no duplicate text and no crash. |
| 1.30 | JavaScript Error Handling | `tests/edge/edge-cases.spec.ts` | `JavaScript Error Handling` | ⚠️ | Basic visibility check; should assert no pageerror/console error events. |
| 1.31 | Special Characters in Generated Text | `tests/text-generation/text-generation.spec.ts` | — | ❌ | No test verifies quotes/punctuation/XSS safety. |
| 1.32 | Large Text Volume | `tests/edge/edge-cases.spec.ts` | `Large Text Volume` | ⚠️ | Generates 10 paragraphs but only checks visibility; should assert layout overflow and copy. |

## Performance

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.33 | Initial Page Load Performance | `tests/performance/performance.spec.ts` | `Initial Page Load Performance` | ⚠️ | Uses `Date.now()` around `page.goto`; should use `PerformanceObserver` / navigation timing for stability. |
| 1.34 | Text Generation Speed | `tests/performance/performance.spec.ts` | `Text Generation Speed` | ✅ | Measures time until copy button appears, asserts < 5s. |
| 1.35 | Memory Management | `tests/performance/performance.spec.ts` | `Memory Management` | ⚠️ | Generates only 20 times; plan recommends 50+. |

## Browser Compatibility

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.36 | Chromium Browser | `tests/compatibility/basic.spec.ts` | `Page Loads Without Errors` | ⚠️ | Runs as a single smoke test; requires a Playwright project for Chromium to truly isolate. |
| 1.37 | WebKit Browser | `tests/compatibility/basic.spec.ts` | `Page Loads Without Errors` | ❌ | No WebKit project or explicit WebKit test. |
| 1.38 | Firefox Browser | `tests/compatibility/basic.spec.ts` | `Page Loads Without Errors` | ❌ | No Firefox project or explicit Firefox test. |

## SEO

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.39 | Page Metadata | `tests/seo/seo.spec.ts` | `Page Metadata` | ⚠️ | Checks title length; should assert exact title and meta description content. |
| 1.40 | Semantic HTML | `tests/seo/seo.spec.ts` | `Semantic HTML` | ✅ | Asserts `h1` and `main` are visible. |

## Text Generation

| Plan ID | Scenario | Spec file | Test name | Status | Notes |
|---|---|---|---|---|---|
| 1.41 | Generate Exactly One Paragraph | `tests/text-generation/text-generation.spec.ts` | `Generate Exactly One Paragraph` | ⚠️ | Should assert exactly 1 paragraph with sentences. |
| 1.42 | Generate Five Paragraphs | `tests/text-generation/text-generation.spec.ts` | `Generate Five Paragraphs` | ⚠️ | Should assert exactly 5 paragraphs with sentences. |
| 1.43 | Generate Ten Paragraphs | `tests/text-generation/text-generation.spec.ts` | `Generate Ten Paragraphs` | ⚠️ | Should assert exactly 10 paragraphs with sentences. |
| 1.44 | Sentence Structure | `tests/text-generation/text-generation.spec.ts` | `Sentence Structure` | ⚠️ | Only checks `main` visibility; should parse sentences and assert punctuation/capitalization. |
| 1.45 | Lumon Phrases Inclusion | `tests/text-generation/text-generation.spec.ts` | — | ❌ | No test verifies known Lumon phrases appear. |
| 1.46 | Lumon Terminology | `tests/text-generation/text-generation.spec.ts` | — | ❌ | No test verifies Lumon-specific terminology appears. |
| 1.47 | Text Randomness | `tests/text-generation/text-generation.spec.ts` | `Text Randomness` | ✅ | Compares content across two generations. |
| 1.48 | Paragraph Count Clamping | `tests/text-generation/text-generation.spec.ts` | `Paragraph Count Clamping` | ⚠️ | Tests 0 and 15 but only asserts copy button; should count paragraphs. |

## Summary

- **Total scenarios**: 48
- **Implemented (✅)**: 17
- **Partial (⚠️)**: 22
- **Missing (❌)**: 9

### Missing scenarios to implement

1. **1.11** — Clipboard Error Handling (`tests/core/clipboard-error.spec.ts`)
2. **1.14** — Input Validation - Decimal Values (`tests/core/input-decimal-values.spec.ts` or add to `input-validation.spec.ts`)
3. **1.20** — MDR Numbers Animation (`tests/visual/mdr-animation.spec.ts`)
4. **1.21** — Cursor Animation (`tests/visual/cursor-animation.spec.ts` or add to `initial-render.spec.ts`)
5. **1.28** — Browser Back Navigation (`tests/edge/browser-back-button.spec.ts`)
6. **1.31** — Special Characters in Generated Text (`tests/edge/special-characters.spec.ts`)
7. **1.37** — WebKit Browser (add WebKit project + compatibility test)
8. **1.38** — Firefox Browser (add Firefox project + compatibility test)
9. **1.45 / 1.46** — Lumon content (phrases and terminology; can live in `tests/text-generation/lumon-content.spec.ts`)

### Recommended next steps

1. Add a `playwright.config.ts` with Chromium, WebKit, Firefox, and mobile viewport projects.
2. Strengthen existing tests by counting generated paragraphs instead of relying solely on the copy button visibility.
3. Add the missing spec files listed above.
4. Add a shared `tests/utils/console-errors.ts` helper and fail tests on unhandled `pageerror` / `console.error` events.
5. Add stable `data-testid` attributes to `Button`, `Input`, `MDRNumbers`, and `GeneratedText` components.
