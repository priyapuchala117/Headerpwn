/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#020617', // Slate 950
        surface: '#0f172a',    // Slate 900
        primary: '#6366f1',    // Indigo 500
        secondary: '#475569',  // Slate 600
        accent: '#0ea5e9',     // Sky 500
        danger: '#ef4444',     // Red 500
        warning: '#f97316',    // Orange 500
        success: '#3b82f6',    // Blue 500 (No Green)
      },
      fontFamily: {
        mono: ['Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
