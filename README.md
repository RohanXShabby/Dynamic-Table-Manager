# 📊 Dynamic Data Table Manager

A powerful and feature-rich data table manager built with **Next.js 14**, **Redux Toolkit**, and **Material UI**. This application provides a comprehensive solution for managing tabular data with advanced features like sorting, filtering, CSV import/export, inline editing, and more.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Material UI](https://img.shields.io/badge/Material--UI-5-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux--Toolkit-2-purple)

## ✨ Features

### Core Features

- **📋 Dynamic Table View**
  - Display data with customizable columns (Name, Email, Age, Role, Department, Location)
  - Column-based sorting with ASC/DESC toggle
  - Global search across all fields
  - Client-side pagination (5, 10, 25, 50 rows per page)

- **🎛️ Column Management**
  - Show/hide columns dynamically via "Manage Columns" modal
  - Add new custom columns with text or number types
  - Required columns cannot be hidden
  - Column visibility persisted using Redux Persist

- **📁 CSV Import/Export**
  - Import CSV files with validation and error handling
  - Export current table view to CSV (only visible columns)
  - Sample CSV file included for testing (`public/sample-data.csv`)
  - Powered by PapaParse for robust CSV parsing

### Bonus Features ⭐

- **✏️ Inline Row Editing**
  - Double-click or click Edit icon to enable inline editing
  - Real-time validation (e.g., age must be a number)
  - Save/Cancel buttons for each row
  - Edit multiple rows simultaneously

- **🗑️ Row Actions**
  - Edit button for inline editing
  - Delete button with confirmation dialog
  - Prevent accidental data loss

- **🌓 Theme Toggle**
  - Light/Dark mode switch
  - Persistent theme preference
  - Smooth theme transitions using MUI theming

- **📱 Fully Responsive Design**
  - Mobile-first approach
  - Adaptive layout for all screen sizes
  - Touch-friendly controls

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, or pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd dynamic-table-manager
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
dynamic-table-manager/
├── app/
│   ├── layout.tsx          # Root layout with Providers
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
├── components/
│   ├── DataTable.tsx       # Main table component
│   ├── TableToolbar.tsx    # Search, import/export, theme toggle
│   ├── ManageColumnsModal.tsx  # Column management modal
│   └── Providers.tsx       # Redux & MUI providers
├── store/
│   ├── store.ts            # Redux store configuration
│   ├── tableSlice.ts       # Table state management
│   └── hooks.ts            # Typed Redux hooks
├── types/
│   └── table.ts            # TypeScript interfaces
├── utils/
│   └── csvUtils.ts         # CSV import/export utilities
└── public/
    └── sample-data.csv     # Sample CSV for testing
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5
- **State Management**: Redux Toolkit + Redux Persist
- **UI Library**: Material UI (MUI) v5
- **Styling**: Emotion (MUI's styling solution) + Tailwind CSS
- **CSV Handling**: PapaParse
- **File Export**: FileSaver.js
- **Form Handling**: React Hook Form (ready for advanced forms)

## 📖 Usage Guide

### Searching Data
- Use the search bar at the top to filter data across all fields
- Search is case-insensitive and updates in real-time

### Sorting
- Click any column header to sort by that column
- Click again to toggle between ascending and descending order
- Active sort column is highlighted

### Managing Columns
1. Click the "Columns" button in the toolbar
2. Use checkboxes to show/hide columns (required columns cannot be hidden)
3. Add new columns by entering a name and selecting a type
4. Changes are saved automatically

### Importing CSV
1. Click the "Import" button
2. Select a CSV file (use `public/sample-data.csv` for testing)
3. Required columns: Name, Email, Age, Role
4. Optional columns: Department, Location, or any custom fields

### Exporting CSV
- Click the "Export" button to download current table data
- Only visible columns are included in the export
- File is named with current date: `table-export-YYYY-MM-DD.csv`

### Editing Rows
1. Click the Edit icon (✏️) on any row
2. Modify fields inline
3. Click Save (✓) to confirm or Cancel (✕) to discard changes
4. Multiple rows can be edited simultaneously

### Deleting Rows
1. Click the Delete icon (🗑️) on any row
2. Confirm deletion in the dialog
3. Action cannot be undone

### Theme Toggle
- Click the sun/moon icon to switch between light and dark modes
- Preference is saved and persists across sessions

## 🎨 Customization

### Adding New Default Columns

Edit `store/tableSlice.ts`:

```typescript
const defaultColumns: ColumnConfig[] = [
  // ... existing columns
  { id: 'newField', label: 'New Field', visible: true, required: false, type: 'string' },
];
```

### Modifying Sample Data

Edit `store/tableSlice.ts` to change the initial data:

```typescript
const sampleData: TableRow[] = [
  // Add your data here
];
```

### Styling

The app uses MUI's theming system. Customize in `components/Providers.tsx`:

```typescript
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});
```

## 🧪 Testing the Application

1. **Search**: Type in the search bar to filter data
2. **Sort**: Click column headers to sort
3. **Pagination**: Use pagination controls at the bottom
4. **Import**: Upload `public/sample-data.csv`
5. **Export**: Download and verify CSV content
6. **Edit**: Click Edit, modify fields, and save
7. **Delete**: Delete a row and confirm
8. **Columns**: Hide/show columns and add new ones
9. **Theme**: Toggle between light and dark modes

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Built with ❤️ using Next.js, Redux Toolkit, and Material UI
