(function() {
    'use strict';

    // Getting game board (ul).
    var game = document.querySelector('#game');

    // Getting all the moles (li).
    var moles = document.querySelectorAll('.game ul li');

    // Getting the time counter (input).
    var gameTime = document.querySelector('#game-time');

    // Getting the mole hits (input).
    var gameHits = document.querySelector('#game-hits');

    // Setting the timer for 60 seconds.
    var timer = new Timer({
        seconds: 20,
        onTime: function(sec) {
            gameTime.value = sec;
        },
        onTimeEnd: function() {
            alert('Game over!');

            for (var i = 0; i < moles.length; i++) {
                moles[i].className = 'active';
            }
        }
    });

    // Adding click event to the game board (only if the time is grather than 0 seconds)
    game.addEventListener('click', function(event) {
        if (gameTime.value > 0) {
            if (event.target.className === 'active') {
                gameHits.value++;
            }
        } else {
            alert('The game is over');
        }
    }, false);

    // Start timer.
    timer.start();

    // Timer function
    function Timer(options) {
        // Timer instance
        var Timer = this;

        // Timer counter
        var timer;

        // Seconds (60 by default)
        var seconds = options.seconds || 60;

        // onTime function is executed each second
        var onTime = options.onTime || function() {};

        // onTimeEnd functions is executed when the time is 0 seconds.
        var onTimeEnd = options.onTimeEnd || function() {};

        // Decreasing the time second by second.
        function decrease() {
            onTime(seconds);

            // If seconds is 0 then we stop the timer and execute onTimeEnd() function.
            if (seconds === 0) {
                onTimeEnd();
                Timer.stop();
            }

            seconds--;
        }

        // Starts the timer.
        this.start = function() {
            clearInterval(timer);
            timer = 0;
            seconds = options.seconds;
            timer = setInterval(decrease, 1000);
        };

        // Stops the timer.
        this.stop = function () {
            clearInterval(timer);
        };
    }
})();
