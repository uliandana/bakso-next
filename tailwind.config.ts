import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-out': 'fade-out 3s ease-in-out forwards',
        'feed-shake': 'feed-shake 1s ease-in-out forwards',
        'feed-sick': 'feed-sick 0.5s ease-in-out forwards',
      },
      keyframes: {
        'fade-out': {
          '67%': {
            visibility: 'visible',
            opacity: '1',
          },
          '100%': {
            visibility: 'hidden',
            opacity: '0',
          },
        },
        'feed-shake': {
          '33%': {
            transform: 'rotate(2deg)',
          },
          '67%': {
            transform: 'rotate(-2deg)',
          },
        },
        'feed-sick': {
          '25%': {
            transform: 'translateY(1%)',
          },
          '50%': {
            transform: 'translateY(-1%)',
            filter: 'grayscale(1) drop-shadow(0 0 0.25rem rgb(var(--background-start-rgb)))',
          },
          '75%': {
            transform: 'translateY(1%)',
          },
          '100%': {
            filter: 'grayscale(0)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
