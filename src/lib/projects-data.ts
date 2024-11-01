import HigrowImage from "@/assets/projects/higrow.webp";
import RPSImage from "@/assets/projects/rps.webp";
import JpDisplayImage from "@/assets/projects/jp.webp";
import GalaryImage from "@/assets/projects/galary.webp";
import LegoImage from "@/assets/projects/lego.webp";
import SMAImage from "@/assets/projects/sma.webp";
import MangaReaderImage from "@/assets/projects/mangareader.webp";
import PS5Image from "@/assets/projects/ps5.webp";
import KeyboardShopImage from "@/assets/projects/keyboard-shop.webp";

export const projects = [
	{
		name: "Keyboard Shop",
		discription:
			"A typical e-commerce app BUT integrates Stripe into the app admin panel. Built using Svelte 5 and TailwindCSS, resulting in a stunning and minimalistic UI.",
		image: KeyboardShopImage,
		tech: ["Svelte", "Drizzle", "Stripe"],
		links: {
			site: "https://keyboard-ecommerce-one.vercel.app",
			repo: "https://github.com/yagnik-patel-47/keyboard-ecommerce",
		},
		category: "real-world",
	},
	{
		name: "HiGrow",
		discription:
			"HiGrow is platform where our aim is to help empowering minds worldwide to Learn, compete, and grow together by workshops and contests!",
		image: HigrowImage,
		tech: ["Nextjs", "Supabase"],
		links: {
			site: "https://higrow-test.vercel.app",
		},
		category: "real-world",
	},
	{
		name: "PvP Rock Paper Scissors",
		discription:
			"A multiplayer online game developed using Deno KV and Socket.IO",
		image: RPSImage,
		tech: ["Deno", "Socket.io", "Svelte"],
		links: {
			site: "https://pvp-rps.vercel.app",
			repo: "https://github.com/yagnik-patel-47/pvp-rps-server",
		},
		category: "fullstack",
	},
	{
		name: "PS5 Home Screen",
		discription: "A clone of PS5 home screen with same layout animations.",
		image: PS5Image,
		tech: ["React", "Framer Motion"],
		links: {
			site: "https://ps5-home-screen.vercel.app",
			repo: "https://github.com/yagnik-patel-47/ps5-home-screen",
		},
		category: "static",
	},
	{
		name: "Animation Galary",
		discription: "A single page image gallery site with awesome animations.",
		image: GalaryImage,
		tech: ["React", "Framer Motion"],
		links: {
			site: "https://animated0casestudy.vercel.app",
			repo: "https://github.com/yagnik-patel-47/animated_casestudy",
		},
		category: "static",
	},
	{
		name: "Japanese Art",
		discription: "A static page website with awesome animations.",
		image: JpDisplayImage,
		tech: ["Astro", "GSAP", "TailwindCSS"],
		links: {
			site: "https://jp-display.vercel.app",
			repo: "https://github.com/yagnik-patel-47/jp_display",
		},
		category: "static",
	},
	{
		name: "Lego One",
		discription:
			"A landing page for real estate ecommerce website with somewhat good design.",
		image: LegoImage,
		tech: ["Nextjs", "TailwindCSS"],
		links: {
			site: "https://lego-one.vercel.app",
			repo: "https://github.com/yagnik-patel-47/lego",
		},
		category: "static",
	},

	{
		name: "Mangasss",
		discription:
			"A manga reader app where you'll find whatever manga you wanna read.",
		image: MangaReaderImage,
		tech: ["Svelte", "TailwindCSS"],
		links: {
			site: "https://mangasss.vercel.app",
		},
		category: "app",
	},
	{
		name: "Social Media App",
		discription:
			"A social media app clone having basic features similar to Instagram.",
		image: SMAImage,
		tech: ["Nextjs", "Firebase", "Typescript", "Redux"],
		links: {
			site: "https://moments-sma.vercel.app",
			repo: "https://github.com/Yagnik-Patel-47/social-media-app",
		},
		category: "fullstack",
	},
];

export const realWorldProjects = projects.filter(
	(project) => project.category === "real-world",
);
export const fullstackProjects = projects.filter(
	(project) => project.category === "fullstack",
);
export const staticProjects = projects.filter(
	(project) => project.category === "static",
);
export const appProjects = projects.filter(
	(project) => project.category === "app",
);
