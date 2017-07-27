var GUCCI = { };

window.onload = function () {
  GUCCI.got = "./assets/json/got.json";
  GUCCI.ram = "./assets/json/ram.json";
  GUCCI.toggleVal = "off";
  GUCCI.rows = document.getElementsByClassName('row');
  GUCCI.bodyElement = document.getElementsByTagName("body")[0];
  document.getElementById('title').innerHTML = "Game of Thrones";
  GUCCI.toggle();
  GUCCI.themeChange();
  
  GUCCI.requestJSON(GUCCI.got, true);
  GUCCI.requestJSON(GUCCI.ram, false);

  GUCCI.sbChange();
}

GUCCI.toggle = function() {
  GUCCI.toggle = document.getElementById('toggle');
  GUCCI.icon = document.querySelector(".dropdown span.glyphicon");
  GUCCI.toggle.addEventListener('click', function () {
    if (GUCCI.toggleVal == "off"){
      GUCCI.toggleVal = "on";
      GUCCI.bodyElement.classList.add("compact");
      GUCCI.icon.classList.remove("glyphicon-compact");
      GUCCI.icon.classList.add("glyphicon-expand");
    } else {
      GUCCI.toggleVal = "off";
      GUCCI.bodyElement.classList.remove("compact");
      GUCCI.icon.classList.remove("glyphicon-expand");
      GUCCI.icon.classList.add("glyphicon-compact");
    }  
  });
}

GUCCI.themeChange = function() {
  GUCCI.dropdownTheme = document.getElementById('theme');
  GUCCI.dropdownTheme.addEventListener('change', function () {
    if (GUCCI.dropdownTheme.value == "dark"){
      GUCCI.bodyElement.classList.add("dark");
    } else {
      GUCCI.bodyElement.classList.remove("dark");
    }  
  });
}

GUCCI.sbChange = function() {
  GUCCI.dropdownSB = document.getElementById('sb');
  GUCCI.dropdownSB.addEventListener('change', function () {
    if (GUCCI.dropdownSB.value == "got"){
      GUCCI.toggleDisplay("got", "ram");
      document.getElementById('title').innerHTML = "Game of Thrones";
    } else {
      GUCCI.toggleDisplay("ram", "got");
      document.getElementById('title').innerHTML = "Rick and Morty";
    }  
  });
}

GUCCI.toggleDisplay = function(display, hidden) {
  GUCCI.displays = document.getElementsByClassName(display);
  GUCCI.hiddens = document.getElementsByClassName(hidden);
  for (let i = 0; i < GUCCI.displays.length; i++) {
    document.getElementsByClassName(display)[i].style.display = "block";
    document.getElementsByClassName(hidden)[i].style.display = "none";
  }
}

GUCCI.requestJSON = function(sb, display) {
  GUCCI.xmlhttp = new XMLHttpRequest();
  GUCCI.url = sb;
  GUCCI.xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      GUCCI.data = JSON.parse(this.responseText);
      GUCCI.genSB(GUCCI.data, display);
    }
  };
  GUCCI.xmlhttp.open("GET", GUCCI.url, true);
  GUCCI.xmlhttp.send();
}

GUCCI.genSB = function(data, display) {
  GUCCI.numPerRow = 0;
  GUCCI.curRow = 0;
  GUCCI.temp = document.getElementById('sound');
  GUCCI.sb;
  if (display) {
    GUCCI.temp.content.querySelector('div').classList.remove("ram");
    GUCCI.temp.content.querySelector('div').classList.add("got");
  } else {
    GUCCI.temp.content.querySelector('div').classList.remove("got");
    GUCCI.temp.content.querySelector('div').classList.add("ram");
  }
  for (let i = 0; i < GUCCI.data.soundboard.sounds.length; i++) {
    GUCCI.temp.content.querySelector('img').src = GUCCI.data.soundboard.sounds[i].image;
    GUCCI.temp.content.querySelector('img').alt = GUCCI.data.soundboard.sounds[i].alt;
    GUCCI.temp.content.querySelector('h3').innerHTML = GUCCI.data.soundboard.sounds[i].alt;
    GUCCI.temp.content.querySelector('source').src = GUCCI.data.soundboard.sounds[i].sound;
    GUCCI.clone = document.importNode(GUCCI.temp.content, true);
    GUCCI.rows[GUCCI.curRow].appendChild(GUCCI.clone);
    GUCCI.numPerRow++;
    if (GUCCI.numPerRow == 4) {
      GUCCI.numPerRow = 0;
      GUCCI.curRow++;
    }
  }
  GUCCI.genBtn();
}

GUCCI.genBtn = function(data) {
  GUCCI.soundList = document.getElementsByClassName('soundToggle');
  for (var i = 0; i < GUCCI.soundList.length; i++) {
    GUCCI.current = GUCCI.soundList[i];
    GUCCI.current.onclick = function() {
      GUCCI.audio = this.parentNode.getElementsByTagName('audio')[0];
      if (GUCCI.audio.paused) {
        GUCCI.audio.play();
        this.getElementsByTagName('span')[0].classList.add("glyphicon-pause");
      } else {
        GUCCI.audio.pause();
        this.getElementsByTagName('span')[0].classList.remove("glyphicon-pause");
      }
      GUCCI.audio.onended = function() {
        this.parentNode.getElementsByTagName('span')[0].classList.remove("glyphicon-pause");
      };
    }
  }
}