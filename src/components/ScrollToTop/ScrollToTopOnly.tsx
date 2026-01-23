import React, { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

const ScrollToTopOnly: React.FC = () => {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowButton(true);
			} else {
				setShowButton(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};

	if (!showButton) return null;

	return (
		<button
			onClick={scrollToTop}
			style={{
				position: "fixed",
				bottom: "32px",
				right: "32px",
				zIndex: 50,
				width: "56px",
				height: "56px",
				backgroundColor: "#FFDE00",
				border: "none",
				outline: "none",
				cursor: "pointer",
				borderRadius: "50%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				transition: "all 0.3s ease",
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.boxShadow =
					"0 8px 16px rgba(0, 0, 0, 0.2)";
				e.currentTarget.style.transform = "scale(1.1)";
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.boxShadow =
					"0 4px 12px rgba(0, 0, 0, 0.15)";
				e.currentTarget.style.transform = "scale(1)";
			}}
			onFocus={(e) => {
				e.currentTarget.style.outline = "none";
			}}
			aria-label='Scroll to top'
		>
			<MdKeyboardArrowUp size={28} color='#000' />
		</button>
	);
};

export default ScrollToTopOnly;
