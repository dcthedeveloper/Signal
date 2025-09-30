# Signal - Project Architecture

## 📂 Complete File Structure

```
Signal/
├── 📄 Configuration Files
│   ├── package.json                    # Dependencies & scripts
│   ├── vite.config.js                  # Vite configuration
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── postcss.config.js               # PostCSS config
│   ├── .eslintrc.cjs                   # ESLint rules
│   ├── .gitignore                      # Git ignore patterns
│   ├── .env.example                    # Environment template
│   ├── Dockerfile                      # Docker build config
│   ├── docker-compose.yml              # Docker compose config
│   ├── nginx.conf                      # Nginx configuration
│   └── vercel.json                     # Vercel deployment config
│
├── 📚 Documentation
│   ├── README.md                       # Main documentation
│   ├── DEMO.md                         # Academic explanation
│   ├── DEPLOYMENT.md                   # Deployment guide
│   ├── CONTRIBUTING.md                 # Contributor guidelines
│   └── ARCHITECTURE.md                 # This file
│
├── 🔧 Scripts
│   └── setup.sh                        # Quick setup script
│
├── 🤖 CI/CD
│   └── .github/
│       └── workflows/
│           └── ci-cd.yml               # GitHub Actions workflow
│
├── 🎨 Public Assets
│   └── public/
│       └── favicon.svg                 # App icon
│
└── 💻 Source Code
    └── src/
        ├── 🔌 API Layer
        │   ├── cache.js                # In-memory caching
        │   ├── claude.js               # Anthropic Claude AI
        │   ├── alphaVantage.js         # Stock market data
        │   ├── finnhub.js              # Financial news
        │   └── newsApi.js              # General news
        │
        ├── 🧩 Components
        │   ├── layout/
        │   │   ├── Layout.jsx          # Main layout wrapper
        │   │   ├── Sidebar.jsx         # Desktop navigation
        │   │   └── MobileNav.jsx       # Mobile navigation
        │   └── shared/
        │       ├── ui.jsx              # Reusable UI components
        │       ├── LoadingSkeleton.jsx # Loading states
        │       └── ErrorBoundary.jsx   # Error handling
        │
        ├── 📄 Pages
        │   ├── Home.jsx                # Landing page
        │   ├── Portfolio.jsx           # Portfolio management
        │   ├── Analysis.jsx            # Document analysis
        │   ├── Calendar.jsx            # Market calendar
        │   ├── Assistant.jsx           # AI chat
        │   ├── WhatIf.jsx              # Scenario modeling
        │   ├── Alerts.jsx              # Alert management
        │   └── Settings.jsx            # User settings
        │
        ├── 💾 State Management
        │   └── store/
        │       └── useStore.js         # Zustand store
        │
        ├── 🛠️ Utilities
        │   ├── cn.js                   # Class name utility
        │   ├── financial.js            # Financial calculations
        │   └── formatters.js           # Data formatting
        │
        ├── 🎨 Styles
        │   └── index.css               # Global styles
        │
        ├── 🚀 Entry Points
        │   ├── App.jsx                 # Main app component
        │   └── main.jsx                # React entry point
        │
        └── 📄 HTML
            └── index.html              # HTML template
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                       │
│  ┌────────┬────────┬────────┬────────┬────────┬────────┐   │
│  │ Home   │Portfolio│Analysis│Calendar│Assistant│WhatIf │   │
│  └────────┴────────┴────────┴────────┴────────┴────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      COMPONENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Layout     │  │  Shared UI   │  │    Error     │      │
│  │  Components  │  │  Components  │  │   Boundary   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   STATE MANAGEMENT (Zustand)                 │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │Portfolio │   News   │  Chat    │ Settings │             │
│  │  State   │  State   │ Messages │  State   │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                        API LAYER                             │
│  ┌─────────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │   Cache     │→ │  Claude  │  │  Alpha   │  │Finnhub  │ │
│  │   Layer     │  │   API    │  │ Vantage  │  │  API    │ │
│  └─────────────┘  └──────────┘  └──────────┘  └─────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
│  ┌──────────┬──────────┬──────────┬──────────┐             │
│  │Anthropic │  Alpha   │ Finnhub  │ NewsAPI  │             │
│  │  Claude  │ Vantage  │   API    │   API    │             │
│  └──────────┴──────────┴──────────┴──────────┘             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

```
1. User Action (Click/Type)
        ↓
2. Component Handler
        ↓
3. State Update (Zustand)
        ↓
4. API Call (if needed)
        ↓
5. Cache Check
        ↓
6. External API (if cache miss)
        ↓
7. Update State with Response
        ↓
8. Re-render Components
        ↓
9. Display Updated UI
```

## 🎯 Component Hierarchy

```
App.jsx
└── Layout.jsx
    ├── Sidebar.jsx (Desktop)
    ├── MobileNav.jsx (Mobile)
    └── Outlet (Pages)
        ├── Home.jsx
        │   ├── Button
        │   ├── Card
        │   └── CardDescription
        ├── Portfolio.jsx
        │   ├── Card (Summary)
        │   ├── Card (Holdings Table)
        │   └── Badge (Change Indicators)
        ├── Analysis.jsx
        │   ├── Card (Input)
        │   ├── Card (Results)
        │   └── LoadingSkeleton
        ├── Assistant.jsx
        │   ├── Card (Chat Container)
        │   ├── MessageBubble
        │   └── Button (Send)
        ├── WhatIf.jsx
        │   ├── Card (Scenarios)
        │   └── Card (Analysis)
        ├── Calendar.jsx
        │   └── Card (Events List)
        ├── Alerts.jsx
        │   └── Card (Alert List)
        └── Settings.jsx
            └── Card (Settings Forms)
