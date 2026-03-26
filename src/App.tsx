import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import SubNavbar from "./components/SubNavbar/subnavbar";
import { Toaster } from "react-hot-toast";
import SitePopup from "./components/SitePopup/SitePopup";
import { useSitePopup } from "./hooks/useSitePopup";

function App() {
	const location = useLocation();
	const isCentrePage = location.pathname.startsWith("/office/") && !location.pathname.includes("/thankyou");
	const isHomePage = location.pathname === "/";
	const { popupData, isVisible, dismissPopup } = useSitePopup();

	// Scroll to top when location changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className='bg-transparent'>
			<Navbar />
			{!isCentrePage && <SubNavbar />}
			<main>
				<Outlet />
			</main>
			<SitePopup
				isOpen={isHomePage && isVisible}
				onClose={dismissPopup}
				popupData={popupData}
			/>
			<Toaster
				position='top-right'
				toastOptions={{
					duration: 3000,
					style: {
						fontFamily: "Outfit, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
						fontWeight: "500",
					},
				}}
			/>
		</div>
	);
}

export default App;
