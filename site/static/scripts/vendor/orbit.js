;(function(window) {
  "use strict";

  var __bind, Orbit;

  // CoffeeScript bind
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  //
  // Orbit
  //
  // Orbit a `satellite` around the `origin`
  //

  Orbit = (function() {
    function Orbit($satellite, $origin, options) {
      // Defaults
      var defaults = {
        radius: 300, // in pixels
        startAngle: 0,
        speed: 1,
        clockwise: true
      };

      this.onResize = __bind(this.onResize, this);
      this.startAnimation = __bind(this.startAnimation, this);
      this.stopAnimation = __bind(this.stopAnimation, this);

      // Set up options
      this.options = $.extend({}, defaults, options);
      // Slow speed down by a factor of 1000
      this.options.speed = (this.options.speed / 1000);

      this.$satellite = $satellite;
      this.$origin = $origin;
      this.$window = $(window);

      this.currentAngle = this.options.startAngle;
      this.$window.on("resize", this.onResize);
      this.calculateOrigin();
      this.animate();

      this.$satellite.on("mouseover", this.stopAnimation);
      this.$satellite.on("mouseout", this.startAnimation);
    }

    Orbit.prototype.onResize = function() {
      this.calculateOrigin();
    };

    // Get position of the origin
    Orbit.prototype.calculateOrigin = function() {
      var originOffset = this.$origin.offset(),
          originWidth = this.$origin.width(),
          originHeight = this.$origin.height();
      this.originX = originOffset.left + (originWidth / 2);
      this.originY = originOffset.top + (originHeight / 2);
    };

    Orbit.prototype.draw = function() {
      var relativeX, relativeY;
      // http://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circles-circumference
      relativeX = this.originX + this.options.radius * Math.cos(this.currentAngle);
      relativeY = this.originY + this.options.radius * Math.sin(this.currentAngle);
      this.$satellite.css({
        left: relativeX,
        top:  relativeY
      });
    };

    Orbit.prototype.getNextAngle = function() {
      var newAngle;
      if (this.options.clockwise === true) {
        newAngle = this.currentAngle + this.options.speed;
      } else {
        newAngle = this.currentAngle - this.options.speed;
      }
      return newAngle % 360;
    };

    Orbit.prototype.stopAnimation = function() {
      this.stopped = true;
    };

    Orbit.prototype.startAnimation = function() {
      this.stopped = false;
    };

    Orbit.prototype.animate = function() {
      var _this = this;
      this.animationFrameId = requestAnimFrame(function(time) {
        if(!_this.stopped) {
          // Set up new angle
          _this.currentAngle = _this.getNextAngle();
          _this.draw();
        }
        _this.animate();
      });
    };

    return Orbit;

  })();


  window.Orbit = Orbit;

})(window);
