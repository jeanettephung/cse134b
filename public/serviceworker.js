self.addEventListener('install', event => {
  'use strict';

  console.log('installing');
  event.waitUntil(
    caches.open('v1')
      .then(cache => cache.addAll([
         '/soundboard-hw4-vanilla.html',
         '/assets/css/dom.css',
         '/assets/js/hw4_javascript.js',
         '/assets/json/got.json',
         '/assets/json/ram.json',
         '/assets/img/gameofthrones/*.jpg',
         '/assets/img/rickandmorty/*.jpg',
         '/assets/audio/*.wav'
      ]))
  );
  console.log(caches);
  console.log("finish install");
});

self.addEventListener('fetch', event => {
  console.log("fetching");
  const url = new URL(event.request.url);
  console.log("URL: "+url);
  
  if (url.origin == location.origin && url.pathname == '/') {
    console.log("condition met")
    event.respondWith(caches.match('/soundboard-hw4-vanilla.html'));
    return;
  }
  
  console.log("condition not met");
  event.respondWith (
    caches.match(event.request)
      .then (response => response || fetch(event.request))
  );
});