```

## 🔌 API Integration Pattern

```javascript
// Pattern used throughout the codebase:

1. Import API function
   import { getQuote } from '../api/alphaVantage';

2. Use in component with error handling
   try {
     const data = await getQuote('AAPL');
     // Update state
   } catch (error) {
     // Handle error
   }

3. API function checks cache first
   if (cache.has(key)) return cache.get(key);

4. Makes external request if needed
   const response = await axios.get(url);

5. Caches response
   cache.set(key, data, ttl);

6. Returns data
   return data;
```

## 💾 State Management Pattern

```javascript
// Zustand store pattern:

const useStore = create((set) => ({
  // State
  data: [],
  
  // Actions
  setData: (data) => set({ data }),
  
  addItem: (item) => set((state) => ({
    data: [...state.data, item]
  })),
  
  updateItem: (id, updates) => set((state) => ({
    data: state.data.map(item => 
      item.id === id ? { ...item, ...updates } : item
    )
  })),
}));

// Usage in component:
const { data, addItem } = useStore();
```

## 🎨 Styling Pattern

```javascript
// Tailwind utility classes with cn() helper:

import { cn } from '../../utils/cn';

<div className={cn(
  'base-classes',
  condition && 'conditional-classes',
  variant === 'primary' ? 'primary-classes' : 'default-classes',
  className
)}>
  Content
</div>
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────┐
│          Git Repository                  │
│        (GitHub/GitLab)                   │
└─────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ↓             ↓             ↓
┌────────┐  ┌──────────┐  ┌──────────┐
│ Vercel │  │ Netlify  │  │  Docker  │
│  Edge  │  │   CDN    │  │Container │
└────────┘  └──────────┘  └──────────┘
    │             │             │
    └─────────────┼─────────────┘
                  ↓
        ┌───────────────────┐
        │   End Users       │
        │ (Browsers/Devices)│
        └───────────────────┘
```

## 🔐 Security Architecture

```
1. Environment Variables
   ↓
2. API Keys (server-side only recommended)
   ↓
3. HTTPS (Automatic on Vercel/Netlify)
   ↓
4. Security Headers (nginx.conf)
   ↓
5. CORS Configuration
   ↓
6. Input Validation
   ↓
7. XSS Prevention (React auto-escapes)
```

## 📊 Performance Optimizations

```
1. Build Optimizations
   ├── Code Splitting (Vite automatic)
   ├── Tree Shaking (Remove unused code)
   ├── Minification (CSS & JS)
   └── Gzip Compression

2. Runtime Optimizations
   ├── Response Caching (5-60 min TTL)
   ├── Lazy Loading (Images, components)
   ├── Debounced Inputs
   └── Memoization (where needed)

3. Network Optimizations
   ├── CDN (Vercel/Netlify)
   ├── HTTP/2
   ├── Asset Optimization
   └── Preconnect to APIs
```

## 🧪 Testing Strategy

```
1. Development Testing
   ├── ESLint (Code quality)
   ├── Manual testing
   └── Browser DevTools

2. Build Testing
   ├── Production build test
   ├── Bundle size check
   └── Preview server test

3. Deployment Testing
   ├── Staging environment
   ├── Production smoke test
   └── Monitoring & alerts
```

## 🔄 CI/CD Pipeline

```
GitHub Push/PR
      ↓
GitHub Actions Triggered
      ↓
  ┌───────────────┐
  │  1. Lint      │
  │  2. Build     │
  │  3. Test      │
  └───────────────┘
      ↓
  Pass? ─No→ Fail & Alert
      ↓ Yes
  Main Branch?
      ↓ Yes
  Deploy to Production
      ↓
  Verify Deployment
      ↓
  Success Notification
```

## 🎯 Key Design Decisions

### Why React 18?
- Modern hooks API
- Concurrent rendering
- Suspense for data fetching
- Best ecosystem support

### Why Vite?
- Fastest build tool
- Native ES modules
- Instant HMR
- Simple configuration

### Why Tailwind CSS?
- Utility-first approach
- Small bundle size with purging
- Consistent design system
- Excellent documentation

### Why Zustand?
- Minimal boilerplate
- Small bundle size (1KB)
- Simple API
- No Provider needed

### Why Claude AI?
- Best-in-class for financial analysis
- Structured outputs
- High context window
- Reasoning capabilities

## 📈 Scalability Considerations

### Current Scale
- Static frontend (CDN)
- Client-side API calls
- In-memory caching
- Suitable for: 10K+ users

### To Scale Further
1. Add Backend API
   - Move API calls server-side
   - Redis caching
   - Rate limiting

2. Add Database
   - User data persistence
   - Portfolio history
   - Analytics

3. Add Authentication
   - User accounts
   - OAuth integration
   - Role-based access

4. Microservices (if needed)
   - Separate AI service
   - Separate data service
   - Message queue

---

**This architecture supports both rapid development and production deployment.**
