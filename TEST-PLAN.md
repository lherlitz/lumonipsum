# Lumon Ipsum Test Plan

## Application Overview

Comprehensive test plan for the Lumon Ipsum web application - a Severance-themed lorem ipsum text generator. The application allows users to generate 1-10 paragraphs of Lumon-themed placeholder text, copy it to clipboard, and features a terminal-style UI with MDR numbers animation.

## Test Scenarios

### 1. Core Functionality

**Seed:** `tests/seed.spec.ts`

#### 1.1. Initial Page Load

**File:** `tests/core/initial-render.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Wait for page to fully load
  3. Verify the page title heading is visible
  4. Verify default paragraph count (3) is displayed
  5. Verify generate button text INITIATE GENERATION with cursor
  6. Verify MDR numbers animation is running
  7. Verify footer text COMPLIANCE STATUS: VERIFIED and PLEASE ENJOY ALL PARAGRAPHS EQUALLY

**Expected Results:**
  - Page loads successfully with all main elements visible
  - Title LUMON IPSUM GENERATOR is displayed
  - Subtitle PROTOCOL.GENERATE.TEXT is displayed
  - Paragraph count input shows default value of 3
  - Generate button is visible and clickable
  - MDR numbers are displayed initially
  - Footer shows compliance status

#### 1.2. Increment Paragraph Count

**File:** `tests/core/increment-paragraphs.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Find and click the increment button
  3. Verify the paragraph count updates to 4
  4. Click increment again
  5. Verify count updates to 5

**Expected Results:**
  - Paragraph count increases to 4 after clicking increment
  - Input field displays 4
  - Increment button is still clickable

#### 1.3. Decrement Paragraph Count

**File:** `tests/core/decrement-paragraphs.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Find and click the decrement button
  3. Verify the paragraph count updates to 2

**Expected Results:**
  - Paragraph count stays at 2 after clicking decrement from default (3)
  - Input field displays 2
  - Decrement button is still clickable

#### 1.4. Minimum Paragraph Count Enforcement

**File:** `tests/core/minimum-paragraph-limit.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Click decrement button multiple times (5+ times)
  3. Verify paragraph count stays at 1
  4. Verify no error message is displayed

**Expected Results:**
  - Paragraph count stays at 1 when decrement is clicked at minimum
  - Cannot go below 1
  - Error message is NOT shown when at valid minimum

#### 1.5. Maximum Paragraph Count Enforcement

**File:** `tests/core/maximum-paragraph-limit.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Click increment button 10+ times
  3. Verify paragraph count stays at 10
  4. Verify no error message is displayed

**Expected Results:**
  - Paragraph count stays at 10 when increment is clicked at maximum
  - Cannot go above 10
  - Error message is NOT shown when at valid maximum

#### 1.6. Text Generation

**File:** `tests/core/text-generation.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Click the generate button
  3. Wait for text to be generated
  4. Verify generated text appears
  5. Verify copy button is visible
  6. Verify MDR numbers are no longer displayed
  7. Count the number of paragraphs generated (should match input value)

**Expected Results:**
  - Text is generated and displayed
  - Copy button appears
  - MDR numbers are replaced by generated text
  - Each paragraph is displayed separately

#### 1.7. Generate Single Paragraph

**File:** `tests/core/generate-single-paragraph.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Set paragraph count to 1 via input
  3. Click generate button
  4. Wait for generation
  5. Verify exactly 1 paragraph is generated

**Expected Results:**
  - Paragraph count of 1 is generated
  - Only one paragraph is displayed
  - Copy button is visible

#### 1.8. Generate Maximum Paragraphs

**File:** `tests/core/generate-max-paragraphs.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Set paragraph count to 10 via input or increment button
  3. Click generate button
  4. Wait for generation
  5. Verify 10 paragraphs are generated

**Expected Results:**
  - Paragraph count of 10 is generated
  - 10 paragraphs are displayed
  - Copy button is visible

#### 1.9. Text Regeneration Clears Previous

**File:** `tests/core/regenerate-text.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text with default settings
  3. Note the generated text content
  4. Click generate button again
  5. Verify new text is displayed (different from before)
  6. Verify old text is no longer visible

**Expected Results:**
  - New text replaces old text
  - Old text is no longer visible
  - Copy button remains visible

#### 1.10. Copy Generated Text

**File:** `tests/core/copy-to-clipboard.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text
  3. Click the copy button
  4. Verify button text changes to COPIED
  5. Wait 3 seconds
  6. Verify button text returns to COPY

