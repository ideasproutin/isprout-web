import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
	createSitePopupQueryKey,
	fetchSitePopup,
} from "../services/sitePopupApi";

const isClient = typeof window !== "undefined";

export const useSitePopup = () => {
	const [isVisible, setIsVisible] = useState(false);

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
	const popupEnabled = query.data?.popup === true && !!popupData;

	useEffect(() => {
		if (!isClient) return;

		if (!popupEnabled || !popupData) {
			return;
		}

		const popupDelaySeconds =
			typeof popupData.popupTime === "number" && popupData.popupTime > 0
				? popupData.popupTime
				: 0;

		const openTimerId = window.setTimeout(() => {
			setIsVisible(true);
		}, 0);

		let closeTimerId: number | null = null;

		if (popupDelaySeconds > 0) {
			closeTimerId = window.setTimeout(() => {
				setIsVisible(false);
			}, popupDelaySeconds * 1000);
		}

		return () => {
			window.clearTimeout(openTimerId);
			if (closeTimerId !== null) {
				window.clearTimeout(closeTimerId);
			}
			setIsVisible(false);
		};
	}, [popupData, popupEnabled]);

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
