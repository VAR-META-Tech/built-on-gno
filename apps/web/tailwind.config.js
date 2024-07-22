/** @type {import('tailwindcss').Config} */
import { createThemes } from '@var-meta/theme'
import { withTV } from 'tailwind-variants/transformer'
const config = {
  darkMode: 'class',
  content: [
    './.storybook/welcome.stories.mdx',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@var-meta/ui/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#cbc3ad',
        secondary: '#769689',
      },
    },
  },
  plugins: [createThemes()],
}
module.exports = withTV(config)
