(function() {

  window.isMobile = {
    Android: function() {
      if (navigator.userAgent.match(/Android/i)) {
        return true;
      } else {
        return false;
      }
    },
    BlackBerry: function() {
      if (navigator.userAgent.match(/BlackBerry/i)) {
        return true;
      } else {
        return false;
      }
    },
    iOS: function() {
      if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
        return true;
      } else {
        return false;
      }
    },
    Windows: function() {
      if (navigator.userAgent.match(/IEMobile/i)) {
        return true;
      } else {
        return false;
      }
    },
    any: function() {
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows();
    }
  };

}).call(this);
