import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import {
	createSitePopupQueryKey,
	fetchSitePopup,
} from "../services/sitePopupApi";

const isClient = typeof window !== "undefined";

declare global {
	interface Window {
		__HOME_POPUP_SHOWN__?: boolean;
	}
}

const getGlobalFlag = () => {
	if (!isClient) return false;
	return window.__HOME_POPUP_SHOWN__ === true;
};

const setGlobalFlag = () => {
	if (!isClient) return;
	window.__HOME_POPUP_SHOWN__ = true;
};

export const useSitePopup = () => {
	const [isVisible, setIsVisible] = useState(false);
	const location = useLocation();

	const query = useQuery({
		queryKey: createSitePopupQueryKey(),
		queryFn: fetchSitePopup,
		enabled: isClient,
		staleTime: 1000 * 60 * 10, // 10 minutes
		gcTime: 1000 * 60 * 20, // 20 minutes
		refetchOnWindowFocus: false,
		refetchOnReconnect: true,
	});

	const popupData = query.data?.data ?? null;
	const hasPopupData = Boolean(popupData);
	const popupEnabled = query.data?.popup === true && !!popupData;
	const isHomePage = location.pathname === "/";
	const popupDelaySeconds =
		typeof popupData?.popupTime === "number" && popupData.popupTime > 0
			? popupData.popupTime
			: 0;

	useEffect(() => {
		if (!isClient) return;

		if (!isHomePage || !popupEnabled || !hasPopupData || getGlobalFlag()) {
			return;
		}

		setGlobalFlag();

		const openTimerId = window.setTimeout(() => {
			setIsVisible(true);
		}, 0);

		return () => {
			window.clearTimeout(openTimerId);
		};
	}, [isHomePage, popupEnabled, hasPopupData]);

	useEffect(() => {
		if (!isVisible || popupDelaySeconds <= 0) {
			return;
		}

		const closeTimerId = window.setTimeout(() => {
			setIsVisible(false);
		}, popupDelaySeconds * 1000);

		return () => {
			window.clearTimeout(closeTimerId);
		};
	}, [isVisible, popupDelaySeconds]);

	const dismissPopup = () => {
		setIsVisible(false);
	};

	return {
		...query,
		popupData,
		isVisible,
		dismissPopup,
	};
};
