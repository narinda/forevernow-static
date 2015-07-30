(function() {
  var resizeVideo;

  resizeVideo = function() {
    var dh, dw, newH, videoAspect, windowAspect, wrapperHeight;
    dw = document.documentElement.clientWidth;
    dh = document.documentElement.clientHeight;
    windowAspect = dw / dh;
    videoAspect = 16 / 9;
    jQuery(".splash-video").css({
      width: dw,
      height: dh
    });
    if (windowAspect < videoAspect) {
      newH = dh * videoAspect;
      jQuery(".splash-video__inner").css({
        height: dh,
        width: newH
      });
    } else {
      jQuery(".splash-video__inner").css({
        width: dw
      });
    }
    wrapperHeight = jQuery(".splash__wrapper").height() + 100;
    return jQuery(".splash__wrapper").css({
      "padding-top": Math.abs((dh - wrapperHeight) / 2)
    });
  };

  jQuery(document).ready(function() {
    var $container, $shortlisted, api, joinerOptions, maxRadius, origin, player, video, video_tag;
    video = VIDEO_FORMATS[0];
    if (window.isMobile.any()) {
      $container = $(".splash-video");
      $container.empty().css({
        "background-image": "url(/static/images/" + video.gif + ".gif)"
      });
      $("body").addClass("gif");
    } else {
      player = $(".splash-video__inner");
      video_tag = player.find('video');
      video_tag.append("<source type='video/mp4' src='" + video.mp4 + "'/>");
      video_tag.append("<source type='video/webm' src='" + video.webm + "'/>");
      player.flowplayer({
        embed: false,
        loop: true,
        key: "$404891313395423",
        analytics: "UA-5902766-4"
      });
      api = window.flowplayer(player);
      resizeVideo();
      jQuery(window).on('resize', resizeVideo);
    }
    joinerOptions = {
      curve: false,
      stroke: "#d3be83",
      strokeOpacity: 0.8,
      zIndex: 29
    };
    origin = {
      $node: $('.logo-origin')
    };
    maxRadius = ($(window).height() / 2) - 150;
    $shortlisted = $('.shortlist-card');
    return $shortlisted.each(function() {
      var element, joint, orbit, radius, speed, startAngle;
      startAngle = Math.random() * 360;
      radius = (Math.random() * maxRadius) + 150;
      speed = Math.random() * 5;
      element = {
        $node: $(this)
      };
      joint = new Joiner(element, origin, joinerOptions);
      return orbit = new Orbit(element.$node, origin.$node, {
        startAngle: startAngle,
        speed: speed,
        radius: radius
      });
    });
  });

}).call(this);
