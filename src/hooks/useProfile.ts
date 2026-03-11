import { useState, useCallback, useEffect } from "react";
import {
	getUser,
	updateUser,
	uploadProfilePicture,
	type UserProfile,
	type UpdateProfileRequest,
} from "../services/profileApi";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UseProfileReturn {
	profile: UserProfile | null;
	isLoading: boolean;
	isUpdating: boolean;
	isUploadingPicture: boolean;
	isError: boolean;
	error: string | null;
	successMessage: string | null;
	fetchProfile: () => Promise<void>;
	updateProfileAction: (payload: UpdateProfileRequest) => Promise<boolean>;
	uploadPictureAction: (file: File) => Promise<boolean>;
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
	// Dispatch custom event to notify other components
	window.dispatchEvent(new CustomEvent("profileUpdated", { detail: user }));
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useProfile = (): UseProfileReturn => {
	const [profile, setProfile] = useState<UserProfile | null>(getStoredUser);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isUploadingPicture, setIsUploadingPicture] = useState(false);
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
				// Preserve locally stored profilePicture if backend doesn't return it yet
				const stored = getStoredUser();
				const merged = {
					...res.data.item,
					profilePicture: res.data.item.profilePicture || stored?.profilePicture,
				};
				setProfile(merged);
				syncStoredUser(merged);
			}
		} catch (err: unknown) {
			// If we already have profile data from localStorage, silently use it
			// and don't show an error banner — the user's info is still visible.
			const storedProfile = getStoredUser();
			if (storedProfile) {
				setProfile(storedProfile);
				return; // swallow the error — cached data is sufficient
			}
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

	/** Upload a new profile picture and patch local profile state with the returned URL */
	const uploadPictureAction = useCallback(
		async (file: File): Promise<boolean> => {
			setIsUploadingPicture(true);
			clearMessages();
			try {
				const res = await uploadProfilePicture(file);
				const url = res.data?.item?.attachmentUrls?.[0];
				if (url) {
					// Persist the picture URL to the backend user record
					await updateUser({ profilePicture: url });
					// Patch local state immediately so UI updates without waiting for refetch
					setProfile((prev) => {
						if (!prev) return prev;
						const updated = { ...prev, profilePicture: url };
						syncStoredUser(updated);
						return updated;
					});
				} else {
					await fetchProfileData();
				}
				setSuccessMessage("Profile picture updated successfully.");
				return true;
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: "Failed to upload profile picture. Please try again.";
				setIsError(true);
				setError(message);
				return false;
			} finally {
				setIsUploadingPicture(false);
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

	// Listen for profile updates from other components
	useEffect(() => {
		if (!isBrowser) return;

		const handleProfileUpdate = (event: CustomEvent<UserProfile>) => {
			setProfile(event.detail);
		};

		window.addEventListener("profileUpdated", handleProfileUpdate as EventListener);

		return () => {
			window.removeEventListener("profileUpdated", handleProfileUpdate as EventListener);
		};
	}, []);

	return {
		profile,
		isLoading,
		isUpdating,
		isUploadingPicture,
		isError,
		error,
		successMessage,
		fetchProfile,
		updateProfileAction,
		uploadPictureAction,
		clearMessages,
	};
};
