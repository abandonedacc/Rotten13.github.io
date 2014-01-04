var TouchControls = new function () {
    this.touched = function () { };
    var gutterWidth = 10;
    var unitWidth = Game.width / 5;
    var blockWidth = unitWidth - gutterWidth;


    this.step = function (dt) { };

    this.trackTouch = function (e) {
        //var touch, x;

        e.preventDefault();
      
        for (var i = 0; i < e.targetTouches.length; i++) {
            touch = e.targetTouches[i];
            TouchControls.touched(touch.pageX - Game.canvas.offsetLeft, touch.pageY - Game.canvas.offsetTop);
        }
        /* for (var i = 0; i < e.targetTouches.length; i++) {
           touch = e.targetTouches[i];
            x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
            if (x < unitWidth) {
                Game.keys['left'] = true;
            }
            if (x > unitWidth && x < 2 * unitWidth) {
                Game.keys['right'] = true;
            }
        }

        if (e.type == 'touchstart' || e.type == 'touchend') {
            for (i = 0; i < e.changedTouches.length; i++) {
                touch = e.changedTouches[i];
                x = touch.pageX / Game.canvasMultiplier - Game.canvas.offsetLeft;
                if (x > 4 * unitWidth) {
                    Game.keys['fire'] = (e.type == 'touchstart');
                }
            }
        }
        */
    };

    

};
