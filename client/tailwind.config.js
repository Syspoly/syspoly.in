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
        syspolyBlue: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#00A3E0', // Sky Cyan Blue
          600: '#0082C8', // Ocean Blue
          700: '#00529B', // Royal Deep Blue
          800: '#003B73',
          900: '#00254D'
        },
        electric: {
          500: '#00A3E0',
          600: '#0082C8',
          700: '#00529B',
          800: '#003B73'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 25px -5px rgba(0, 130, 200, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}
