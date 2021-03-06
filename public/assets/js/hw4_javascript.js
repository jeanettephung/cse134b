/** Creates namespace 
 *  @namespace 
 */
var GUCCI = {};
  
/** Sets up dropdown/toggle elements, requests data, and generates soundboard */
window.onload = function () {
  'use strict';
  GUCCI.funcRegWorker();

  GUCCI.numAudioRdy = 0;  // tracks number of audios ready
  GUCCI.objInform = document.getElementById('inform');  // modal that displays status
  GUCCI.boolIsIE = /*@cc_on!@*/false || !!document.documentMode;  // tracks if browser is IE
 
  GUCCI.funcIE();
  GUCCI.updateOnlineStatus();
  GUCCI.funcSetup();
};

/** Registers Service Worker */
GUCCI.funcRegWorker = function () {
  'use strict';
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworker.js');
  }
};

/** Updates connection icon to display internet connection (on/offline) */
GUCCI.updateOnlineStatus = function (event) {
  'use strict';
  GUCCI.strCondition = navigator.onLine ? 'online glyphicon-signal' : 'offline glyphicon-exclamation-sign';
  document.querySelector('#connection > span').className = 'glyphicon ' + GUCCI.strCondition;
  document.querySelector('#connection > span').textContent = navigator.onLine ? 'Online' : 'Offline';
};

/** Checks if browser is IE and informs user that soundboard is unsupported */
GUCCI.funcIE = function () {
  'use strict';
  if (GUCCI.boolIsIE) {
    GUCCI.funcModal('Soundboard not supported in your browser');
  }
};

/** Displays modal with current status 
 *  @param {string} message
 *     Message displayed to end users
 */
GUCCI.funcModal = function (message) {
  'use strict';
  GUCCI.objInform.classList.remove('hide');
  GUCCI.objInform.getElementsByTagName('h4')[0].textContent = message;
};

/** Set up events for non-soundboard elements and requests data to generate soundboard */
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
    GUCCI.objSounds = document.getElementsByClassName('sound'); // sound element consisting of image and audio
    for (GUCCI.i = 0; GUCCI.i < GUCCI.objSounds.length; GUCCI.i += 1) {
      GUCCI.objSounds[GUCCI.i].classList.toggle('hide');
    }
    if (document.getElementById('sb').value === 'got') {
      document.getElementById('title').textContent = 'Game of Thrones';
    } else {
      document.getElementById('title').textContent = 'Rick and Morty';
    }
  });
  // Close for modal
  GUCCI.objInform.getElementsByTagName('span')[0].addEventListener('click', function () {
    GUCCI.objInform.classList.add('hide');
  });
  // Listen for internet connection
  window.addEventListener('online',  GUCCI.updateOnlineStatus);
  window.addEventListener('offline', GUCCI.updateOnlineStatus);
  // Request JSON which uses data to generate soundboard
  GUCCI.funcRequestJSON('./assets/json/got.json', true);
  GUCCI.funcRequestJSON('./assets/json/ram.json', false);
};

/** Send request to get soundboard data then generates soundboard 
 *  Notifies end users if data not found, server problems, or retry after timeout
 */
GUCCI.funcRequestJSON = function (url, display) {
  'use strict';
  GUCCI.objXmlhttp = new XMLHttpRequest();  // XHR object
  GUCCI.objXmlhttp.timeout = 10000;   // timeout time to retry request
  GUCCI.objXmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      if (this.responseText) {
        try {
          GUCCI.objData = JSON.parse(this.responseText);  // JSON object containing soundboard data
          GUCCI.funcGenSB(display);
        } catch (e) {
          GUCCI.funcModal(e);
        }
      }
    } else if (this.status === 404) {
      GUCCI.funcModal('Soundboard not found.');
    } else if (this.status === 500) {
      GUCCI.funcModal('Unable to retrieve soundboard due to server problems.');
    }
    GUCCI.objXmlhttp.ontimeout = function () {
      GUCCI.funcModal('Timout error. Retrying request...');
      GUCCI.funcRequestJSON(url, display);
    };
  };
  GUCCI.objXmlhttp.open('GET', url, true);
  GUCCI.objXmlhttp.send(null);
};

/** Generates soundboard image, audio, and events 
 *  Displays GOT sound elements and hides RAM sound elements
 */
GUCCI.funcGenSB = function (display) {
  'use strict';
  GUCCI.numCurRow = 0; // current row soundboard being appended to
  GUCCI.numPerRow = 0;  // number of sounds in current row
  GUCCI.objTemplate = document.getElementById('sound'); // template for sound element
  GUCCI.objListRows = document.getElementsByClassName('row');  // list of row objects
  GUCCI.objClasses = GUCCI.objTemplate.content.querySelector('div').classList; // css classes of sound element
  if (display) {
    GUCCI.objClasses.add('got');
  } else {
    GUCCI.objClasses.remove('got');
    GUCCI.objClasses.add('ram', 'hide');
  }
  try {
    if (typeof (GUCCI.objData.soundboard.sounds[0].sound) === 'string') {
      for (GUCCI.i = 0; GUCCI.i < GUCCI.objData.soundboard.sounds.length; GUCCI.i += 1) {
        GUCCI.objTemplate.content.querySelector('img').src = GUCCI.objData.soundboard.sounds[GUCCI.i].image;
        GUCCI.objTemplate.content.querySelector('img').alt = GUCCI.objData.soundboard.sounds[GUCCI.i].alt;
        GUCCI.objTemplate.content.querySelector('h3').textContent = GUCCI.objData.soundboard.sounds[GUCCI.i].alt;
        GUCCI.objTemplate.content.querySelector('source').src = GUCCI.objData.soundboard.sounds[GUCCI.i].sound;
        GUCCI.objClone = document.importNode(GUCCI.objTemplate.content, true); // sound object created from template
        GUCCI.objListRows[GUCCI.numCurRow].appendChild(GUCCI.objClone);
        GUCCI.numPerRow += 1;
        if (GUCCI.numPerRow === 4) {
          GUCCI.numPerRow = 0;
          GUCCI.numCurRow += 1;
        }
        if (display) {
          GUCCI.objSoundList = document.querySelectorAll('.got .soundToggle');  // GOT soundboard object
        } else {
          GUCCI.objSoundList = document.querySelectorAll('.ram .soundToggle');   // RAM soundboard object
        }
        GUCCI.objAudio = GUCCI.objSoundList[GUCCI.i].parentNode.getElementsByTagName('audio')[0];
        GUCCI.funcLoadAud();
        GUCCI.funcAddClick();
      }
    }
  } catch (e) {
    GUCCI.funcModal('Invalid JSON! Does not contain soundboard');
  }
};

/** Add event listener to track which audio is ready and display play icon when audio is being downloaded */
GUCCI.funcLoadAud = function () {
  'use strict';
  GUCCI.objAudio.addEventListener('progress', function () {
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
  GUCCI.objSoundList[GUCCI.i].onclick = function () {
    GUCCI.objAudio = this.parentNode.getElementsByTagName('audio')[0]; // current audio element
    if (GUCCI.objAudio.paused) {
      GUCCI.objAudio.play();
      this.getElementsByTagName('span')[0].classList.add('glyphicon-pause');
    } else {
      GUCCI.objAudio.pause();
      this.getElementsByTagName('span')[0].classList.remove('glyphicon-pause');
    }
  };
};