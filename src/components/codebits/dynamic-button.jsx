import { AnimatePresence, MotionConfig, motion as m } from "framer-motion";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { cn } from "@/lib/utils";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";

export default function DynamicButton() {
	const [state, setState] = useState(false);
	const [activeTab, setActiveTab] = useState(1);

	const [dimensionValues, setDimensionValues] = useState([50, 50, 50]);
	const [aspect, setAspect] = useState("");
	const [prompt, setPrompt] = useState("");

	function closeBtn() {
		setState(false);
		setActiveTab(1);
		setDimensionValues([50, 50, 50]);
		setAspect("");
		setPrompt("");
	}

	const tabs = ["Dimensions", "Aspect Ratio", "Prompt"];

	return (
		<MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}>
			<ClickAwayListener onClickAway={closeBtn}>
				<m.div
					layout
					className={cn(
						"border border-black/40 bg-white shadow-lg rounded-lg p-3 overflow-hidden",
						state && "w-[300px] lg:w-[350px]",
					)}
					role="presentation"
					onKeyDown={(e) => {
						if (!e.metaKey && e.key === "Escape" && state) closeBtn();
					}}
				>
					<div>
						<m.div layout className="flex items-center gap-2 justify-between">
							{!state && (
								<m.button
									layout="position"
									onClick={() => setState(true)}
									className="py-1 ml-2"
								>
									Add Style
								</m.button>
							)}
							{state && (
								<m.nav
									layout="position"
									className="flex gap-1 text-[12px] lg:text-sm font-medium"
								>
									{tabs.map((tab, i) => (
										<button
											className="relative p-1 rounded-md"
											onClick={() => setActiveTab(i + 1)}
											key={tab}
										>
											{tab}
											{activeTab === i + 1 && (
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
								onClick={() => setState(!state)}
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
							<AnimatePresence>
								{activeTab === 1 && (
									<DimensionsTab
										setState={closeBtn}
										dimensionValues={dimensionValues}
										setDimensionValues={setDimensionValues}
									/>
								)}
								{activeTab === 2 && (
									<TooglesTab
										setState={closeBtn}
										aspect={aspect}
										setAspect={setAspect}
									/>
								)}
								{activeTab === 3 && (
									<PromptTab
										setState={closeBtn}
										prompt={prompt}
										setPrompt={setPrompt}
									/>
								)}
							</AnimatePresence>
						)}
					</div>
				</m.div>
			</ClickAwayListener>
		</MotionConfig>
	);
}

function PromptTab({ setState, prompt, setPrompt }) {
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
				placeholder="Add a new prompt"
				value={prompt}
				onChange={(e) => setPrompt(e.target.value)}
			></textarea>
			<button
				onClick={setState}
				className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-lg float-end"
			>
				Apply Changes
			</button>
		</m.form>
	);
}

function TooglesTab({ setState, aspect, setAspect }) {
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
			{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
			<button
				onClick={setState}
				className="text-sm px-3 py-2 mt-3 bg-indigo-600 text-white rounded-lg float-end"
			>
				Apply Changes
			</button>
		</m.form>
	);
}

function DimensionsTab({ setState, dimensionValues, setDimensionValues }) {
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
			<button
				onClick={setState}
				className="text-sm px-3 py-2 bg-indigo-600 text-white rounded-lg float-end"
			>
				Apply Changes
			</button>
		</m.form>
	);
}
