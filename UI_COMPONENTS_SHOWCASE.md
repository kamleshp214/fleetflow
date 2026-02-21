# 🎨 UI Components Showcase

## Visual Design Elements

### Color Palette

```css
/* Primary Colors */
--primary-yellow: #FFC229
--primary-yellow-light: #FFD666
--secondary-purple: #4A2B5E
--secondary-purple-light: #a78bfa

/* Background Colors */
--bg-dark: #0a0a0a
--bg-dark-alt: #1a1a2e
--bg-card: #1E1E24 (80% opacity)

/* Text Colors */
--text-white: #ffffff
--text-gray-400: #9ca3af
--text-gray-500: #6b7280

/* Border Colors */
--border-white-5: rgba(255, 255, 255, 0.05)
--border-white-10: rgba(255, 255, 255, 0.1)
--border-white-20: rgba(255, 255, 255, 0.2)
```

### Typography Scale

```css
/* Headings */
h1: text-3xl font-black (30px, 900 weight)
h2: text-2xl font-bold (24px, 700 weight)
h3: text-xl font-bold (20px, 700 weight)

/* Body */
body: text-sm (14px)
large: text-base (16px)
small: text-xs (12px)

/* Font Families */
--font-sans: Geist Sans
--font-mono: Geist Mono
```

### Spacing System

```css
/* Padding */
p-4: 16px
p-6: 24px
p-8: 32px
p-10: 40px

/* Gaps */
gap-2: 8px
gap-3: 12px
gap-4: 16px
gap-6: 24px

/* Margins */
mb-2: 8px
mb-4: 16px
mb-6: 24px
mb-8: 32px
```

### Border Radius

```css
rounded-xl: 12px
rounded-2xl: 16px
rounded-3xl: 24px
rounded-full: 9999px
```

## Component Breakdown

### 1. Login Page Card

```
┌─────────────────────────────────────┐
│                                     │
│         [Truck Icon in Box]         │
│                                     │
│         Welcome Back                │
│   Sign in to your FleetFlow         │
│        account to continue          │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  [Error Message if present]   │  │
│  └───────────────────────────────┘  │
│                                     │
│  ┌───────────────────────────────┐  │
│  │  [G] Continue with Google     │  │
│  └───────────────────────────────┘  │
│                                     │
│  ─────── Secure Authentication ────  │
│                                     │
│  Don't have an account?             │
│  Create one now                     │
│                                     │
│  ─────────────────────────────────  │
│  🔒 Secured by Firebase Auth        │
│                                     │
└─────────────────────────────────────┘
```

**Dimensions:**
- Max width: 28rem (448px)
- Padding: 32-40px
- Border radius: 24px

**Effects:**
- Backdrop blur: xl
- Border: white 10% opacity
- Shadow: 2xl
- Animation: fade-in + slide-in-from-bottom

### 2. Register Page Card

