import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import http from 'http';

function dynamicSeoPlugin() {
  return {
    name: 'dynamic-html-seo',
    async transformIndexHtml(html, ctx) {
      try {
        const rawUrl = (ctx?.originalUrl || ctx?.url || '/').split('?')[0];
        let pageKey = 'home';
        if (rawUrl === '/' || rawUrl === '') {
          pageKey = 'home';
        } else {
          pageKey = rawUrl.replace(/^\/+/, '').split('/')[0] || 'home';
        }

        // Fetch latest SEO metadata from local backend API
        const seo = await new Promise((resolve) => {
          const req = http.get(`http://localhost:5000/api/seo/page/${pageKey}`, (res) => {
            let data = '';
            res.on('data', chunk => { data += chunk; });
            res.on('end', () => {
              try {
                const json = JSON.parse(data);
                resolve(json?.success ? json.data : null);
              } catch {
                resolve(null);
              }
            });
          });
          req.on('error', () => resolve(null));
          req.setTimeout(1500, () => {
            req.destroy();
            resolve(null);
          });
        });

        if (seo) {
          if (seo.title) {
            html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);
          }
          if (seo.description) {
            if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
              html = html.replace(/<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${seo.description}" />`);
            } else {
              html = html.replace(/<\/head>/i, `    <meta name="description" content="${seo.description}" />\n  </head>`);
            }
          }
          if (seo.keywords) {
            if (/<meta\s+name=["']keywords["'][^>]*>/i.test(html)) {
              html = html.replace(/<meta\s+name=["']keywords["'][^>]*>/i, `<meta name="keywords" content="${seo.keywords}" />`);
            } else {
              html = html.replace(/<\/head>/i, `    <meta name="keywords" content="${seo.keywords}" />\n  </head>`);
            }
          }
          if (seo.robots) {
            if (/<meta\s+name=["']robots["'][^>]*>/i.test(html)) {
              html = html.replace(/<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${seo.robots}" />`);
            }
          }
          if (seo.canonicalUrl) {
            if (/<link\s+rel=["']canonical["'][^>]*>/i.test(html)) {
              html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${seo.canonicalUrl}" />`);
            }
          }
        }
      } catch (err) {
        // Fallback to static html
      }

      return html;
    }
  };
}

export default defineConfig({
  plugins: [react(), dynamicSeoPlugin()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
