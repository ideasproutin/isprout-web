import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../pages/auth/auth";

type ProtectedRouteProps = {
	children: React.ReactElement;
};

const isAuthenticated = () => {
	if (typeof window === "undefined") return false;
	const token = localStorage.getItem("accessToken");
	const loggedIn = localStorage.getItem("isLoggedIn") === "true";
	return Boolean(token) && loggedIn;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const [authed, setAuthed] = useState(isAuthenticated);

	if (authed) {
		return children;
	}

	return (
		<AuthModal
			isOpen={true}
			onClose={() => navigate("/")}
			onLoginSuccess={() => setAuthed(true)}
			redirectToDashboard={false}
		/>
	);
};

export default ProtectedRoute;
