export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fcf7f3',
          100: '#f8ece1',
          200: '#f1d5be',
          300: '#e7b993',
          400: '#dd9865',
          500: '#d3774a', // Main primary color
          600: '#c05e3d',
          700: '#a54a34',
          800: '#863d30',
          900: '#6d3328',
        },
        secondary: {
          50: '#f2f7f4',
          100: '#e0ece7',
          200: '#c2d8cc',
          300: '#9dbea8',
          400: '#769f80',
          500: '#59825f', // Main secondary color
          600: '#456849',
          700: '#355238',
          800: '#2a422d',
          900: '#233626',
        },
        accent: {
          50: '#fdf3f3',
          100: '#fde5e5',
          200: '#fbd1d1',
          300: '#f7afaf',
          400: '#f07f7f',
          500: '#e65c5c', // Main accent color
          600: '#d63c3c',
          700: '#b72b2b',
          800: '#962626',
          900: '#7c2424',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#5a5a5a',
          900: '#4e4e4e',
        },
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}