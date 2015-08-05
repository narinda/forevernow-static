;(function(window) {
  window.requestAnimFrame = (function() {
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function(callback) {
              return window.setTimeout(callback, 1000 / 120);
            };
  })();
})(window);