```
┌─────────────────────────────────────────────────┐
│                                                 │
│            [Truck Icon in Box]                  │
│                                                 │
│              Join FleetFlow                     │
│   Create your account and start managing        │
│        your fleet operations efficiently        │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │         Available Roles                   │  │
│  │                                           │  │
│  │  ┌──────────┐  ┌──────────┐             │  │
│  │  │ Manager  │  │Dispatcher│             │  │
│  │  │ [Icon]   │  │ [Icon]   │             │  │
│  │  └──────────┘  └──────────┘             │  │
│  │                                           │  │
│  │  ┌──────────┐  ┌──────────┐             │  │
│  │  │ Safety   │  │Financial │             │  │
│  │  │ [Icon]   │  │ [Icon]   │             │  │
│  │  └──────────┘  └──────────┘             │  │
│  │                                           │  │
│  │  You'll select your role after signing   │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │    [G] Continue with Google               │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  ────────────── Quick & Secure ──────────────  │
│                                                 │
│  Already have an account? Sign in              │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Dimensions:**
- Max width: 32rem (512px)
- Padding: 32-40px
- Border radius: 24px

### 3. Role Selection Page

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│              [Truck Icon in Box]                        │
│                                                         │
│              Choose Your Role                           │
│   Welcome, John Doe! Select your role to complete      │
│                  registration                           │
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  [✓] Manager         │  │  Dispatcher          │   │
│  │  [Icon]              │  │  [Icon]              │   │
│  │  Full system access  │  │  Fleet operations    │   │
│  │  • Manage users      │  │  • Create trips      │   │
│  │  • Analytics         │  │  • Assign drivers    │   │
│  │  • Configuration     │  │  • Track deliveries  │   │
│  └──────────────────────┘  └──────────────────────┘   │
│                                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  Safety Officer      │  │  Financial Analyst   │   │
│  │  [Icon]              │  │  [Icon]              │   │
│  │  Compliance          │  │  Analytics           │   │
│  │  • Safety reports    │  │  • Expense tracking  │   │
│  │  • Driver monitoring │  │  • ROI analysis      │   │
│  │  • Compliance track  │  │  • Financial reports │   │
│  └──────────────────────┘  └──────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Complete Registration  →                       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  You can request a role change from admin later        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Dimensions:**
- Max width: 64rem (1024px)
- Padding: 32-40px
- Grid: 2x2 (responsive to 1 column)

### 4. Google Sign-In Button

```
┌─────────────────────────────────────────┐
│  [G]  Continue with Google              │
└─────────────────────────────────────────┘
```

**Specifications:**
- Background: White
- Text: Gray-900
- Border: 2px gray-200
- Padding: 14px 24px
- Border radius: 16px
- Font: Semibold
- Icon: Official Google SVG (20x20px)
- Gap: 12px

**States:**
- Default: White background
- Hover: Gray-50 background, gray-300 border
- Loading: Spinner + "Signing in..." text
- Disabled: 50% opacity

**Animation:**
- Gradient sweep on hover (700ms)
- Shadow elevation on hover
- Smooth transitions (300ms)

## Role Card Specifications

### Manager (Blue)
```
┌─────────────────────────┐
│  [✓]                    │
│  ┌────┐                 │
│  │👥  │  Manager        │
│  └────┘                 │
│  Full system access     │
│  and oversight          │
│                         │
│  • Manage all users     │
│  • Full analytics       │
│  • System config        │
└─────────────────────────┘
```
- Gradient: `from-blue-500 to-blue-600`
- Icon: Users
- Size: 48x48px icon container

### Dispatcher (Yellow)
```
┌─────────────────────────┐
│  [✓]                    │
│  ┌────┐                 │
│  │🚛  │  Dispatcher     │
│  └────┘                 │
│  Manage trips and       │
│  fleet operations       │
│                         │
│  • Create trips         │
│  • Assign drivers       │
│  • Track deliveries     │
└─────────────────────────┘
```
- Gradient: `from-[#FFC229] to-[#FFD666]`
- Icon: Truck
- Highlight color when selected

### Safety Officer (Green)
```
┌─────────────────────────┐
│  [✓]                    │
│  ┌────┐                 │
│  │🛡️  │  Safety Officer │
│  └────┘                 │
│  Monitor compliance     │
│  and safety             │
│                         │
│  • Safety reports       │
│  • Driver monitoring    │
│  • Compliance tracking  │
└─────────────────────────┘
```
- Gradient: `from-emerald-500 to-emerald-600`
- Icon: Shield

### Financial Analyst (Purple)
```
┌─────────────────────────┐
│  [✓]                    │
│  ┌────┐                 │
│  │📊  │  Financial      │
│  └────┘     Analyst     │
│  Track expenses and     │
│  analytics              │
│                         │
│  • Expense tracking     │
│  • ROI analysis         │
│  • Financial reports    │
└─────────────────────────┘
```
- Gradient: `from-purple-500 to-purple-600`
- Icon: BarChart3

## Animation Specifications

### Page Load
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom {
  from { transform: translateY(16px); }
  to { transform: translateY(0); }
}

/* Applied to main card */
animation: fade-in 700ms, slide-in-from-bottom 700ms;
```

### Background Pulse
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Applied to background orbs */
animation: pulse 2s infinite;
```

### Button Hover
```css
/* Gradient sweep effect */
.gradient-sweep {
  background: linear-gradient(
    to right,
    transparent,
    rgba(0, 0, 0, 0.05),
    transparent
  );
  transform: translateX(-100%);
  transition: transform 700ms;
}

.button:hover .gradient-sweep {
  transform: translateX(100%);
}
```

### Loading Spinner
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Applied to loading icon */
animation: spin 1s linear infinite;
```

### Role Card Selection
```css
/* Scale effect on icon */
.role-card.selected .icon {
  transform: scale(1.1);
  transition: transform 300ms;
}

/* Check mark zoom in */
@keyframes zoom-in {
  from { transform: scale(0); }
  to { transform: scale(1); }
}

animation: zoom-in 200ms;
```

## Responsive Breakpoints

```css
/* Mobile First */
default: < 768px
  - Single column
  - Full width cards
  - Reduced padding

/* Tablet */
md: 768px - 1024px
  - 2 column grid for roles
  - Optimized spacing
  - Comfortable touch targets

/* Desktop */
lg: > 1024px
  - Max width constraints
  - Full 2x2 grid
  - Hover effects enabled
  - Larger spacing
```

## Accessibility Features

- ✅ Semantic HTML elements
- ✅ ARIA labels where needed
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Color contrast ratios (WCAG AA)
- ✅ Screen reader friendly
- ✅ Touch target sizes (44x44px minimum)

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ✅ Lazy loading for images
- ✅ Optimized animations (GPU accelerated)
- ✅ Minimal JavaScript bundle
- ✅ CSS-only effects where possible
- ✅ Backdrop filter with fallback
