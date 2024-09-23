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
				primary: {
					DEFAULT: '#110F12',
					dark: '#272728',
				},
				secondary: '#00A0F0',
				light: '#F9F9FB',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        typing: {
          '0%': {
            width: '0%',
            visibility: 'hidden',
          },
          '80%': {
            width: '102%',
          },
          '100%': {
            width: '102%',
          },
        },
        blinkLight: {
          '0%': {
            borderColor: 'transparent',
          },
          '100%': {
            borderColor: '#272728', // Light mode color
          },
        },
        blinkDark: {
          '0%': {
            borderColor: 'transparent',
          },
          '100%': {
            borderColor: 'white', // Dark mode color
          },
        },
      },
      animation: {
        typingLight:
          'typing 2s steps(20) infinite alternate, blinkLight .7s infinite',
        typingDark:
          'typing 2s steps(20) infinite alternate, blinkDark .7s infinite',
      },
		}
	},
	plugins: [createThemes(), require("tailwindcss-animate")],
}
module.exports = withTV(config)
