'use client';

import React, { useRef, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  Tooltip,
  InputAdornment,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search,
  ViewColumn,
  FileUpload,
  FileDownload,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSearchQuery, setRows, toggleTheme } from '@/store/tableSlice';
import { exportToCSV, importFromCSV } from '@/utils/csvUtils';
import ManageColumnsModal from './ManageColumnsModal';
import { TableState } from '@/types/table';

export default function TableToolbar() {
  const dispatch = useAppDispatch();
  const { rows, columns, searchQuery, theme } = useAppSelector((state) => state.table || {} as TableState);

  const [columnsModalOpen, setColumnsModalOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleExport = () => {
    try {
      exportToCSV(rows, columns);
      setSnackbar({
        open: true,
        message: 'Data exported successfully!',
        severity: 'success',
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error exporting data',
        severity: 'error',
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importFromCSV(
      file,
      (importedRows) => {
        dispatch(setRows(importedRows));
        setSnackbar({
          open: true,
          message: `Successfully imported ${importedRows.length} rows!`,
          severity: 'success',
        });
      },
      (error) => {
        setSnackbar({
          open: true,
          message: error,
          severity: 'error',
        });
      }
    );

    // Reset file input
    event.target.value = '';
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <TextField
          placeholder="Search all fields..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          sx={{ flexGrow: 1, maxWidth: { sm: 400 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Tooltip title="Manage Columns">
            <Button
              variant="outlined"
              startIcon={<ViewColumn />}
              onClick={() => setColumnsModalOpen(true)}
              size="small"
            >
              Columns
            </Button>
          </Tooltip>

          <Tooltip title="Import CSV">
            <Button
              variant="outlined"
              startIcon={<FileUpload />}
              onClick={handleImportClick}
              size="small"
            >
              Import
            </Button>
          </Tooltip>

          <Tooltip title="Export CSV">
            <Button
              variant="outlined"
              startIcon={<FileDownload />}
              onClick={handleExport}
              size="small"
            >
              Export
            </Button>
          </Tooltip>

          <Tooltip title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton onClick={handleThemeToggle} color="inherit">
              {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      <ManageColumnsModal open={columnsModalOpen} onClose={() => setColumnsModalOpen(false)} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}
