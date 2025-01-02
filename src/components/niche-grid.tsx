import { motion as m } from "motion/react";
import noise from "@/assets/bg/noise.webp";

const niches = [
	{
		name: "Frontend",
		bgcolor: "#1e3a8a",
		column: "span 7",
	},
	{
		name: "F",
		bgcolor: "#1e3a8a",
		column: "span 1",
	},
	{
		name: "UI Interactions",
		bgcolor: "#064e3b",
		column: "span 6",
	},
	{
		name: "Software",
		bgcolor: "#881337",
		column: "span 5",
		row: "span 1",
	},
	{
		name: "S",
		bgcolor: "#881337",
		column: "span 1",
	},
	{
		name: "U",
		bgcolor: "#064e3b",
		column: "span 1",
	},
];

const NicheGrid = () => {
	return (
		<div className="grid grid-cols-7 gap-4 container mt-20">
			{niches.map((niche) => (
				<m.div
					key={niche.name}
					className="relative bg-gray-200 p-4 rounded-3xl min-h-36 grid place-content-center font-black text-3xl tracking-wide hover:tracking-widest transition-all hover:[text-shadow:4px_4px_#000] overflow-hidden"
					style={{
						color: "#fff",
						background: niche.bgcolor,
						backgroundSize: "cover",
						backgroundPosition: "center",
						gridColumn: niche.column,
						WebkitTextStroke: "4px #000",
						paintOrder: "stroke fill",
					}}
				>
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"radial-gradient(88% 100% at top,hsla(0,0%,100%,.25),hsla(0,0%,100%,0))",
						}}
					></div>
					<div
						className="absolute inset-0 scale-125 opacity-10"
						style={{ background: `url(${noise.src})`, backgroundSize: "30%" }}
					/>
					{niche.name}
				</m.div>
			))}
		</div>
	);
};

export default NicheGrid;
