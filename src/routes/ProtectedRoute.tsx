import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../pages/auth/auth";
import {
	AUTH_UNAUTHORIZED_EVENT,
	hasValidSession,
} from "../utils/authSession";

type ProtectedRouteProps = {
	children: React.ReactElement;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
	const navigate = useNavigate();
	const [authed, setAuthed] = useState(hasValidSession);

	useEffect(() => {
		const handleUnauthorized = () => setAuthed(false);
		window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
		window.addEventListener("storage", handleUnauthorized);
		return () => {
			window.removeEventListener(
				AUTH_UNAUTHORIZED_EVENT,
				handleUnauthorized,
			);
			window.removeEventListener("storage", handleUnauthorized);
		};
	}, []);

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
