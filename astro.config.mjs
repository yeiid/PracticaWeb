import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  vite: {
    ssr: {
      // Estas librerías son SOLO para el navegador, no pueden correr en Node/SSR
      external: ['three', '@react-three/fiber', '@react-three/drei', 'gsap']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'framer-motion']
    }
  }
});
