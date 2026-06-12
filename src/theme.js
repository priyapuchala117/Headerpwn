import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#020617', // slate-950
            paper: '#0f172a',   // slate-900
        },
        primary: {
            main: '#6366f1', // indigo-500
            light: '#818cf8',
            dark: '#4f46e5',
        },
        secondary: {
            main: '#06b6d4', // cyan-500
            light: '#22d3ee',
            dark: '#0891b2',
        },
        text: {
            primary: '#cbd5e1', // slate-300
            secondary: '#94a3b8', // slate-400
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        h3: { fontWeight: 600 },
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#0f172a',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                },
            },
        },
    },
});

export default theme;
