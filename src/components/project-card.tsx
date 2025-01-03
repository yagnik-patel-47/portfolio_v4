import {
	AnimatePresence,
	LayoutGroup,
	motion as m,
	MotionConfig,
} from "motion/react";
import { featuredProjects } from "@/lib/projects-data";
import { techIcons } from "@/lib/icons-map";
import ArrowIcon from "@/assets/icons/external-link.svg";
import GithubIcon from "@/assets/icons/social/github.svg";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProjectCard({
	project,
}: { project: (typeof featuredProjects)[number] }) {
	const [expanded, setExpanded] = useState(false);

	return (
		<MotionConfig
			transition={{ duration: 0.3, ease: "easeInOut" }}
			reducedMotion="user"
		>
			<m.div layoutRoot className="project">
				<m.div
					layout
					className="bg-zinc-100 px-3 pb-3 md:px-4 md:pb-4 max-w-2xl rounded-2xl"
				>
					<LayoutGroup>
						<m.button
							layout
							onClick={() => setExpanded((p) => !p)}
							className={cn(
								"flex justify-between w-full pt-6 pb-4 px-3 lg:px-6 text-start overflow-hidden items-center",
								!expanded && "gap-2",
							)}
						>
							<AnimatePresence>
								<div className="space-y-1 w-full">
									<m.h2
										layout="position"
										className="text-base font-medium md:font-normal md:text-xl"
									>
										{project.name}
									</m.h2>
									<m.div layout className="overflow-hidden">
										{expanded ? (
											<m.p
												key={"full"}
												layout="position"
												layoutId={`${project.name}-desc`}
												className={cn("text-xs md:text-sm text-pretty")}
											>
												{project.discription}
											</m.p>
										) : (
											<m.p
												key={"hidden"}
												layout="position"
												layoutId={`${project.name}-desc`}
												className={cn("text-xs md:text-sm line-clamp-1")}
											>
												{project.discription}
											</m.p>
										)}
									</m.div>
									{expanded && (
										<div className="flex justify-between items-center">
											<div className="flex items-center gap-2 mt-2">
												{project.tech.map((tech) => (
													<m.img
														layoutId={`${project.name}-${tech}`}
														key={`expanded-${tech}`}
														className="size-7 md:size-8 flex object-contain rounded-lg md:rounded-xl relative"
														src={techIcons[tech].src}
														alt={tech}
													/>
												))}
											</div>
											<m.div layout className="flex space-x-4">
												{project.links.repo && (
													<a
														aria-label="project repo link"
														target="_blank"
														href={project.links.repo}
													>
														<img
															className="size-6"
															src={GithubIcon.src}
															alt="github"
														/>
													</a>
												)}
												<a
													aria-label="site link"
													target="_blank"
													href={project.links.site}
												>
													<img
														className="size-6"
														src={ArrowIcon.src}
														alt="external-link"
													/>
												</a>
											</m.div>
										</div>
									)}
								</div>
								<m.div
									layout
									className={cn(
										"flex justify-end items-center shrink-0 -space-x-5 ",
									)}
								>
									{!expanded &&
										project.tech.map((tech) => (
											<m.img
												exit={{ display: "none" }}
												layoutId={`${project.name}-${tech}`}
												key={`collapsed-${tech}`}
												className="size-8 md:size-10 flex object-contain rounded-lg md:rounded-xl relative"
												src={techIcons[tech].src}
												alt={tech}
											/>
										))}
								</m.div>
							</AnimatePresence>
						</m.button>
						<m.button
							onClick={() => setExpanded((p) => !p)}
							layout
							className="relative after:rounded-2xl after:absolute after:inset-0 after:inset-ring-black/20 after:inset-ring-5 hover:after:inset-ring-8 after:transition"
						>
							<m.img
								layout
								className="w-full object-cover rounded-2xl"
								src={project.image.src}
								alt={project.name}
							/>
						</m.button>
					</LayoutGroup>
				</m.div>
			</m.div>
		</MotionConfig>
	);
}
