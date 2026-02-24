import { useState, useCallback } from "react";
import {
	authenticateUser,
	verifyUser,
	updateUser,
	type UserProfile,
} from "../services/authApi";
import { setAuthToken } from "../services/api";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseAuthReturn {
	// State
	isLoading: boolean;
	isError: boolean;
	error: string | null;
	isOtpSent: boolean;
	isOtpVerified: boolean;
	isNewUser: boolean | null;
	sessionToken: string;
	user: UserProfile | null;

	// Actions
	sendOtpAction: (email: string, captchaToken: string) => Promise<boolean>;
	verifyOtpAction: (email: string, otp: string) => Promise<boolean>;
	completeSignupAction: (fullName: string, mobile: string, email: string) => Promise<boolean>;
	logoutAction: () => void;
	clearError: () => void;
	resetAuth: () => void;
}

// ─── Storage Helpers ──────────────────────────────────────────────────────────

const isBrowser = typeof window !== "undefined";

/** Store the full auth response into localStorage and mark session active. */
const setSession = (
	auth: {
		accessToken: string;
		accessTokenExpiryTime: number;
		refreshToken: string;
		refreshTokenExpiryTime: number;
	},
	email: string,
) => {
	if (!isBrowser) return;
	localStorage.setItem("accessToken", auth.accessToken);
	localStorage.setItem("accessTokenExpiryTime", String(auth.accessTokenExpiryTime));
	localStorage.setItem("refreshToken", auth.refreshToken);
	localStorage.setItem("refreshTokenExpiryTime", String(auth.refreshTokenExpiryTime));
	localStorage.setItem("isLoggedIn", "true");
	localStorage.setItem("authUser", JSON.stringify({ email }));
};

/** Merge name/phone into the stored authUser object after profile creation. */
const mergeUserProfile = (fullName: string, mobile: string, email: string) => {
	if (!isBrowser) return;
	try {
		const existing = JSON.parse(localStorage.getItem("authUser") ?? "{}");
		localStorage.setItem(
			"authUser",
			JSON.stringify({ ...existing, fullName, mobile, email: existing.email || email }),
		);
	} catch {
		localStorage.setItem("authUser", JSON.stringify({ fullName, mobile, email }));
	}
};

const clearSession = () => {
	if (!isBrowser) return;
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExpiryTime");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("refreshTokenExpiryTime");
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
	const [isNewUser, setIsNewUser] = useState<boolean | null>(null);
	const [sessionToken, setSessionToken] = useState("");
	const [user, setUser] = useState<UserProfile | null>(getStoredUser);

	const clearError = useCallback(() => {
		setIsError(false);
		setError(null);
	}, []);

	const resetAuth = useCallback(() => {
		setIsOtpSent(false);
		setIsOtpVerified(false);
		setIsNewUser(null);
		setSessionToken("");
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
				const { item } = res.data;

				// Persist all auth tokens and mark session
				setSession(item.auth, email);
				setAuthToken(item.auth.accessToken);

				// Keep token in React state for immediate use in the signup step
				setSessionToken(item.auth.accessToken);
				setIsOtpVerified(true);

				// isProfileCreated: false → new user who still needs to fill name/phone
				const newUser = !item.isProfileCreated;
				setIsNewUser(newUser);

				// Sync user state from localStorage
				setUser(getStoredUser());

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

	/** Step 3 – Create profile for new users (name + phone) */
	const completeSignupAction = useCallback(
		async (fullName: string, mobile: string, email: string): Promise<boolean> => {
			setIsLoading(true);
			clearError();
			try {
				const token = sessionToken || localStorage.getItem("accessToken") || "";
				await updateUser(
					{ fullName, mobile },
					token && token !== "undefined" ? token : undefined,
				);

				// Merge profile into stored authUser so UI reflects it immediately
				mergeUserProfile(fullName, mobile, email);
				setUser(getStoredUser());

				return true;
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Failed to save profile. Please try again.";
				setIsError(true);
				setError(message);
				return false;
			} finally {
				setIsLoading(false);
			}
		},
		[clearError, sessionToken],
	);

	/** Logout – clear session */
	const logoutAction = useCallback(() => {
		clearSession();
		setAuthToken(null);
		setUser(null);
		setIsOtpSent(false);
		setIsOtpVerified(false);
		setIsNewUser(null);
		setSessionToken("");
	}, []);

	return {
		isLoading,
		isError,
		error,
		isOtpSent,
		isOtpVerified,
		isNewUser,
		sessionToken,
		user,
		sendOtpAction,
		verifyOtpAction,
		completeSignupAction,
		logoutAction,
		clearError,
		resetAuth,
	};
};
