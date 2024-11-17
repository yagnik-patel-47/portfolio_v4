/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter Variable", ...defaultTheme.fontFamily.sans],
				"inter-tight": [
					"Inter Tight Variable",
					...defaultTheme.fontFamily.sans,
				],
			},
			animation: {
				grow: "grow calc(var(--duration)*1s) infinite linear",
			},
			keyframes: {
				grow: {
					"33%": {
						transform: "scale(1.2)",
					},
					"83%": {
						transform: "scale(0.9)",
					},
					"100%": {
						transform: "scale(1)",
					},
				},
			},
		},
	},
	plugins: [],
};
