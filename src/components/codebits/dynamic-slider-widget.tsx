import MusicCoverImage from "@/assets/codebits/widget/music.webp";
import { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	LayoutGroup,
	motion as m,
	MotionConfig,
	useAnimate,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

const widgets = [
	{
		name: "Music",
		jsx: MusicWidget,
		expandable: true,
	},
	{
		name: "Clock",
		jsx: ClockWidget,
		expandable: false,
	},
	{
		name: "Calendar",
		jsx: CalendarWidget,
		expandable: false,
	},
	{
		name: "Gallery",
		jsx: GalleryWidget,
		expandable: true,
	},
];

const variants = {
	enter: (direction: number) => {
		return {
			x: direction > 0 ? -50 : 50,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction > 0 ? 50 : -50,
			opacity: 0,
			transition: { opacity: { duration: 0.1 } },
		};
	},
};

export default function DynamicSliderWidget() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	function handleNext() {
		if (currentIndex < widgets.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			setCurrentIndex(0);
		}
		setDirection(1);
	}

	function handlePrevious() {
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex(widgets.length - 1);
		}
		setDirection(-1);
	}

	return (
		<MotionConfig
			transition={{ ease: "easeOut", type: "spring", duration: 0.4 }}
		>
			<m.div layout className="flex items-center gap-6">
				<LayoutGroup>
					<m.button className="size-8" layout onClick={handlePrevious}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-6"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
					</m.button>
					<m.div className="relative">
						<AnimatePresence mode="popLayout" initial={false}>
							{widgets.map(
								(widget, index) =>
									currentIndex === index && (
										<m.div
											key={widget.name}
											custom={direction}
											variants={variants}
											animate="center"
											exit="exit"
											initial="enter"
											transition={{
												x: { type: "spring", stiffness: 300, damping: 30 },
											}}
										>
											<widget.jsx />
										</m.div>
									),
							)}
						</AnimatePresence>
					</m.div>
					<m.button
						aria-label="right"
						className="size-8"
						layout
						onClick={handleNext}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-6"
						>
							<path d="m9 18 6-6-6-6" />
						</svg>
					</m.button>
				</LayoutGroup>
			</m.div>
		</MotionConfig>
	);
}

