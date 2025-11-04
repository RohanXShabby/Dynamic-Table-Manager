# 📂 Project Structure Tree

```
dynamic-table-manager/
│
├── 📄 Configuration Files
│   ├── package.json                 # Dependencies and scripts
│   ├── package-lock.json            # Locked dependency versions
│   ├── tsconfig.json                # TypeScript configuration
│   ├── next.config.ts               # Next.js configuration
│   ├── eslint.config.mjs            # ESLint rules
│   ├── postcss.config.mjs           # PostCSS configuration
│   ├── next-env.d.ts                # Next.js TypeScript declarations
│   └── .gitignore                   # Git ignore rules
│
├── 📚 Documentation (11 files)
│   ├── README.md                    # Main documentation (6.7 KB)
│   ├── QUICKSTART.md                # 5-minute setup guide (4.9 KB)
│   ├── FEATURES.md                  # Feature checklist (3.9 KB)
│   ├── TESTING_GUIDE.md             # Testing procedures (7.2 KB)
│   ├── PROJECT_SUMMARY.md           # Technical overview (9.3 KB)
│   ├── PROJECT_COMPLETE.md          # Completion summary (10.9 KB)
│   ├── ACCESSIBILITY.md             # Accessibility guide (7.7 KB)
│   ├── DEPLOYMENT.md                # Deployment instructions (9.7 KB)
│   ├── CHANGELOG.md                 # Version history (5.7 KB)
│   ├── CONTRIBUTING.md              # Contribution guidelines (9.9 KB)
│   ├── INDEX.md                     # Project index (10.8 KB)
│   └── PROJECT_TREE.md              # This file
│
├── 📱 Application Code
│   │
│   ├── app/                         # Next.js App Router
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Main application page
│   │   ├── globals.css              # Global styles
│   │   └── favicon.ico              # App icon
│   │
│   ├── components/                  # React Components
│   │   ├── DataTable.tsx            # Main table (9.8 KB, 300+ lines)
│   │   │   ├── Features:
│   │   │   │   ├── Sorting (ASC/DESC)
│   │   │   │   ├── Pagination
│   │   │   │   ├── Inline editing
│   │   │   │   ├── Row actions (Edit/Delete)
│   │   │   │   └── Delete confirmation dialog
│   │   │
│   │   ├── TableToolbar.tsx         # Toolbar (4.9 KB, 150+ lines)
│   │   │   ├── Features:
│   │   │   │   ├── Global search
│   │   │   │   ├── CSV import
│   │   │   │   ├── CSV export
│   │   │   │   ├── Theme toggle
│   │   │   │   └── Manage columns button
│   │   │
│   │   ├── ManageColumnsModal.tsx   # Column manager (4.2 KB, 120+ lines)
│   │   │   ├── Features:
│   │   │   │   ├── Show/hide columns
│   │   │   │   ├── Add new columns
│   │   │   │   └── Column type selection
│   │   │
│   │   └── Providers.tsx            # Redux & Theme (1.1 KB)
│   │       ├── Redux Provider
│   │       ├── Redux Persist Gate
│   │       └── MUI Theme Provider
│   │
│   ├── store/                       # Redux State Management
│   │   ├── store.ts                 # Store config (1.0 KB)
│   │   │   ├── Redux Toolkit setup
│   │   │   ├── Redux Persist config
│   │   │   └── Middleware setup
│   │   │
│   │   ├── tableSlice.ts            # Table slice (6.0 KB, 150+ lines)
│   │   │   ├── Initial state
│   │   │   ├── Sample data (12 rows)
│   │   │   ├── 15+ Redux actions:
│   │   │   │   ├── setRows, addRow, updateRow, deleteRow
│   │   │   │   ├── setSearchQuery, toggleSort, setPage
│   │   │   │   ├── toggleColumnVisibility, addColumn
│   │   │   │   ├── startEditingRow, stopEditingRow
│   │   │   │   └── toggleTheme, setTheme
│   │   │   └── Reducers
│   │   │
│   │   └── hooks.ts                 # Typed hooks (274 bytes)
│   │       ├── useAppDispatch
│   │       └── useAppSelector
│   │
│   ├── types/                       # TypeScript Definitions
│   │   └── table.ts                 # Interfaces
│   │       ├── TableRow
│   │       ├── ColumnConfig
│   │       └── TableState
│   │
│   └── utils/                       # Utility Functions
│       ├── csvUtils.ts              # CSV operations (3.0 KB)
│       │   ├── exportToCSV()
│       │   └── importFromCSV()
│       │
│       ├── validation.ts            # Validation (959 bytes)
│       │   ├── validateEmail()
│       │   ├── validateAge()
│       │   ├── validateRow()
│       │   └── sanitizeInput()
│       │
│       └── constants.ts             # Constants (1.6 KB)
│           ├── APP_CONFIG
│           ├── TABLE_CONFIG
│           ├── VALIDATION_RULES
│           ├── ERROR_MESSAGES
│           └── SUCCESS_MESSAGES
│
├── 🎨 Static Assets
│   └── public/
│       ├── sample-data.csv          # Test CSV file
│       ├── next.svg                 # Next.js logo
│       ├── vercel.svg               # Vercel logo
│       └── [other assets]
│
├── 🔧 Build Output (generated)
│   └── .next/                       # Next.js build output
│       └── [build files]
│
└── 📦 Dependencies
    └── node_modules/                # Installed packages
        └── [424 packages]

```

