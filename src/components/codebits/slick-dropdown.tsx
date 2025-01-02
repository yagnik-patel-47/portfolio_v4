import { AnimatePresence, motion as m, MotionConfig } from "motion/react";
import { useState } from "react";
import { X, Plus } from "lucide-react";
import {
	DocumentIcon,
	BellIcon,
	FolderIcon,
	Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";

const items = [
	{
		icon: Square3Stack3DIcon,
		label: "Task",
		desc: "Create a new task",
	},
	{
		icon: BellIcon,
		label: "Reminder",
		desc: "Create reminders with alerts",
	},
	{
		icon: DocumentIcon,
		label: "Note",
		desc: "Capture ideas on the fly",
	},
	{
		icon: FolderIcon,
		label: "Project",
		desc: "Organize better with projects",
	},
];

export default function SlickDropdown() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<MotionConfig transition={{ duration: 0.6, type: "spring", bounce: 0.2 }}>
			<m.div layoutRoot>
				<m.div
					layout
					className="gap-2 flex flex-col items-center justify-center relative"
				>
					<AnimatePresence mode="popLayout" initial={true}>
						{isOpen && (
							<m.button
								initial={{ y: 0 }}
								animate={{ y: -10 }}
								exit={{ y: 0 }}
								key={"close"}
								className="bg-[#f3efeb] px-5 py-2 grid place-items-center rounded-full"
								onClick={() => setIsOpen(false)}
								layout="position"
							>
								<X className="size-6 text-neutral-500" />
								<span className="sr-only">Close</span>
							</m.button>
						)}

						<m.div
							layout
							className={cn(
								"rounded-3xl border-2 border-zinc-200 overflow-hidden z-2",
								!isOpen ? "bg-[#f0ece6]" : "bg-[#fefefe]",
							)}
						>
							{!isOpen && (
								<m.button
									layout="size"
									className="px-6 py-2 rounded-full"
									key={"open"}
									onClick={() => setIsOpen(true)}
								>
									<Plus className="size-6 text-neutral-500" />
								</m.button>
							)}
							{isOpen && (
								<m.div
									key={"dropdown"}
									initial={{ y: 15 }}
									animate={{ y: 0 }}
									transition={{ duration: 0.3, delay: 0.1, type: "tween" }}
									className="p-3 space-y-4"
								>
									{items.map((item, index) => (
										<m.button
											key={`item-${index}`}
											initial={{ opacity: 0, filter: "blur(12px)" }}
											animate={{
												opacity: 1,
												filter: "blur(0px)",
												transition: {
													duration: 0.2,
													delay: index * 0.05,
													type: "tween",
												},
											}}
											className="flex gap-3 items-center p-1.5 hover:bg-[#f4f2ec] hover:scale-105 transition rounded-xl w-full group"
										>
											<div className="grid place-items-center bg-[#f3efeb] group-hover:bg-[#fcfcf9] size-10 rounded-lg transition">
												<item.icon className="size-6 text-neutral-500" />
											</div>
											<div className="text-left">
												<p className="font-semibold text-neutral-900 leading-tight">
													{item.label}
												</p>
												<p className="text-sm text-zinc-600">{item.desc}</p>
											</div>
										</m.button>
									))}
								</m.div>
							)}
						</m.div>
					</AnimatePresence>
				</m.div>
			</m.div>
		</MotionConfig>
	);
}
