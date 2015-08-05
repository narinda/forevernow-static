
// TODO: convert to coffee and ensure setInterval is cleared on rezise.
function initStars() {
    var canvas = document.getElementById("starfield");

    canvas.width = $(window).width();
    canvas.height = $(window).height();

    canvas.style.display='block';
    var context = canvas.getContext("2d");
    context.fillStyle = "#101010";
    context.fillRect(0, 0, canvas.width, canvas.height);

    createStars();
    clearInterval(window.starfieldInterval);
    window.starfieldInterval = window.setInterval(updateStars, 100);
}

function Star(x, y, opacity, opacityIncrement, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    // this.direction = [Math.round(Math.random()*2)-1, Math.round(Math.random()*2)-1];
    this.oldx = x;
    this.oldy = y;
    this.opacity = opacity; // 1-100
    this.opacityIncrement = opacityIncrement; // amt to increment by

    this.size = function() {
        return 1;
    }

    this.move = function() {
        this.oldx = this.x;
        this.oldy = this.y;
        this.x = Math.floor(Math.random() * this.canvasWidth);
        this.y = Math.floor(Math.random() * this.canvasHeight);
    }

    // returns a string that will be used to set the fillStyle of the <canvas>
    this.fillStyle = function() {
        return "rgba(180, 180, 180, " + (this.opacity/100) + ")";
    }

    // increments opacity and performs bound checks
    this.incrementOpacity = function() {
        this.opacity += this.opacityIncrement;
        if (this.opacity >= 100) {
            this.opacity = 100 - this.opacityIncrement;
            this.opacityIncrement = this.opacityIncrement * -1;
        }
        else if (this.opacity < 5 && this.opacityIncrement < 0) {
            this.opacityIncrement = this.opacityIncrement * -1;
            this.opacity = this.opacityIncrement;
            // this.move();
        }
    }
    this.shake = function(){
        this.oldx = this.x;
        this.x = this.x + (Math.round(Math.random()*2)-1); // + this.direction[0];
        this.oldy = this.y;
        this.y = this.y + (Math.round(Math.random()*2)-1);//s + this.direction[1];
    }
}

function createStars() {
    var canvas = document.getElementById("starfield");
    var context = canvas.getContext("2d");
    var oneDimensionalStarDensity = 50;
    
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var numStars = (canvasWidth/oneDimensionalStarDensity) * (canvasHeight/oneDimensionalStarDensity);

    STARS_ARRAY = new Array;
    for (var i = 0; i < numStars; i++) {
        var x = Math.floor(Math.random() * canvasWidth);
        var y = Math.floor(Math.random() * canvasHeight);
        var opacity = Math.floor(Math.random()*100);
        var opacityIncrement = Math.floor(Math.random()*10);
        STARS_ARRAY.push(new Star(x, y, opacity, opacityIncrement, canvasWidth, canvasHeight));
    }
}

function updateStars() {
    var canvas = document.getElementById("starfield");
    var context = canvas.getContext("2d");
    for (var i = 0; i < STARS_ARRAY.length; i++) {
        var star = STARS_ARRAY[i];
        star.incrementOpacity();
        if (i%5 == 0) {
            star.shake();
        }

    }
    renderStars();
}

function renderStars() {
    var canvas = document.getElementById("starfield");
    var context = canvas.getContext("2d");
    for (var i = 0; i < STARS_ARRAY.length; i++) {
        var star = STARS_ARRAY[i];
        context.fillStyle = "#101010";
        context.fillRect(star.oldx, star.oldy, 1, 1);
        context.fillStyle = star.fillStyle();
        context.fillRect(star.x, star.y, star.size(), star.size());
    }
}



$(document).ready(function() {
  if (!window.isMobile.any()) {
    initStars();
    $(window).on('resize', initStars);
  }
})