**Expected Results:**
  - Text is copied to clipboard
  - Copy button text changes to COPIED
  - After 2 seconds, button text returns to COPY

#### 1.11. Clipboard Error Handling

**File:** `tests/core/clipboard-error.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text
  3. Deny clipboard permissions or mock clipboard failure
  4. Click copy button
  5. Verify error message appears
  6. Verify copy button shows ERROR and is disabled

**Expected Results:**
  - Error message appears
  - Copy button shows ERROR
  - Error message COPY FAILED - MANUAL COPY REQUIRED is visible
  - Button becomes disabled

#### 1.12. Input Validation - Valid Values

**File:** `tests/core/input-validation-valid.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Clear input field
  3. Type 5 in paragraph input
  4. Click generate button
  5. Verify 5 paragraphs are generated
  6. Clear and type 10
  7. Verify 10 paragraphs are generated

**Expected Results:**
  - Input accepts valid numbers within range
  - No error message shown for valid inputs
  - Generate uses correct paragraph count

#### 1.13. Input Validation - Invalid Values

**File:** `tests/core/input-validation-invalid.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Clear input field
  3. Type 11 (above max)
  4. Click elsewhere to trigger blur
  5. Verify error message appears: Please enter a number between 1 and 10
  6. Verify input shows error state (red border)
  7. Clear and type 0
  8. Verify error message appears
  9. Clear and type -5
  10. Verify error message appears
  11. Clear and type abc
  12. Verify error message appears

**Expected Results:**
  - Input is cleared or reset to previous valid value
  - Error message shown for out-of-range values
  - Generate uses last valid paragraph count

#### 1.14. Input Validation - Decimal Values

**File:** `tests/core/input-decimal-values.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Clear input field
  3. Type 3.5
  4. Verify the input shows 3 (truncated)
  5. Generate text
  6. Verify exactly 3 paragraphs are generated

**Expected Results:**
  - Decimal values are rounded/truncated
  - Input accepts integers only
  - Valid integer is used for generation

#### 1.15. Input State Synchronization

**File:** `tests/core/input-state-sync.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Type 7 directly in input field
  3. Click increment button
  4. Verify input shows 8
  5. Click decrement button twice
  6. Verify input shows 6

**Expected Results:**
  - Input syncs correctly with state
  - Button increment/decrement reflects input changes
  - Generate uses correct value after direct input

#### 1.16. Keyboard Navigation

**File:** `tests/accessibility/keyboard-navigation.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Press Tab to navigate through interactive elements
  3. Verify each element receives focus
  4. Verify focus order is logical (input, increment, decrement, generate)
  5. Verify copy button is reachable after generation

**Expected Results:**
  - All interactive elements are keyboard accessible
  - Tab order is logical
  - Focus indicators are visible

#### 1.17. ARIA Labels

**File:** `tests/accessibility/aria-labels.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Check increment button aria-label
  3. Check decrement button aria-label
  4. Check generate button aria-label
  5. Generate text
  6. Check copy button aria-label

**Expected Results:**
  - Increase button has accessible name Increase paragraphs
  - Decrease button has accessible name Decrease paragraphs
  - Generate button has accessible name Generate text
  - Copy button has accessible name Copy

#### 1.18. Error Accessibility

**File:** `tests/accessibility/error-announcements.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Enter invalid value 11 in input
  3. Verify aria-invalid=true on input
  4. Verify error message has role=alert
  5. Verify input is associated with error message via aria-describedby

**Expected Results:**
  - Input has proper aria-invalid when error occurs
  - Error message has role=alert
  - Error message has proper aria-describedby association

#### 1.19. Screen Reader Compatibility

**File:** `tests/accessibility/screen-reader.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Verify page structure is proper (headings, regions)
  3. Verify main content is properly labeled
  4. Generate text
  5. Verify generated paragraphs are accessible

**Expected Results:**
  - Screen reader announces page load
  - Screen reader can navigate to each section
  - Generated text is announced

#### 1.20. MDR Numbers Animation

**File:** `tests/visual/mdr-animation.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Wait for page to load
  3. Observe MDR numbers animation
  4. Verify animation is smooth and continuous
  5. No flickering or jumpy movements
  6. Animation persists until text is generated

**Expected Results:**
  - MDR numbers animate smoothly
  - Animation runs at consistent frame rate
  - No visual glitches during animation

#### 1.21. Cursor Animation

