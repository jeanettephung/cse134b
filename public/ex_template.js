var mySoundBoard = {
  
  name : "Rick and Morty Cool Sounds",
  sounds : [
    
    {
      img : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/cromulon.png',
      sound : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/goodjob.wav'
    },
    
    {
      img : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/cromulon.png',
      sound : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/goodjob.wav'
    } ,
    
        {
      img : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/cromulon.png',
      sound : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/goodjob.wav'
    }  
  ]
  
};

window.onload = function () {
  
  // template version he
  
  var t = document.getElementById('myTemplate');
  
  t.content.querySelector('img').src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/cromulon.png';
  t.content.querySelector('source').src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/995085/goodjob.wav';
   
  var clone = document.importNode(t.content, true);
  document.body.appendChild(clone);
  
  
  // old school version here
  
  var str ='';
  
  // now shove it in the page

  var numButtons = mySoundBoard.sounds.length;
  
  for (var i = 0; i < numButtons; i++) {
   var el;
   var imgPath = mySoundBoard.sounds[i].img;
   var soundPath = mySoundBoard.sounds[i].sound;
   
   str = '<div class="soundBtn"><img src="'+imgPath+'"><br> <audio id="sound1">  <source src="'+soundPath+'" type="audio/wav"></audio> <input type="button" value="Play" id="playBtn"> <input type="button" value="Pause" id="pauseBtn"></div>';
  
   el = document.createElement('div');    
    el.innerHTML = str;
   
   
   document.getElementById('soundBoard').appendChild(el);
  }
  
  document.getElementById('playBtn').onclick = function () {
    document.getElementById('sound1').play();
  }

    document.getElementById('pauseBtn').onclick = function () {
    document.getElementById('sound1').pause();
  }


}




