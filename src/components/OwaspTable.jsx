import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function OwaspTable({ owasp }) {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'primary'; // Use Primary (Indigo) instead of Success (Green)
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper} sx={{ bgcolor: '#0f172a', border: '1px solid #1e293b' }}>
      <Table sx={{ minWidth: 400 }} aria-label="owasp table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>HEADER</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>SEVERITY</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>OWASP WSTG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {owasp.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#1e293b' } }}
            >
              <TableCell component="th" scope="row" sx={{ color: '#e2e8f0', fontFamily: 'monospace', borderBottom: '1px solid #1e293b' }}>
                {row.header}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #1e293b' }}>
                <Chip
                  label={row.severity}
                  color={getSeverityColor(row.severity)}
                  variant="filled"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>{row.owasp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
