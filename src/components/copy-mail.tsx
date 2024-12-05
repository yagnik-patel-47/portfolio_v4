import { AnimatePresence, motion as m, MotionConfig } from "motion/react";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";

export default function CopyMailButton() {
	const [state, setState] = useState("initial");

	function handleClick() {
		navigator.clipboard.writeText("yagnik47.dev@gmail.com");
		setState("clicked");
	}

	function handleHoverStart() {
		if (state !== "clicked") {
			setState("hover");
		}
	}

	function handleHoverEnd() {
		setState("initial");
	}

	useEffect(() => {
		console.log(state);
	}, [state]);

	return (
		<MotionConfig transition={{ duration: 0.3, type: "spring" }}>
			<m.button
				whileHover={{ scale: 1.1 }}
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
							className="block"
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
										className="h-0.5 w-4 transform-[scaleX(0)] bg-neutral-300 rounded-full"
									></m.div>
									<m.div
										animate={{ scaleX: [0, 1], transformOrigin: "right" }}
										transition={{
											repeat: Infinity,
											duration: 0.4,
											repeatType: "mirror",
										}}
										className="h-0.5 w-4 transform-[scaleX(0)] bg-neutral-300 rounded-full"
									></m.div>
									<m.div
										animate={{ scaleX: [0, 1], transformOrigin: "right" }}
										transition={{
											repeat: Infinity,
											duration: 0.5,
											repeatType: "mirror",
										}}
										className="h-0.5 w-4 transform-[scaleX(0)] bg-neutral-300 rounded-full"
									></m.div>
								</div>
								<Mail className="size-5" />
							</div>
						</m.div>
					)}
					{state === "clicked" && (
						<m.span
							initial={{ y: "100%" }}
							animate={{ y: 0 }}
							key="copied"
							className="block"
						>
							mail copied
						</m.span>
					)}
				</AnimatePresence>
			</m.button>
		</MotionConfig>
	);
}
