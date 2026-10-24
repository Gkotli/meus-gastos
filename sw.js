/* Service worker — Meus Gastos
   Estratégia: abre instantaneamente a versão guardada (funciona offline) e,
   em segundo plano, baixa a versão mais nova para a próxima abertura.
   Ao publicar uma atualização, aumente o número de CACHE para forçar a troca. */
const CACHE = 'gastos-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const network = fetch(req)
    .then(async res => {
      if (res && res.ok) { const c = await caches.open(CACHE); await c.put(req, res.clone()); }
      return res;
    })
    .catch(() => null);
  event.waitUntil(network);

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return network.then(res => {
        if (res) return res;
        if (req.mode === 'navigate') return caches.match('./index.html');
        return null;
      });
    }).then(r => r || new Response('Sem conexão', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }))
  );
});
