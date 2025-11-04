# 🚀 Quick Start Guide

Get up and running with the Dynamic Data Table Manager in 5 minutes!

## Prerequisites Check

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

## Installation (2 minutes)

```bash
# 1. Navigate to project directory
cd dynamic-table-manager

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

## First Look (1 minute)

1. Open your browser to **http://localhost:3000**
2. You should see:
   - A header: "Dynamic Data Table Manager"
   - A search bar and action buttons
   - A table with 12 sample employee records
   - Pagination controls at the bottom

## Try These Features (2 minutes)

### 1. Search (10 seconds)
- Type "developer" in the search bar
- Watch the table filter in real-time

### 2. Sort (10 seconds)
- Click the "Age" column header
- Click again to reverse the sort

### 3. Edit a Row (20 seconds)
- Click the ✏️ (Edit) icon on any row
- Change the name or age
- Click ✓ (Save) to confirm

### 4. Manage Columns (20 seconds)
- Click the "Columns" button
- Check "Department" to show it
- Add a new column like "Salary"

### 5. Export Data (10 seconds)
- Click the "Export" button
- Check your Downloads folder for the CSV file

### 6. Toggle Theme (5 seconds)
- Click the sun/moon icon in the toolbar
- Watch the theme change instantly

### 7. Import CSV (30 seconds)
- Click the "Import" button
- Select `public/sample-data.csv`
- See the data reload

### 8. Delete a Row (15 seconds)
- Click the 🗑️ (Delete) icon on any row
- Confirm the deletion

## What's Next?

### Customize Your Data
Edit `store/tableSlice.ts` to change the sample data:
```typescript
const sampleData: TableRow[] = [
  { id: '1', name: 'Your Name', email: 'you@example.com', age: 25, role: 'Developer' },
  // Add more rows...
];
```

### Add More Columns
In the same file, add to `defaultColumns`:
```typescript
{ id: 'salary', label: 'Salary', visible: true, required: false, type: 'number' },
```

### Change Theme Colors
Edit `components/Providers.tsx`:
```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#your-color' },
  },
});
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- -p 3001
```

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Page Not Loading
1. Check console for errors (F12)
2. Ensure dev server is running
3. Try clearing browser cache
4. Restart the dev server

## File Structure Overview

```
📁 Your Project
├── 📁 app/              # Next.js pages
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── 📁 components/       # React components
│   ├── DataTable.tsx    # Main table
│   ├── TableToolbar.tsx # Search & actions
│   └── ...
├── 📁 store/            # Redux state
│   ├── store.ts         # Store config
│   └── tableSlice.ts    # Table state
├── 📁 types/            # TypeScript types
├── 📁 utils/            # Helper functions
└── 📁 public/           # Static files
    └── sample-data.csv  # Test CSV
```

## Key Features at a Glance

| Feature | Description | Location |
|---------|-------------|----------|
| 🔍 Search | Filter all fields | Top toolbar |
| ↕️ Sort | Click column headers | Table headers |
| 📄 Pagination | Navigate pages | Bottom of table |
| 👁️ Show/Hide Columns | Manage visibility | Columns button |
| ➕ Add Columns | Create custom fields | Columns modal |
| 📥 Import CSV | Upload data | Import button |
| 📤 Export CSV | Download data | Export button |
| ✏️ Edit Rows | Inline editing | Edit icon |
| 🗑️ Delete Rows | Remove data | Delete icon |
| 🌓 Theme Toggle | Light/Dark mode | Sun/Moon icon |

## Next Steps

1. ✅ Complete the [Testing Guide](TESTING_GUIDE.md)
2. 📖 Read the full [README](README.md)
3. 🎯 Check [FEATURES.md](FEATURES.md) for implementation details
4. 🛠️ Start customizing for your needs!

## Need Help?

- Check the [README.md](README.md) for detailed documentation
- Review [TESTING_GUIDE.md](TESTING_GUIDE.md) for feature testing
- Look at [FEATURES.md](FEATURES.md) for technical details

## Success! 🎉

You're now ready to use and customize the Dynamic Data Table Manager!

**Pro Tip:** All your changes (edits, column visibility, theme) are automatically saved and will persist even after closing the browser!
