window.onload = function () {
  
  var xmlhttp = new XMLHttpRequest();
  var url = "./assets/json/got.json";

  xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      myFunction(myArr);
      }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  
  
  
  var sounds = "";

  var rows = document.getElementsByClassName('row');
  var numPerRow = 0;
  var curRow = 0;
  
  for (let i = 0; i < sounds.sounds.length; i++) {
    var temp = document.getElementById('sound');
    temp.content.querySelector('img').src= sounds.sounds[i].img;
    temp.content.querySelector('img').alt="text";
    var clone = document.importNode(temp.content, true);
    rows[curRow].appendChild(clone);
    numPerRow++;
    if (numPerRow == 2) {
      numPerRow = 0;
      curRow++;
    }
  }
}