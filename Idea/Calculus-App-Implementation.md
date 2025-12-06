# 💻 Calculus App - Implementation Quick Start

## HOW TO USE THESE DOCUMENTS WITH CURSOR

### Step 1: Gather All Three Documents
1. **Calculus-App-Prompt.md** (Main specification)
2. **Calculus-App-Design-UI.md** (Visual design)
3. **This file** (Implementation guide)

### Step 2: Create Initial Project
**Copy-paste this into Cursor:**

```
Create a React 18 project for a Calculus learning app with:

1. Project structure using Vite or Create React App
2. Install dependencies:
   - React 18
   - TailwindCSS for styling
   - Plotly.js for interactive graphs
   - Framer Motion for animations
   - Zustand for state management
   - Firebase for backend (optional for MVP)

3. File structure:
   src/
   ├── components/
   │   ├── Header.jsx
   │   ├── Dashboard.jsx
   │   ├── LessonSelector.jsx
   │   ├── Visualizers/
   │   │   ├── SlopeVisualizer.jsx
   │   │   ├── IntegralVisualizer.jsx
   │   │   └── LimitVisualizer.jsx
   │   ├── Quiz.jsx
   │   └── Avatar.jsx
   ├── store/
   │   └── userStore.js (Zustand store)
   ├── utils/
   │   ├── calculus.js (Math functions)
   │   └── animations.js
   ├── styles/
   │   ├── theme.css
   │   └── animations.css
   └── App.jsx

4. TailwindCSS config with custom color scheme (dark mode focused)
5. ESLint + Prettier configured
6. Ready to build components
```

---

## CURSOR PROMPT TEMPLATES

### Template 1: Build Dashboard Component
```
Build the Dashboard component with these features:

1. Display at top:
   - Streak counter (with 🔥 emoji)
   - Current level and XP
   - User name from Zustand store

2. Show animated mascot character that:
   - Waves hand on page load (Framer Motion)
   - Changes expression based on streak
   - Says encouraging message

3. Display progress:
   - Progress bar showing % through curriculum
   - Current level / Total levels (30)

4. Two action cards:
   - "Continue Lesson" (green button)
   - "New Lesson" (blue button)

5. Achievement section:
   - Show 4 most recent badges
   - "View All" link

6. Use TailwindCSS with dark theme
7. Responsive design (mobile-first)
8. All text should be encouraging and positive
```

### Template 2: Create SlopeVisualizer Component
```
Build interactive Slope Visualizer for derivatives using Plotly.js:

1. Display a curve: f(x) = x² - 2x + 3
2. Add a tangent line that:
   - Follows the curve as user moves slider
   - Rotates to match the curve's slope
   - Shows tangent line equation

3. Add a slider below graph to move position
4. Display in real-time:
   - Current x value
   - f(x) value
   - Slope (f'(x) value)

5. Animations:
   - Smooth tangent line rotation (Framer Motion)
   - Slope value updates smoothly
   - Point moves on curve

6. Interactive:
   - Plotly graph responds to drag
   - Slider drag updates graph smoothly
   - Reset button returns to default

7. Use Canvas rendering for performance
8. Add subtle glow effect around tangent line
```

### Template 3: Create Quiz Component
```
Build Quiz component with multiple question types:

1. Accept props:
   - Array of questions (objects with type, question, options, correctAnswer)
   - OnComplete callback
   - XP values for correct answers

2. Display:
   - Question number / Total questions
   - Progress bar
   - Current question text
   - Answer options based on type:
     * MCQ: 4 clickable buttons
     * Fill-blank: Text input
     * Drag-answer: Draggable items

3. Feedback system:
   - ✅ Correct: Green highlight + "+20 XP"
   - ❌ Incorrect: Red highlight + hint
   - Allow 2 attempts per question

4. Animations:
   - Framer Motion: Option scale-up on click
   - Confetti on correct answer
   - Smooth transition to next question

5. On completion:
   - Show summary (X/5 correct, accuracy %)
   - Award XP and streak
   - Call onComplete callback

6. Responsive and mobile-friendly
```

---

## ZUSTAND STORE TEMPLATE

