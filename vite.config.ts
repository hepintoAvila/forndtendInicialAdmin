import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: { "process.env": {} },
	build: {
		rollupOptions: {
		external: ['pdfjs-dist/build/pdf.worker.entry'],
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		
	},
});
