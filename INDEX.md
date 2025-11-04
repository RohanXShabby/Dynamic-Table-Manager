# 📑 Project Index

Complete reference guide for the Dynamic Data Table Manager project.

## 📖 Documentation Files

### Getting Started
- **[README.md](README.md)** - Complete project documentation, features, and usage guide
- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup and first-time user guide
- **[INSTALLATION.md](README.md#getting-started)** - Detailed installation instructions

### Development
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Guidelines for contributing to the project
- **[FEATURES.md](FEATURES.md)** - Complete feature implementation checklist
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Technical overview and architecture

### Testing & Quality
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Comprehensive testing procedures and checklists
- **[ACCESSIBILITY.md](ACCESSIBILITY.md)** - Accessibility guidelines and WCAG compliance

### Deployment & Operations
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deployment instructions for various platforms
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes

## 🗂️ Project Structure

### Application Code

#### Pages & Layouts
```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx            # Main application page
├── globals.css         # Global styles
└── favicon.ico         # App icon
```

#### Components
```
components/
├── DataTable.tsx           # Main table with sorting, pagination, editing
├── TableToolbar.tsx        # Search, import/export, theme toggle
├── ManageColumnsModal.tsx  # Column management interface
└── Providers.tsx           # Redux & MUI theme providers
```

#### State Management
```
store/
├── store.ts            # Redux store configuration with persistence
├── tableSlice.ts       # Table state slice with actions
└── hooks.ts            # Typed Redux hooks (useAppDispatch, useAppSelector)
```

#### Type Definitions
```
types/
└── table.ts            # TypeScript interfaces (TableRow, ColumnConfig, TableState)
```

#### Utilities
```
utils/
├── csvUtils.ts         # CSV import/export functions
├── validation.ts       # Input validation helpers
└── constants.ts        # Application constants
```

#### Static Assets
```
public/
└── sample-data.csv     # Sample CSV file for testing
```

### Configuration Files

```
Root Directory/
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── next.config.ts         # Next.js configuration
├── eslint.config.mjs      # ESLint rules
├── postcss.config.mjs     # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration (if exists)
└── .gitignore            # Git ignore rules
```

## 🎯 Key Features Reference

### Core Features
1. **Table View** - [DataTable.tsx](components/DataTable.tsx)
   - Sorting: Click column headers
   - Search: Global search bar
   - Pagination: Bottom controls

2. **Column Management** - [ManageColumnsModal.tsx](components/ManageColumnsModal.tsx)
   - Show/hide columns
   - Add custom columns
   - Persistent preferences

3. **CSV Operations** - [csvUtils.ts](utils/csvUtils.ts)
   - Import: Upload and parse CSV
   - Export: Download current view
   - Validation: Error handling

### Bonus Features
4. **Inline Editing** - [DataTable.tsx](components/DataTable.tsx)
   - Edit mode toggle
   - Input validation
   - Save/Cancel actions

5. **Row Actions** - [DataTable.tsx](components/DataTable.tsx)
   - Edit button
   - Delete with confirmation

6. **Theme Toggle** - [Providers.tsx](components/Providers.tsx)
   - Light/Dark mode
   - Persistent preference

7. **Responsive Design** - All components
   - Mobile-first approach
   - Breakpoint-based layouts

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint -- --fix    # Auto-fix linting issues

# Type Checking
npx tsc --noEmit        # Check TypeScript types
```

## 📦 Dependencies Reference

### Production Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| next | 16.0.1 | React framework |
| react | 19.2.0 | UI library |
| @reduxjs/toolkit | ^2.10.1 | State management |
| react-redux | ^9.2.0 | React bindings for Redux |
| redux-persist | ^6.0.0 | State persistence |
| @mui/material | ^7.3.5 | UI components |
| @mui/icons-material | ^7.3.5 | Icons |
| @emotion/react | ^11.14.0 | Styling |
| @emotion/styled | ^11.14.1 | Styled components |
| papaparse | ^5.5.3 | CSV parsing |
| file-saver | ^2.0.5 | File downloads |
| react-hook-form | ^7.66.0 | Form handling |

### Development Dependencies
| Package | Version | Purpose |
|---------|---------|---------|
| typescript | ^5 | Type safety |
| @types/node | ^20 | Node types |
| @types/react | ^19 | React types |
| @types/papaparse | ^5.3.16 | PapaParse types |
| @types/file-saver | ^2.0.7 | FileSaver types |
| eslint | ^9 | Code linting |
| tailwindcss | ^4 | Utility CSS |

## 🎨 Component API Reference

### DataTable Component
```tsx
<DataTable />
```
**Props:** None (uses Redux state)
**Features:**
- Sorting on column headers
- Inline editing
- Row actions (Edit/Delete)
- Pagination controls

### TableToolbar Component
```tsx
<TableToolbar />
```
**Props:** None (uses Redux state)
**Features:**
- Global search
- Import CSV button
- Export CSV button
- Theme toggle
- Manage Columns button

### ManageColumnsModal Component
```tsx
<ManageColumnsModal 
  open={boolean}
  onClose={() => void}
/>
```
**Props:**
- `open`: Boolean to control visibility
- `onClose`: Callback when modal closes

## 🔄 Redux State Structure

```typescript
{
  table: {
    rows: TableRow[],           // All table data
    columns: ColumnConfig[],    // Column configuration
    searchQuery: string,        // Current search term
    sortColumn: string | null,  // Active sort column
    sortDirection: 'asc' | 'desc',
    page: number,               // Current page (0-indexed)
    rowsPerPage: number,        // Rows per page
    editingRows: Set<string>,   // IDs of rows in edit mode
    theme: 'light' | 'dark'     // Current theme
  }
}
```

## 🎯 Redux Actions Reference

### Data Actions
- `setRows(rows)` - Replace all rows
- `addRow(row)` - Add single row
- `updateRow({ id, data })` - Update row
- `deleteRow(id)` - Delete row

### UI Actions
- `setSearchQuery(query)` - Set search term
- `toggleSort(column)` - Toggle sort on column
- `setPage(page)` - Change page
- `setRowsPerPage(count)` - Change rows per page

### Column Actions
- `toggleColumnVisibility(id)` - Show/hide column
- `addColumn(column)` - Add new column
- `updateColumnVisibility({ id, visible })` - Set column visibility

### Edit Actions
- `startEditingRow(id)` - Enter edit mode
- `stopEditingRow(id)` - Exit edit mode
- `clearEditingRows()` - Exit all edit modes

### Theme Actions
- `toggleTheme()` - Switch theme
- `setTheme(mode)` - Set specific theme

## 📝 Type Definitions Reference

### TableRow
```typescript
interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | undefined;
}
```

### ColumnConfig
```typescript
interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  required: boolean;
  type: 'string' | 'number';
}
```

### TableState
```typescript
interface TableState {
  rows: TableRow[];
  columns: ColumnConfig[];
  searchQuery: string;
  sortColumn: string | null;
  sortDirection: 'asc' | 'desc';
  page: number;
  rowsPerPage: number;
  editingRows: Set<string>;
  theme: 'light' | 'dark';
}
```

## 🧪 Testing Resources

### Test Data
- **Sample CSV**: [public/sample-data.csv](public/sample-data.csv)
- **Sample Data in Code**: [store/tableSlice.ts](store/tableSlice.ts)

### Testing Guides
- **Manual Testing**: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Feature Testing**: [FEATURES.md](FEATURES.md)
- **Accessibility Testing**: [ACCESSIBILITY.md](ACCESSIBILITY.md)

## 🚀 Deployment Resources

### Platforms
- **Vercel** (Recommended) - See [DEPLOYMENT.md](DEPLOYMENT.md#option-1-vercel-recommended)
- **Netlify** - See [DEPLOYMENT.md](DEPLOYMENT.md#option-2-netlify)
- **Docker** - See [DEPLOYMENT.md](DEPLOYMENT.md#option-3-docker)
- **AWS Amplify** - See [DEPLOYMENT.md](DEPLOYMENT.md#option-4-aws-amplify)
- **Self-Hosted** - See [DEPLOYMENT.md](DEPLOYMENT.md#option-5-self-hosted-vpsdedicated-server)

## 🔗 Quick Links

### Documentation
- [Main README](README.md)
- [Quick Start](QUICKSTART.md)
- [Features List](FEATURES.md)
- [Testing Guide](TESTING_GUIDE.md)

### Development
- [Contributing Guide](CONTRIBUTING.md)
- [Project Summary](PROJECT_SUMMARY.md)
- [Changelog](CHANGELOG.md)

### Operations
- [Deployment Guide](DEPLOYMENT.md)
- [Accessibility Guide](ACCESSIBILITY.md)

## 📊 Project Statistics

- **Total Files**: 15+ source files
- **Lines of Code**: ~1,500+
- **Components**: 4 major components
- **Redux Actions**: 15+ actions
- **Documentation Pages**: 10+ guides
- **Dependencies**: 12 production, 8 development

## 🎓 Learning Resources

### Technologies Used
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Material UI](https://mui.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Concepts Demonstrated
- React Hooks (useState, useMemo, useRef)
- Redux state management
- TypeScript interfaces and types
- Material UI theming
- CSV parsing and generation
- Local storage persistence
- Responsive design
- Accessibility (WCAG 2.1)

## 🆘 Support & Help

### Getting Help
1. Check [README.md](README.md) for basic usage
2. Review [QUICKSTART.md](QUICKSTART.md) for setup
3. Consult [TESTING_GUIDE.md](TESTING_GUIDE.md) for features
4. Read [CONTRIBUTING.md](CONTRIBUTING.md) for development

### Common Issues
- **Installation Problems**: See [README.md#installation](README.md#getting-started)
- **Build Errors**: Check TypeScript and dependency versions
- **Runtime Errors**: Check browser console and Redux DevTools
- **Feature Questions**: See [FEATURES.md](FEATURES.md)

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Built with:
- Next.js by Vercel
- Redux Toolkit by Redux team
- Material UI by MUI team
- PapaParse by mholt
- FileSaver.js by eligrey

---

**Last Updated**: November 2024
**Version**: 1.0.0
**Status**: ✅ Production Ready

For the most up-to-date information, always refer to the main [README.md](README.md).
