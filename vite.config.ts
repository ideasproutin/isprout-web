import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Temporarily commented out due to ES module compatibility issues
// import vitePluginPrerender from 'vite-plugin-prerender'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [["babel-plugin-react-compiler"]],
			},
		}),
		// Temporarily commented out vitePluginPrerender due to ES module compatibility issues
		// vitePluginPrerender({
		//   staticDir: 'dist',
		//   routes: [
		//     '/',
		//     '/about',
		//     '/managed',
		//     '/awards',
		//     '/virtual-office',
		//     '/meeting-rooms',
		//     '/blogs',
		//     '/careers',
		//     '/testimonials',
		//     '/news',
		//     '/faq',
		//     '/contact',
		//     '/teams',
		//     '/thankyou',
		//     '/city/Hyderabad',
		//     '/city/Bengaluru',
		//     '/city/Chennai',
		//     '/city/Pune',
		//     '/city/Vijayawada',
		//     '/city/Kolkata',
		//     '/city/Ahmedabad',
		//     '/city/Gurugram',
		//     '/city/Visakhapatnam',
		//     '/office/pranava-one',
		//     '/office/jayabheri-trendset-connect',
		//     '/office/sohini-tech-park',
		//     '/office/my-home-twitza',
		//     '/office/divyasree-trinity',
		//     '/office/modern-profound',
		//     '/office/orbit',
		//     '/office/one-golden-mile',
		//     '/office/purva-summit',
		//     '/office/minaas-center',
		//     '/office/sreshta-marvel',
		//     '/office/sas-itower',
		//     '/office/n-r-enclave',
		//     '/office/prestige-saleh-ahmed',
		//     '/office/shilpitha-tech-park',
		//     '/office/jade',
		//     '/office/s-m-tower',
		//     '/office/sigapi-achi-building',
		//     '/office/grey-stone',
		//     '/office/pune-hinjewadi',
		//     '/office/pune-yerwada',
		//     '/office/vijayawada',
		//     '/office/medha-towers-vijayawada',
		//     '/office/managed-office-space-in-kolkata',
		//     '/office/managed-office-space-ahmedabad',
		//     '/office/managed-office-space-gurugram',
		//     '/office/managed-office-space-in-visakhapatnam',
		//   ],
		// })
	],
	server: {
		host: true, // Expose to the network
	},
	resolve: {
		alias: {
			react: path.resolve(__dirname, "node_modules/react"),
			"react-dom": path.resolve(__dirname, "node_modules/react-dom"),
			"react/jsx-runtime": path.resolve(
				__dirname,
				"node_modules/react/jsx-runtime",
			),
			"react/jsx-dev-runtime": path.resolve(
				__dirname,
				"node_modules/react/jsx-dev-runtime",
			),
		},
	},
	optimizeDeps: {
		include: [
			"react",
			"react-dom",
			"react/jsx-runtime",
			"react/jsx-dev-runtime",
			"framer-motion",
		],
	},
});
