/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        'primary-dark': '#6D28D9',
        'bg-dark': '#0F172A',
        'bg-darker': '#020617',
        'card-dark': '#1E293B',
        // Theme-aware colors
        'theme-bg': 'var(--bg-primary)',
        'theme-bg-secondary': 'var(--bg-secondary)',
        'theme-bg-darker': 'var(--bg-darker)',
        'theme-card': 'var(--card-bg)',
        'theme-text': 'var(--text-primary)',
        'theme-text-secondary': 'var(--text-secondary)',
        'theme-text-muted': 'var(--text-muted)',
        'theme-border': 'var(--border-color)',
        'theme-border-hover': 'var(--border-hover)',
        'theme-hover': 'var(--bg-secondary)',
      },
      backgroundColor: {
        'theme-primary': 'var(--bg-primary)',
        'theme-secondary': 'var(--bg-secondary)',
      },
      textColor: {
        'theme-primary': 'var(--text-primary)',
        'theme-secondary': 'var(--text-secondary)',
      },
      borderColor: {
        'theme': 'var(--border-color)',
      }
    },
  },
  plugins: [],
}
