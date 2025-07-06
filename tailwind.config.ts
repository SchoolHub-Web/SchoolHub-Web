import type { Config } from 'tailwindcss';
import { nextui } from '@nextui-org/react';
import ta from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      colors: {
        'primary-50': '#f5f7f9',
        'primary-100': '#e8ebf1',
        'primary-200': '#d7dce6',
        'primary-300': '#bbc4d5',
        'primary-400': '#9aa6c0',
        'primary-500': '#818db0',
        'primary-600': '#6f79a1',
        'primary-700': '#636992',
        'primary-800': '#525675',
        'primary-900': '#474b61',
        'primary-950': '#2e2f3d',
        'secondary-50': '#f2f4fc',
        'secondary-100': '#e1e6f8',
        'secondary-200': '#cad3f3',
        'secondary-300': '#a6b8ea',
        'secondary-400': '#7c93de',
        'secondary-500': '#5d71d4',
        'secondary-600': '#5561cb',
        'secondary-700': '#3f45b6',
        'secondary-800': '#383a95',
        'secondary-900': '#313477',
        'secondary-950': '#222349',
        'white-overlap': '#f6f7fd'
      }
    }
  },
  plugins: [ta, nextui()]
} satisfies Config;

export default config;
