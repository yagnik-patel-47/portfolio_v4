import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import icon from "astro-icon";
import path from "path";

// https://astro.build/config
export default defineConfig({
	integrations: [
		react(),
		icon({
			iconDir: "src/assets/icons",
		}),
	],
	vite: {
		plugins: [tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve("./src"),
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
