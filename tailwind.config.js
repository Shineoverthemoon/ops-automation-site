/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08080a',
          900: '#0c0c0e',
          800: '#131316',
          700: '#1c1c20',
          600: '#26262b',
          500: '#3a3a40',
          400: '#5a5a60',
          300: '#8a8a90',
          200: '#c4c4c8',
          100: '#e8e8e6',
        },
        signal: {
          DEFAULT: '#d4f04a',
          dim: '#9ab536',
          glow: '#e8ff6a',
        },
        warn: '#f7a93b',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
}
