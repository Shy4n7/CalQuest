# 🎨 Calculus App - UI/UX Visual Design Specification

## SCREEN-BY-SCREEN MOCKUP DESCRIPTIONS

### SCREEN 1: HOME DASHBOARD
```
┌────────────────────────────────────────────────────┐
│  🧮 Calculus Master  │  🔥 7   ⭐ 450 XP  👤 Profile │  (Header)
├────────────────────────────────────────────────────┤
│                                                    │
│  Welcome back, Shyan! 🚀                          │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │                                              │ │  (Mascot Area)
│  │    [Animated Character Waving]              │ │
│  │    "Great streak! Keep it up!"              │ │
│  │                                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  📊 Your Progress:                               │
│  ████████████░░░░░░░░░░ 45% through curriculum   │
│  Level 8 / 30                                     │
│                                                    │
│  ┌──────────────────┬─────────────────────────┐  │
│  │ 📚 CONTINUE      │ 🎯 NEW LESSON          │  │
│  │ Derivatives      │ Power Rule             │  │
│  │ (Lesson 3 of 5)  │ (Unlocks at Level 9)   │  │
│  └──────────────────┴─────────────────────────┘  │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ 🏆 ACHIEVEMENTS UNLOCKED                    │ │
│  │ [🚀] Calculus Rookie  [🧠] Quiz Master     │ │
│  │ [View All →]                               │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  ┌──────────────────────────────────────────────┐ │
│  │ 💡 Quick Access: [View All Lessons]         │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Animated character at top responds to streak/progress
- Green accent colors on progress bar
- Cards have subtle shadows (elevation)
- Large, readable numbers for XP/streak
- Bottom navigation: Home | Lessons | Stats | Settings

---

### SCREEN 2: LESSON SELECTION
```
┌────────────────────────────────────────────────────┐
│  ← Back  │  Lessons  │  Progress: 45%         [📊] │
├────────────────────────────────────────────────────┤
│                                                    │
│  Chapter 1: FOUNDATIONS                          │
│  ├─────────────────────────────────────────────┐ │
│  │ 🔬 LIMITS                         [✓ 100%] │ │
│  │ Understanding approach & convergence      │ │
│  │ • 3 lessons • 4 quizzes • Time: 45 mins   │ │
│  │ [COMPLETED] [REVIEW]                      │ │
│  └─────────────────────────────────────────────┘ │
│                                                    │
│  Chapter 2: RATE OF CHANGE                       │
│  ├─────────────────────────────────────────────┐ │
│  │ ⚡ DERIVATIVES              [▶ IN PROGRESS] │ │
│  │ Slopes, velocity, acceleration            │ │
│  │ • 5 lessons • 6 quizzes • Time: 90 mins   │ │
│  │ [CONTINUE ▶]                              │ │
│  │ Progress: █████████░░░░░░░░░░ 45% complete│ │
│  └─────────────────────────────────────────────┘ │
│                                                    │
│  Chapter 3: ACCUMULATION                        │
│  ├─────────────────────────────────────────────┐ │
│  │ 📊 INTEGRALS                    [🔒 LOCKED] │ │
│  │ Area, volume, total accumulation         │ │
│  │ Unlock at Level 12                        │ │
│  │ [LOCKED - Continue Derivatives →]         │ │
│  └─────────────────────────────────────────────┘ │
│                                                    │
│  Chapter 4: ASTROPHYSICS APPS                   │
│  ├─────────────────────────────────────────────┐ │
│  │ 🌌 SPACE PHYSICS                [🔒 LOCKED] │ │
│  │ Orbital mechanics, stellar motion         │ │
│  │ Unlock after completing all modules       │ │
│  └─────────────────────────────────────────────┘ │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Green checkmark for completed lessons
- Blue "▶" for in-progress
- Gray lock for locked content
- Progress bars show completion within each chapter
- Card styling: Clean borders, hover effect (slight shadow increase)

---

