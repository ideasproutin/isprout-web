import React, { useState, useEffect } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import "./ScrollToTop.css";

const ScrollToTop: React.FC = () => {
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setShowButtons(true);
			} else {
				setShowButtons(false);
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

	const handleCall = () => {
		window.location.href = "tel:+91-XXXXXXXXXX";
	};

	const handleWhatsApp = () => {
		window.open("https://wa.me/91XXXXXXXXXX", "_blank");
	};

	if (!showButtons) return null;

	return (
		<div className='scroll-to-top-container'>
			{/* Phone Button */}
			<button
				className='scroll-button-phone'
				onClick={handleCall}
				onFocus={(e) => {
					e.currentTarget.style.outline = "none";
					e.currentTarget.style.border = "none";
					e.currentTarget.style.boxShadow = "none";
				}}
				aria-label='Call us'
			>
				<FaPhone
					size={24}
					color='#fff'
					style={{ transform: "rotate(90deg)" }}
				/>
			</button>

			{/* WhatsApp Button */}
			<button
				className='scroll-button-whatsapp'
				onClick={handleWhatsApp}
				onFocus={(e) => {
					e.currentTarget.style.outline = "none";
					e.currentTarget.style.border = "none";
					e.currentTarget.style.boxShadow = "none";
				}}
				aria-label='Message on WhatsApp'
			>
				<FaWhatsapp size={28} color='#fff' />
			</button>

			{/* Scroll to Top Button */}
			<button
				className='scroll-button-top'
				onClick={scrollToTop}
				onFocus={(e) => {
					e.currentTarget.style.outline = "none";
					e.currentTarget.style.border = "none";
					e.currentTarget.style.boxShadow = "none";
				}}
				aria-label='Scroll to top'
				style={{
					borderRadius: "50%",
					width: "56px",
					height: "56px",
					minWidth: "56px",
					minHeight: "56px",
					maxWidth: "56px",
					maxHeight: "56px",
				}}
			>
				<MdKeyboardArrowUp size={28} color='#000' />
			</button>
		</div>
	);
};

export default ScrollToTop;
