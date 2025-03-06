

 const CACHE_NAME_toRemove='proact2-dev-cache';
const PRE_CACHED_RESOURCES = ["offline.html","index.html"]; 

const OFFLINE_VERSION = 1;
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

self.addEventListener('install', e => {
  console.log('installing service worker!!');
  e.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
          return cache.addAll(
              PRE_CACHED_RESOURCES
            )
          .then(() => self.skipWaiting());
      })
  )
})

  self.addEventListener("activate", (event) => {
    console.log('activating service worker!!');
    caches.delete(CACHE_NAME_toRemove);

    event.waitUntil(
    self.clients.claim()
    );
  });


  self.addEventListener("fetch", (event) => {
    // Only call event.respondWith() if this is a navigation request
    // for an HTML page.
    if (event.request.mode === "navigate") {
      event.respondWith(
        (async () => {
          try {
            // First, try to use the navigation preload response if it's
            // supported.
/*             const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            } */
  
            // Always try the network first.
            const networkResponse = await fetch(event.request);
            return networkResponse;
          } catch (error) {
            // catch is only triggered if an exception is thrown, which is
            // likely due to a network error.
            // If fetch() returns a valid HTTP response with a response code in
            // the 4xx or 5xx range, the catch() will NOT be called.
            console.log("Fetch failed; returning offline page instead.", error);
  
            const cache = await caches.open(CACHE_NAME);
            const cachedResponse = await cache.match(OFFLINE_URL);
            return cachedResponse;
          }
        })()
      );
    }
  
    // If our if() condition is false, then this fetch handler won't
    // intercept the request. If there are any other fetch handlers
    // registered, they will get a chance to call event.respondWith().
    // If no fetch handlers call event.respondWith(), the request
    // will be handled by the browser as if there were no service
    // worker involvement.
  });




/* self.addEventListener('install', e => {
    console.log('installing service worker!!');
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(
                PRE_CACHED_RESOURCES
              )
            .then(() => self.skipWaiting());
        })
    )
}) */

/* self.addEventListener('active', event => {
    console.log('activating service worker!!');
    event.waitUntil(
    self.clients.claim()
    );
}) */




  

    /* self.addEventListener('fetch', async (event) => {
        const { request } = event;
    
        // Handle POST requests and specific GET requests immediately
        if (request.method != 'GET' || (request.method === 'GET' && request.url.includes('Users/me') && request.url.includes('UserAgreement/me')  )) {
            event.respondWith(fetch(request));
            return;
        }
    
        // Handle GET requests with caching
        else if (request.method === 'GET') {
            if (navigator.onLine) {
                try {
                    const response = await fetch(request);
                    if (response && response.ok && response.type === 'basic') {
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                         cache.put(request, responseToCache);
                        });
                    }
                    return response;
                } catch (error) {
                    console.error('Fetch failed:', error);
                    
                }
            } else {
                try {
                    const cache = await caches.open(CACHE_NAME);
                    let response = await cache.match(request);
                    if (!response) {
                        response = await fetch(request);
                        if (response && response.status === 200 && response.type === 'basic') {
                            const responseToCache = response.clone();
                            await cache.put(request, responseToCache);
                        }
                    }
                    return response;
                } catch (error) {
                    console.error('Cache or network fetch failed:', error);
                    // Optionally return a fallback response here
                }
            }
        }
    }); */
    



