import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
        },
        server: {
            port: 5173,
            strictPort: true,
            proxy: {
                "/api": {
                    target: env.VITE_BACKEND_URL ?? "http://localhost:8080",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (p) => p.replace(/^\/api/, ""),
                },
            },
        },
        build: {
            target: "es2020",
            sourcemap: true,
            outDir: "dist",
            emptyOutDir: true,
        },
        define: { __APP_VERSION__: JSON.stringify(process.env.npm_package_version) },
    };
});
