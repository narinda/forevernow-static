(function() {

  jQuery(document).ready(function() {
    var api, player, playlist, pos, resumePosition, seekable;
    playlist = [];
    if (window.isMobile.any()) {
      playlist = [
        {
          mp4: ENCODE_FORMATS.mp4_baseline_480p
        }, {
          webm: ENCODE_FORMATS.webm_480p
        }
      ];
    } else {
      playlist = [
        {
          mp4: ENCODE_FORMATS.mp4_720p
        }, {
          webm: ENCODE_FORMATS.webm_720p
        }
      ];
    }
    player = $(".artwork-player__video");
    player.flowplayer({
      cuepoints: [0.3],
      embed: false,
      splash: true,
      swf: "/static/scripts/flowplayer/flowplayer.swf",
      key: "$404891313395423",
      analytics: "UA-5902766-4",
      playlist: [playlist]
    });
    api = window.flowplayer(player);
    if (!isMobile.any()) {
      player.find(".fp-ui .fp-fullscreen").after("<a class='hd-btn active'>HD</a>");
    }
    resumePosition = function(e, api, video) {
      var pos;
      if (pos === video.duration) {
        pos = 0;
      }
      if (pos && (seekable && e.type === "ready" || !seekable && e.type === "cuepoint")) {
        api.seek(pos);
        return pos = 0;
      }
    };
    seekable = !isMobile.any();
    pos = 0;
    api.bind("cuepoint", function(e, api, video) {
      return resumePosition(e, api, video);
    });
    return $(".hd-btn").click(function(e) {
      var button;
      e.preventDefault();
      button = $(this);
      pos = api.video.time;
      if (button.hasClass("active")) {
        api.load([
          {
            mp4: ENCODE_FORMATS.mp4_480p
          }, {
            webm: ENCODE_FORMATS.webm_480p
          }
        ], function(e, api, video) {
          return resumePosition(e, api, video);
        });
        return button.removeClass("active");
      } else {
        api.load([
          {
            mp4: ENCODE_FORMATS.mp4_720p
          }, {
            webm: ENCODE_FORMATS.webm_720p
          }
        ], function(e, api, video) {
          return resumePosition(e, api, video);
        });
        return button.addClass("active");
      }
    });
  });

}).call(this);
