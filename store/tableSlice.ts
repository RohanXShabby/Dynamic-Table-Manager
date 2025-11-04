import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow, ColumnConfig, TableState } from '@/types/table';

const defaultColumns: ColumnConfig[] = [
  { id: 'name', label: 'Name', visible: true, required: true, type: 'string' },
  { id: 'email', label: 'Email', visible: true, required: true, type: 'string' },
  { id: 'age', label: 'Age', visible: true, required: true, type: 'number' },
  { id: 'role', label: 'Role', visible: true, required: true, type: 'string' },
  { id: 'department', label: 'Department', visible: false, required: false, type: 'string' },
  { id: 'location', label: 'Location', visible: false, required: false, type: 'string' },
];

const sampleData: TableRow[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer', department: 'Engineering', location: 'New York' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer', department: 'Design', location: 'San Francisco' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 45, role: 'Manager', department: 'Management', location: 'Chicago' },
  { id: '4', name: 'Alice Williams', email: 'alice@example.com', age: 29, role: 'Developer', department: 'Engineering', location: 'Austin' },
  { id: '5', name: 'Charlie Brown', email: 'charlie@example.com', age: 35, role: 'Analyst', department: 'Analytics', location: 'Boston' },
  { id: '6', name: 'Diana Prince', email: 'diana@example.com', age: 27, role: 'Developer', department: 'Engineering', location: 'Seattle' },
  { id: '7', name: 'Ethan Hunt', email: 'ethan@example.com', age: 38, role: 'Manager', department: 'Management', location: 'Los Angeles' },
  { id: '8', name: 'Fiona Green', email: 'fiona@example.com', age: 31, role: 'Designer', department: 'Design', location: 'Portland' },
  { id: '9', name: 'George Miller', email: 'george@example.com', age: 42, role: 'Analyst', department: 'Analytics', location: 'Denver' },
  { id: '10', name: 'Hannah Lee', email: 'hannah@example.com', age: 26, role: 'Developer', department: 'Engineering', location: 'Miami' },
  { id: '11', name: 'Ian Malcolm', email: 'ian@example.com', age: 50, role: 'Scientist', department: 'Research', location: 'San Diego' },
  { id: '12', name: 'Julia Roberts', email: 'julia@example.com', age: 33, role: 'Designer', department: 'Design', location: 'Atlanta' },
];

const initialState: TableState = {
  rows: sampleData,
  columns: defaultColumns,
  searchQuery: '',
  sortColumn: null,
  sortDirection: 'asc',
  page: 0,
  rowsPerPage: 10,
  editingRows: new Set(),
  theme: 'light',
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<{ id: string; data: Partial<TableRow> }>) => {
      const index = state.rows.findIndex(row => row.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...action.payload.data };
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(row => row.id !== action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 0; // Reset to first page on search
    },
    setSorting: (state, action: PayloadAction<{ column: string; direction: 'asc' | 'desc' }>) => {
      state.sortColumn = action.payload.column;
      state.sortDirection = action.payload.direction;
    },
    toggleSort: (state, action: PayloadAction<string>) => {
      if (state.sortColumn === action.payload) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortColumn = action.payload;
        state.sortDirection = 'asc';
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.page = 0;
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(col => col.id === action.payload);
      if (column && !column.required) {
        column.visible = !column.visible;
      }
    },
    addColumn: (state, action: PayloadAction<ColumnConfig>) => {
      state.columns.push(action.payload);
    },
    updateColumnVisibility: (state, action: PayloadAction<{ id: string; visible: boolean }>) => {
      const column = state.columns.find(col => col.id === action.payload.id);
      if (column && !column.required) {
        column.visible = action.payload.visible;
      }
    },
    reorderColumns: (state, action: PayloadAction<ColumnConfig[]>) => {
      state.columns = action.payload;
    },
    startEditingRow: (state, action: PayloadAction<string>) => {
      state.editingRows = new Set([...state.editingRows, action.payload]);
    },
    stopEditingRow: (state, action: PayloadAction<string>) => {
      const newSet = new Set(state.editingRows);
      newSet.delete(action.payload);
      state.editingRows = newSet;
    },
    clearEditingRows: (state) => {
      state.editingRows = new Set();
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
  },
});

export const {
  setRows,
  addRow,
  updateRow,
  deleteRow,
  setSearchQuery,
  setSorting,
  toggleSort,
  setPage,
  setRowsPerPage,
  toggleColumnVisibility,
  addColumn,
  updateColumnVisibility,
  reorderColumns,
  startEditingRow,
  stopEditingRow,
  clearEditingRows,
  toggleTheme,
  setTheme,
} = tableSlice.actions;

export default tableSlice.reducer;
