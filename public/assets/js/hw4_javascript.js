/** Creates namespace 
 *  @namespace 
 */
var GUCCI = {};
  
/** Sets up dropdown/toggle elements, requests data, generates soundboard */
window.onload = function () {
  'use strict';
  GUCCI.numAudioRdy = 0;  // tracks number of audios ready
  GUCCI.objInform = document.getElementById('inform');  // modal object that displays status to end users
  GUCCI.funcSetup();
  GUCCI.funcRequestJSON('./assets/json/got.json', true);
  GUCCI.funcRequestJSON('./assets/json/ram.json', false);
  GUCCI.funcWait();
  GUCCI.funcIE();

  /* Checks every 5 seconds if user is online and warns user if offline */
  setInterval(function () {
    if (!window.navigator.onLine) {
      GUCCI.funcModal('You are disconnected.');
    }
  }, 5000);
};

/** Checks if browser is IE and informs user that soundboard is unsupported */
GUCCI.funcIE = function () {
  'use strict';
  GUCCI.boolIsIE = /*@cc_on!@*/false || !!document.documentMode;
  if (GUCCI.boolIsIE) {
    GUCCI.funcModal('Soundboard not supported in your browser');
  }
};

/** Displays modal with current status 
 *  @param {string} message
 *     Message displayed to end users
 */
GUCCI.funcModal = function (message) {
  "use strict";
  GUCCI.objInform.classList.remove('hide');
  GUCCI.objInform.getElementsByTagName('h4')[0].textContent = message;
};

/** Set up toggle and dropdowns */
GUCCI.funcSetup = function () {
  'use strict';
  // Toggle for compact/full view
  document.getElementById('toggle').addEventListener('click', function () {
    document.getElementsByTagName('body')[0].classList.toggle('compact');
    document.querySelector('.dropdown span.glyphicon').classList.toggle('glyphicon-expand');
    document.querySelector('.dropdown span.glyphicon').classList.toggle('glyphicon-compact');
  });
  // Dropdown for dark/lite theme
  document.getElementById('theme').addEventListener('change', function () {
    document.getElementsByTagName('body')[0].classList.toggle('dark');
  });
  // Dropdown for soundboards
  document.getElementById('sb').addEventListener('change', function () {
    GUCCI.sounds = document.getElementsByClassName('sound');
    for (GUCCI.i = 0; GUCCI.i < GUCCI.sounds.length; GUCCI.i += 1) {
      GUCCI.sounds[GUCCI.i].classList.toggle('hide');
    }
    if (document.getElementById('sb').value === 'got') {
      document.getElementById('title').textContent = 'Game of Thrones';
    } else {
      document.getElementById('title').textContent = 'Rick and Morty';
    }
  });
};

/** Send request to get soundboard data then generates soundboard */
GUCCI.funcRequestJSON = function (url, display) {
  'use strict';
  GUCCI.objXmlhttp = new XMLHttpRequest();
  GUCCI.objXmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      GUCCI.data = JSON.parse(this.responseText);
      GUCCI.funcGenSB(GUCCI.data, display);
    } else if (this.status === 404) {
      GUCCI.funcModal('Soundboard not found.');
    } else if (this.status === 500) {
      GUCCI.funcModal('Unable to get soundboard due to server problems.');
    }
  };
  GUCCI.objXmlhttp.open('GET', url, true);
  GUCCI.objXmlhttp.send(null);
};

