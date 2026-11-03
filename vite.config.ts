import {copyFileSync, mkdirSync, writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

// Keep in sync with `routes` in src/content.ts.
const ROUTES = ['rooms', 'the-inn', 'explore', 'contact'];

/**
 * The site routes on the client, but a visitor can land on /rooms directly.
 * Copying the built index.html into each route's folder lets any static host
 * serve those deep links without rewrite rules.
 */
function routeShells(): Plugin {
  return {
    name: 'route-shells',
    apply: 'build',
    closeBundle() {
      const dist = resolve(__dirname, 'dist');
      for (const r of ROUTES) {
        mkdirSync(resolve(dist, r), {recursive: true});
        copyFileSync(resolve(dist, 'index.html'), resolve(dist, r, 'index.html'));
      }
      // GitHub Pages serves 404.html for unknown paths; the app shows its own "Wrong door" page.
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'));
      writeFileSync(resolve(dist, '.nojekyll'), '');
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), routeShells()],
  build: {
    target: 'es2020',
  },
});
