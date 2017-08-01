self.addEventListener('install', function (event) {
  'use strict';
  event.waitUntil(
    caches.open('v1').then(function (cache) {
      console.log("install, opening cache and adding");
      return cache.addAll([
        './',
        './soundboard-hw4-vanilla.html',
        './assets/css/dom.css',
        './assets/js/hw4_javascript.js',
        './assets/json/got.json',
        './assets/json/ram.json',
        './assets/img/gameofthrones/*.jpg',
        './assets/img/rickandmorty/*.jpg'
      ]);
    }).then(function () {
      console.log("install complete");
    })
  );
});
console.log("before fetch");

self.addEventListener('fetch', function(event) {
   console.log("inside fetch");
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      console.log("fetch undefined response");
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        console.log("fetch response cloning");
        let responseClone = response.clone();
        console.log("fetech reponse opening");
        caches.open('v1').then(function (cache) {
          console.log("fetch response putting");
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        console.log('fetch catch');
        return caches.match('/cse134b/assets/img/1_cersei.jpg');
      });
    }
  }));
});