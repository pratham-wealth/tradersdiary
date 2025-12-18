import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Midnight Pro Theme Colors
        midnight: {
          950: '#020617', // Deepest background
          900: '#0f172a', // Main dashboard background
          800: '#1e293b', // Card background
          700: '#334155', // Borders / Separators
        },
        gold: {
          300: '#fcd34d', // Added for gradients
          400: '#fbbf24', // Primary accent / active text
          500: '#f59e0b', // Buttons / Interactables
          600: '#d97706', // Hover states
          700: '#b45309', // Darker shade
          glow: 'rgba(251, 191, 36, 0.2)', // Glow effects
        },
        // Trading specific colors (Keeping existing but tweaking for dark mode)
        long: {
          DEFAULT: '#10b981', // Green for long positions
          light: '#d1fae5',
          dark: '#047857',
        },
        short: {
          DEFAULT: '#ef4444', // Red for short positions
          light: '#fee2e2',
          dark: '#dc2626',
        },
        win: '#10b981',
        loss: '#ef4444',
        breakeven: '#94a3b8', // Updated for visibility on dark
      },
      backgroundImage: {
        'midnight-gradient': 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