**File: `src/store/userStore.js`**

```javascript
import create from 'zustand';

export const useUserStore = create((set) => ({
  // User State
  user: {
    name: 'Shyan',
    level: 8,
    xp: 450,
    streak: 7,
    totalXp: 2450,
  },

  // Progress State
  progress: {
    completedLessons: ['limits-intro', 'limits-quiz'],
    currentLesson: 'derivatives-slope',
    percentComplete: 45,
  },

  // Achievements
  achievements: ['calculus-rookie', 'quiz-master', 'streak-3days'],

  // Methods
  addXP: (amount) => set((state) => ({
    user: {
      ...state.user,
      xp: state.user.xp + amount,
      totalXp: state.user.totalXp + amount,
    },
  })),

  incrementStreak: () => set((state) => ({
    user: {
      ...state.user,
      streak: state.user.streak + 1,
    },
  })),

  completeLesson: (lessonId) => set((state) => ({
    progress: {
      ...state.progress,
      completedLessons: [...state.progress.completedLessons, lessonId],
    },
  })),

  unlockAchievement: (achievementId) => set((state) => ({
    achievements: [...state.achievements, achievementId],
  })),

  // Update level when XP crosses threshold
  levelUp: () => set((state) => ({
    user: {
      ...state.user,
      level: state.user.level + 1,
    },
  })),
}));
```

---

## CALCULUS MATH UTILITIES

**File: `src/utils/calculus.js`**

```javascript
// Derivative functions for common power functions
export const powerRuleDerivative = (coefficient, power, x) => {
  // d/dx(ax^n) = a*n*x^(n-1)
  return coefficient * power * Math.pow(x, power - 1);
};

// Numerical derivative (for custom functions)
export const numericalDerivative = (f, x, h = 0.0001) => {
  return (f(x + h) - f(x - h)) / (2 * h);
};

// Calculate tangent line at point
export const getTangentLine = (x, f, fPrime) => {
  const y = f(x);
  const slope = fPrime(x);
  // y - y1 = m(x - x1) → y = m(x - x1) + y1
  return (xVal) => slope * (xVal - x) + y;
};

// Numerical integration using Simpson's rule
export const integrate = (f, a, b, n = 100) => {
  const h = (b - a) / n;
  let sum = f(a) + f(b);
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += (i % 2 === 1 ? 4 : 2) * f(x);
  }
  
  return (h / 3) * sum;
};

// Area under curve (Riemann sum)
export const areaUnderCurve = (f, a, b, rectangles = 100) => {
  const width = (b - a) / rectangles;
  let area = 0;
  
  for (let i = 0; i < rectangles; i++) {
    const x = a + i * width;
    area += f(x) * width;
  }
  
  return area;
};

// Limit approximation
export const approximateLimit = (f, x, tolerance = 0.0001) => {
  let h = 1;
  let prevValue = null;
  
  while (h > tolerance) {
    const value = f(x + h);
    if (prevValue && Math.abs(value - prevValue) < tolerance) {
      return value;
    }
    prevValue = value;
    h /= 10;
  }
  
  return prevValue;
};

// Common test functions
export const functions = {
  quadratic: (x) => x * x - 2 * x + 3,
  quadraticDerivative: (x) => 2 * x - 2,
  cubic: (x) => x * x * x - x,
  cubicDerivative: (x) => 3 * x * x - 1,
  exponential: (x) => Math.exp(x),
  sine: (x) => Math.sin(x),
  cosine: (x) => Math.cos(x),
};
```

---

## ANIMATION SNIPPETS

**File: `src/utils/animations.js`**

```javascript
import { motion } from 'framer-motion';

// Tangent line rotation animation
export const tangentLineVariants = {
  hidden: { opacity: 0, rotate: 0 },
  visible: {
    opacity: 1,
    rotate: 45,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

// Confetti burst
export const confettiVariants = {
  initial: { opacity: 1, y: 0, scale: 1 },
  exit: {
    opacity: 0,
    y: -100,
    scale: 0,
    transition: { duration: 1 },
  },
};

// Progress bar fill
export const progressBarVariants = {
  initial: { width: '0%' },
  animate: (percent) => ({
    width: `${percent}%`,
    transition: { duration: 1, ease: 'easeOut' },
  }),
};

// Button hover effect
export const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
  },
  tap: { scale: 0.95 },
};

// Card entrance
export const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};
```

