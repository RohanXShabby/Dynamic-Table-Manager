import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import { TableRow, ColumnConfig } from '@/types/table';

export const exportToCSV = (rows: TableRow[], columns: ColumnConfig[]) => {
  const visibleColumns = columns.filter((col) => col.visible);
  
  // Prepare headers
  const headers = visibleColumns.map((col) => col.label);
  
  // Prepare data
  const data = rows.map((row) => {
    return visibleColumns.map((col) => row[col.id] || '');
  });
  
  // Combine headers and data
  const csvData = [headers, ...data];
  
  // Convert to CSV string
  const csv = Papa.unparse(csvData);
  
  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `table-export-${new Date().toISOString().split('T')[0]}.csv`);
};

export const importFromCSV = (
  file: File,
  onSuccess: (rows: TableRow[]) => void,
  onError: (error: string) => void
) => {
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        if (results.errors.length > 0) {
          onError(`CSV parsing errors: ${results.errors.map((e) => e.message).join(', ')}`);
          return;
        }

        if (!results.data || results.data.length === 0) {
          onError('CSV file is empty');
          return;
        }

        // Convert parsed data to TableRow format
        const rows: TableRow[] = results.data.map((row: any, index: number) => {
          const tableRow: TableRow = {
            id: `imported-${Date.now()}-${index}`,
            name: row.Name || row.name || '',
            email: row.Email || row.email || '',
            age: parseInt(row.Age || row.age || '0', 10),
            role: row.Role || row.role || '',
          };

          // Add optional fields if they exist
          if (row.Department || row.department) {
            tableRow.department = row.Department || row.department;
          }
          if (row.Location || row.location) {
            tableRow.location = row.Location || row.location;
          }

          // Add any other fields from CSV
          Object.keys(row).forEach((key) => {
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
            if (!['name', 'email', 'age', 'role', 'department', 'location'].includes(normalizedKey)) {
              tableRow[normalizedKey] = row[key];
            }
          });

          return tableRow;
        });

        // Validate required fields
        const invalidRows = rows.filter(
          (row) => !row.name || !row.email || !row.age || !row.role
        );

        if (invalidRows.length > 0) {
          onError(
            `${invalidRows.length} row(s) are missing required fields (Name, Email, Age, Role)`
          );
          return;
        }

        onSuccess(rows);
      } catch (error) {
        onError(`Error processing CSV: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    error: (error) => {
      onError(`Error reading CSV file: ${error.message}`);
    },
  });
};
