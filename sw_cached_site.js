const cacheName = 'v2';

// check 'install' event
self.addEventListener('install', evt => {
  console.log('sw installed');
});

// check 'activate' evt
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys()
      .then(cacheNames => {
        cacheNames.forEach(n => {
          if(n !== cacheName){
            caches.delete(n);
          }
        })
      })
  );
  
  console.log('sw activated');
});

// check 'fetch' event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request)
      .then(res => {
        const clone = res.clone();
        caches.open(cacheName)
          .then(cache => {
            cache.put(evt.request, clone);
          });
        return res;
      })
      .catch(() => caches.match(evt.request)
        .then(res => res))
  );
  
  console.log('sw fetch');
});
