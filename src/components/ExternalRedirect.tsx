import { useEffect } from "react";

type ExternalRedirectProps = {
	url: string;
};

export default function ExternalRedirect({ url }: ExternalRedirectProps) {
	useEffect(() => {
		if (typeof window !== "undefined") {
			window.location.replace(url);
		}
	}, [url]);

	return null;
}
