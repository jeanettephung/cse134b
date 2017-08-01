/** Creates namespace 
 *  @namespace 
 */
var GUCCI = {};
  
/** Sets up dropdown/toggle elements, requests data, generates soundboard */
window.onload = function () {
  'use strict';
//  GUCCI.funcRegWorker();
  GUCCI.numAudioRdy = 0;  // tracks number of audios ready
  GUCCI.objInform = document.getElementById('inform');  // modal object that displays status to end users
  GUCCI.funcSetup();
  GUCCI.funcRequestJSON('./assets/json/got.json', true);
  GUCCI.funcRequestJSON('./assets/json/ram.json', false);
  GUCCI.funcWait();
  GUCCI.funcIE();
  GUCCI.funcConnection();
};


/** Registers Service Worker */
GUCCI.funcRegWorker = function () {
  'use strict';
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworker.js');
  }
};

/** Updates connection icon to display internet connection (on/offline) */
GUCCI.funcConnection = function () {
  "use strict";
  GUCCI.indicator = document.querySelector('#connection > span');
  GUCCI.updateOnlineStatus = function (event) {
    GUCCI.condition = navigator.onLine ? 'online glyphicon-signal' : 'offline glyphicon-exclamation-sign';
    GUCCI.indicator.className = 'glyphicon ' + GUCCI.condition;
    GUCCI.indicator.textContent = navigator.onLine ? 'Online' : 'Offline';
  };
  window.addEventListener('online',  GUCCI.updateOnlineStatus);
  window.addEventListener('offline', GUCCI.updateOnlineStatus);
};

/* Update connection icon base on connection status */
GUCCI.updateIndicator = function () {
  'use strict';
  if (window.navigator.onLine) {
    document.getElementById('connection').classList.remove('offline');
    document.querySelector('#connection').textContent = "Online";
  } else {
    document.getElementById('connection').classList.add('offline');
    document.querySelector('#connection').textContent = "Offline";
  }
};

/** Checks if browser is IE and informs user that soundboard is unsupported */
GUCCI.funcIE = function () {
  'use strict';
  GUCCI.boolIsIE = /*@cc_on!@*/false || !!document.documentMode;  // tracks if browser is IE
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
};

/** Send request to get soundboard data then generates soundboard 
 *  Notifies end users if data not found or of server problems
 */
GUCCI.funcRequestJSON = function (url, display) {
  'use strict';
  GUCCI.objXmlhttp = new XMLHttpRequest();  // XHR object
  GUCCI.objXmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      GUCCI.objData = JSON.parse(this.responseText);  // JSON object containing soundboard data
      GUCCI.funcGenSB(display);
    } else if (this.status === 404) {
      GUCCI.funcModal('Soundboard not found.');
    } else if (this.status === 500) {
      GUCCI.funcModal('Unable to get soundboard due to server problems.');
    }
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

/** Adds click event to close modal */
GUCCI.funcWait = function () {
  'use strict';
  GUCCI.objInform.getElementsByTagName('span')[0].addEventListener('click', function () {
    GUCCI.objInform.classList.add('hide');
  });
  setTimeout(GUCCI.funcSlowInternet, 3000);
};

/** After 3 seconds, inform users of slow connection */
GUCCI.funcSlowInternet = function () {
  "use strict";
  if (GUCCI.numAudioRdy >= 24) {
    GUCCI.objInform.classList.add('hide');
  } else if (navigator.onLine && GUCCI.numAudioRdy < 24) {
    GUCCI.funcModal('Slow internet, please hold as we load audio.');
    setTimeout(GUCCI.funcLowPerformance, 15000);
  }
};
  
/** After +15 seconds, inform users of poor performance */
GUCCI.funcLowPerformance = function () {
  "use strict";
  if (GUCCI.numAudioRdy >= 24) {
    GUCCI.objInform.classList.add('hide');
  } else if (window.navigator.onLine && GUCCI.numAudioRdy < 24) {
    GUCCI.funcModal('Slow internet. You may witness some low performance while accessing site.');
    if (navigator.onLine && GUCCI.numAudioRdy >= 24) {
      GUCCI.objReload.classList.remove('hide');
    }
  }
};