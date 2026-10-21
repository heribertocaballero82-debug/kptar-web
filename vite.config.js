import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

const cleanRoutesMiddleware = (req, _res, next) => {
  if (!req.url) return next();
  const [pathname, query] = req.url.split('?');
  const suffix = query ? `?${query}` : '';

  if (pathname === '/privacy' || pathname === '/politica-de-privacidad') {
    req.url = `/privacy.html${suffix}`;
  } else if (pathname === '/terms' || pathname === '/terminos-del-servicio') {
    req.url = `/terms.html${suffix}`;
  }
  next();
};

export default defineConfig({
  plugins: [
    {
      name: 'kptar-clean-legal-routes',
      configureServer(server) {
        server.middlewares.use(cleanRoutesMiddleware);
      },
      configurePreviewServer(server) {
        server.middlewares.use(cleanRoutesMiddleware);
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        terms: resolve(__dirname, 'terms.html'),
      },
    },
  },
});
