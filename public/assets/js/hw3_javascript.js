var GUCCI = {};

window.onload = function () {
  'use strict';
  GUCCI.audioRdy = 0;
  GUCCI.toggleVal = 'off';
  GUCCI.got = './assets/json/got.json';
  GUCCI.ram = './assets/json/ram.json';
  GUCCI.viewChange();
  GUCCI.themeChange();
  GUCCI.sbChange();
  GUCCI.requestJSON(GUCCI.got, true);
  GUCCI.requestJSON(GUCCI.ram, false);
  GUCCI.wait();
};

GUCCI.viewChange = function () {
  'use strict';
  GUCCI.toggle = document.getElementById('toggle');
  GUCCI.icon = document.querySelector('.dropdown span.glyphicon');
  GUCCI.toggle.addEventListener('click', function () {
    GUCCI.bodyElement.classList.toggle('compact');
    GUCCI.icon.classList.toggle('glyphicon-expand');
    GUCCI.icon.classList.toggle('glyphicon-compact');
  });
};

GUCCI.themeChange = function () {
  'use strict';
  GUCCI.dropdownTheme = document.getElementById('theme');
  GUCCI.dropdownTheme.addEventListener('change', function () {
    GUCCI.bodyElement.classList.toggle('dark');
  });
};

GUCCI.sbChange = function () {
  'use strict';
  GUCCI.dropdownSB = document.getElementById('sb');
  GUCCI.dropdownSB.addEventListener('change', function () {
    GUCCI.sounds = document.getElementsByClassName('sound');
    for (GUCCI.i = 0; GUCCI.i < GUCCI.sounds.length; GUCCI.i += 1) {
      GUCCI.sounds[GUCCI.i].classList.toggle('hide');
    }
    GUCCI.title = document.getElementById('title');
    if (GUCCI.dropdownSB.value === 'got') {
      GUCCI.title.textContent = 'Game of Thrones';
    } else {
      GUCCI.title.textContent = 'Rick and Morty';
    }
  });
};

GUCCI.requestJSON = function (url, display) {
  'use strict';
  GUCCI.xmlhttp = new XMLHttpRequest();
  GUCCI.xmlhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      GUCCI.data = JSON.parse(this.responseText);
      GUCCI.genSB(GUCCI.data, display);
    }
  };
  GUCCI.xmlhttp.open('GET', url, true);
  GUCCI.xmlhttp.send(null);
};

GUCCI.genSB = function (data, display) {
  'use strict';
  GUCCI.curRow = 0;
  GUCCI.numPerRow = 0;
  GUCCI.template = document.getElementById('sound');
  GUCCI.rows = document.getElementsByClassName('row');
  GUCCI.classes = GUCCI.template.content.querySelector('div').classList;
  GUCCI.bodyElement = document.getElementsByTagName('body')[0];
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
    GUCCI.loadAud();
    GUCCI.addClick();
  }
};

GUCCI.loadAud = function () {
  'use strict';
  GUCCI.audio.addEventListener('canplay', function () {
    if (this.getAttribute('ready') === 'false') {
      GUCCI.audioRdy += 1;
      this.volume = 0;
    } else {
      this.volume = 1;
    }
    this.play();
    this.onended = function () {
      this.parentNode.getElementsByTagName('span')[0].classList.remove('glyphicon-pause');
      if (this.getAttribute('ready') === 'false') {
        this.setAttribute('ready', 'true');
        this.parentNode.getElementsByClassName('soundToggle')[0].style.display = 'block';
      }
    };
  });
};

GUCCI.addClick = function () {
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

GUCCI.wait = function () {
  'use strict';
  GUCCI.inform = document.getElementById('inform');
  GUCCI.inform.getElementsByTagName('span')[0].addEventListener('click', function () {
    GUCCI.inform.classList.add('hide');
  });
  setTimeout(
    function () {
      if (GUCCI.audioRdy === 24) {
        GUCCI.inform.classList.add('hide');
      } else {
        GUCCI.inform.classList.remove('hide');
        GUCCI.inform.getElementsByTagName('h4')[0] = 'Slow internet, please hold as we load audio.';
        setTimeout(
          function () {
            if (GUCCI.audioRdy === 24) {
              GUCCI.inform.classList.add('hide');
            } else {
              GUCCI.inform.classList.remove('hide');
              GUCCI.inform.getElementsByTagName('h4')[0].textContent = 'Slow internet. You may witness some low performance while accessing site.';
            }
          }, 15000);
      }
    }, 3000);
};