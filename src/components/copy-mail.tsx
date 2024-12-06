import { AnimatePresence, motion as m, MotionConfig } from "motion/react";
import { useRef, useState } from "react";
import { Mail } from "lucide-react";

export default function CopyMailButton() {
	const [state, setState] = useState("initial");
	const timeoutRef = useRef<NodeJS.Timeout>();
	const isHovering = useRef(false);

	function handleClick() {
		navigator.clipboard.writeText("yagnik47.dev@gmail.com");
		setState("clicked");

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		if (!isHovering.current) {
			timeoutRef.current = setTimeout(() => {
				setState("initial");
				timeoutRef.current = undefined;
			}, 2000);
		}
	}

	function handleHoverStart() {
		isHovering.current = true;
		if (state !== "clicked") {
			setState("hover");
		} else {
			// Clear timeout if hovering while clicked
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = undefined;
			}
		}
	}

	function handleHoverEnd() {
		isHovering.current = false;
		if (state === "clicked") {
			// Start timeout when hover ends in clicked state
			timeoutRef.current = setTimeout(() => {
				setState("initial");
				timeoutRef.current = undefined;
			}, 2000);
		} else {
			setState("initial");
		}
	}

	return (
		<MotionConfig transition={{ duration: 0.3, type: "spring" }}>
			<m.button
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.95 }}
				className="cursor-pointer overflow-hidden flex justify-center items-center bg-neutral-800 text-neutral-100 w-30 h-9 rounded-full"
				onClick={handleClick}
				onHoverStart={handleHoverStart}
				onHoverEnd={handleHoverEnd}
			>
				<AnimatePresence mode="wait" initial={false}>
					{state === "initial" && (
						<m.span
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							key="contact"
							className="block text-neutral-100 text-sm"
						>
							contact
						</m.span>
					)}
					{state === "hover" && (
						<m.div
							initial={{ x: "-150%", opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: "100%", opacity: 0, transition: { duration: 0.15 } }}
							transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
							key="mail-animation"
						>
							<div className="flex items-center gap-1 animate-float">
								<div className="h-max flex flex-col justify-between items-end gap-0.5">
									<m.div
										animate={{ scaleX: [0, 1], transformOrigin: "right" }}
										transition={{
											repeat: Infinity,
											duration: 0.3,
											repeatType: "mirror",
										}}
										className="h-0.5 w-4 transform-[scaleX(0)] bg-amber-500 rounded-full"
									></m.div>
									<m.div
										animate={{ scaleX: [0, 1], transformOrigin: "right" }}
										transition={{
											repeat: Infinity,
											duration: 0.4,
											repeatType: "mirror",
										}}
										className="h-0.5 w-4 transform-[scaleX(0)] bg-teal-500 rounded-full"
									></m.div>
									<m.div
										animate={{ scaleX: [0, 1], transformOrigin: "right" }}
										transition={{
											repeat: Infinity,
											duration: 0.5,
											repeatType: "mirror",
										}}
										className="h-0.5 w-4 transform-[scaleX(0)] bg-rose-500 rounded-full"
									></m.div>
								</div>
								<Mail className="size-5 text-neutral-100" />
							</div>
						</m.div>
					)}
					{state === "clicked" && (
						<m.span
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							key="copied"
							className="block text-neutral-100 text-sm"
						>
							mail copied
						</m.span>
					)}
				</AnimatePresence>
			</m.button>
		</MotionConfig>
	);
}
