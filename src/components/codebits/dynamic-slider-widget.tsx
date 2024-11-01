import MusicCoverImage from "@/assets/codebits/widget/music.webp";
import { useEffect, useRef, useState } from "react";
import {
	AnimatePresence,
	LayoutGroup,
	motion as m,
	MotionConfig,
	useAnimate,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { flushSync } from "react-dom";

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
			x: direction > 0 ? "100%" : "-100%",
			scale: 0.75,
			opacity: 0,
		};
	},
	center: {
		zIndex: 1,
		x: 0,
		opacity: [1, 1, 1],
		scale: [0.75, 0.75, 1],
	},
	exit: (direction: number) => {
		return {
			zIndex: 0,
			x: direction > 0 ? "-100%" : "100%",
			opacity: 0,
			transition: { opacity: { duration: 0.1 } },
		};
	},
};

export default function DynamicSliderWidget() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [direction, setDirection] = useState(0);

	const x = useMotionValue(0);
	const scale = useTransform(x, [-150, 0, 150], [0.75, 1, 0.75]);

	function handleNext() {
		flushSync(() => setDirection(1));
		if (currentIndex < widgets.length - 1) {
			setCurrentIndex((prev) => prev + 1);
		} else {
			setCurrentIndex(0);
		}
	}

	function handlePrevious() {
		flushSync(() => setDirection(-1));
		if (currentIndex > 0) {
			setCurrentIndex((prev) => prev - 1);
		} else {
			setCurrentIndex(widgets.length - 1);
		}
	}

	return (
		<MotionConfig
			transition={{ ease: "easeOut", type: "spring", duration: 0.4 }}
		>
			<m.div layout className="flex items-center gap-6">
				<LayoutGroup>
					<m.div className="relative overflow-hidden bg-zinc-200 p-3 rounded-2xl">
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
											drag="x"
											dragConstraints={{ right: 0, left: 0 }}
											onDragEnd={(_e, { offset }) => {
												if (offset.x < -50) {
													handleNext();
												} else if (offset.x > 50) {
													handlePrevious();
												}
											}}
											// style={{ x, scale }}
										>
											<widget.jsx />
										</m.div>
									),
							)}
						</AnimatePresence>
					</m.div>
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
	return (
		<m.div className="w-40 aspect-square bg-[#1a1d1c] text-white grid justify-center items-end p-4">
			<div className="flex items-center gap-2">
				<p>P</p>
				<p className="text-xs">slow dancing</p>
				<img className="w-8" src={MusicCoverImage.src} alt={"Music Cover"} />
			</div>
		</m.div>
	);
}

function CalendarWidget() {
	return (
		<m.div
			layout
			className="w-40 aspect-square text-white rounded-xl overflow-hidden flex flex-col justify-between p-4  bg-no-repeat bg-center bg-cover relative"
			style={{ backgroundImage: "url(widget_gradient_bg.svg)" }}
		>
			<div className="absolute inset-0 bg-black/15"></div>
			<p className="text-3xl space-x-2 font-medium z-[1]">
				<span>{new Date().toLocaleString("default", { month: "short" })}</span>
				<span>{new Date().getDate()}</span>
			</p>
			<div className="z-[1]">
				<p>{new Date().toLocaleString("default", { weekday: "long" })}</p>
				<p>4 Events</p>
			</div>
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
				"h-40 bg-[#1a1d1c] rounded-xl p-2 flex",
				expanded ? "aspect-video" : "aspect-square",
			)}
		>
			{expanded ? (
				<m.img
					src={images[imageIndex]}
					className="object-cover w-full h-full rounded-lg"
					onClick={() => setExpanded(false)}
					alt="image"
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
								style={{ zIndex: imageIndex === index ? 1 : 0 }}
								layoutId={index.toString()}
								className="object-cover w-full h-full rounded-lg relative"
								src={image}
								alt="image lel"
								draggable={false}
							/>
						</button>
					))}
				</m.div>
			)}
		</m.div>
	);
}
