import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
	],
	ssr: {
		external: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"react/jsx-dev-runtime",
			"react-dom/server",
			"leaflet",
			"react-leaflet",
			"react-google-recaptcha",
		],
		noExternal: [],
	},
	server: {
		host: true, // Expose to the network
	},
	optimizeDeps: {
		include: ["framer-motion"],
	},
});
