import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MetaTags } from "../../hooks/useMetaTags";
import Footer from "../../components/footer/footer";
import thankYouImage from "../../assets/thankyou/thankyou.png";
import { getRouteScripts } from "./scripts";

const ThankYou = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		// Scroll to top when component mounts
		window.scrollTo(0, 0);

		// Inject route-specific scripts (e.g. Google Ads conversion for Hyderabad)
		const scripts = getRouteScripts(location.pathname);
		const injected: HTMLScriptElement[] = [];

		for (const { id, code } of scripts) {
			// Avoid duplicates if already injected
			if (document.getElementById(id)) continue;

			const script = document.createElement("script");
			script.id = id;
			script.textContent = code;
			document.head.appendChild(script);
			injected.push(script);
		}

		// Cleanup on unmount
		return () => {
			for (const el of injected) {
				el.remove();
			}
		};
	}, [location.pathname]);

	const handleBackHome = () => {
		navigate("/");
	};

	return (
		<div className='min-h-screen flex flex-col'>
			<MetaTags
				title='Thank You | iSprout'
				description='Thank you for contacting iSprout. We have received your submission and will get back to you as soon as possible.'
			/>
			{/* Main Content */}
			<div
				className='flex-1 flex items-center justify-center px-4 py-12 md:py-20 pt-24 sm:pt-28 md:pt-32 lg:pt-36'
				style={{ backgroundColor: "#f8f8f8" }}
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
							fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
						}}
					>
						<p
							className='text-base md:text-lg text-gray-700'
							style={{ fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
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
							fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.backgroundColor = "#001f47")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.backgroundColor = "#00275c")
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
