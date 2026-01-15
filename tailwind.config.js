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
        apple: {
          blue: 'var(--apple-blue)',
          green: 'var(--apple-green)',
          red: 'var(--apple-red)',
          orange: 'var(--apple-orange)',
          purple: 'var(--apple-purple)',
        },
        background: 'var(--background)',
        card: 'var(--card)',
        'card-secondary': 'var(--card-secondary)',
        label: 'var(--label)',
        'label-secondary': 'var(--label-secondary)',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '20px',
        'btn': '12px',
      },
    },
  },
  plugins: [],
}
