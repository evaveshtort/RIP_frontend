import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dest_root } from "./src/target_config";
// import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
// import fs from 'fs';
// import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    // https:{
    //   key: fs.readFileSync(path.resolve(__dirname, '../../cert/cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '../../cert/cert.crt')),
    // },
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
        secure: false,
      },
      "/minio": {
        target: "http://localhost:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/minio/, "/")
      }
    },
   },
  plugins: [react(), VitePWA({ registerType: 'autoUpdate', devOptions: {
    enabled: true,
  }, 
  manifest: {
    "name": "Statistician",
    "short_name": "Statistician",
    "start_url": "/statistician-frontend/",
    "display": "standalone",
    "background_color": "#fefefe",
    "theme_color": "#910ed8",
    "orientation": "portrait-primary",
    "icons": [
        {
        "src": "./icon2.png",
        "type": "image/png", "sizes": "192x192"
        },
        {
        "src": "./icon.png",
        "type": "image/png", "sizes": "512x512"
        }
    ]
    }})],
  base: dest_root
})