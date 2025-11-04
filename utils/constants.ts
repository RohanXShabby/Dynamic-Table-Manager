// Application Constants

export const APP_CONFIG = {
  name: 'Dynamic Data Table Manager',
  version: '1.0.0',
  description: 'A powerful data table manager with sorting, filtering, and CSV operations',
};

export const TABLE_CONFIG = {
  defaultRowsPerPage: 10,
  rowsPerPageOptions: [5, 10, 25, 50],
  maxRowsPerPage: 100,
};

export const COLUMN_TYPES = {
  STRING: 'string',
  NUMBER: 'number',
} as const;

export const REQUIRED_COLUMNS = ['name', 'email', 'age', 'role'];

export const CSV_CONFIG = {
  exportFilenamePrefix: 'table-export',
  dateFormat: 'YYYY-MM-DD',
  encoding: 'utf-8',
};

export const VALIDATION_RULES = {
  minAge: 1,
  maxAge: 149,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  maxNameLength: 100,
  maxEmailLength: 100,
};

export const UI_CONFIG = {
  snackbarDuration: 6000,
  modalMaxWidth: 'sm',
  tableMinWidth: 650,
};

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const ERROR_MESSAGES = {
  csvEmpty: 'CSV file is empty',
  csvInvalid: 'Invalid CSV format',
  csvMissingFields: 'CSV is missing required fields (Name, Email, Age, Role)',
  columnExists: 'A column with this name already exists',
  importFailed: 'Failed to import CSV file',
  exportFailed: 'Failed to export data',
  deleteFailed: 'Failed to delete row',
  updateFailed: 'Failed to update row',
};

export const SUCCESS_MESSAGES = {
  csvImported: 'Data imported successfully',
  csvExported: 'Data exported successfully',
  rowDeleted: 'Row deleted successfully',
  rowUpdated: 'Row updated successfully',
  columnAdded: 'Column added successfully',
};