function ClockWidget() {
	const [secondsRef, secondsAnimate] = useAnimate();
	const [minutesRef, minutesAnimate] = useAnimate();
	const [hoursRef, hoursAnimate] = useAnimate();

	useEffect(() => {
		setupConfig();

		const interval = setInterval(() => {
			const now = new Date();
			const s = now.getSeconds();
			const m = now.getMinutes();
			const h = now.getHours();

			const formattedHours = h % 12 || 12;

			const secondsDegree = Math.floor((s / 60) * 360);
			const minutesDegree = ((m * 60 + s) / 3600) * 360;
			const hoursDegree = ((formattedHours * 3600 + m * 60 + s) / 43200) * 360;

			if (s === 0) {
				secondsAnimate(
					secondsRef.current,
					{ rotate: secondsDegree },
					{ duration: 0 },
				);
			} else {
				secondsAnimate(secondsRef.current, { rotate: secondsDegree });
			}

			if (m === 0) {
				minutesAnimate(minutesRef.current, { rotate: minutesDegree });
			} else {
				minutesAnimate(
					minutesRef.current,
					{ rotate: minutesDegree },
					{ duration: 0 },
				);
			}

			if (formattedHours === 12) {
				hoursAnimate(hoursRef.current, { rotate: hoursDegree });
			} else {
				hoursAnimate(
					hoursRef.current,
					{ rotate: hoursDegree },
					{ duration: 0 },
				);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	function setupConfig() {
		const now = new Date();
		const s = now.getSeconds();
		const m = now.getMinutes();
		const h = now.getHours();

		const formattedHours = h % 12 || 12;

		const secondsDegree = Math.floor((s / 60) * 360);
		const minutesDegree = ((m * 60 + s) / 3600) * 360;
		const hoursDegree = ((formattedHours * 3600 + m * 60 + s) / 43200) * 360;

		secondsAnimate(
			secondsRef.current,
			{ rotate: secondsDegree },
			{ duration: 0 },
		);
		minutesAnimate(
			minutesRef.current,
			{ rotate: minutesDegree },
			{ duration: 0 },
		);
		hoursAnimate(hoursRef.current, { rotate: hoursDegree }, { duration: 0 });
	}

	return (
		<m.div className="w-40 aspect-square bg-[#1a1d1c] rounded-full [&>*]:row-span-full [&>*]:column-span-full relative">
			<m.div
				id="seconds"
				ref={secondsRef}
				style={{ x: "-50%", y: "-100%" }}
				className="h-[4.5rem] w-2 absolute left-1/2 top-1/2 rounded-full origin-bottom"
			>
				<div className="size-2 rounded-full bg-red-500"></div>
			</m.div>
			<m.div
				ref={hoursRef}
				style={{ x: "-50%", y: "-100%" }}
				className="h-10 w-1 shadow-[0_4px_0_4px_#fff] ring-white rounded-full absolute left-1/2 top-1/2 bg-white origin-bottom"
			></m.div>
			<m.div
				ref={minutesRef}
				style={{ x: "-50%", y: "-100%" }}
				className="h-14 w-0.5 shadow-[0_1px_0_2px_#6b686d] absolute left-1/2 top-1/2 rounded-full bg-[#6b686d] origin-bottom"
			></m.div>
			{/* <div className="h-3 w-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"></div> */}
		</m.div>
	);
}

function MusicWidget() {
	const [expanded, setExpanded] = useState(false);
	const [levels, setLevels] = useState([0.2, 0.4, 0.3, 0.5]);
	const ref = useRef(null);

	useEffect(() => {
		const interval = setInterval(() => {
			setLevels(levels.map(() => Math.random() * 0.8 + 0.2));
		}, 100);

		return () => clearInterval(interval);
	}, []);

	useOnClickOutside(ref, handleClickOutside);

	function handleClickOutside() {
		setExpanded(false);
	}

	function toggleExpanded() {
		setExpanded((prev) => !prev);
	}
	return (
		<m.div
			ref={ref}
			layout
			onClick={!expanded ? toggleExpanded : undefined}
			className={cn(
				"rounded-2xl overflow-hidden group h-40 w-auto grid place-items-center relative",
				expanded ? "aspect-video" : "aspect-square hover:cursor-pointer",
			)}
		>
			<m.img
				key={"cover"}
				layout
				style={{
					gridColumn: "1/-1",
					gridRow: "1/-1",
				}}
				draggable="false"
				className={cn(
					"h-40 object-cover object-center aspect-square justify-self-center select-none",
				)}
				animate={{
					scale: expanded ? 16 / 9 : 1,
				}}
				src={MusicCoverImage.src}
				alt={"music cover"}
			/>
			<AnimatePresence mode="popLayout">
				{!expanded && (
					<m.div key={"icon"} layout className="absolute top-2 right-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0"
							y="0"
							width="100"
							height="100"
							viewBox="0 0 50 50"
							className="size-6"
							fill="#fff"
						>
							<path d="M25.009,1.982C12.322,1.982,2,12.304,2,24.991S12.322,48,25.009,48s23.009-10.321,23.009-23.009S37.696,1.982,25.009,1.982z M34.748,35.333c-0.289,0.434-0.765,0.668-1.25,0.668c-0.286,0-0.575-0.081-0.831-0.252C30.194,34.1,26,33,22.5,33.001 c-3.714,0.002-6.498,0.914-6.526,0.923c-0.784,0.266-1.635-0.162-1.897-0.948s0.163-1.636,0.949-1.897 c0.132-0.044,3.279-1.075,7.474-1.077C26,30,30.868,30.944,34.332,33.253C35.022,33.713,35.208,34.644,34.748,35.333z M37.74,29.193 c-0.325,0.522-0.886,0.809-1.459,0.809c-0.31,0-0.624-0.083-0.906-0.26c-4.484-2.794-9.092-3.385-13.062-3.35 c-4.482,0.04-8.066,0.895-8.127,0.913c-0.907,0.258-1.861-0.272-2.12-1.183c-0.259-0.913,0.272-1.862,1.184-2.12 c0.277-0.079,3.854-0.959,8.751-1c4.465-0.037,10.029,0.61,15.191,3.826C37.995,27.328,38.242,28.388,37.74,29.193z M40.725,22.013 C40.352,22.647,39.684,23,38.998,23c-0.344,0-0.692-0.089-1.011-0.275c-5.226-3.068-11.58-3.719-15.99-3.725 c-0.021,0-0.042,0-0.063,0c-5.333,0-9.44,0.938-9.481,0.948c-1.078,0.247-2.151-0.419-2.401-1.495 c-0.25-1.075,0.417-2.149,1.492-2.4C11.729,16.01,16.117,15,21.934,15c0.023,0,0.046,0,0.069,0 c4.905,0.007,12.011,0.753,18.01,4.275C40.965,19.835,41.284,21.061,40.725,22.013z"></path>
						</svg>
					</m.div>
				)}
				{!expanded && (
					<m.div
						key={"bars"}
						layout
						className={cn(
							"absolute w-fit h-5 flex justify-between gap-0.5 bottom-3 left-3",
						)}
						animate={{
							rotate: "180deg",
							transition: { duration: 0 },
						}}
					>
						{levels.map((level, index) => (
							<m.div
								key={index}
								className="w-[3px] bg-white rounded-sm"
								initial={{ height: "20%" }}
								animate={{ height: `${level * 100}%` }}
								transition={{ type: "spring", stiffness: 300, damping: 20 }}
							/>
						))}
					</m.div>
				)}

				{expanded && (
					<m.button
						onClick={toggleExpanded}
						className="absolute top-2 right-2 p-1 bg-black/40 backdrop-blur text-white rounded-full hover:cursor-pointer z-10"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="size-3"
						>
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</m.button>
				)}

				{expanded && (
					<m.div
						key={"controls"}
						style={{
							gridColumn: "1/-1",
							gridRow: "1/-1",
							maskImage:
								"linear-gradient(to bottom, transparent 50%, black 75%)",
						}}
						initial={{ y: 40 }}
						animate={{ y: 0 }}
						className="flex h-full flex-col justify-self-start place-content-end text-white px-3 py-2 w-full backdrop-blur-2xl backdrop-brightness-90"
					>
						<div className="flex justify-between items-center">
							<div>
								<p className="text-xs font-semibold">
									this is what slow dancing feels like
								</p>
								<p className="text-[0.6rem] font-semibold text-neutral-300 text-start">
									JVKE
								</p>
							</div>
							<button
								aria-label="pause"
								className="size-7 bg-white text-black grid place-content-center rounded-full"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 320 512"
									className="size-3"
								>
									<path
										fill="#222"
										d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
									/>
								</svg>
							</button>
						</div>
					</m.div>
				)}
			</AnimatePresence>
		</m.div>
	);
}

function CalendarWidget() {
	return (
		<m.div
			layout
			className="w-40 aspect-square bg-zinc-200 rounded-xl flex justify-center items-center text-8xl font-serif"
		>
			{new Date().getDate()}
		</m.div>
	);
}

function GalleryWidget() {
	const images = [
		"https://images.unsplash.com/photo-1726502292828-d96388c6250f?q=80&w=1508&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1727163941293-0c3dc5074bf4?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1726179655325-6abb713219ee?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"https://images.unsplash.com/photo-1720048169707-a32d6dfca0b3?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	];

	const [imageIndex, setImageIndex] = useState(0);
	const [expanded, setExpanded] = useState(false);
	const ref = useRef(null);

	useOnClickOutside(ref, handleClickOutside);

	function handleClickOutside() {
		setExpanded(false);
	}

	return (
		<m.div
			ref={ref}
			layout
			className={cn(
				"h-40 bg-zinc-200 rounded-xl p-2 flex",
				expanded ? "aspect-video" : "aspect-square",
			)}
		>
			{expanded ? (
				<m.img
					src={images[imageIndex]}
					className="object-cover w-full h-full rounded-lg"
					onClick={() => setExpanded(false)}
					alt="image lel"
					layoutId={imageIndex.toString()}
				/>
			) : (
				<m.div className="grid grid-cols-2 grid-rows-2 gap-2">
					{images.map((image, index) => (
						<button
							onClick={() => {
								setImageIndex(index);
								setExpanded(true);
							}}
							key={index}
						>
							<m.img
								layoutId={index.toString()}
								className="object-cover w-full h-full rounded-lg"
								src={image}
								alt="image lel"
							/>
						</button>
					))}
				</m.div>
			)}
		</m.div>
	);
}
