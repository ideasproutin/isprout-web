import { useState, useCallback } from "react";
import { authenticateUser, verifyUser } from "../services/authApi";
import { updateUser, type UserProfile } from "../services/profileApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseAuthReturn {
	// State
	isLoading: boolean;
	isError: boolean;
	error: string | null;
	isOtpSent: boolean;
	isOtpVerified: boolean;
	isProfileCreated: boolean | null;
	user: UserProfile | null;

	// Actions
	sendOtpAction: (
		email: string,
		captchaToken: string,
		mode: string,
	) => Promise<boolean>;
	verifyOtpAction: (
		email: string,
		otp: string,
		mode: string,
	) => Promise<{ success: boolean; isProfileCreated?: boolean }>;
	completeSignupAction: (
		fullName: string,
		mobile: string,
		email: string,
	) => Promise<boolean>;
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
	userId: string,
) => {
	if (!isBrowser) return;
	localStorage.setItem("accessToken", auth.accessToken);
	localStorage.setItem(
		"accessTokenExpiryTime",
		String(auth.accessTokenExpiryTime),
	);
	localStorage.setItem("refreshToken", auth.refreshToken);
	localStorage.setItem(
		"refreshTokenExpiryTime",
		String(auth.refreshTokenExpiryTime),
	);
	localStorage.setItem("isLoggedIn", "true");
	localStorage.setItem("userData", JSON.stringify({ email, userId }));
	if (typeof window !== "undefined") {
		window.dispatchEvent(new Event("auth:stateChanged"));
	}
};

/** Merge name/phone into the stored userData object after profile creation. */
const mergeUserProfile = (fullName: string, mobile: string, email: string) => {
	if (!isBrowser) return;
	try {
		const existing = JSON.parse(localStorage.getItem("userData") ?? "{}");
		localStorage.setItem(
			"userData",
			JSON.stringify({
				...existing,
				fullName,
				mobile,
				email: existing.email || email,
			}),
		);
	} catch {
		localStorage.setItem(
			"userData",
			JSON.stringify({ fullName, mobile, email }),
		);
	}
};

const clearSession = () => {
	if (!isBrowser) return;
	localStorage.removeItem("accessToken");
	localStorage.removeItem("accessTokenExpiryTime");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("refreshTokenExpiryTime");
	localStorage.removeItem("userData");
	localStorage.removeItem("isLoggedIn");
	window.dispatchEvent(new Event("auth:stateChanged"));
};

const getStoredUser = (): UserProfile | null => {
	if (!isBrowser) return null;
	try {
		const raw = localStorage.getItem("userData");
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
	const [isProfileCreated, setIsProfileCreated] = useState<boolean | null>(
		null,
	);
	const [user, setUser] = useState<UserProfile | null>(getStoredUser);

	const clearError = useCallback(() => {
		setIsError(false);
		setError(null);
	}, []);

	const resetAuth = useCallback(() => {
		setIsOtpSent(false);
		setIsOtpVerified(false);
		setIsProfileCreated(null);
		clearError();
	}, [clearError]);

	/** Step 1 – Call /auth/site/authenticate-user to send OTP */
	const sendOtpAction = useCallback(
		async (
			email: string,
			captchaToken: string,
			mode: string,
		): Promise<boolean> => {
			if (!email) return false;
			setIsLoading(true);
			clearError();
			try {
				await authenticateUser({ email, mode, captchaToken });
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
		async (
			email: string,
			otp: string,
			mode: string,
		): Promise<{ success: boolean; isProfileCreated?: boolean }> => {
			setIsLoading(true);
			clearError();
			try {
				const res = await verifyUser({ email, otp, mode });
				const { item } = res.data;

				setSession(item.auth, email, item.userId);
				setIsOtpVerified(true);

				// Store isProfileCreated status from backend
				// false → new user who needs to complete signup
				// true → existing user with profile
				setIsProfileCreated(item.isProfileCreated);

				// Sync user state from localStorage
				setUser(getStoredUser());

				// Return the value immediately so component can use it
				return {
					success: true,
					isProfileCreated: item.isProfileCreated,
				};
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Invalid OTP. Please try again.";
				setIsError(true);
				setError(message);
				return { success: false };
			} finally {
				setIsLoading(false);
			}
		},
		[clearError],
	);

	/** Step 3 – Create profile for new users (name + phone) */
	const completeSignupAction = useCallback(
		async (
			fullName: string,
			mobile: string,
			email: string,
		): Promise<boolean> => {
			setIsLoading(true);
			clearError();
			try {
				const res = await updateUser({ fullName, mobile });

				console.log("✅ Profile updated successfully");

				// Store the complete user profile from API response
				if (res.data) {
					localStorage.setItem("userData", JSON.stringify(res.data));
					setUser(res.data);
				} else {
					// Fallback: merge profile manually if response structure is different
					mergeUserProfile(fullName, mobile, email);
					setUser(getStoredUser());
				}

				return true;
			} catch (err: unknown) {
				console.error("❌ Signup error:", err);
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
		[clearError],
	);

	/** Logout – clear session */
	const logoutAction = useCallback(() => {
		clearSession();
		setUser(null);
		setIsOtpSent(false);
		setIsOtpVerified(false);
		setIsProfileCreated(null);
	}, []);

	return {
		isLoading,
		isError,
		error,
		isOtpSent,
		isOtpVerified,
		isProfileCreated,
		user,
		sendOtpAction,
		verifyOtpAction,
		completeSignupAction,
		logoutAction,
		clearError,
		resetAuth,
	};
};
