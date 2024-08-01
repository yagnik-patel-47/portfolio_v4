import { AnimatePresence, MotionConfig, motion as m } from "framer-motion";
import { useRef, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";
import { flushSync } from "react-dom";

export default function DynamicButton() {
	const [state, setState] = useState<null | number>(1);
	const [changesApplied, setChangesApplied] = useState(false);
	const containerRef = useRef(null);

	const [dimensionValues, setDimensionValues] = useState([50, 50, 50]);
	const [aspect, setAspect] = useState("16/9");
	const [prompt, setPrompt] = useState("");

	function closeBtn() {
		flushSync(() => {
			setChangesApplied(false);
		});
		setState(null);
		setDimensionValues([50, 50, 50]);
		setAspect("16/9");
		setPrompt("");
	}

	function applyChanges() {
		setChangesApplied(true);
	}

	useOnClickOutside(containerRef, closeBtn);

	const tabs = ["Dimensions", "Aspect Ratio", "Prompt"];

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}>
			<m.div
				layout
				className={cn(
					"border border-black/40 bg-white shadow-lg rounded-lg p-3 overflow-hidden relative",
					state && "w-[300px] lg:w-[350px]",
				)}
				role="presentation"
				onKeyDown={(e) => {
					if (!e.metaKey && e.key === "Escape" && state) closeBtn();
				}}
				ref={containerRef}
			>
				<div>
					<AnimatePresence>
						<m.div layout className="flex items-center gap-2 justify-between">
							{!state && (
								<m.button
									key={"add"}
									layout="position"
									onClick={() => setState(1)}
									className="py-1 ml-2"
								>
									Add Style
								</m.button>
							)}
							{state && (
								<m.nav
									key={"nav"}
									layout="position"
									className="flex gap-1 text-[12px] lg:text-sm font-medium"
								>
									{tabs.map((tab, i) => (
										<button
											className="relative p-1 rounded-md"
											onClick={() => setState(i + 1)}
											key={tab}
										>
											{tab}
											{state === i + 1 && (
												<m.div
													layoutId="active"
													className="absolute inset-0 bg-indigo-900/20 rounded-md"
												></m.div>
											)}
										</button>
									))}
								</m.nav>
							)}
							<m.button
								layout
								onClick={() => setState((prev) => (prev ? null : 1))}
								className="align-middle size-6"
							>
								<m.svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="text-neutral-800 size-6"
									animate={{
										rotateZ: state ? 45 : 0,
									}}
								>
									<path d="M5 12h14" />
									<path d="M12 5v14" />
								</m.svg>
							</m.button>
						</m.div>
						{state && (
							<>
								{state === 1 && (
									<DimensionsTab
										key={"dimension"}
										dimensionValues={dimensionValues}
										setDimensionValues={setDimensionValues}
									/>
								)}
								{state === 2 && (
									<TooglesTab
										key={"toggles"}
										aspect={aspect}
										setAspect={setAspect}
									/>
								)}
								{state === 3 && (
									<PromptTab
										key={"prompt"}
										prompt={prompt}
										setPrompt={setPrompt}
									/>
								)}
								<m.button
									key={"apply"}
									layout="position"
									type="button"
									onClick={applyChanges}
									className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-lg mt-4 float-end"
								>
									Apply Changes
								</m.button>
							</>
						)}
						{changesApplied && (
							<m.div
								key={"applied"}
								layout="preserve-aspect"
								className="absolute grid place-content-center inset-0 bg-white z-10 text-emerald-700"
								initial={{ y: "5%", opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
							>
								<m.svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="3"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="size-10"
								>
									<m.path
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ duration: 0.25 }}
										d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
									/>
									<m.path
										initial={{ pathLength: 0 }}
										animate={{ pathLength: 1 }}
										transition={{ delay: 0.15 }}
										onAnimationComplete={() => setTimeout(closeBtn, 300)}
										d="m9 11 3 3L22 4"
									/>
								</m.svg>
							</m.div>
						)}
					</AnimatePresence>
				</div>
			</m.div>
		</MotionConfig>
	);
}

function PromptTab({ prompt, setPrompt }) {
	return (
		<m.form
			layout="preserve-aspect"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, type: "tween" }}
			className="mt-3 space-y-2"
		>
			<textarea
				autoFocus
				className="w-full h-32 p-2 bg-transparent rounded-lg text-sm outline-indigo-800"
				placeholder="Write your genius prompt..."
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			></textarea>
		</m.form>
	);
}