## 📊 File Statistics

### Source Code
- **Total Source Files**: 15+
- **Total Lines of Code**: ~1,500+
- **TypeScript Files**: 15
- **React Components**: 4
- **Redux Slices**: 1
- **Utility Modules**: 3

### Documentation
- **Documentation Files**: 11
- **Total Documentation**: ~77 KB
- **README Size**: 6.7 KB
- **Guides**: 10 comprehensive guides

### Configuration
- **Config Files**: 7
- **Package Dependencies**: 12 production, 8 dev
- **Total Packages**: 424 (with sub-dependencies)

## 🎯 Key Directories

### `/app` - Next.js Application
- Entry point for the application
- Contains pages and layouts
- Uses App Router (Next.js 14+)

### `/components` - React Components
- Reusable UI components
- Material UI based
- Fully typed with TypeScript

### `/store` - Redux State
- Centralized state management
- Redux Toolkit implementation
- Persistent storage configuration

### `/types` - Type Definitions
- TypeScript interfaces
- Shared type definitions
- Type safety across app

### `/utils` - Utilities
- Helper functions
- CSV operations
- Validation logic
- Constants

### `/public` - Static Assets
- Sample CSV file
- Images and icons
- Publicly accessible files

## 📈 Code Distribution

```
Components:     ~800 lines (53%)
Redux Store:    ~300 lines (20%)
Utilities:      ~200 lines (13%)
Types:          ~50 lines  (3%)
Config:         ~150 lines (10%)
```

## 🔗 File Relationships

```
app/page.tsx
    ├── imports TableToolbar
    └── imports DataTable

TableToolbar
    ├── uses Redux hooks
    ├── imports ManageColumnsModal
    └── uses csvUtils

DataTable
    ├── uses Redux hooks
    └── uses Material UI components

ManageColumnsModal
    └── uses Redux hooks

All Components
    └── wrapped by Providers
        ├── Redux Provider
        └── MUI Theme Provider
```

## 📦 Dependency Tree (Simplified)

```
Next.js 16.0.1
├── React 19.2.0
│   ├── React DOM
│   └── React Hooks
│
├── Redux Toolkit 2.10.1
│   ├── React Redux 9.2.0
│   └── Redux Persist 6.0.0
│
├── Material UI 7.3.5
│   ├── @emotion/react
│   ├── @emotion/styled
│   └── @mui/icons-material
│
├── Data Libraries
│   ├── PapaParse 5.5.3
│   └── FileSaver.js 2.0.5
│
└── Development Tools
    ├── TypeScript 5
    ├── ESLint 9
    └── Tailwind CSS 4
```

## 🎨 Component Hierarchy

```
RootLayout (app/layout.tsx)
└── Providers
    ├── Redux Provider
    │   └── PersistGate
    │       └── ThemeProvider
    │           └── Page (app/page.tsx)
    │               ├── Container
    │               │   ├── Header (Paper)
    │               │   └── Content (Box)
    │               │       ├── TableToolbar
    │               │       │   ├── Search (TextField)
    │               │       │   ├── Buttons (Import/Export/Columns)
    │               │       │   ├── Theme Toggle (IconButton)
    │               │       │   └── ManageColumnsModal
    │               │       │       ├── Column Checkboxes
    │               │       │       └── Add Column Form
    │               │       │
    │               │       └── DataTable
    │               │           ├── Table (MUI)
    │               │           │   ├── TableHead
    │               │           │   │   └── Sortable Headers
    │               │           │   └── TableBody
    │               │           │       └── Rows (editable)
    │               │           │           └── Actions (Edit/Delete)
    │               │           │
    │               │           ├── TablePagination
    │               │           └── Delete Dialog
    │               │
    │               └── Snackbar (notifications)
```

## 🔄 Data Flow

```
User Action
    ↓
Component Event Handler
    ↓
Redux Action Dispatch
    ↓
Redux Reducer (updates state)
    ↓
Redux Persist (saves to localStorage)
    ↓
Component Re-renders (via useSelector)
    ↓
UI Updates
```

## 🎯 Entry Points

1. **Development**: `npm run dev` → `app/page.tsx`
2. **Production**: `npm start` → Built `.next` folder
3. **Documentation**: `README.md` → All guides

## 📝 Notes

- All TypeScript files use strict mode
- All components are client-side ('use client')
- Redux state is persisted to localStorage
- Material UI provides theming and components
- Next.js handles routing and optimization
- All code is production-ready

---

**Last Updated**: November 2024
**Total Project Size**: ~250 KB (source + docs)
**Build Size**: ~2 MB (with dependencies)
