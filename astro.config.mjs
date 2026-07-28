import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import viteCompression from 'vite-plugin-compression';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  compressHTML: true,
  prefetch: true,
  vite: {
    plugins: [
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 1024,
        deleteOriginFile: false,
      }),
      viteCompression({
        algorithm: 'gzip',
        ext: '.gz',
        threshold: 1024,
        deleteOriginFile: false,
      }),
    ],
    server: {
      allowedHosts: ['cursos.neuraljira.tech']
    },
    ssr: {
      // Estas librerías son SOLO para el navegador, no pueden correr en Node/SSR
      external: ['three', '@react-three/fiber', '@react-three/drei', 'gsap']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'framer-motion']
    }
  }
});
