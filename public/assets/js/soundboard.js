$('.soundboard a').click(function(){
    event.preventDefault()
    if ($(this).is(':nth-child(1)')) {
      console.log($(this).parent()+'audio');
      var aud=$(this).parent()+'audio';
      console.log(aud.parseJSON());
      console.log($("#test"));
      document.querySelector($(this).parent()+'audio').play();
//      ($("#test")[0]).play();
//      document.getElementById('test').play();
      ($(aud)[0]).play();
    } else if ($(this).is(':nth-child(2)')) {
      console.log("2");
    } else {
      console.log("3");
    }
});