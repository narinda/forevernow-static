(function() {

  $(document).ready(function() {
    return audiojs.events.ready(function() {
      var a1, audios;
      audios = document.getElementsByTagName("audio");
      return a1 = audiojs.create(audios[0], {
        css: false,
        createPlayer: {
          markup: "<div class=\"play-pause\">\n  <p class=\"play\">Listen</p>\n  <p class=\"pause\">Pause</p>\n  <p class=\"loading\"></p>\n  <p class=\"error\"></p>\n</div>\n<div class=\"scrubber\">\n  <div class=\"progress\"></div>\n  <div class=\"loaded\"></div>\n</div>\n<div class=\"time\">\n  <em class=\"played\">00:00</em>/<strong class=\"duration\">00:00</strong>\n</div>\n<div class=\"error-message\"></div>",
          playPauseClass: 'play-pause',
          scrubberClass: 'scrubber',
          progressClass: 'progress',
          loaderClass: 'loaded',
          timeClass: 'time',
          durationClass: 'duration',
          playedClass: 'played',
          errorMessageClass: 'error-message',
          playingClass: 'playing',
          loadingClass: 'loading',
          errorClass: 'error'
        }
      });
    });
  });

}).call(this);
