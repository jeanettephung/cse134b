for (var i = 0, len = document.querySelectorAll('.soundboard .sound .btn').length; i < len; i++) {
  document.querySelectorAll('.soundboard .sound .btn')[i].addEventListener('click', function () {
    if ((this.querySelector('span').className).startsWith("glyphicon glyphicon-play")) {
      (this.parentElement.parentElement.getElementsByTagName('audio')[0]).play();
    } else if ((this.querySelector('span').className).startsWith("glyphicon glyphicon-pause")) {
      (this.parentElement.parentElement.getElementsByTagName('audio')[0]).pause();
    } else {
      (this.parentElement.parentElement.getElementsByTagName('audio')[0]).pause();
      (this.parentElement.parentElement.getElementsByTagName('audio')[0]).currentTime = 0;      
    }
  }, false)
}