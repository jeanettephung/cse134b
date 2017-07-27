window.onload = function () {
   var got = "./assets/json/got.json";
  //  var got = "https://gucci-b0d35.firebaseapp.com/assets/json/got.json";
  RequestJSON(got);
}

function themeChange() {
  var dropdownTheme = document.querySelector('select');
  var bodyElement = document.getElementsByTagName("body")[0];
  dropdownTheme.addEventListener('change', function () {
    if (dropdownTheme.value == "dark"){
      bodyElement.className = "dark";
    } else {
      bodyElement.classList.remove("dark");
    }  
  });
}

function RequestJSON(sb, cur) {
  var xmlhttp = new XMLHttpRequest();
  var url = sb;
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var rows = document.getElementsByClassName('row');
      var numPerRow = 0;
      var curRow = 0;

      for (let i = 0; i < data.soundboard.sounds.length; i++) {
        var temp = document.getElementById('sound');
        temp.content.querySelector('img').src = data.soundboard.sounds[i].image;
        temp.content.querySelector('img').alt = data.soundboard.sounds[i].alt;
        temp.content.querySelector('source').src = data.soundboard.sounds[i].sound;
        var clone = document.importNode(temp.content, true);
        rows[curRow].appendChild(clone);
        numPerRow++;
        if (numPerRow == 4) {
          numPerRow = 0;
          curRow++;
        }
        var soundList = document.getElementsByClassName('sound');
        var current = soundList[soundList.length-1];
        var btns = current.getElementsByClassName('btn');
        for (let j = 0; j < btns.length; j++) {
          btns[j].addEventListener('click', function () {
            var spanClass = this.querySelector('span').className;
            var parentTag = this.parentElement.parentElement.getElementsByTagName('audio')[0];
            if (spanClass.startsWith("glyphicon glyphicon-play")) {
              parentTag.play();
            } else if (spanClass.startsWith("glyphicon glyphicon-pause")) {
              parentTag.pause();
            } else {
              parentTag.pause();
              parentTag.currentTime = 0;      
            };
          });
        }
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}