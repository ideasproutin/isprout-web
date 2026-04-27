import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
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
	build: {
		rollupOptions: {
			output: {
				// manualChunks only applies to the client build.
				// The SSR build externalises react/react-dom, so including them
				// in manualChunks there would cause a Rollup error.
				...(isSsrBuild
					? {}
					: {
							manualChunks: {
								"vendor-react": ["react", "react-dom"],
								"vendor-router": [
									"react-router",
									"react-router-dom",
								],
								"vendor-query": ["@tanstack/react-query"],
								"vendor-framer": ["framer-motion"],
								"vendor-maps": [
									"leaflet",
									"react-leaflet",
									"@react-google-maps/api",
									"@vis.gl/react-google-maps",
									"google-map-react",
								],
								"vendor-icons": ["react-icons", "lucide-react"],
								"vendor-auth": ["@react-oauth/google"],
								"vendor-misc": [
									"axios",
									"zod",
									"react-hot-toast",
								],
							},
						}),
			},
		},
	},
}));
