import { useEffect } from "react";
import ManagedOffice from "../pages/managedoffice/managedoffice";

export default function ManagedOfficeLegacyRoute() {
	useEffect(() => {
		window.location.replace("/managed-office-space/");
	}, []);

	return <ManagedOffice />;
}
