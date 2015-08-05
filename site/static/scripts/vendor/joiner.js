;(function(window) {
  "use strict";

  var __bind, Joiner;

  // CoffeeScript bind
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };


  // Joiner
  //
  // Draws a line between two DOM/SVG objects using Raphael. Creates a separate
  // SVG for each path at the moment.
  //
  //
  // Element options:
  // - originX: center|left|right
  // - originY: center|top|bottom
  // - $node: jQuery object
  // Options:
  // - animate: true/false
  //

  Joiner = (function() {
    function Joiner(primary, secondary, options) {
      var elementDefaults, defaults;

      // Defaults
      defaults = {
        animate: true,
        curve: true,
        gravity: 0.7,
        stroke: "#000",
        strokeLinecap: "round",
        strokeWidth: 1,
        strokeOpacity: 1,
        zIndex: 1
      };

      elementDefaults = {
        originX: "center",
        originY: "center"
      };

      // Binding context
      this.onChange = __bind(this.onChange, this);

      // Set up options
      this.options = $.extend({}, defaults, options);

      // Set up elements
      this.primary = $.extend({}, elementDefaults, primary);
      this.secondary = $.extend({}, elementDefaults, secondary);

      // Cache selectors
      this.$document = $(document);
      this.$window = $(window);

      // Bind listeners
      this.$window.on("resize", this.onChange);

      // Set up animate
      if (this.options.animate === true) {
        // this.animationFrame = new AnimationFrame();
        this.animate();
      }

      // Kick start
      this.onChange();
    }

    // Init/resize event
    Joiner.prototype.onChange = function(e) {
      this.createPaper();
      this.draw();
    };

    Joiner.prototype.animate = function() {
      var _this = this;
      this.animationFrameId = requestAnimFrame(function(time) {
        _this.onChange();
        _this.animate();
      });
    };

    // Main draw function
    // Calcs the positions, draws (or redraws the lines between them)
    Joiner.prototype.draw = function() {
      var pathString,
          primaryPosition = this.getAnchorPosition(this.primary),
          secondaryPosition = this.getAnchorPosition(this.secondary);
      // Curves!
      if (this.options.curve === true) {
        var controlX, controlY, distance;

        distance = Math.abs(primaryPosition.x - secondaryPosition.x);

        controlX = (primaryPosition.x + secondaryPosition.x) / 2;
        controlY = ((primaryPosition.y + secondaryPosition.y) / 2) + (distance * this.options.gravity);
        pathString = [
          "M", primaryPosition.x, primaryPosition.y,
          "S", controlX, controlY, secondaryPosition.x, secondaryPosition.y
        ];
      } else {
        pathString = ["M", primaryPosition.x, primaryPosition.y, "L", secondaryPosition.x, secondaryPosition.y];
      }

      if (typeof this.path !== "undefined" && this.path !== null) {
        this.path.animate({ path: pathString }, 0);
      } else {
        this.path = this.paper.path(pathString);
        this.path.attr({
          stroke: this.options.stroke,
          "stroke-linecap": this.options.strokeLinecap,
          "stroke-opacity": this.options.strokeOpacity,
          "stroke-width": this.options.strokeWidth
        });
      }
    };

    // Creates/resizes Raphael paper/canvas the full height/width of the document
    Joiner.prototype.createPaper = function() {
      var documentWidth = this.$document.width(),
          documentHeight = this.$document.height();
      if (typeof this.path !== "undefined" && this.path !== null) {
        this.paper.setSize(documentWidth, documentHeight);
      } else {
        this.paper = new Raphael(0, 0, documentWidth, documentHeight);
        this.paper.canvas.style.zIndex = this.options.zIndex;
        this.paper.canvas.style.pointerEvents = "none";
      }
    };
    // Get the pixel position of the anchor in the context of the document
    Joiner.prototype.getAnchorPosition = function(element) {
      var elementOffset = element.$node.offset(),
          relativePosition = this.getAnchorPositionRelativeToElement(element);
      return {
        x: relativePosition.x + Math.round(elementOffset.left),
        y: relativePosition.y + Math.round(elementOffset.top)
      };
    };

    // Get the pixel position of the anchor in the context of the element
    // Assumes top left is 0,0
    Joiner.prototype.getAnchorPositionRelativeToElement = function(element) {
      var x, y,
        elementWidth  = element.$node.width(),
        elementHeight = element.$node.height();
      if (element.originY === "top" && element.originX === "left") {
        x = 0;
        y = 0;
      } else if (element.originY === "top" && element.originX === "center") {
        x = Math.floor(elementWidth / 2);
        y = 0;
      } else if (element.originY === "top" && element.originX === "right") {
        x = elementWidth;
        y = 0;
      } else if (element.originY === "center" && element.originX === "left") {
        x = 0;
        y = Math.floor(elementHeight / 2);
      } else if (element.originY === "center" && element.originX === "center") {
        x = Math.floor(elementWidth / 2);
        y = Math.floor(elementHeight / 2);
      } else if (element.originY === "center" && element.originX === "right") {
        x = elementWidth;
        y = Math.floor(elementHeight / 2);
      } else if (element.originY === "bottom" && element.originX === "left") {
        x = 0;
        y = elementHeight;
      } else if (element.originY === "bottom" && element.originX === "center") {
        x = Math.floor(elementWidth / 2);
        y = elementHeight;
      } else if (element.originY === "bottom" && element.originX === "right") {
        x = elementWidth;
        y = elementHeight;
      }
      return {
        x: x,
        y: y
      };
    };

    return Joiner;

  })();

  window.Joiner = Joiner;

})(window);
