/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        display: ['Chakra Petch', 'sans-serif'],
      },
      colors: {
        industrial: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        alert: {
          500: '#f59e0b', // Amber for warnings/delays
          600: '#d97706',
        },
        success: {
          500: '#10b981', // Emerald for active/good
          600: '#059669',
        }
      }
    },
  },
  plugins: [],
}
