import GojoImage from "@/assets/codebits/voicechat/gojo.webp";
import GetoImage from "@/assets/codebits/voicechat/geto.webp";
import TojiImage from "@/assets/codebits/voicechat/toji.webp";
import FushiguroImage from "@/assets/codebits/voicechat/fushiguro.webp";
import ItadoriImage from "@/assets/codebits/voicechat/itadori.webp";
import SukunaImage from "@/assets/codebits/voicechat/sukuna.webp";
import NanamiImage from "@/assets/codebits/voicechat/nanami.webp";
import MiwaImage from "@/assets/codebits/voicechat/miwa.webp";

import {
	motion as m,
	AnimatePresence,
	MotionConfig,
	LayoutGroup,
	usePresence,
} from "motion/react";
import { useAnimate } from "motion/react-mini";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

const constpeps = [
	{
		name: "Gojo",
		image: GojoImage,
		speaking: false,
	},
	{
		name: "Geto",
		image: GetoImage,
		speaking: false,
	},
	{
		name: "Toji",
		image: TojiImage,
		speaking: true,
	},
	{
		name: "Sukuna",
		image: SukunaImage,
		speaking: false,
	},
	{
		name: "Megumi",
		image: FushiguroImage,
		speaking: true,
	},
	{
		name: "Yuji",
		image: ItadoriImage,
		speaking: false,
	},
	{
		name: "Nanami",
		image: NanamiImage,
		speaking: false,
	},
];

const lesspeps = constpeps.filter((_, index) => index < 4);

export default function VoiceChatDisclosure() {
	const [peps, setPeps] = useState(constpeps);
	const [state, setState] = useState(false);
	const [joined, setJoined] = useState(false);
	const [mic, setMic] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useOnClickOutside(containerRef, closeVoiceDisclosure);

	function closeVoiceDisclosure() {
		setState(false);
	}

	function handleMic() {
		setMic((prev) => !prev);
		if (mic) {
			const temp = peps;
			peps[peps.length - 1].speaking = false;
			setPeps(temp);
		} else {
			const temp = peps;
			peps[peps.length - 1].speaking = true;
			setPeps(temp);
		}
	}

	function handleJoinLeave() {
		if (joined) {
			setPeps((prev) => prev.filter((_, index) => index !== prev.length - 1));
			setMic(false);
		} else
			setPeps((prev) => [
				...prev,
				{ name: "You", image: MiwaImage, speaking: false },
			]);
		setJoined((prev) => !prev);
	}

	return (
		<m.div ref={containerRef} className={cn("relative")} layoutRoot>
			<MotionConfig
				transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
			>
				<m.div
					layout
					className={cn(
						"bg-[#fefefe] border-2 border-neutral-200 shadow-md max-w-full lg:max-w-96 origin-right w-fit h-fit z-10",
						state
							? "rounded-[24px] overflow-hidden"
							: "rounded-full overflow-visible",
					)}
				>
					<AnimatePresence mode="popLayout">
						<LayoutGroup>
							{!state && (
								<m.button
									layout
									key={`button`}
									onClick={() => setState(true)}
									className="flex items-center p-2 -space-x-4"
								>
									{lesspeps.map((pep, index) => (
										<m.img
											key={pep.name}
											layoutId={pep.name}
											className="size-16 rounded-full border-2 shadow-md border-white"
											src={pep.image.src}
											alt={pep.name}
											style={{
												zIndex: peps.length - index,
											}}
										/>
									))}
									<m.span
										layout="position"
										className="flex items-center !mx-2 text-xl text-neutral-500"
									>
										+{peps.length - 4}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="24px"
											viewBox="0 -960 960 960"
											width="24px"
											fill="currentColor"
										>
											<path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
										</svg>
									</m.span>
									<m.div
										layout
										className="size-9 rounded-full bg-gradient-to-br from-[#5f5e5e] to-[#000] -top-1 left-4 absolute z-10 flex justify-center gap-0.5 items-center p-1"
									>
										<m.div
											layout
											transition={{
												duration: 0.5,
												repeatType: "reverse",
												repeat: Infinity,
											}}
											initial={{ scaleY: 0 }}
											animate={{ scaleY: 1 }}
											className="w-[2px] h-4 bg-white rounded-full"
										></m.div>
										<m.div
											layout
											transition={{
												duration: 0.4,
												repeatType: "reverse",
												repeat: Infinity,
											}}
											initial={{ scaleY: 0 }}
											animate={{ scaleY: 1 }}
											className="w-[2px] h-3 bg-white rounded-full"
										></m.div>
										<m.div
											layout
											transition={{
												duration: 0.3,
												repeatType: "reverse",
												repeat: Infinity,
											}}
											initial={{ scaleY: 0 }}
											animate={{ scaleY: 1 }}
											className="w-[2px] h-4 bg-white rounded-full"
										></m.div>
										<m.div
											layout
											transition={{
												duration: 0.4,
												repeatType: "reverse",
												repeat: Infinity,
											}}
											initial={{ scaleY: 0 }}
											animate={{ scaleY: 1 }}
											className="w-[2px] h-2 bg-white rounded-full"
										></m.div>
									</m.div>
								</m.button>
							)}
							{state && (
								<m.div layout key={`cont`}>
									<m.div
										layout
										className="bg-[#f4f3f8] relative py-2 font-medium text-neutral-600 flex items-center justify-center text-sm"
									>
										Voice Chat
										<m.button
											onClick={() => setState(false)}
											className="absolute right-2 p-1 rounded-full bg-[#e7e6ee] text-neutral-500"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="800px"
												height="800px"
												viewBox="0 0 24 24"
												fill="currentColor"
												className="size-5"
											>
												<g clipPath="url(#clip0_429_11083)">
													<path
														d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
														stroke="currentColor"
														strokeWidth="2.5"
														strokeLinecap="round"
														strokeLinejoin="round"
													/>
												</g>
												<defs>
													<clipPath id="clip0_429_11083">
														<rect width="24" height="24" fill="currentColor" />
													</clipPath>
												</defs>
											</svg>
										</m.button>
									</m.div>
									<m.div layout className="h-0.5 bg-neutral-200 w-full"></m.div>
									<m.div
										layout
										className="grid grid-cols-4 gap-2 md:gap-4 p-4 md:p-6"
									>
										<AnimatePresence>
											{peps.map((pep) => (
												<Person key={pep.name + "con"} pep={pep} />
											))}
										</AnimatePresence>
									</m.div>
									<m.div layout className="space-y-3 pb-6 px-6">
										<m.div className="flex gap-2 items-center">
											<m.button
												layout
												onClick={handleJoinLeave}
												className="bg-gradient-to-b from-[#2d2d2d] to-[#000] text-neutral-100 w-full rounded-xl shadow-xl overflow-hidden"
											>
												<span className="py-3 block">
													{joined ? "Leave" : "Join"}
												</span>
											</m.button>
											{joined && (
												<m.button
													className="size-12 p-2 shrink-0 border-2 border-neutral-200 hover:bg-neutral-200 rounded-lg transition grid place-content-center"
													layout
													onClick={handleMic}
												>
													{mic ? (
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
															className="size-5 md:size-6"
														>
															<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
															<path d="M19 10v2a7 7 0 0 1-14 0v-2" />
															<line x1="12" x2="12" y1="19" y2="22" />
														</svg>
													) : (
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
															className="size-5 md:size-6"
														>
															<line x1="2" x2="22" y1="2" y2="22" />
															<path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" />
															<path d="M5 10v2a7 7 0 0 0 12 5" />
															<path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
															<path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
															<line x1="12" x2="12" y1="19" y2="22" />
														</svg>
													)}
												</m.button>
											)}
										</m.div>
										<p className="text-center text-neutral-600 font-medium text-xs sm:text-sm">
											<AnimatePresence mode="popLayout" initial={false}>
												<MotionConfig transition={{ duration: 0.35 }}>
													{joined ? (
														mic ? (
															<m.span
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
																className="block"
																key="mic-on"
															>
																Mic is ON.
															</m.span>
														) : (
															<m.span
																initial={{ opacity: 0 }}
																animate={{ opacity: 1 }}
																exit={{ opacity: 0 }}
																className="block"
																key="mic-muted"
															>
																Mic is muted.
															</m.span>
														)
													) : (
														<m.span
															initial={{ opacity: 0 }}
															animate={{ opacity: 1 }}
															exit={{ opacity: 0 }}
															className="block"
															key="mic-info"
														>
															Mic will be muted initially.
														</m.span>
													)}
												</MotionConfig>
											</AnimatePresence>
										</p>
									</m.div>
								</m.div>
							)}
						</LayoutGroup>
					</AnimatePresence>
				</m.div>
			</MotionConfig>
		</m.div>
	);
}

