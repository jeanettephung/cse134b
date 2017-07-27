var GUCCI = { };

window.onload = function () {
  GUCCI.got = "./assets/json/got.json";
  GUCCI.ram = "./assets/json/ram.json";
  //  var got = "https://gucci-b0d35.firebaseapp.com/assets/json/got.json";
  GUCCI.rows = document.getElementsByClassName('row');

  GUCCI.themeChange();
  GUCCI.requestJSON(GUCCI.got);
  GUCCI.sbChange();
}

GUCCI.themeChange = function() {
  GUCCI.dropdownTheme = document.getElementById('theme');
  GUCCI.bodyElement = document.getElementsByTagName("body")[0];
  GUCCI.dropdownTheme.addEventListener('change', function () {
    if (GUCCI.dropdownTheme.value == "dark"){
      GUCCI.bodyElement.className = "dark";
    } else {
      GUCCI.bodyElement.classList.remove("dark");
    }  
  });
}

GUCCI.sbChange = function() {
  GUCCI.dropdownSB = document.getElementById('sb');
  GUCCI.dropdownSB.addEventListener('change', function () {
    GUCCI.clearSB();
    if (GUCCI.dropdownSB.value == "got"){
      GUCCI.requestJSON(GUCCI.got);
    } else {
      GUCCI.requestJSON(GUCCI.ram);
    }  
  });
}

GUCCI.clearSB = function() {
  for (let k = 0; k < GUCCI.rows.length; k++) {
    GUCCI.rows[k].innerHTML = "";
  }
}

GUCCI.requestJSON = function(sb) {
  GUCCI.xmlhttp = new XMLHttpRequest();
  GUCCI.url = sb;
  GUCCI.xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      GUCCI.data = JSON.parse(this.responseText);
      GUCCI.genSB(GUCCI.data);
    }
  };
  GUCCI.xmlhttp.open("GET", GUCCI.url, true);
  GUCCI.xmlhttp.send();
}

GUCCI.genSB = function(data) {
  GUCCI.numPerRow = 0;
  GUCCI.curRow = 0;
  document.getElementById('title').innerHTML = GUCCI.data.soundboard.name;

  for (let i = 0; i < GUCCI.data.soundboard.sounds.length; i++) {
    GUCCI.temp = document.getElementById('sound');
    GUCCI.temp.content.querySelector('img').src = GUCCI.data.soundboard.sounds[i].image;
    GUCCI.temp.content.querySelector('img').alt = GUCCI.data.soundboard.sounds[i].alt;
    GUCCI.temp.content.querySelector('source').src = GUCCI.data.soundboard.sounds[i].sound;
    GUCCI.clone = document.importNode(GUCCI.temp.content, true);
    GUCCI.rows[GUCCI.curRow].appendChild(GUCCI.clone);
    GUCCI.numPerRow++;
    if (GUCCI.numPerRow == 4) {
      GUCCI.numPerRow = 0;
      GUCCI.curRow++;
    }
    GUCCI.soundList = document.getElementsByClassName('sound');
    GUCCI.current = GUCCI.soundList[GUCCI.soundList.length-1];
    GUCCI.btns = GUCCI.current.getElementsByClassName('btn');
    for (let j = 0; j < GUCCI.btns.length; j++) {
      GUCCI.btns[j].addEventListener('click', function () {
        GUCCI.spanClass = this.querySelector('span').className;
        GUCCI.parentTag = this.parentElement.parentElement.getElementsByTagName('audio')[0];
        if (GUCCI.spanClass.startsWith("glyphicon glyphicon-play")) {
          GUCCI.parentTag.play();
        } else if (GUCCI.spanClass.startsWith("glyphicon glyphicon-pause")) {
          GUCCI.parentTag.pause();
        } else {
          GUCCI.parentTag.pause();
          GUCCI.parentTag.currentTime = 0;      
        };
      });
    }
  }
}