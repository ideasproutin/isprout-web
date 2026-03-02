const AUTH_KEYS = {
	accessToken: "accessToken",
	accessTokenExpiryTime: "accessTokenExpiryTime",
	refreshToken: "refreshToken",
	refreshTokenExpiryTime: "refreshTokenExpiryTime",
	isLoggedIn: "isLoggedIn",
	userData: "userData",
	authUser: "authUser",
} as const;

export const AUTH_UNAUTHORIZED_EVENT = "auth:unauthorized";

const isBrowser = typeof window !== "undefined";

const normalizeEpochMs = (value: number) => {
	if (value <= 0) return 0;
	return value < 1_000_000_000_000 ? value * 1000 : value;
};

export const getAccessToken = () => {
	if (!isBrowser) return null;
	return localStorage.getItem(AUTH_KEYS.accessToken);
};

export const isAccessTokenExpired = () => {
	if (!isBrowser) return true;
	const rawExpiry = localStorage.getItem(AUTH_KEYS.accessTokenExpiryTime);
	if (!rawExpiry) return false;
	const parsedExpiry = Number(rawExpiry);
	if (!Number.isFinite(parsedExpiry)) return false;
	const expiryMs = normalizeEpochMs(parsedExpiry);
	if (!expiryMs) return false;
	return Date.now() >= expiryMs - 30_000;
};

export const hasValidSession = () => {
	if (!isBrowser) return false;
	const token = getAccessToken();
	const loggedIn = localStorage.getItem(AUTH_KEYS.isLoggedIn) === "true";
	return Boolean(token) && loggedIn && !isAccessTokenExpired();
};

export const clearAuthSession = () => {
	if (!isBrowser) return;
	Object.values(AUTH_KEYS).forEach((key) => localStorage.removeItem(key));
};

export const emitUnauthorized = (reason = "Unauthorized") => {
	if (!isBrowser) return;
	window.dispatchEvent(
		new CustomEvent(AUTH_UNAUTHORIZED_EVENT, {
			detail: { reason },
		}),
	);
};

export const getAuthHeaders = (token = getAccessToken()) => {
	if (!token) return {};
	return {
		"X-Auth-Token": token,
		Authorization: `Bearer ${token}`,
	};
};
