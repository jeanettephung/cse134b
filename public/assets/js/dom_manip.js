window.onload = function () {
  var xmlhttp = new XMLHttpRequest();
//  var url = "./assets/json/got.json";
  var url = "https://gucci-b0d35.firebaseapp.com/assets/json/got.json";
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      var rows = document.getElementsByClassName('row');
      var numPerRow = 0;
      var curRow = 0;

      for (let i = 0; i < data.soundboard.sounds.length; i++) {
        var temp = document.getElementById('sound');
        temp.content.querySelector('img').src= data.soundboard.sounds[i].image;
        temp.content.querySelector('img').alt="text";
        var clone = document.importNode(temp.content, true);
        rows[curRow].appendChild(clone);
        numPerRow++;
        if (numPerRow == 4) {
          numPerRow = 0;
          curRow++;
        }
      }
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}