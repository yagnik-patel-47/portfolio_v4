import GogoImage from "@/assets/codebits/voicechat/gojo.webp";
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
	useAnimate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

const constpeps = [
	{
		name: "Gojo",
		image: GogoImage,
		speaking: true,
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
		speaking: false,
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
	const [newJoined, setNewJoined] = useState(false);
	const containerRef = useRef(null);

	const [scope, animate] = useAnimate();

	useOnClickOutside(containerRef, closeVoiceDisclosure);

	useEffect(() => {
		if (scope.current) {
			if (newJoined) {
				animate(scope.current, {
					opacity: [0, 1],
					y: ["25%", 0],
				});
			}
		}
	}, [newJoined]);

	function closeVoiceDisclosure() {
		setState(false);
	}

	return (
		<m.div className={cn("relative")} layoutRoot>
			<MotionConfig
				transition={{ duration: 0.5, ease: "easeOut", type: "spring" }}
			>
				<m.div
					layout
					className={cn(
						"bg-[#fefefe] border-2 border-neutral-200 shadow-md max-w-96 origin-right w-fit h-fit",
						state
							? "rounded-[24px] overflow-hidden"
							: "rounded-full overflow-visible",
					)}
					ref={containerRef}
				>
					<AnimatePresence mode="popLayout" initial={false}>
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
										// key={`extra${state}`}
										layout="position"
										className="flex items-center !mx-2 text-xl text-neutral-500"
										// exit={{ x: "100%" }}
									>
										+4
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
										className="size-10 rounded-full bg-gradient-to-br from-[#5f5e5e] to-[#000] top-0 left-0 absolute !mx-0 -translate-x-1/4 -translate-y-1/4 z-10 flex justify-evenly items-center p-2"
									>
										<MotionConfig
											transition={{
												repeatType: "reverse",
												repeat: Infinity,
												duration: 0.5,
											}}
										>
											<m.div
												layout
												initial={{ scaleY: 0 }}
												animate={{ scaleY: 1 }}
												className="w-[3px] h-4 bg-white rounded-full"
											></m.div>
											<m.div
												layout
												initial={{ scaleY: 0 }}
												animate={{ scaleY: 1 }}
												className="w-[3px] h-3 bg-white rounded-full"
											></m.div>
											<m.div
												layout
												initial={{ scaleY: 0 }}
												animate={{ scaleY: 1 }}
												className="w-[3px] h-4 bg-white rounded-full"
											></m.div>
											<m.div
												layout
												initial={{ scaleY: 0 }}
												animate={{ scaleY: 1 }}
												className="w-[3px] h-2 bg-white rounded-full"
											></m.div>
										</MotionConfig>
									</m.div>
								</m.button>
							)}
							{state && (
								<m.div layout key={`cont`}>
									<m.div
										layout
										className="bg-[#f4f3f8] relative border-b-2 py-2 border-neutral-200 font-medium text-neutral-600 flex items-center justify-center text-sm"
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
									<m.div layout className="grid grid-cols-4 gap-4 p-6">
										{peps.map((pep) => (
											<m.div
												layout
												key={pep.name + "con"}
												className="flex flex-col items-center"
												ref={pep.name === "You" ? scope : undefined}
											>
												<m.img
													className="size-16 rounded-full border-2 shadow-md border-white"
													src={pep.image.src}
													alt={pep.name}
													key={pep.name + "image"}
													layoutId={pep.name}
												/>
												<m.span
													key={pep.name + "name"}
													className="text-neutral-700 text-sm"
												>
													{pep.name}
												</m.span>
											</m.div>
										))}
									</m.div>
									<m.div layout className="space-y-3 pb-6 px-6">
										<m.button
											layout
											onClick={() => {
												setNewJoined((prev) => !prev);
												if (newJoined)
													setPeps((prev) =>
														prev.filter(
															(_, index) => index !== prev.length - 1,
														),
													);
												else
													setPeps((prev) => [
														...prev,
														{ name: "You", image: MiwaImage, speaking: false },
													]);
											}}
											className="bg-gradient-to-b from-[#2d2d2d] to-[#000] text-neutral-100 w-full  rounded-xl shadow-xl overflow-hidden"
										>
											<MotionConfig
												transition={{
													duration: 0.25,
													ease: "easeInOut",
												}}
											>
												<AnimatePresence initial={false} mode="wait">
													{newJoined ? (
														<m.span
															className="block py-3"
															exit={{ x: "-100%" }}
															initial={{ x: "100%" }}
															animate={{ x: 0 }}
															key={"joined"}
														>
															Leave
														</m.span>
													) : (
														<m.span
															key={"join"}
															className="block py-3"
															exit={{ x: "-100%" }}
															initial={{ x: "100%" }}
															animate={{ x: 0 }}
														>
															Join Now
														</m.span>
													)}
												</AnimatePresence>
											</MotionConfig>
										</m.button>
										<p className="text-center text-neutral-600 font-medium text-sm">
											{newJoined
												? "Mic is muted."
												: "Mic will be muted initially."}
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
