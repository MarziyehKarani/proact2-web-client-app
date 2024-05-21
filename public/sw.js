

const CACHE_NAME='proact2-dev-cache';
const PRE_CACHED_RESOURCES = ["/","index.html"];

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

self.addEventListener('active', event => {
    console.log('activating service worker!!');
    event.waitUntil(
    self.clients.claim()
    );
})


self.addEventListener('fetch', function (event) {

    if (event.request.method === 'POST' || (event.request.method === 'GET' && event.request.url.indexOf('Users/me') == -1)) {
        event.respondWith(fetch(event.request));
        return;
    }

    if (event.request.method === 'GET') {

        if(navigator.onLine){
            var fetchRequest=event.request.clone();
            return fetch(fetchRequest).then(
                function(response){
                    if(!response || response.status !== 200 || response.type!== 'basic'){
                        return response;
                    }
    
                    var responseToCache= response.clone();
    
                    caches.open(CACHE_NAME)
                    .then(function(cache){
                        cache.put(event.request,responseToCache);
                    });
    
                    return response
                }
            )
    
        }  else {
            event.respondWith(
                caches.open(CACHE_NAME).then(function (cache) {
                  return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                      cache.put(event.request, response.clone());
                      return response;
                    });
                  });
                })
            
              );
        }
    }
  });


/* self.addEventListener('fetch', function(event) {
    console.log(`fetching ${event.request.url}`);
    // Exclude POST requests from caching
    if (event.request.method === 'POST') {
        event.respondWith(fetch(event.request));
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then(function(response) {
         
            // Cache hit - return response
            if (response) {
                return response;
            }
            // Clone the request to make a fetch
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(function(response) {
                // Check if we received a valid response
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                // Clone the response to put it in cache
                var responseToCache = response.clone();
                caches.open(CACHE_NAME).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                return response;
            }); 
        })
    );
}); */

/* self.addEventListener('fetch',function(event){
    console.log('fetching ${event.request.url}');
    if(navigator.onLine){
        var fetchRequest=event.request.clone();
        return fetch(fetchRequest).then(
            function(response){
                if(!response || response.status !== 200 || response.type!== 'basic'){
                    return response;
                }

                var responseToCache= response.clone();

                caches.open(CACHE_NAME)
                .then(function(cache){
                    cache.put(event.request,responseToCache);
                });

                return response
            }
        )

    }  else {
        event.respondwith(
            caches.match(event.request)
            .then(function(response){

                if(response){
                    return response;
                }
            })
        );
    }
}); */