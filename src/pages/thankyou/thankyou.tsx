import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../../components/footer/footer";

const ThankYou = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Scroll to top when component mounts
		window.scrollTo(0, 0);
	}, []);

	const handleBackHome = () => {
		navigate("/");
	};

	return (
		<div className='min-h-screen flex flex-col'>
			{/* Main Content */}
			<div
				className='flex-1 flex items-center justify-center px-4 py-12 md:py-20'
				style={{ backgroundColor: "#f8f8f8" }}
			>
				<div className='max-w-3xl w-full text-center'>
					{/* Thank You Message */}
					<div
						className='bg-white rounded-2xl shadow-lg p-8 md:p-12'
						style={{ fontFamily: "Outfit, sans-serif" }}
					>
						<div className='mb-6 text-6xl'>✓</div>

						<p
							className='text-base md:text-lg mb-6 text-gray-700'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Your submission has been received. We appreciate
							your time and will get back to you as soon as
							possible.
						</p>

						<button
							onClick={handleBackHome}
							className='px-8 py-3 rounded-full font-semibold text-base transition-colors'
							style={{
								backgroundColor: "#00275c",
								color: "#ffffff",
								fontFamily: "Outfit, sans-serif",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#001f47")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#00275c")
							}
						>
							Back Home
						</button>
					</div>
				</div>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default ThankYou;
