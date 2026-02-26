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
		return raw ? (JSON.parse(raw) as UserProfile) : null;
	} catch {
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

	/** Internal function to fetch profile data */
	const fetchProfileData = useCallback(async () => {
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
		}
	}, []);

	/** Fetch the logged-in user's profile from the API */
	const fetchProfile = useCallback(async () => {
		setIsLoading(true);
		clearMessages();
		try {
			await fetchProfileData();
		} finally {
			setIsLoading(false);
		}
	}, [clearMessages, fetchProfileData]);

	/** Update name / phone */
	const updateProfileAction = useCallback(
		async (payload: UpdateProfileRequest): Promise<boolean> => {
			setIsUpdating(true);
			clearMessages();
			try {
				await updateUser(payload);
				// Refetch profile to get the latest data without showing loading state
				await fetchProfileData();
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
		[clearMessages, fetchProfileData],
	);

	// Auto-fetch on mount if the user is logged in
	useEffect(() => {
		if (
			isBrowser &&
			localStorage.getItem("isLoggedIn") === "true" &&
			localStorage.getItem("accessToken")
		) {
			// Always fetch fresh profile from API on mount
			fetchProfile();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
