'use client';

import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  IconButton,
  TextField,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setPage,
  setRowsPerPage,
  toggleSort,
  updateRow,
  deleteRow,
  startEditingRow,
  stopEditingRow,
} from '@/store/tableSlice';
import { TableRow as TableRowType, TableState } from '@/types/table';

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { rows, columns, searchQuery, sortColumn, sortDirection, page, rowsPerPage } = useAppSelector(
    (state) => state.table || {} as TableState
  );
  const editingRows = useAppSelector((state) => state.table?.editingRows || new Set<string>());

  const [editedData, setEditedData] = useState<{ [key: string]: Partial<TableRowType> }>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);

  // Get visible columns
  const visibleColumns = useMemo(() => columns.filter((col) => col.visible), [columns]);

  // Filter rows based on search query
  const filteredRows = useMemo(() => {
    if (!searchQuery) return rows;

    return rows.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [rows, searchQuery]);

  // Sort rows
  const sortedRows = useMemo(() => {
    if (!sortColumn) return filteredRows;

    return [...filteredRows].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === undefined || bValue === undefined) return 0;

      let comparison = 0;
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = String(aValue).localeCompare(String(bValue));
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredRows, sortColumn, sortDirection]);

  // Paginate rows
  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedRows.slice(start, start + rowsPerPage);
  }, [sortedRows, page, rowsPerPage]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  const handleSort = (columnId: string) => {
    dispatch(toggleSort(columnId));
  };

  const handleEditClick = (rowId: string) => {
    dispatch(startEditingRow(rowId));
    const row = rows.find((r) => r.id === rowId);
    if (row) {
      setEditedData((prev) => ({ ...prev, [rowId]: { ...row } }));
    }
  };

  const handleSaveClick = (rowId: string) => {
    const data = editedData[rowId];
    if (data) {
      dispatch(updateRow({ id: rowId, data }));
    }
    dispatch(stopEditingRow(rowId));
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[rowId];
      return newData;
    });
  };

  const handleCancelClick = (rowId: string) => {
    dispatch(stopEditingRow(rowId));
    setEditedData((prev) => {
      const newData = { ...prev };
      delete newData[rowId];
      return newData;
    });
  };

  const handleDeleteClick = (rowId: string) => {
    setRowToDelete(rowId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (rowToDelete) {
      dispatch(deleteRow(rowToDelete));
    }
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setRowToDelete(null);
  };

  const handleCellChange = (rowId: string, columnId: string, value: string) => {
    const column = columns.find((col) => col.id === columnId);
    let processedValue: string | number = value;

    if (column?.type === 'number') {
      const numValue = parseFloat(value);
      processedValue = isNaN(numValue) ? 0 : numValue;
    }

    setEditedData((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [columnId]: processedValue,
      },
    }));
  };

  const isRowEditing = (rowId: string) => {
    return editingRows instanceof Set ? editingRows.has(rowId) : false;
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="data table">
          <TableHead>
            <TableRow>
              {visibleColumns.map((column) => (
                <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>
                  <TableSortLabel
                    active={sortColumn === column.id}
                    direction={sortColumn === column.id ? sortDirection : 'asc'}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length + 1} align="center">
                  <Typography variant="body1" color="text.secondary" sx={{ py: 4 }}>
                    No data found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              paginatedRows.map((row) => {
                const editing = isRowEditing(row.id);
                const currentData = editing ? editedData[row.id] || row : row;

                return (
                  <TableRow key={row.id} hover>
                    {visibleColumns.map((column) => (
                      <TableCell key={column.id}>
                        {editing ? (
                          <TextField
                            size="small"
                            type={column.type === 'number' ? 'number' : 'text'}
                            value={currentData[column.id] || ''}
                            onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
                            fullWidth
                            variant="standard"
                          />
                        ) : (
                          String(currentData[column.id] || '')
                        )}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {editing ? (
                          <>
                            <Tooltip title="Save">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleSaveClick(row.id)}
                              >
                                <Save />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Cancel">
                              <IconButton
                                size="small"
                                color="secondary"
                                onClick={() => handleCancelClick(row.id)}
                              >
                                <Cancel />
                              </IconButton>
                            </Tooltip>
                          </>
                        ) : (
                          <>
                            <Tooltip title="Edit">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEditClick(row.id)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(row.id)}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={sortedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this row? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
