import { useState, useCallback, useEffect } from "react";
import {
	getUser,
	updateUser,
	type UserProfile,
	type UpdateProfileRequest,
} from "../services/profileApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseProfileReturn {
	profile: UserProfile | null;
	isLoading: boolean;
	isUpdating: boolean;
	isError: boolean;
	error: string | null;
	successMessage: string | null;
	fetchProfile: () => Promise<void>;
	updateProfileAction: (payload: UpdateProfileRequest) => Promise<boolean>;
	clearMessages: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const isBrowser = typeof window !== "undefined";

const getStoredUser = (): UserProfile | null => {
	if (!isBrowser) return null;
	try {
		const raw = localStorage.getItem("authUser");
		const user = raw ? (JSON.parse(raw) as UserProfile) : null;
		console.log("[useProfile] getStoredUser from localStorage:", user);
		return user;
	} catch (err) {
		console.error("[useProfile] Failed to parse authUser from localStorage:", err);
		return null;
	}
};

const syncStoredUser = (user: UserProfile) => {
	if (!isBrowser) return;
	localStorage.setItem("authUser", JSON.stringify(user));
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useProfile = (): UseProfileReturn => {
	const [profile, setProfile] = useState<UserProfile | null>(getStoredUser);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const clearMessages = useCallback(() => {
		setIsError(false);
		setError(null);
		setSuccessMessage(null);
	}, []);

	/** Fetch the logged-in user's profile from the API */
	const fetchProfile = useCallback(async () => {
		setIsLoading(true);
		clearMessages();
		try {
			const res = await getUser();
			if (res.data?.item) {
				setProfile(res.data.item);
				syncStoredUser(res.data.item);
			}
		} catch (err: unknown) {
			const message =
				err instanceof Error
					? err.message
					: "Failed to load profile. Please try again.";
			setIsError(true);
			setError(message);
		} finally {
			setIsLoading(false);
		}
	}, [clearMessages]);

	/** Update name / phone */
	const updateProfileAction = useCallback(
		async (payload: UpdateProfileRequest): Promise<boolean> => {
			setIsUpdating(true);
			clearMessages();
			try {
				const res = await updateUser(payload);
				if (res.data) {
					setProfile(res.data);
					syncStoredUser(res.data);
				}
				setSuccessMessage("Profile updated successfully.");
				return true;
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Failed to update profile. Please try again.";
				setIsError(true);
				setError(message);
				return false;
			} finally {
				setIsUpdating(false);
			}
		},
		[clearMessages],
	);

	// Auto-fetch on mount if the user is logged in
	useEffect(() => {
		console.log("[useProfile] Mount effect - profile state:", profile);
		
		if (
			isBrowser &&
			localStorage.getItem("isLoggedIn") === "true" &&
			localStorage.getItem("authToken")
		) {
			// Only fetch from API if we don't have profile data or it's incomplete
			if (!profile || !profile.fullName || !profile.email) {
				console.log("[useProfile] Profile incomplete, fetching from API...");
				fetchProfile();
			} else {
				console.log("[useProfile] Profile data already loaded from localStorage, skipping API fetch");
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);  // Only run on mount, profile is already initialized from localStorage

	return {
		profile,
		isLoading,
		isUpdating,
		isError,
		error,
		successMessage,
		fetchProfile,
		updateProfileAction,
		clearMessages,
	};
};
