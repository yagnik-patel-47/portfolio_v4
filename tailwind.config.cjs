/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: "class",
	theme: {
		extend: {
			fontFamily: {
				sans: ["Gabarito Variable", ...defaultTheme.fontFamily.sans],
				header: ["Montserrat Variable", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