### SCREEN 3: CONCEPT INTRODUCTION
```
┌────────────────────────────────────────────────────┐
│  ← Back  │  Derivatives: Lesson 3 of 5  [30% ▶ 100%] │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Animated Background: subtle galaxy effect]      │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  │                                            │  │
│  │  DERIVATIVES ARE JUST                      │  │
│  │  "HOW FAST THINGS CHANGE"                  │  │
│  │                                            │  │
│  │       [Car speedometer animation]          │  │
│  │  (Needle swings showing speed increasing)  │  │
│  │                                            │  │
│  │  Think of it like THIS:                    │  │
│  │  🚗 Position changes with TIME             │  │
│  │     Derivative = Speed (position change)   │  │
│  │  🏎️ Speed changes with TIME                │  │
│  │     2nd Derivative = Acceleration          │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  Ready to see it in action? [NEXT →]            │
│                                                    │
│  [Bottom: Confetti animation plays at NEXT]      │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Large, bold text (40-48px) for main concept
- Centered layout with breathing room
- Single real-world analogy with emoji
- Animated element (car speedometer) showing concept
- Smooth fade-in of each text element
- Click NEXT for satisfying transition with sound

---

### SCREEN 4: INTERACTIVE VISUALIZER (Derivatives)
```
┌────────────────────────────────────────────────────┐
│  ← Back  │  Slope Visualizer  [↻ Reset]       [?] │
├────────────────────────────────────────────────────┤
│                                                    │
│  ╔════════════════════════════════════════════╗   │
│  ║                                            ║   │
│  ║         [Interactive Graph Area]          ║   │
│  ║                                            ║   │
│  ║    Blue Curve: f(x) = x² - 2x + 3         ║   │
│  ║    Red Tangent Line (follows curve)        ║   │
│  ║    Green Point: Current position           ║   │
│  ║                                            ║   │
│  ║    10 ├────────╱╲─────────────────         ║   │
│  ║       │      ╱    ╲                        ║   │
│  ║     5 ├────╱────●──╲──────── (tangent)    ║   │
│  ║       │  ╱          ╲                      ║   │
│  ║     0 ├──────────────╲──────────            ║   │
│  ║       │               ╲                     ║   │
│  ║    -5 ├────────────────╲────────────        ║   │
│  ║       │                  ╲                  ║   │
│  ║       └────────────────────────────── x    ║   │
│  ║      -2   -1    0    1    2    3    4       ║   │
│  ║                                            ║   │
│  ║  Current Point: x = 1.5                    ║   │
│  ║  f(1.5) = 2.25                             ║   │
│  ║  Slope (f'(1.5)) = 1.0                     ║   │
│  ║                                            ║   │
│  ║  [Slider: ←─────●────→] Drag Me!           ║   │
│  ║   x from -2          4                     ║   │
│  ║                                            ║   │
│  ╚════════════════════════════════════════════╝   │
│                                                    │
│  📝 What's Happening?                           │
│  The RED line (tangent) shows the SLOPE at      │
│  each point. When you move the slider, you can  │
│  see how the slope CHANGES. That's the idea     │
│  behind derivatives!                            │
│                                                    │
│  [UNDERSTAND ✓]  [MORE EXAMPLES →]             │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Plotly.js or Canvas rendering for smooth graphs
- Animated tangent line rotation as you drag
- Slope value updates in real-time (no lag)
- Color coding: Blue=curve, Red=tangent, Green=point
- Slider is large and responsive
- Explanation text uses simple language
- Framer Motion animations (300ms duration)

---

### SCREEN 5: INTEGRAL VISUALIZER (Area Under Curve)
```
┌────────────────────────────────────────────────────┐
│  ← Back  │  Area Accumulator  [↻ Reset]  [?]      │
├────────────────────────────────────────────────────┤
│                                                    │
│  ╔════════════════════════════════════════════╗   │
│  ║                                            ║   │
│  ║         [Interactive Graph Area]          ║   │
│  ║                                            ║   │
│  ║    Blue Curve: f(x) = x                    ║   │
│  ║    Shaded Rectangles: Area Approximation  ║   │
│  ║                                            ║   │
│  ║     5 ├────────────┐                      ║   │
│  ║       │          ┌─┤                       ║   │
│  ║     4 ├────────┌─┤ │                       ║   │
│  ║       │      ┌─┤ │ │ [Rectangles fade]    ║   │
│  ║     3 ├────┌─┤ │ │ │                       ║   │
│  ║       │  ┌─┤ │ │ │ │                       ║   │
│  ║     2 ├┌─┤ │ │ │ │ │                       ║   │
│  ║       ├─┤ │ │ │ │ │                       ║   │
│  ║     1 ├─┤ │ │ │ │ │                       ║   │
│  ║       │ │ │ │ │ │ │                       ║   │
│  ║     0 └─┴─┴─┴─┴─┴─┴─→                     ║   │
│  ║       0 1 2 3 4 5 x                        ║   │
│  ║                                            ║   │
│  ║  Precision Level: [Slider ←──●────→]       ║   │
│  ║  Rectangles: 5 ←─ 🎚️ ─→ 1000              ║   │
│  ║                                            ║   │
│  ║  🎯 Estimated Area = 12.5 sq units         ║   │
│  ║  ✓ Actual Area = 12.5 sq units (perfect!)  ║   │
│  ║                                            ║   │
│  ║  Accuracy: █████████████████░░ 99%        ║   │
│  ║                                            ║   │
│  ╚════════════════════════════════════════════╝   │
│                                                    │
│  💡 How It Works:                               │
│  - MORE rectangles = MORE accurate              │
│  - As rectangles→infinity, area→exact value     │
│  - THIS is what integration does!               │
│                                                    │
│  [NEXT CONCEPT →]  [TRY ANOTHER CURVE →]      │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Rectangles render with smooth fade transitions
- Area value animates upward as slider increases
- Accuracy percentage shows convergence
- Visual feedback when optimal precision reached
- Color: Rectangles in semi-transparent blue

---

### SCREEN 6: FORMULA REVEAL
```
┌────────────────────────────────────────────────────┐
│  ← Back  │  Derivative Formula  [Next: Quiz]       │
├────────────────────────────────────────────────────┤
│                                                    │
│  [Confetti celebration animation]                 │
│                                                    │
│  ✓ YOU UNDERSTOOD THE CONCEPT! 🎉                │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │  Now for the shorthand...                  │  │
│  │                                            │  │
│  │  Power Rule for Derivatives:               │  │
│  │                                            │  │
│  │     d                  n-1                 │  │
│  │    ── (xⁿ) = n·x                           │  │
│  │     dx                                      │  │
│  │                                            │  │
│  │  Translation:                              │  │
│  │  "To find derivative, bring exponent down  │  │
│  │   in front and reduce exponent by 1"       │  │
│  │                                            │  │
│  │  🎬 Video Example:                          │  │
│  │  ┌──────────────────────────────┐          │  │
│  │  │ d(x³)/dx = 3x²              │          │  │
│  │  │ [Animated step-by-step]     │          │  │
│  │  └──────────────────────────────┘          │  │
│  │                                            │  │
│  │  ➜ See how this connects to                │  │
│  │    the slope visualizer above?             │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  [READY FOR QUIZ →]  [REVIEW VISUALIZATION]     │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Formula rendered with MathJax (beautiful rendering)
- Golden glow around formula (important)
- Step-by-step animation showing formula derivation
- Connection to previous visualization emphasized
- Large button to proceed to quiz

---

### SCREEN 7: QUIZ INTERFACE
```
┌────────────────────────────────────────────────────┐
│  Derivatives Quiz  │  3 / 5 Correct  [█████░░░░]  │
├────────────────────────────────────────────────────┤
│                                                    │
│  Question 2 of 5:                                │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │ 📋 Multiple Choice                         │  │
│  │                                            │  │
│  │ What is the derivative of f(x) = 5x²?     │  │
│  │                                            │  │
│  │ ○ 10x         [A Button - Your Answer]    │  │ (CORRECT - Green)
│  │ ○ 5x          [B Button]                  │  │
│  │ ○ 10x²        [C Button]                  │  │
│  │ ○ 5           [D Button]                  │  │
│  │                                            │  │
│  │ ✅ CORRECT! +20 XP                         │  │
│  │                                            │  │
│  │ Explanation:                              │  │
│  │ Power rule: bring 2 down → 5·2x = 10x     │  │
│  │                                            │  │
│  │            [NEXT QUESTION →]               │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  Progress: ███████░░░░░░░░░░░░ 40% of quiz       │
│  Current XP: 40 / 100 (this session)             │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Green checkmark and "+20 XP" animation on correct
- Explanation provided immediately
- Progress bar at bottom showing quiz completion
- Large buttons (50px height) for easy clicking
- Font: Body text 16px, Options 18px
- Feedback appears with satisfying sound effect

---

### INCORRECT ANSWER VARIANT:
```
│  ○ 5x          [B Button - Your Answer] ❌       │
│                                                    │
│  ❌ NOT QUITE! (-0 XP, attempts: 1/2)            │
│                                                    │
│  Hint: Remember power rule?                      │
│  d/dx(xⁿ) = n·x^(n-1)                           │
│                                                    │
│  In this case, n = ____ (try again!)            │
│                                                    │
│  [HINT SHOWN ↓]  [TRY AGAIN →]                  │
```

**Visual Notes**:
- Red X shows on wrong answer
- No points deducted on first attempt
- Progressive hints offered (don't penalize learning)
- Can retry up to 2x before moving on

---

### SCREEN 8: QUIZ COMPLETION
```
┌────────────────────────────────────────────────────┐
│                                                    │
│  🎉🎉🎉 FANTASTIC WORK! 🎉🎉🎉                    │
│                                                    │
│  ┌────────────────────────────────────────────┐  │
│  │                                            │  │
│  │  Quiz Results:                             │  │
│  │  ───────────────────────────────────       │  │
│  │  Questions Correct: 4 / 5                  │  │
│  │  Accuracy: 80%                             │  │
│  │  Time Taken: 4m 32s                        │  │
│  │                                            │  │
│  │  +100 XP  ⭐ 100 Points                     │  │
│  │  +1 Streak  🔥 Keep it up!                │  │
│  │                                            │  │
│  │  LESSON COMPLETE: Derivatives Mastered!   │  │
│  │                                            │  │
│  │  [Confetti + Character dancing animation] │  │
│  │                                            │  │
│  └────────────────────────────────────────────┘  │
│                                                    │
│  Next: Power Rule (Unlocked!) →                  │
│                                                    │
│  [CONTINUE LEARNING →]  [VIEW BADGE]             │
│                                                    │
└────────────────────────────────────────────────────┘
```

**Visual Notes**:
- Full-screen celebration animation
- Summary statistics clearly displayed
- Points and streak increments animate upward
- Next lesson teased at bottom
- Character mascot appears celebrating

---

## COLOR PALETTE USAGE

```
Primary Blue (#3B82F6):
- Button backgrounds
- Links
- Important highlights
- Progress bars

Emerald Green (#10B981):
- Success states (✓)
- Correct answers
- Completed lessons

Amber (#F59E0B):
- Warnings
- Unlocked items
- Achievements

Red (#EF4444):
- Incorrect answers
- Errors

Dark Navy (#0F172A):
- Page background
- Card backgrounds

Light Gray (#F1F5F9):
- Text on dark backgrounds
- Secondary content
```

---

## ANIMATION CHOREOGRAPHY

### Entrance Animation (Page Load):
1. Header slides in from top (300ms)
2. Content fades in (300ms, staggered)
3. Cards scale up from center (400ms, spring)

### Quiz Option Selection:
1. Option button highlights on hover
2. Scale up slightly (100ms) on click
3. Fill color animates (200ms) if correct
4. Confetti burst effect (1000ms) for correct

### Progress Bar Fill:
1. Green bar extends smoothly (1000ms)
2. Number counter increments (1000ms in sync)
3. "Level up!" animation when level increases

---

## ACCESSIBILITY FEATURES

- **Color blind safe**: Don't rely only on red/green
  - Always add ✓ or ✗ symbols
  - Use patterns in addition to colors
  
- **Focus indicators**: All buttons show blue outline on Tab
- **Screen reader text**: Hidden labels for all icons
- **Min font size**: 16px for body text
- **Line height**: 1.6 for readability

---

## RESPONSIVE BREAKPOINTS

### Mobile (320px - 768px):
- Full-width cards
- Stacked layouts
- Larger buttons (50px height)
- 18px font for headings

### Tablet (768px - 1024px):
- 2-column layouts where possible
- Sidebar navigation collapsible

### Desktop (1024px+):
- Full 3-column layout
- Normal button sizes
- Hover effects on cards

---

**Design Philosophy**: Minimal, delightful, and always focused on clarity. Every animation should feel purposeful, not decorative.
