import { useState, useCallback } from "react";
import {
	authenticateUser,
	verifyUser,
	type UserProfile,
} from "../services/authApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseAuthReturn {
	// State
	isLoading: boolean;
	isError: boolean;
	error: string | null;
	isOtpSent: boolean;
	isOtpVerified: boolean;
	user: UserProfile | null;

	// Actions
	sendOtpAction: (email: string, captchaToken: string) => Promise<boolean>;
	verifyOtpAction: (email: string, otp: string) => Promise<boolean>;
	logoutAction: () => void;
	clearError: () => void;
	resetAuth: () => void;
}

// ─── Storage Helpers ──────────────────────────────────────────────────────────

const isBrowser = typeof window !== "undefined";

const setSession = (token: string, user?: UserProfile) => {
	if (!isBrowser) return;
	localStorage.setItem("authToken", token);
	if (user) localStorage.setItem("authUser", JSON.stringify(user));
	localStorage.setItem("isLoggedIn", "true");
};

const clearSession = () => {
	if (!isBrowser) return;
	localStorage.removeItem("authToken");
	localStorage.removeItem("authUser");
	localStorage.removeItem("isLoggedIn");
};

const getStoredUser = (): UserProfile | null => {
	if (!isBrowser) return null;
	try {
		const raw = localStorage.getItem("authUser");
		return raw ? (JSON.parse(raw) as UserProfile) : null;
	} catch {
		return null;
	}
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAuth = (): UseAuthReturn => {
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isOtpSent, setIsOtpSent] = useState(false);
	const [isOtpVerified, setIsOtpVerified] = useState(false);
	const [user, setUser] = useState<UserProfile | null>(getStoredUser);

	const clearError = useCallback(() => {
		setIsError(false);
		setError(null);
	}, []);

	const resetAuth = useCallback(() => {
		setIsOtpSent(false);
		setIsOtpVerified(false);
		clearError();
	}, [clearError]);

	/** Step 1 – Call /auth/site/authenticate-user to send OTP */
	const sendOtpAction = useCallback(
		async (email: string, captchaToken: string): Promise<boolean> => {
			if (!email) return false;
			setIsLoading(true);
			clearError();
			try {
				await authenticateUser({ email, mode: "email", captchaToken });
				setIsOtpSent(true);
				return true;
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Failed to send OTP. Please try again.";
				setIsError(true);
				setError(message);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[clearError],
	);

	/** Step 2 – Call /auth/site/verify-user to verify OTP and get token */
	const verifyOtpAction = useCallback(
		async (email: string, otp: string): Promise<boolean> => {
			setIsLoading(true);
			clearError();
			try {
				const res = await verifyUser({ email, otp });
				setIsOtpVerified(true);
				setSession(res.data.token, res.data.user);
				if (res.data.user) setUser(res.data.user);
				return true;
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Invalid OTP. Please try again.";
				setIsError(true);
				setError(message);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[clearError],
	);

	/** Logout – clear session */
	const logoutAction = useCallback(() => {
		clearSession();
		setUser(null);
		setIsOtpSent(false);
		setIsOtpVerified(false);
	}, []);

	return {
		isLoading,
		isError,
		error,
		isOtpSent,
		isOtpVerified,
		user,
		sendOtpAction,
		verifyOtpAction,
		logoutAction,
		clearError,
		resetAuth,
	};
};
