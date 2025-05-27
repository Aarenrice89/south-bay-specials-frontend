/** @type {import('tailwindcss').Config} */

const customColors = {
	teal: {
		50: '#f0fdfa',
		100: '#ccfbf1',
		200: '#99f6e4',
		300: '#5eead4',
		400: '#2dd4bf',
		500: '#14b8a6',
		600: '#0d9488',
		700: '#0f766e',
		800: '#115e59',
		900: '#134e4a',
	},
};

module.exports = {
	content: [
		'./src/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: { ...customColors },
			fontSize: {
				xs: '0.75rem',
				sm: '0.875rem',
				base: '1rem',
				lg: '1.125rem',
				xl: '1.25rem',
				'2xl': '1.5rem',
				'3xl': '1.875rem',
				'4xl': '2.25rem',
				'5xl': '3rem',
				'6xl': '4rem',
			},
		},
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
		},
	},
	screens: {
		sm: '600px',
		md: '900px',
		lg: '1200px',
		xl: '1536px',
	},
	plugins: [require('tailwind-scrollbar')],
	// important: '#root',
	corePlugins: { preflight: false },
};
