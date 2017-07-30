/*jslint browser: true*/
/*global $, jQuery*/
var GUCCI = {};

(function ($) {
  "use strict";
  $(document).ready(function () {
    GUCCI.isIE = /*@cc_on!@*/false || !!document.documentMode;
    GUCCI.isEdge = !GUCCI.isIE && !!window.StyleMedia;

    if (GUCCI.isIE || GUCCI.isEdge) {
      $('#inform').removeClass('hide');
      $('#inform h4').text('Soundboard not supported in your browser.');
    }
    GUCCI.audioRdy = 0;
    GUCCI.toggleVal = 'off';
    GUCCI.got = './assets/json/got.json';
    GUCCI.ram = './assets/json/ram.json';
    GUCCI.viewChange();
    GUCCI.themeChange();
    GUCCI.sbChange();
    GUCCI.requestJSON(GUCCI.got, true);
    GUCCI.requestJSON(GUCCI.ram, false);
    GUCCI.wait();
    setInterval(function () {
      if (!window.navigator.onLine) {
        $('#inform').removeClass('hide');
        $('#inform h4').text('You are disconnected. Please reconnect and try again.');
      }
    }, 5000);
  });

  GUCCI.viewChange = function () {
    GUCCI.icon = $('.dropdown span.glyphicon');
    $('#toggle').on('click', function () {
      $('body').toggleClass('compact');
      $('.dropdown span.glyphicon').toggleClass('glyphicon-expand');
      $('.dropdown span.glyphicon').toggleClass('glyphicon-compact');
    });
  };

  GUCCI.themeChange = function () {
    $('#theme').change(function () {
      $('body').toggleClass('dark');
    });
  };

  GUCCI.sbChange = function () {
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
    $.ajax({
      url: sb,
      dataType: 'json',
      success: function (data) {
        GUCCI.genSB(data, display);
      },
      error: function (data) {
        $('#inform').removeClass('hide');
        $('#inform h4').text('Error in loading content');
      }
    });
  };

  GUCCI.genSB = function (data, display) {
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
      GUCCI.audio = $(GUCCI.soundList).last().parent().find('audio');
      GUCCI.loadAud(GUCCI.audio);
      GUCCI.addClick(GUCCI.audio);
    }
  };

  GUCCI.loadAud = function (a) {
    a.on('progress', function () {
      $(a).parent().find('.soundToggle')[0].style.display = 'block';
      $(this).parent().find('.load')[0].style.display = 'none';
    });
  };

  GUCCI.addClick = function (a) {
    $(a).parent().find('.soundToggle')[0].onclick = function () {
      if (a[0].paused) {
        a[0].play();
        $(a).parent().find('span').first().addClass('glyphicon-pause');
      } else {
        a[0].pause();
        $(a).parent().find('span').first().removeClass('glyphicon-pause');
      }
    };
  };

  GUCCI.wait = function () {
    $('#inform span').on('click', function () {
      $('#inform').addClass('hide');
    });
    $('#reload').on('click', function () {
      $('#reload').addClass('hide');
      if (GUCCI.audioRdy !== 24) {
        $('audio').each(function () {
          $(this).parent().find('.soundToggle')[0].style.display = 'block';
        });
      }
    });
    setTimeout(GUCCI.slowInternet, 3000);
  };

  GUCCI.slowInternet = function () {
    if (GUCCI.audioRdy === 24) {
      $('#inform').addClass('hide');
    } else if (window.navigator.onLine && GUCCI.audioRdy !== 24) {
      $('#inform').removeClass('hide');
      $('#inform h4').text('Please hold as we load audio.');
      setTimeout(GUCCI.lowPerformance, 15000);
    }
  };

  GUCCI.lowPerformance = function () {
    if (GUCCI.audioRdy === 24) {
      $('#inform').addClass('hide');
    } else if (window.navigator.onLine && GUCCI.audioRdy !== 24) {
      $('#inform span').removeClass('hide');
      $('#inform h4').text('Slow internet. You may witness some low performance while accessing site.');
      $('#reload').removeClass('hide');
    }
  };
}(jQuery));