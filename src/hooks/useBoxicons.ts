import { useEffect } from "react";

const BOXICONS_URL =
	"https://cdn.jsdelivr.net/npm/boxicons@2.1.4/css/boxicons.min.css";
const LINK_ID = "boxicons-css";

/**
 * Dynamically injects the Boxicons stylesheet the first time a component
 * that needs icons mounts.  Subsequent calls are no-ops because the link
 * element is identified by its id and won't be added twice.
 *
 * Keeping the load out of index.html avoids a render-blocking request on
 * every page even though Boxicons is only used on auth / dashboard /
 * meeting-rooms.
 */
export const useBoxicons = () => {
	useEffect(() => {
		if (typeof document === "undefined") return;
		if (document.getElementById(LINK_ID)) return;

		const link = document.createElement("link");
		link.id = LINK_ID;
		link.rel = "stylesheet";
		link.href = BOXICONS_URL;
		document.head.appendChild(link);
	}, []);
};
