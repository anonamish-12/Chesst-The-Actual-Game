import { defineConfig } from 'vite';

export default defineConfig({
  root: './public', // Point to public where index.html is
  publicDir: 'public', // Keep assets in public
  build: {
    outDir: '../dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
    // Optional: Force index.html as default
    fs: {
      allow: ['..'], // Allow serving from parent dir if needed
    },
  },
});