---

## PLOTLY GRAPH SETUP

**Inside SlopeVisualizer Component:**

```javascript
import Plot from 'react-plotly.js';

const SlopeVisualizer = () => {
  const [xPosition, setXPosition] = useState(1.5);

  const f = (x) => x * x - 2 * x + 3;
  const fPrime = (x) => 2 * x - 2;

  // Generate curve points
  const xValues = Array.from({ length: 100 }, (_, i) => -2 + (i / 100) * 6);
  const yValues = xValues.map(f);

  // Tangent line
  const slope = fPrime(xPosition);
  const tangentY = xValues.map((x) => 
    slope * (x - xPosition) + f(xPosition)
  );

  return (
    <Plot
      data={[
        {
          x: xValues,
          y: yValues,
          type: 'scatter',
          name: 'f(x)',
          line: { color: '#3B82F6', width: 3 },
        },
        {
          x: xValues,
          y: tangentY,
          type: 'scatter',
          name: 'Tangent Line',
          line: { color: '#EF4444', width: 2 },
        },
        {
          x: [xPosition],
          y: [f(xPosition)],
          type: 'scatter',
          name: 'Point',
          marker: { color: '#10B981', size: 10 },
        },
      ]}
      layout={{
        title: 'Slope Visualizer',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' },
        hovermode: 'closest',
        plot_bgcolor: '#1e293b',
        paper_bgcolor: '#0f172a',
        font: { color: '#f1f5f9' },
      }}
    />
  );
};
```

---

## TESTING WITH CURSOR

### Prompt for Testing:
```
Create test cases for:

1. SlopeVisualizer component:
   - Verify tangent line updates on slider change
   - Check slope calculations are correct
   - Test animation smoothness

2. Quiz component:
   - Test correct answer feedback
   - Test incorrect answer hint display
   - Verify XP calculation

3. Dashboard:
   - Check XP counter increments
   - Verify streak persistence
   - Test level-up animations

Use React Testing Library and write tests in __tests__ folder
```

---

## DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] Test on mobile devices (iPhone + Android)
- [ ] Check all animations perform smoothly (60 FPS)
- [ ] Verify audio/sound effects play
- [ ] Test offline functionality
- [ ] Check accessibility (keyboard navigation, screen readers)
- [ ] Performance audit (Lighthouse score >90)
- [ ] Test quiz question randomization
- [ ] Verify XP persistence in Firebase
- [ ] Check responsive design at all breakpoints
- [ ] Test with slow internet (3G throttling)

---

## DEBUGGING TIPS

### Animation Janky?
- Check frame rate: `Performance > Rendering`
- Use `transform` and `opacity` only (fastest)
- Avoid animating `width`/`height`
- Use `will-change: transform` in CSS

### Plotly Graph Not Updating?
- Ensure key prop changes
- Check state updates with console.log
- Verify data structure matches Plotly format

### XP Not Persisting?
- Check Firebase connection
- Verify Zustand store updates
- Check localStorage fallback

---

## NEXT STEPS AFTER BUILDING

1. **Add more visualizers**: Power rule, chain rule, integration by parts
2. **Create spaced repetition**: Remind users of concepts after 1 day, 3 days, 7 days
3. **Add astrophysics module**: Real-world applications (orbital mechanics, escape velocity)
4. **Multiplayer**: Leaderboards, study groups
5. **Export to PDF**: Progress reports for teachers/mentors

---

## RESOURCES DURING DEVELOPMENT

- **Plotly.js Docs**: https://plotly.com/javascript/
- **Framer Motion**: https://www.framer.com/motion/
- **TailwindCSS**: https://tailwindcss.com/
- **3Blue1Brown**: For inspiration on visualizations
- **MathJax**: For rendering formulas

---

**Ready to build? Start with Step 2 in Cursor and follow the prompts!**
