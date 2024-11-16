import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	LayoutGroup,
	motion as m,
	MotionConfig,
} from "motion/react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export default function () {
	const chips = ["Watchlist", "Feedback", "Design"];

	return (
		<m.div layout className="flex flex-col gap-3 items-center">
			{chips.map((chip) => (
				<LayoutGroup key={chip} id={chip}>
					<Chip initialText={chip} />
				</LayoutGroup>
			))}
		</m.div>
	);
}

interface Props {
	initialText: string;
}

function Chip(props: Props) {
	const [editMode, setEditMode] = useState(false);
	const [text, setText] = useState(props.initialText);
	const containerRef = useRef(null);

	useOnClickOutside(containerRef, unFocus);

	function unFocus() {
		setEditMode(false);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (!e.ctrlKey && e.key === "Enter") setEditMode(false);
	}

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.5 }}>
			<m.div ref={containerRef} layoutRoot>
				<m.div
					className={cn(
						"flex items-center justify-between rounded-full px-1 transition-shadow duration-300 overflow-hidden",
						editMode
							? "gap-8 shadow-[0_0_0_2.5px_#111]"
							: "gap-3 shadow-[0_0_0_1.5px_#e5e5e5]",
					)}
					layout
				>
					<AnimatePresence initial={false}>
						{editMode ? (
							<>
								<m.input
									value={text}
									onChange={(e) => setText(e.target.value)}
									onKeyDown={handleKeyDown}
									layoutId="text"
									layout="position"
									className="max-w-20 py-1 outline-none border-0 pl-2 bg-transparent"
									autoFocus
								/>
								<m.button
									key={"save_button"}
									initial={{ x: "100%" }}
									animate={{ x: 0 }}
									onClick={() => setEditMode(false)}
									className="bg-neutral-900 rounded-full text-neutral-200 origin-right size-7 grid place-content-center"
								>
									<m.svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="size-4"
									>
										<path d="M20 6 9 17l-5-5" />
									</m.svg>
									<span className="sr-only">Submit</span>
								</m.button>
							</>
						) : (
							<>
								<m.span
									layout="position"
									layoutId="text"
									className="pl-2 text-neutral-700 py-1 max-w-40 text-ellipsis overflow-hidden text-nowrap"
								>
									{text}
								</m.span>
								<m.button
									key={"edit_button"}
									initial={{ x: "100%" }}
									animate={{ x: 0 }}
									onClick={() => setEditMode(true)}
									className="bg-neutral-200 rounded-full text-neutral-600 size-7 grid place-content-center origin-right"
								>
									<m.svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										fill="currentColor"
										stroke="currentColor"
										className="size-3"
									>
										<path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z" />
									</m.svg>
									<span className="sr-only">Edit</span>
								</m.button>
							</>
						)}
					</AnimatePresence>
				</m.div>
			</m.div>
		</MotionConfig>
	);
}