**File:** `tests/visual/cursor-animation.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Observe generate button text
  3. Verify cursor character (_) blinks on and off
  4. Verify blink rate is consistent

**Expected Results:**
  - Cursor blinks on generate button
  - Blink rate is consistent (approximately every 530ms)

#### 1.22. Terminal Aesthetic

**File:** `tests/visual/terminal-appearance.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Inspect terminal screen appearance
  3. Verify dark background (#0e1a26 or similar)
  4. Verify cyan/light text color (#afcbd6 or similar)
  5. Verify monospace font is used
  6. Verify pulsing indicators are visible

**Expected Results:**
  - Terminal aesthetic is preserved
  - Colors match specification (cyan #afcbd6 on dark #0e1a26)
  - Font is monospace

#### 1.23. Mobile Responsive Layout

**File:** `tests/visual/responsive-mobile.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Set viewport to 375x667 (mobile)
  3. Verify all elements fit in viewport
  4. Verify no horizontal scroll
  5. Verify buttons are still clickable
  6. Verify text is readable

**Expected Results:**
  - UI renders correctly on mobile (375px)
  - All elements are visible and accessible
  - No horizontal scrolling required

#### 1.24. Tablet Responsive Layout

**File:** `tests/visual/responsive-tablet.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Set viewport to 768x1024 (tablet)
  3. Verify page renders correctly
  4. Verify all elements visible

**Expected Results:**
  - UI renders correctly on tablet (768px)
  - Layout adapts appropriately
  - All elements visible

#### 1.25. Desktop Responsive Layout

**File:** `tests/visual/responsive-desktop.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Set viewport to 1280x800 (desktop)
  3. Verify centered layout with max-width
  4. Verify all elements visible

**Expected Results:**
  - UI renders correctly on desktop (1280px+)
  - Maximum width container is used
  - Centered layout

#### 1.26. First Time Visit

**File:** `tests/edge/first-visit.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com in incognito/private window
  2. Verify page loads completely
  3. Verify no errors in console
  4. Verify default state is shown

**Expected Results:**
  - Page loads without crash
  - Basic functionality works

#### 1.27. Page Refresh

**File:** `tests/edge/page-refresh.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Change paragraph count to 7
  3. Refresh the page
  4. Verify default value (3) is shown on refresh (no persistence expected)

**Expected Results:**
  - Page loads with cached state from sessionStorage
  - Previous paragraph count is restored

#### 1.28. Browser Back Navigation

**File:** `tests/edge/browser-back-button.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate some text
  3. Click browser back button
  4. Verify behavior (may navigate away or show previous state)

**Expected Results:**
  - Back navigation returns to previous page
  - Browser history works correctly

#### 1.29. Rapid Generation Clicks

**File:** `tests/edge/rapid-generation.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Click generate button multiple times rapidly
  3. Verify no crashes
  4. Verify final generation result is displayed
  5. Verify no duplicate text displayed

**Expected Results:**
  - Generate button is disabled during generation
  - Button shows loading state
  - Previous state is cleared before new generation starts

#### 1.30. JavaScript Error Handling

**File:** `tests/edge/javascript-error-handling.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text
  3. Verify no console errors
  4. Navigate around the app
  5. Verify no uncaught exceptions

**Expected Results:**
  - Page loads without crash
  - Error is handled gracefully in UI
  - No critical console errors

#### 1.31. Special Characters in Generated Text

**File:** `tests/edge/special-characters.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text multiple times
  3. Verify no broken characters
  4. Verify quotes and punctuation display correctly
  5. Verify no HTML injection or XSS

**Expected Results:**
  - Content is readable
  - Special characters dont break rendering
  - All Lumon phrases display correctly

#### 1.32. Large Text Volume

**File:** `tests/edge/large-text-handling.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate maximum 10 paragraphs
  3. Verify text fits in container
  4. Verify no overflow
  5. Verify copy still works for full text

**Expected Results:**
  - Very long generated text doesnt break layout
  - Text wraps properly
  - Scrollbar appears if needed

#### 1.33. Initial Page Load Performance

**File:** `tests/performance/initial-load.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Measure page load time
  3. Verify load time is under 3 seconds
  4. Verify no layout shifts after initial render

**Expected Results:**
  - Page loads in under 3 seconds
  - No layout shift after load

#### 1.34. Text Generation Speed

**File:** `tests/performance/generation-speed.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Click generate button
  3. Measure time until text appears
  4. Verify generation completes within reasonable time (< 1 second + 500ms delay)

**Expected Results:**
  - Generation completes quickly
  - User can interact again promptly

#### 1.35. Memory Management

**File:** `tests/performance/memory-management.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Generate text 50+ times rapidly
  3. Verify page remains responsive
  4. Verify no crashes or freezes

**Expected Results:**
  - No memory leaks on repeated generation
  - Old text is properly cleaned up

#### 1.36. Chromium Browser

**File:** `tests/compatibility/chromium.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com in Chromium
  2. Verify page loads
  3. Test core functionality (generate, copy)

**Expected Results:**
  - Page loads correctly
  - All features work

#### 1.37. WebKit Browser

**File:** `tests/compatibility/webkit.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com in WebKit
  2. Verify page loads
  3. Test core functionality (generate, copy)

**Expected Results:**
  - Page loads correctly
  - All features work

#### 1.38. Firefox Browser

**File:** `tests/compatibility/firefox.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com in Firefox
  2. Verify page loads
  3. Test core functionality (generate, copy)

**Expected Results:**
  - Page loads correctly
  - All features work

#### 1.39. Page Metadata

**File:** `tests/seo/metadata.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Check page title
  3. Verify title is meaningful
  4. Check meta description
  5. Verify meta description is present

**Expected Results:**
  - Page has proper title
  - Meta description is present

#### 1.40. Semantic HTML

**File:** `tests/seo/semantic-markup.spec.ts`

**Steps:**
  1. Navigate to https://www.lumonipsum.com
  2. Verify h1 heading exists
  3. Verify main tag or role=main is used
  4. Verify proper document outline

**Expected Results:**
  - Proper semantic structure
  - h1 heading is present
  - Main landmark is used

#### 1.41. Generate Exactly One Paragraph

**File:** `tests/text-generation/one-paragraph.spec.ts`

**Steps:**
  1. Set paragraph count to 1
  2. Generate text
  3. Verify exactly 1 paragraph is returned

**Expected Results:**
  - Exact number of paragraphs as requested (1)
  - 1 paragraph is generated
  - Paragraph contains sentences

#### 1.42. Generate Five Paragraphs

**File:** `tests/text-generation/five-paragraphs.spec.ts`

**Steps:**
  1. Set paragraph count to 5
  2. Generate text
  3. Verify exactly 5 paragraphs are returned

**Expected Results:**
  - Exact number of paragraphs as requested (5)
  - 5 paragraphs are generated
  - Each paragraph contains sentences

#### 1.43. Generate Ten Paragraphs

**File:** `tests/text-generation/ten-paragraphs.spec.ts`

**Steps:**
  1. Set paragraph count to 10
  2. Generate text
  3. Verify exactly 10 paragraphs are returned

**Expected Results:**
  - Exact number of paragraphs as requested (10)
  - 10 paragraphs are generated
  - Each paragraph contains sentences

#### 1.44. Sentence Structure

**File:** `tests/text-generation/sentence-structure.spec.ts`

**Steps:**
  1. Generate text
  2. Verify each paragraph has multiple sentences
  3. Verify sentences end with period/exclamation/question
  4. Verify first letter of sentences is capitalized

**Expected Results:**
  - Paragraphs contain sentences
  - Sentences end with proper punctuation
  - Text is readable

#### 1.45. Lumon Phrases Inclusion

**File:** `tests/text-generation/lumon-phrases.spec.ts`

**Steps:**
  1. Generate text multiple times
  2. Verify Lumon phrases occasionally appear
  3. Verify phrases like Please enjoy each number equally appear at least once across multiple generations

**Expected Results:**
  - Lumon phrases are included in output
  - Output contains Lumon-specific terminology

#### 1.46. Lumon Terminology

**File:** `tests/text-generation/lumon-terminology.spec.ts`

**Steps:**
  1. Generate text multiple times
  2. Verify Lumon-specific terms appear
  3. Verify words like data, numbers, refinement, department appear

**Expected Results:**
  - Output contains Lumon-specific words
  - Words like refinement, severance, Kier appear

#### 1.47. Text Randomness

**File:** `tests/text-generation/randomness.spec.ts`

**Steps:**
  1. Generate text
  2. Capture content
  3. Generate again with same settings
  4. Verify content differs
  5. Generate multiple times and verify variety

**Expected Results:**
  - Content differs on regeneration
  - Not identical text on every generation
  - Randomness is working

#### 1.48. Paragraph Count Clamping

**File:** `tests/text-generation/input-clamping.spec.ts`

**Steps:**
  1. Call generateLumonIpsum with 0
  2. Verify 1 paragraph is generated
  3. Call with -5
  4. Verify 1 paragraph is generated
  5. Call with 15
  6. Verify 10 paragraphs are generated

**Expected Results:**
  - Invalid counts are clamped to valid range
  - Count below 1 becomes 1
  - Count above 10 becomes 10
