import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "../../components/footer/footer";
import thankYouImage from "../../assets/thankyou/thankyou.png";

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
			<Helmet>
				<title>Thank You | iSprout</title>
				<meta name='description' content='Thank you for contacting iSprout. We have received your submission and will get back to you as soon as possible.' />
			</Helmet>
			{/* Main Content */}
			<div
				className='flex-1 flex items-center justify-center px-4 py-12 md:py-20'
				style={{ backgroundColor: "#f8f8f8", paddingTop: "140px" }}
			>
				<div className='max-w-3xl w-full text-center'>
					{/* Thank You Image */}
					<div className='mb-8'>
						<img
							src={thankYouImage}
							alt='Thank You'
							className='mx-auto max-w-full h-auto'
							style={{ maxWidth: "600px" }}
						/>
					</div>

					{/* Thank You Message with Animation */}
					<div
						className='mb-8'
						style={{
							animation: "fadeInLeft 0.8s ease-out",
							fontFamily: "Outfit, sans-serif",
						}}
					>
						<p
							className='text-base md:text-lg text-gray-700'
							style={{ fontFamily: "Outfit, sans-serif" }}
						>
							Your submission has been received. We appreciate
							your time and will get back to you as soon as
							possible.
						</p>
					</div>

					{/* Back Home Button */}
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

				{/* Add keyframe animation */}
				<style>{`
					@keyframes fadeInLeft {
						from {
							opacity: 0;
							transform: translateX(-30px);
						}
						to {
							opacity: 1;
							transform: translateX(0);
						}
					}
				`}</style>
			</div>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default ThankYou;