interface PersonData {
	name: string;
	image: ImageMetadata;
	speaking: boolean;
}

function Person({ pep }: { pep: PersonData }) {
	const [isPresent, safeToRemove] = usePresence();
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (isPresent) {
			const enterAnimation = async () => {
				await animate(scope.current, {
					opacity: [0, 1],
					y: ["25%", 0],
				});
			};
			enterAnimation();
		} else {
			const exitAnimation = async () => {
				await animate(scope.current, {
					opacity: [1, 0],
					y: [0, "25%"],
				});
				safeToRemove();
			};
			exitAnimation();
		}
	}, [isPresent]);

	return (
		<m.div layout className="flex flex-col items-center relative" ref={scope}>
			{pep.speaking && (
				<m.div
					layout
					className="size-7 rounded-full bg-gradient-to-br bg-white -top-1 -right-1 absolute z-10 flex gap-[1px] justify-center items-center p-1 border-2"
				>
					<m.div
						layout
						transition={{
							duration: 0.5,
							repeatType: "reverse",
							repeat: Infinity,
						}}
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						className="w-[2px] h-4 bg-neutral-500 rounded-full"
					></m.div>
					<m.div
						layout
						transition={{
							duration: 0.4,
							repeatType: "reverse",
							repeat: Infinity,
						}}
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						className="w-[2px] h-3 bg-neutral-500 rounded-full"
					></m.div>
					<m.div
						layout
						transition={{
							duration: 0.3,
							repeatType: "reverse",
							repeat: Infinity,
						}}
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						className="w-[2px] h-4 bg-neutral-500 rounded-full"
					></m.div>
					<m.div
						layout
						transition={{
							duration: 0.4,
							repeatType: "reverse",
							repeat: Infinity,
						}}
						initial={{ scaleY: 0 }}
						animate={{ scaleY: 1 }}
						className="w-[2px] h-3 bg-neutral-500 rounded-full"
					></m.div>
				</m.div>
			)}

			<m.img
				className="size-16 aspect-square rounded-full border-2 shadow-md border-white"
				src={pep.image.src}
				alt={pep.name}
				key={pep.name + "image"}
				layoutId={pep.name}
			/>
			<m.span key={pep.name + "name"} className="text-neutral-700 text-sm">
				{pep.name}
			</m.span>
		</m.div>
	);
}
