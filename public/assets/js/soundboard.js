var controls = document.querySelectorAll('.soundboard a');
for (var i = 0, len = controls.length; i < len; i++) {
  controls[i].addEventListener('click', function () {
    var sound = this.parentElement.parentElement.getElementsByTagName('audio')[0];
    var className = this.querySelector('span').className;
    console.log(className);
    if (className == "glyphicon glyphicon-play") {
      sound.play();
    } else if (className == "glyphicon glyphicon-pause") {
      sound.pause();
    } else {
      sound.pause();
      sound.currentTime = 0;      
    }
  }, false)
}