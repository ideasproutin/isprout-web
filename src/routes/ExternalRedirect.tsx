import { useEffect } from "react";

type ExternalRedirectProps = {
	url: string;
};

const ExternalRedirect = ({ url }: ExternalRedirectProps) => {
	useEffect(() => {
		window.location.href = url;
	}, [url]);

	return null;
};

export default ExternalRedirect;
