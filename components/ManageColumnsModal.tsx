'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { updateColumnVisibility, addColumn } from '@/store/tableSlice';
import { ColumnConfig } from '@/types/table';

interface ManageColumnsModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageColumnsModal({ open, onClose }: ManageColumnsModalProps) {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.table?.columns || []);

  const [newColumnName, setNewColumnName] = useState('');
  const [newColumnType, setNewColumnType] = useState<'string' | 'number'>('string');

  const handleToggleColumn = (columnId: string, visible: boolean) => {
    dispatch(updateColumnVisibility({ id: columnId, visible }));
  };

  const handleAddColumn = () => {
    if (!newColumnName.trim()) return;

    const columnId = newColumnName.toLowerCase().replace(/\s+/g, '_');

    // Check if column already exists
    if (columns.some((col) => col.id === columnId)) {
      alert('A column with this name already exists!');
      return;
    }

    const newColumn: ColumnConfig = {
      id: columnId,
      label: newColumnName,
      visible: true,
      required: false,
      type: newColumnType,
    };

    dispatch(addColumn(newColumn));
    setNewColumnName('');
    setNewColumnType('string');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Columns</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Show/Hide Columns
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {columns.map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    checked={column.visible}
                    onChange={(e) => handleToggleColumn(column.id, e.target.checked)}
                    disabled={column.required}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {column.label}
                    {column.required && (
                      <Typography variant="caption" color="text.secondary">
                        (Required)
                      </Typography>
                    )}
                  </Box>
                }
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Add New Column
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Column Name"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              fullWidth
              size="small"
              placeholder="e.g., Department, Location"
            />
            <FormControl fullWidth size="small">
              <InputLabel>Column Type</InputLabel>
              <Select
                value={newColumnType}
                label="Column Type"
                onChange={(e) => setNewColumnType(e.target.value as 'string' | 'number')}
              >
                <MenuItem value="string">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={handleAddColumn} disabled={!newColumnName.trim()}>
              Add Column
            </Button>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
