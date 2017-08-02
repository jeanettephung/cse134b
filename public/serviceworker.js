/** Installs service worker and adds assets to cache */
self.addEventListener('install', event => {
  'use strict';
  event.waitUntil(
    caches.open('v1')
      .then(cache => cache.addAll([
        '/soundboard-hw4-vanilla.html',
        '/assets/css/dom.css',
        '/serviceworker.js',
        '/assets/js/hw4_javascript.js',
        '/assets/json/got.json',
        '/assets/json/ram.json',
        '/assets/img/gameofthrones/1_cersei.jpg',
        '/assets/img/gameofthrones/2_tyrion.jpg',
        '/assets/img/gameofthrones/3_nedstark.jpg',
        '/assets/img/gameofthrones/4_tywin.jpg',
        '/assets/img/gameofthrones/5_littlefinger.jpg',
        '/assets/img/gameofthrones/6_theon.jpg',
        '/assets/img/gameofthrones/7_robert.jpg',
        '/assets/img/gameofthrones/8_varys.jpg',
        '/assets/img/gameofthrones/9_jaime.jpg',
        '/assets/img/gameofthrones/10_arya.jpg',
        '/assets/img/gameofthrones/11_natalie.jpg',
        '/assets/img/gameofthrones/12_jon.jpg',
        '/assets/audio/1_enemies.wav',
        '/assets/audio/2_offend.wav',
        '/assets/audio/3_actofwar.wav',
        '/assets/audio/4_clever.wav',
        '/assets/audio/5_startover.wav',
        '/assets/audio/6_mercy.wav',
        '/assets/audio/7_did_right.wav',
        '/assets/audio/8_birds_flown.wav',
        '/assets/audio/9_boring.wav',
        '/assets/audio/10_want_to.wav',
        '/assets/audio/11_go_home.wav',
        '/assets/audio/12_ready_2_help.wav',
        '/assets/img/rickandmorty/1_what_you_got.jpg',
        '/assets/img/rickandmorty/2_luv_dub.jpg',
        '/assets/img/rickandmorty/3_mr_meeseeks.jpg',
        '/assets/img/rickandmorty/4_oh_man.jpg',
        '/assets/img/rickandmorty/5_bitch.jpg',
        '/assets/img/rickandmorty/6_riggity.jpg',
        '/assets/img/rickandmorty/7_what_you_think.jpg',
        '/assets/img/rickandmorty/8_bird_culture.jpg',
        '/assets/img/rickandmorty/9_ricky_ticky.jpg',
        '/assets/img/rickandmorty/10_fu_god.jpg',
        '/assets/img/rickandmorty/11_thank.jpg',
        '/assets/img/rickandmorty/12_summer.jpg',
        '/assets/audio/rickandmorty/1_what_you_got.wav',
        '/assets/audio/rickandmorty/2_woo_vu.wav',
        '/assets/audio/rickandmorty/3_mr_meeseeks.wav',
        '/assets/audio/rickandmorty/4_oh_man.wav',
        '/assets/audio/rickandmorty/5_awww_Bitch.wav',
        '/assets/audio/rickandmorty/6_riggity.wav',
        '/assets/audio/rickandmorty/7_i_dont_give.wav',
        '/assets/audio/rickandmorty/8_in_bird_culture.wav',
        '/assets/audio/rickandmorty/9_ricky_ticky.wav',
        '/assets/audio/rickandmorty/10_yes_fu.wav',
        '/assets/audio/rickandmorty/11_thank_you.wav',
        '/assets/audio/rickandmorty/12_keep_summer.wav',
        '/assets/img/touch/homescreen48.png',
        '/assets/img/touch/homescreen72.png',
        '/assets/img/touch/homescreen96.png',
        '/assets/img/touch/homescreen144.png',
        '/assets/img/touch/homescreen192.png',
        '/assets/img/touch/homescreen512.png',
        '/assets/bootstrap/fonts/glyphicons-halfings-regular.eot',
        '/assets/bootstrap/fonts/glyphicons-halfings-regular.svg',
        '/assets/bootstrap/fonts/glyphicons-halfings-regular.ttf',
        '/assets/bootstrap/fonts/glyphicons-halfings-regular.woff',
        '/assets/bootstrap/fonts/glyphicons-halfings-regular.woff2',
        '/favicon.ico'
      ]))
  );
});

/* Intercepts fetches */
self.addEventListener('fetch', event => {
//  const url = new URL(event.request.url);  
//  if (url.origin == location.origin && url.pathname == '/') {
//    event.respondWith(caches.match('/soundboard-hw4-vanilla.html'));
//    return;
//  }
    event.respondWith (
    caches.match(event.request)
      .then (response => response || fetch(event.request))
  );
});