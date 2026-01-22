import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/navbar/navbar";
import SubNavbar from "./components/SubNavbar/subnavbar";

function App() {
	const location = useLocation();
	const isCentrePage = location.pathname.startsWith("/centre/");

	// Scroll to top when location changes
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className='bg-transparent'>
			<Navbar />
			{!isCentrePage && <SubNavbar />}
			<Outlet />
		</div>
	);
}

export default App;
