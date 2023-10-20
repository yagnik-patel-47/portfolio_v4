import HigrowImage from "@/assets/projects/higrow.webp";
import RPSImage from "@/assets/projects/rps.webp";
import JpDisplayImage from "@/assets/projects/jp.webp";

export const projects = [
  {
    name: "HiGrow",
    discription:
      "HiGrow is platform where our aim is to help empowering minds worldwide to Learn, compete, and grow together by workshops and contests!",
    image: HigrowImage,
    tech: ["Nextjs", "Supabase"],
    links: {
      site: "https://higrow.xyz",
    },
    category: "real-life",
  },
  {
    name: "PvP Rock Paper Scissors",
    discription:
      "A multiplayer online game developed using Deno KV and Socket.IO",
    image: RPSImage,
    tech: ["Deno", "Socket.io", "SvelteKit"],
    links: {
      site: "https://pvp-rps.vercel.app",
      repo: "https://github.com/yagnik-patel-47/pvp-rps-server",
    },
    category: "fullstack",
  },
  {
    name: "Japanese Art",
    discription: "A static page website with awesome animations.",
    image: JpDisplayImage,
    tech: ["Astro", "GSAP"],
    links: {
      site: "https://jp-display.vercel.app",
      repo: "https://github.com/yagnik-patel-47/jp_display",
    },
    category: "static",
  },
];

export const featuredProjects = [projects[0], projects[1]];