/** Generates soundboard image, audio, and events */
GUCCI.funcGenSB = function (data, display) {
  'use strict';
  GUCCI.curRow = 0;
  GUCCI.numPerRow = 0;
  GUCCI.template = document.getElementById('sound');
  GUCCI.rows = document.getElementsByClassName('row');
  GUCCI.classes = GUCCI.template.content.querySelector('div').classList;
  if (display) {
    GUCCI.classes.add('got');
  } else {
    GUCCI.classes.remove('got');
    GUCCI.classes.add('ram', 'hide');
  }
  for (GUCCI.i = 0; GUCCI.i < GUCCI.data.soundboard.sounds.length; GUCCI.i += 1) {
    GUCCI.template.content.querySelector('img').src = GUCCI.data.soundboard.sounds[GUCCI.i].image;
    GUCCI.template.content.querySelector('img').alt = GUCCI.data.soundboard.sounds[GUCCI.i].alt;
    GUCCI.template.content.querySelector('h3').textContent = GUCCI.data.soundboard.sounds[GUCCI.i].alt;
    GUCCI.template.content.querySelector('source').src = GUCCI.data.soundboard.sounds[GUCCI.i].sound;
    GUCCI.clone = document.importNode(GUCCI.template.content, true);
    GUCCI.rows[GUCCI.curRow].appendChild(GUCCI.clone);
    GUCCI.numPerRow += 1;
    if (GUCCI.numPerRow === 4) {
      GUCCI.numPerRow = 0;
      GUCCI.curRow += 1;
    }
    if (display) {
      GUCCI.soundList = document.querySelectorAll('.got .soundToggle');
    } else {
      GUCCI.soundList = document.querySelectorAll('.ram .soundToggle');
    }
    GUCCI.current = GUCCI.soundList[GUCCI.i];
    GUCCI.audio = GUCCI.current.parentNode.getElementsByTagName('audio')[0];
    GUCCI.funcLoadAud();
    GUCCI.funcAddClick();
  }
};

/** Add event listener to track which audio is ready and display play icon when audio is being downloaded */
GUCCI.funcLoadAud = function () {
  'use strict';
  GUCCI.audio.addEventListener('progress', function () {
    GUCCI.numAudioRdy += 1;
    this.parentNode.getElementsByClassName('soundToggle')[0].style.display = 'block';
    this.parentNode.getElementsByClassName('load')[0].style.display = 'none';
    this.onended = function () {
      this.parentNode.getElementsByTagName('span')[0].classList.remove('glyphicon-pause');
    };
  });
};

/** Adds click event listener to play/pause audio */
GUCCI.funcAddClick = function () {
  'use strict';
  GUCCI.current.onclick = function () {
    GUCCI.audio = this.parentNode.getElementsByTagName('audio')[0];
    if (GUCCI.audio.paused) {
      GUCCI.audio.play();
      this.getElementsByTagName('span')[0].classList.add('glyphicon-pause');
    } else {
      GUCCI.audio.pause();
      this.getElementsByTagName('span')[0].classList.remove('glyphicon-pause');
    }
  };
};

/** Displays load button to allow users to force play buttons for audio not ready */
GUCCI.funcWait = function () {
  'use strict';
  GUCCI.objInform.getElementsByTagName('span')[0].addEventListener('click', function () {
    GUCCI.objInform.classList.add('hide');
  });
  GUCCI.reload = document.getElementById('reload');
  GUCCI.reload.addEventListener('click', function () {
    GUCCI.reload.classList.add('hide');
    if (GUCCI.numAudioRdy <= 24) {
      GUCCI.audios = document.getElementsByTagName('audio');
      for (GUCCI.i = 0; GUCCI.i < GUCCI.audios.length; GUCCI.i += 1) {
        GUCCI.audios[GUCCI.i].parentNode.getElementsByTagName('span')[0].classList.remove('glyphicon-pause');
        GUCCI.audios[GUCCI.i].parentNode.getElementsByClassName('soundToggle')[0].style.display = 'block';
      }
    }
  });
  setTimeout(GUCCI.slowInternet, 3000);
};

/** After 3 seconds, inform users of slow connection */
GUCCI.slowInternet = function () {
  "use strict";
  if (GUCCI.numAudioRdy >= 24) {
    GUCCI.objInform.classList.add('hide');
  } else if (window.navigator.onLine && GUCCI.numAudioRdy < 24) {
    GUCCI.funcModal('Slow internet, please hold as we load audio.');
    setTimeout(GUCCI.lowPerformance, 15000);
  }
};
  
/** After +15 seconds, inform users of poor performance */
GUCCI.lowPerformance = function () {
  "use strict";
  if (GUCCI.numAudioRdy >= 24) {
    GUCCI.objInform.classList.add('hide');
  } else if (window.navigator.onLine && GUCCI.numAudioRdy < 24) {
    GUCCI.funcModal('Slow internet. You may witness some low performance while accessing site.');
    if (GUCCI.numAudioRdy >= 24) {
      GUCCI.reload.classList.remove('hide');
    }
  }
};