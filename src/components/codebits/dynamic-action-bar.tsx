import {
	AnimatePresence,
	motion,
	MotionConfig,
	type TargetAndTransition,
} from "motion/react";
import { Paperclip, AppWindow, CodeXml, ArrowUpRight } from "lucide-react";
import ArcImage from "@/assets/icons/apps/arc_browser.svg";
import SpotifyImage from "@/assets/icons/apps/spotify.svg";
import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

const apps = [
	{
		name: "Arc",
		desc: "A browser for power users.",
		icon: (
			<img
				className="size-12 bg-[#fef2e6] rounded-xl p-1 object-contain"
				src={ArcImage.src}
				alt="Arc Browser"
			/>
		),
		link: "https://arc.net",
	},
	{
		name: "Spotify",
		desc: "A music streaming service.",
		icon: (
			<img
				className="size-12 bg-[#fef2e6] rounded-xl p-1 object-contain"
				src={SpotifyImage.src}
				alt="Arc Browser"
			/>
		),
		link: "https://spotify.com",
	},
];

const components = [
	{
		name: "Action Bar",
		type: "Dynamic",
		date: "06 · 24",
	},
	{
		name: "Voice Chat",
		type: "Disclosure",
		date: "05 · 24",
	},
	{
		name: "Widget Slider",
		type: "Slider",
		date: "04 · 24",
	},
];

const notes = [
	{
		title: "TCP Server Connection using Go",
		date: "Jun, 2024",
		link: "https://go.dev/tour",
	},
	{
		title: "React Native App Development",
		date: "May, 2024",
		link: "https://reactnative.dev/docs/getting-started",
	},
];

const variants: { [key: string]: TargetAndTransition } = {
	hidden: {
		opacity: 0,
		filter: "blur(4px)",
	},
	visible: {
		opacity: 1,
		filter: "blur(0px)",
		transition: {
			delay: 0.05,
		},
	},
};

export default function DynamicActionBar() {
	const [activeTab, setActiveTab] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	function handleTabChange(tab: string) {
		setActiveTab(tab);
		setIsExpanded(true);
	}

	useOnClickOutside(ref, () => {
		setIsExpanded(false);
		setActiveTab(null);
	});

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.4 }}>
			<motion.div ref={ref} layoutRoot>
				<motion.div
					layout
					className="py-4 px-4 md:px-6 bg-[#ebbcba]/30 rounded-3xl overflow-hidden"
					onMouseLeave={() => {
						setIsExpanded(false);
						setActiveTab(null);
					}}
				>
					<AnimatePresence mode="popLayout">
						{isExpanded && (
							<motion.div
								variants={variants}
								animate="visible"
								initial="hidden"
								className="space-y-2"
								key="expandable"
							>
								<motion.div layout className="overflow-hidden">
									{activeTab === "apps" && <AppsTab key={"apps"} />}
									{activeTab === "components" && (
										<ComponentsTab key="components" />
									)}
									{activeTab === "notes" && <NotesTab key="notes" />}
								</motion.div>
								<motion.div
									layout
									className="w-full border-t-2 border-[#c9af9a]/40 mt-4 mb-4"
								></motion.div>
							</motion.div>
						)}
					</AnimatePresence>
					<motion.div
						layout
						className={cn("flex md:gap-x-2 items-center w-fit mx-auto")}
					>
						<button
							className={cn(
								"font-semibold text-sm md:text-base text-[#6d543e] flex items-center hover:bg-[#25211e] hover:text-zinc-100 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition",
								activeTab === "apps" && "bg-[#25211e] text-zinc-100",
							)}
							onMouseOver={() => handleTabChange("apps")}
							onClick={() => handleTabChange("apps")}
						>
							<AppWindow className="size-4 md:size-5" />
							<span className="ml-2">Apps</span>
						</button>
						<button
							className={cn(
								"font-semibold text-sm md:text-base text-[#6d543e] flex items-center hover:bg-[#25211e] hover:text-zinc-100 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition",
								activeTab === "components" && "bg-[#25211e] text-zinc-100",
							)}
							onMouseOver={() => handleTabChange("components")}
							onClick={() => handleTabChange("components")}
						>
							<CodeXml className="size-5" />
							<span className="ml-2">Components</span>
						</button>
						<button
							className={cn(
								"font-semibold text-sm md:text-base text-[#6d543e] flex items-center hover:bg-[#25211e] hover:text-zinc-100 px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition",
								activeTab === "notes" && "bg-[#25211e] text-zinc-100",
							)}
							onMouseOver={() => handleTabChange("notes")}
							onClick={() => handleTabChange("notes")}
						>
							<Paperclip className="size-4 md:size-5" />
							<span className="ml-2">Notes</span>
						</button>
					</motion.div>
				</motion.div>
			</motion.div>
		</MotionConfig>
	);
}

function AppsTab() {
	return (
		<motion.div layout="position" className="grid grid-cols-1">
			{apps.map((app) => (
				<motion.a
					layout
					key={app.name}
					href={app.link}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 p-3 rounded-xl transition-all hover:bg-black/5 hover:px-4"
				>
					{app.icon}
					<div>
						<div className="flex items-center">
							<h3 className="font-semibold text-[#25150a]">{app.name}</h3>
							<ArrowUpRight className="size-4 text-[#6d543e]" />
						</div>
						<p className="text-[#6d543e] text-sm md:text-base font-medium">
							{app.desc}
						</p>
					</div>
				</motion.a>
			))}
		</motion.div>
	);
}

function ComponentsTab() {
	return (
		<motion.div layout className="grid grid-cols-1 gap-2">
			{components.map((component) => (
				<div
					key={component.name}
					className="flex items-center justify-between gap-4 px-3 py-1 rounded-xl transition-all hover:bg-black/5 hover:scale-x-95 focus:scale-x-95 focus:bg-black/5"
				>
					<div className="flex items-center gap-2">
						<CodeXml className="size-5 text-[#6d543e]" />
						<h3 className="font-semibold text-[#25150a]">{component.name}</h3>
					</div>
					<div className="flex items-center gap-4">
						<p className="text-[#6d543e] font-semibold rounded-lg ring-[#c9af9a] ring-2 text-xs md:text-sm px-2 py-0.5">
							{component.type}
						</p>
						<p className="text-[#6d543e] text-sm md:text-base font-medium">
							{component.date}
						</p>
					</div>
				</div>
			))}
		</motion.div>
	);
}

function NotesTab() {
	return (
		<motion.div layout className="grid grid-cols-1 gap-2">
			{notes.map((note) => (
				<a
					key={note.title}
					href={note.link}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center justify-between gap-4 px-3 py-1 rounded-xl transition-all hover:bg-black/5 hover:scale-x-95"
				>
					<div className="flex items-center gap-2">
						<Paperclip className="size-5 text-[#6d543e]" />
						<h3 className="font-semibold text-[#25150a] line-clamp-1 grow">
							{note.title}
						</h3>
					</div>
					<p className="text-[#6d543e] text-xs md:text-base font-medium shrink-0">
						{note.date}
					</p>
				</a>
			))}
		</motion.div>
	);
}
