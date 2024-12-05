import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		icon({
			iconDir: "src/assets/icons",
		}),
	],
	alias: {
		"@": "src",
	},
	vite: {
		plugins: [tailwindcss()],

		resolve: {
			alias: {
				"@": "/src",
			},
		},
		css: {
			transformer: "lightningcss",
		},
		build: {
			cssMinify: "lightningcss",
		},
	},
	output: "static",
	adapter: vercel({
		webAnalytics: {
			enabled: true,
		},
	}),
});
