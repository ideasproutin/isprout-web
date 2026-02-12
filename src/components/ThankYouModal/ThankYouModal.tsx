import React, { useEffect, useState } from "react";

interface ThankYouModalProps {
	isOpen: boolean;
	onClose: () => void;
	jobTitle?: string;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose, jobTitle }) => {
	const [showCheck, setShowCheck] = useState(false);

	useEffect(() => {
		if (isOpen) {
			// Trigger check animation after modal appears
			setTimeout(() => setShowCheck(true), 100);
		} else {
			queueMicrotask(() => setShowCheck(false));
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center"
			style={{
				zIndex: 120,
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				backdropFilter: "blur(4px)",
			}}
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 text-center"
				onClick={(e) => e.stopPropagation()}
				style={{
					animation: "modalSlideIn 0.3s ease-out",
				}}
			>
				{/* Animated Check Circle */}
				<div className="mb-6 flex justify-center">
					<div
						className="relative"
						style={{
							width: "80px",
							height: "80px",
						}}
					>
						{/* Circle */}
						<svg
							className="absolute inset-0"
							viewBox="0 0 80 80"
							style={{
								transform: showCheck ? "scale(1)" : "scale(0)",
								transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
							}}
						>
							<circle
								cx="40"
								cy="40"
								r="36"
								fill="#10b981"
								stroke="#10b981"
								strokeWidth="2"
							/>
						</svg>
						
						{/* Check Mark */}
						<svg
							className="absolute inset-0"
							viewBox="0 0 80 80"
							style={{
								opacity: showCheck ? 1 : 0,
								transition: "opacity 0.3s ease-in 0.2s",
							}}
						>
							<path
								d="M 25 40 L 35 50 L 55 30"
								fill="none"
								stroke="white"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
								style={{
									strokeDasharray: 50,
									strokeDashoffset: showCheck ? 0 : 50,
									transition: "stroke-dashoffset 0.4s ease-in 0.3s",
								}}
							/>
						</svg>
					</div>
				</div>

				{/* Success Message */}
				<h2
					className="text-2xl font-semibold mb-3"
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#000",
					}}
				>
					Application Submitted!
				</h2>
				
				<p
					className="text-base mb-2"
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#666",
					}}
				>
					Thank you for applying{jobTitle && ` for ${jobTitle}`}!
				</p>
				
				<p
					className="text-sm mb-6"
					style={{
						fontFamily: "Outfit, sans-serif",
						color: "#999",
					}}
				>
					We have received your application and will review it shortly. Our team will contact you soon.
				</p>

				{/* Close Button */}
				<button
					onClick={onClose}
					className="px-8 py-3 rounded-lg font-medium transition-colors"
					style={{
						backgroundColor: "#FFDE00",
						color: "#000",
						fontFamily: "Outfit, sans-serif",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = "#e6c800";
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = "#FFDE00";
					}}
				>
					Close
				</button>
			</div>

			<style>{`
				@keyframes modalSlideIn {
					from {
						transform: translateY(-20px);
						opacity: 0;
					}
					to {
						transform: translateY(0);
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default ThankYouModal;
