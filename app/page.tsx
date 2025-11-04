'use client';

import { Container, Box, Typography, Paper } from '@mui/material';
import TableToolbar from '@/components/TableToolbar';
import DataTable from '@/components/DataTable';

export default function Home() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: 'background.default' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Dynamic Data Table Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your data with powerful features including sorting, filtering, CSV import/export, and inline editing.
        </Typography>
      </Paper>

      <Box>
        <TableToolbar />
        <DataTable />
      </Box>
    </Container>
  );
}
