sprites = {
    ship: { sx: 0, sy: 0, w: 38, h: 42, frames: 1 },
    enemy: { sx: 80, sy: 0, w: 35, h: 42, frames: 1 }
};

var Starfield = function(speed,opacity,numStars,clear) {
    // Set up the offscreen canvas
    var stars = document.createElement("canvas");
    stars.width = Game.width;
    stars.height = Game.height;
    var starCtx = stars.getContext("2d");
    var offset = 0;
   // var clear = clear;
    // If the clear option is set,
    // make the background black instead of transparent
    if (clear) {
        starCtx.fillStyle = "#000";
        starCtx.fillRect(0, 0, stars.width, stars.height);
    }
    // Now draw a bunch of random 2 pixel
    // rectangles onto the offscreen canvas
    starCtx.fillStyle = "#FFF";
    starCtx.globalAlpha = opacity;
    for(var i=0;i<numStars;i++) {
        starCtx.fillRect(Math.floor(Math.random()*stars.width),
        Math.floor(Math.random()*stars.height),
        2,
        2);
    }
    // This method is called every frame
    // to draw the starfield onto the canvas
    this.draw = function (ctx) {

      

        var intOffset = Math.floor(offset);
        var remaining = stars.height - intOffset;
        // Draw the top half of the starfield
        if(intOffset > 0) {
            ctx.drawImage(stars,
            0, remaining,
            stars.width, intOffset,
            0, 0,
            stars.width, intOffset);
        }
        // Draw the bottom half of the starfield
        if(remaining > 0) {
            ctx.drawImage(stars,
                                0, 0,
                                stars.width, remaining,
                                0, intOffset,
                                stars.width, remaining);
            }
    }
    // This method is called to update
    // the starfield
    this.step = function (dt) {
        offset += dt * speed;
        offset = offset % stars.height;
    }
}

var TitleScreen = function TitleScreen(callback) {
    var x = 0;
    var y = 0;

    TouchControls.touched = function (touchX, touchY) {
        
        x = touchX - sprites['ship'].w/2;
        y = touchY - sprites['ship'].h/2;
    };
   

    this.step = function (dt) {
        if (Game.keys['fire'] && callback) callback();
    };

    this.draw = function (ctx) {
        
        SpriteSheet.draw(Game.ctx, "ship", x, y, 0);
    }
}


var startGame = function () {
    Game.setBoard(0, new Starfield(20, 0.4, 100, true));
    Game.setBoard(1, new Starfield(50, 0.6, 100));
    Game.setBoard(2, new Starfield(100, 1.0, 50));
    Game.setBoard(3, new TitleScreen(function () {
        console.log('start game');
    }));
   
    Game.canvas.addEventListener('touchstart', TouchControls.trackTouch, true);
    Game.canvas.addEventListener('touchmove', TouchControls.trackTouch, true);
    Game.canvas.addEventListener('touchend', TouchControls.trackTouch, true);
}

window.addEventListener("load", function () {
    console.log('window ready');
    Game.initialize("game", sprites, startGame);

   
});

$(document).on("ready", function (e) { e.preventDefault;console.log('doc ready'); });