function TooglesTab({ aspect, setAspect }) {
	const toggleGroupItemClasses =
		"flex gap-1 items-center hover:bg-indigo-500/10 data-[state=on]:bg-indigo-500/20 data-[state=on]:text-indigo-900 data-[state=on]:font-medium text-neutral-700 justify-center leading-4 focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-indigo-800 focus:outline-none px-2 rounded-md h-9";

	return (
		<m.form
			layout="preserve-aspect"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, type: "tween" }}
		>
			<ToggleGroup.Root
				className="mt-6 grid grid-cols-3 gap-2"
				type="single"
				value={aspect}
				onValueChange={(value) => setAspect(value)}
				aria-label="Text alignment"
			>
				<ToggleGroup.Item
					className={toggleGroupItemClasses}
					value="1/1"
					aria-label="1:1"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 -960 960 960"
						className="size-5 shrink-0"
						fill="currentColor"
						role="graphics-symbol"
					>
						<path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0 0v-560 560Z" />
					</svg>
					<span>1:1</span>
				</ToggleGroup.Item>
				<ToggleGroup.Item
					className={toggleGroupItemClasses}
					value="16/9"
					aria-label="16:9"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-5 sh"
						fill="currentColor"
						viewBox="0 -960 960 960"
						role="graphics-symbol"
					>
						<path d="M200-280q-33 0-56.5-23.5T120-360v-240q0-33 23.5-56.5T200-680h560q33 0 56.5 23.5T840-600v240q0 33-23.5 56.5T760-280H200Zm0-80h560v-240H200v240Zm0 0v-240 240Z" />
					</svg>
					<span>16:9</span>
				</ToggleGroup.Item>
				<ToggleGroup.Item
					className={toggleGroupItemClasses}
					value="7/5"
					aria-label="7:5"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-5"
						fill="currentColor"
						viewBox="0 -960 960 960"
						role="graphics-symbol"
					>
						<path d="M200-200q-33 0-56.5-23.5T120-280v-400q0-33 23.5-56.5T200-760h560q33 0 56.5 23.5T840-680v400q0 33-23.5 56.5T760-200H200Zm0-80h560v-400H200v400Zm0 0v-400 400Z" />
					</svg>
					<span>7:5</span>
				</ToggleGroup.Item>
				<ToggleGroup.Item
					className={toggleGroupItemClasses}
					value="9/16"
					aria-label="9:16"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-5"
						fill="currentColor"
						viewBox="0 -960 960 960"
						role="graphics-symbol"
					>
						<path d="M360-120q-33 0-56.5-23.5T280-200v-560q0-33 23.5-56.5T360-840h240q33 0 56.5 23.5T680-760v560q0 33-23.5 56.5T600-120H360Zm0-640v560h240v-560H360Zm0 0v560-560Z" />
					</svg>
					<span>9:16</span>
				</ToggleGroup.Item>
				<ToggleGroup.Item
					className={toggleGroupItemClasses}
					value="3/2"
					aria-label="3:2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="size-5"
						fill="currentColor"
						viewBox="0 -960 960 960"
						role="graphics-symbol"
					>
						<path d="M200-240q-33 0-56.5-23.5T120-320v-320q0-33 23.5-56.5T200-720h560q33 0 56.5 23.5T840-640v320q0 33-23.5 56.5T760-240H200Zm0-80h560v-320H200v320Zm0 0v-320 320Z" />
					</svg>
					<span>3:2</span>
				</ToggleGroup.Item>
			</ToggleGroup.Root>
		</m.form>
	);
}

function DimensionsTab({ dimensionValues, setDimensionValues }) {
	const fields = ["Vertical", "Horizontal", "Upscale"];

	return (
		<m.form
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			layout="preserve-aspect"
			transition={{ duration: 0.3, type: "tween" }}
			className="mt-6 space-y-4"
		>
			{fields.map((field, index) => (
				<fieldset key={index} className="flex gap-10 justify-between">
					<label className="text-sm" htmlFor={field}>
						{field}
					</label>
					<div className="flex gap-3 items-center">
						<div className="bg-indigo-800/20 py-1 px-2 text-[12px] md:text-sm rounded-lg">
							{dimensionValues[index]}
						</div>
						<Slider.Root
							className="relative flex items-center select-none touch-none  w-[120px] md:w-[150px] h-6 cursor-grab active:cursor-grabbing"
							defaultValue={[50]}
							value={[dimensionValues[index]]}
							onValueChange={(number) => {
								let temp = [...dimensionValues];
								temp[index] = number[0];
								setDimensionValues(temp);
							}}
							max={100}
							step={1}
							name={field}
						>
							<Slider.Track className="bg-black/30 relative grow rounded-md h-full overflow-hidden">
								<Slider.Range className="absolute bg-indigo-900/80 h-full" />
							</Slider.Track>
							<Slider.Thumb
								className="block w-[14px] h-6 bg-white rounded focus:outline-none"
								aria-label="Volume"
							/>
						</Slider.Root>
					</div>
				</fieldset>
			))}
		</m.form>
	);
}
