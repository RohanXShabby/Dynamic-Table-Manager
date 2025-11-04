export interface TableRow {
  id: string;
  name: string;
  email: string;
  age: number;
  role: string;
  department?: string;
  location?: string;
  [key: string]: string | number | undefined;
}

export interface ColumnConfig {
  id: string;
  label: string;
  visible: boolean;
  required: boolean;
  type: 'string' | 'number';
}

export interface TableState {
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
