import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../helpers/constants/Colors";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const PageNotFound: React.FC = () => {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<div
			className='min-h-screen flex flex-col'
			style={{ backgroundColor: COLORS.white }}
		>
			{/* Navbar */}
			<Navbar />

			{/* Main Content */}
			<div className='flex-grow flex flex-col items-center justify-center px-4 pt-32 pb-16'>
				{/* 404 Large Text */}
				<h1
					className='text-9xl font-bold mb-8'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray800,
						fontSize: "clamp(8rem, 20vw, 15rem)",
					}}
				>
					404
				</h1>

				{/* Main Heading */}
				<h2
					className='text-3xl md:text-4xl font-bold mb-4 text-center'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textBlack,
					}}
				>
					OOPS! PAGE NOT FOUND
				</h2>

				{/* Description */}
				<p
					className='text-base md:text-lg mb-8 text-center max-w-md'
					style={{
						fontFamily: "Outfit, sans-serif",
						color: COLORS.textGray,
					}}
				>
					Sorry, the page you're looking for doesn't exist.
				</p>

				{/* Go Back to Home Button */}
				<button
					onClick={handleGoHome}
					className='px-8 py-3 rounded-full font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'
					style={{
						fontFamily: "Outfit, sans-serif",
						backgroundColor: COLORS.white,
						color: COLORS.textBlack,
						border: `2px solid ${COLORS.textBlack}`,
						fontSize: "1rem",
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor =
							COLORS.textBlack;
						e.currentTarget.style.color = COLORS.white;
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = COLORS.white;
						e.currentTarget.style.color = COLORS.textBlack;
					}}
				>
					GO BACK TO HOME
				</button>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default PageNotFound;
