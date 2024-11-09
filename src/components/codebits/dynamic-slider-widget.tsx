import { useEffect, useState } from "react";
import {
	AnimatePresence,
	LayoutGroup,
	motion as m,
	MotionConfig,
	useAnimate,
	useMotionValue,
	useTransform,
} from "framer-motion";
import { flushSync } from "react-dom";
import KeyboardImage from "@/assets/codebits/widget/keyboard.webp";

const widgets = [
	{
		name: "Charging",
		jsx: ChargingWidget,
	},
	{
		name: "Clock",
		jsx: ClockWidget,
	},
	{
		name: "Image",
		jsx: ImageWidget,
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
					<m.div className="relative overflow-hidden bg-zinc-200 p-3 rounded-3xl">
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

function ChargingWidget() {
	const [battery, setBattery] = useState("0%");

	useEffect(() => {
		if ("getBattery" in navigator) {
			navigator.getBattery().then((battery) => {
				setBattery(Math.floor(battery.level * 100) + "%");
			});
		} else {
			setBattery("75%");
		}
	}, []);
	return (
		<m.div className="w-40 aspect-square bg-[#000] text-white flex flex-col gap-4 justify-between p-3 rounded-2xl">
			<div>
				<p className="text-xs text-zinc-500 font-medium">Charging...</p>
				<p className="text-sm font-medium text-zinc-200">
					{battery} &middot; 22mins left
				</p>
			</div>
			<div className="space-y-1">
				<div className="justify-between grid grid-cols-3 gap-2 text-zinc-400 font-medium text-[0.6rem]">
					<span>0</span>
					<span className="text-center">50</span>
					<span className="text-end">100</span>
				</div>
				<div className="w-full bg-zinc-800 rounded-xl">
					<div
						className="w-0 bg-zinc-50 h-14 rounded-xl transition-[width] duration-300"
						style={{
							filter:
								"drop-shadow(0 0 0.25em #fff) drop-shadow(0 0 2rem rgba(255, 255, 255, 0.55)",
							width: battery,
						}}
					></div>
				</div>
			</div>
		</m.div>
	);
}

function ImageWidget() {
	return (
		<m.img
			layout
			className="w-40 aspect-square rounded-2xl"
			src={KeyboardImage.src}
			alt="Starry Keyboard"
			draggable="false"
		/>
	);
}
