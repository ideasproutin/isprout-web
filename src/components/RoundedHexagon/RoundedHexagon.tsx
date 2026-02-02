import React from "react";

interface RoundedHexagonProps {
	size?: number;
	outerColor?: string;
	innerColor: string;
	icon?: React.ReactNode;
	borderWidth?: number;
}

const RoundedHexagon: React.FC<RoundedHexagonProps> = ({
	size = 120,
	outerColor = "white",
	innerColor,
	icon,
	borderWidth = 6,
}) => {
	// Generate rounded hexagon path (point-up orientation)
	const generateRoundedHexagonPath = (radius: number, cornerRadius: number) => {
		const angles = [0, 60, 120, 180, 240, 300]; // Degrees for each vertex (point-up)
		const vertices: { x: number; y: number }[] = [];

		// Calculate vertices
		angles.forEach((angle) => {
			const rad = ((angle - 90) * Math.PI) / 180; // -90 to make point-up
			vertices.push({
				x: radius * Math.cos(rad),
				y: radius * Math.sin(rad),
			});
		});

		// Build path with rounded corners using quadratic curves
		let path = "";

		for (let i = 0; i < vertices.length; i++) {
			const current = vertices[i];
			const next = vertices[(i + 1) % vertices.length];
			const prev = vertices[(i - 1 + vertices.length) % vertices.length];

			// Calculate vectors from current vertex to neighbors
			const toPrev = {
				x: prev.x - current.x,
				y: prev.y - current.y,
			};
			const toNext = {
				x: next.x - current.x,
				y: next.y - current.y,
			};

			// Normalize vectors
			const lenPrev = Math.sqrt(toPrev.x ** 2 + toPrev.y ** 2);
			const lenNext = Math.sqrt(toNext.x ** 2 + toNext.y ** 2);

			const normPrev = { x: toPrev.x / lenPrev, y: toPrev.y / lenPrev };
			const normNext = { x: toNext.x / lenNext, y: toNext.y / lenNext };

			// Points for the rounded corner
			const startCorner = {
				x: current.x + normPrev.x * cornerRadius,
				y: current.y + normPrev.y * cornerRadius,
			};

			const endCorner = {
				x: current.x + normNext.x * cornerRadius,
				y: current.y + normNext.y * cornerRadius,
			};

			if (i === 0) {
				path += `M ${startCorner.x} ${startCorner.y} `;
			}

			// Quadratic curve through the vertex
			path += `Q ${current.x} ${current.y}, ${endCorner.x} ${endCorner.y} `;

			// Line to next corner start
			if (i < vertices.length - 1) {
				const nextStartCorner = {
					x: next.x + normNext.x * -cornerRadius,
					y: next.y + normNext.y * -cornerRadius,
				};
				path += `L ${nextStartCorner.x} ${nextStartCorner.y} `;
			}
		}

		path += "Z";
		return path;
	};

	const centerX = size / 2;
	const centerY = size / 2;
	const outerRadius = size / 2 - 2;
	const innerRadius = outerRadius - borderWidth;
	const outerCornerRadius = size * 0.08; // 8% of size for outer corners
	const innerCornerRadius = size * 0.06; // 6% of size for inner corners

	const outerPath = generateRoundedHexagonPath(outerRadius, outerCornerRadius);
	const innerPath = generateRoundedHexagonPath(innerRadius, innerCornerRadius);

	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${size} ${size}`}
			style={{ display: "block" }}
		>
			<g transform={`translate(${centerX}, ${centerY})`}>
				{/* Outer hexagon (white border) */}
				<path d={outerPath} fill={outerColor} />

				{/* Inner hexagon (colored) */}
				<path d={innerPath} fill={innerColor} />

				{/* Icon container */}
				{icon && (
					<g transform={`translate(${-size * 0.15}, ${-size * 0.15})`}>
						<foreignObject
							x={0}
							y={0}
							width={size * 0.3}
							height={size * 0.3}
						>
							<div
								style={{
									width: "100%",
									height: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								{icon}
							</div>
						</foreignObject>
					</g>
				)}
			</g>
		</svg>
	);
};

export default RoundedHexagon;
