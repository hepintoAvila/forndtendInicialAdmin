import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
    proxy: {
      // Proxy específico para tu API
      '/api2025': {
        target: 'https://biblioteca.unicesar.edu.co',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api2025/, '/api2025'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying to:', proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Response status:', proxyRes.statusCode);
          });
        }
      }
    }
  	},
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


 