var GUCCI = {};

$(document).ready(function () {
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
//  GUCCI.wait();
});

GUCCI.viewChange = function () {
  'use strict';
  GUCCI.icon = $('.dropdown span.glyphicon');
  $('#toggle').on('click', function () {
    $('body').toggleClass('compact');
    $('.dropdown span.glyphicon').toggleClass('glyphicon-expand');
    $('.dropdown span.glyphicon').toggleClass('glyphicon-compact');
  });
};

GUCCI.themeChange = function () {
  'use strict';
  $('#theme').change(function () {
    $('body').toggleClass('dark');
  });
};

GUCCI.sbChange = function () {
  'use strict';
  $('#sb').on('change', function () {
    $('.sound').toggleClass('hide');
    if ($('#sb').val() === 'got') {
      $('#title').text('Game of Thrones');
    } else {
      $('#title').text('Rick and Morty');
    }
  });
};

GUCCI.requestJSON = function (sb, display) {
  'use strict';
  $.getJSON(sb, function (data) {
    GUCCI.genSB(data, display);
  });
};

GUCCI.genSB = function (data, display) {
  'use strict';
  GUCCI.curRow = 0;
  GUCCI.numPerRow = 0;
  GUCCI.rows = $('.row').get();
  
  $("#sound").template("template");
  
  for (GUCCI.i = 0; GUCCI.i < data.soundboard.sounds.length; GUCCI.i += 1) {
   $.tmpl("template", data.soundboard.sounds[GUCCI.i]).appendTo(GUCCI.rows[GUCCI.curRow]);

    GUCCI.numPerRow += 1;
    if (GUCCI.numPerRow === 4) {
      GUCCI.numPerRow = 0;
      GUCCI.curRow += 1;
    }
    if (display) {
      GUCCI.soundList = $('.got .soundToggle').get();
    } else {
      GUCCI.soundList = $('.ram .soundToggle').get();
    }
    GUCCI.current = GUCCI.soundList[GUCCI.i];
    GUCCI.audio = $('audio').last();
    GUCCI.loadAud();
    GUCCI.addClick();
  }
};

GUCCI.loadAud = function () {
  'use strict';
  $('audio').on('canplay canplaythrough', function () {
    if ($(this).attr('ready') === 'false') {
      GUCCI.audioRdy += 1;
      this.volume = 0;
    } else {
      this.volume = 1;
    }
    this.play();
    this.onended = function () {
      $('this').closest('span').removeClass('glyphicon-pause');
      if ($(this).attr('ready') === 'false') {
        $(this).attr('ready', 'true');
        $('.soundToggle')[0].style.display = 'block';
      }
    };
  });
};

GUCCI.addClick = function () {
  'use strict';
  $(this).onclick = function () {
    GUCCI.audio = $(this).closest('audio');
    if (this.paused) {
      this.play();
      $(this).closest('span').addClass('glyphicon-pause');
    } else {
      this.pause();
      $(this).closest('span').removeClass('glyphicon-pause');
    }
  };
};