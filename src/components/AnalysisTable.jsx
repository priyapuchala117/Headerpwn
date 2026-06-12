import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

export default function AnalysisTable({ analysis }) {
  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <TableContainer component={Paper} sx={{ bgcolor: '#0f172a', border: '1px solid #1e293b' }}>
      <Table sx={{ minWidth: 650 }} aria-label="analysis table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>HEADER</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>STATUS</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>SEVERITY</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>RECOMMENDATION</TableCell>
            <TableCell sx={{ color: '#94a3b8', fontWeight: 'bold', borderBottom: '1px solid #1e293b' }}>OWASP REF</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {analysis.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#1e293b' } }}
            >
              <TableCell component="th" scope="row" sx={{ color: '#e2e8f0', fontFamily: 'monospace', borderBottom: '1px solid #1e293b' }}>
                {row.header}
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #1e293b' }}>
                <Chip
                  label={row.present ? "Present" : "Missing"}
                  color={row.present ? "primary" : "default"}
                  variant={row.present ? "filled" : "outlined"}
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                />
              </TableCell>
              <TableCell sx={{ borderBottom: '1px solid #1e293b' }}>
                <Chip
                  label={row.severity}
                  color={getSeverityColor(row.severity)}
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell sx={{ color: '#64748b', fontSize: '13px', borderBottom: '1px solid #1e293b', maxWidth: '300px', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {row.recommendation || "Maintain current configuration."}
              </TableCell>
              <TableCell sx={{ color: '#94a3b8', borderBottom: '1px solid #1e293b' }}>{row.owasp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
