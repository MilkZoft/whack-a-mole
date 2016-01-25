(function() {
    'use strict';

    // Getting game board (ul).
    var game = document.querySelector('#game');

    // Start game button
    var startGame = document.querySelector('#start-game');

    // Reset game button
    var resetGame = document.querySelector('#reset-game');

    // Difficulty
    var difficulty = document.querySelector('#difficulty');
    var difficulties = {
        0: 'Easy',
        200: 'Normal',
        500: 'Hard',
        800: 'Impossible'
    };

    // Getting all the moles (li).
    var moles = document.querySelectorAll('.game ul li');

    // Getting the time counter (input).
    var gameTime = document.querySelector('#game-time');

    // Getting the mole hits (input).
    var gameHits = document.querySelector('#game-hits');

    // Current active mole
    var activeMole = -1;

    // Buzz sound
    var buzzSound = document.querySelector('#buzz-sound');

    // Game ended
    var gameEnded = false;

    // Game Score
    var gameScore = document.querySelector('#score');
    var scoreItem;

    // Setting the timer for 60 seconds.
    var gameTimer = new Timer({
        seconds: 60,
        onTime: function(sec) {
            // Updating the time every second
            gameTime.value = sec;
        },
        onTimeEnd: function() {
            var level = difficulties[difficulty.options[difficulty.selectedIndex].value];
            var text = 'Level: ' + level + ' | Hits: ' + gameHits.value;

            // Makes a buzz sound
            buzzSound.play();

            // Shows game over message
            alert('Game over!');

            // Saving score
            scoreItem = document.createElement('li');
            scoreItem.appendChild(document.createTextNode(text));
            gameScore.appendChild(scoreItem);

            // Default values
            resetDefaultValues();

            // Flag of the game status
            gameEnded = true;

            // Activating all moles
            activeAllMoles(true);

            // Disabling reset button.
            toggleButtons();
        }
    });

    // If the user clicks on start game, we start the timer.
    startGame.addEventListener('click', function(event) {
        // Disabling start button.
        toggleButtons(true);

        // Reset default values
        resetDefaultValues();

        // Rendering first mole
        renderMole();

        // Starts a new game
        startNewGame();
    }, false);

    // If the user clicks on reset game, we reset the game.
    resetGame.addEventListener('click', function(event) {
        window.location.reload();
    }, false);

    // Adding click event to the game board (only if the time is grather than 0 seconds)
    game.addEventListener('click', function(event) {
        if (gameTime.value == 0 && gameHits.value == 0 && activeMole === -1 || gameEnded) {
            alert('Press Start Game button to play!');
        } else if (gameTime.value > -1) {
            if (event.target.className === 'active') {
                gameHits.value++;

                if (activeMole !== -1 && gameTime.value == 60) {
                    renderMole();
                }
            }
        } else {
            alert('The game is over');
        }
    }, false);

    /**
     * Functions
     */

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

        // Speed
        var speed = options.speed || 0;

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
            timer = setInterval(decrease, 1000 - speed);
        };

        // Stops the timer.
        this.stop = function () {
            clearInterval(timer);
        };
    }

    // Render mole
    function renderMole() {
        var tempMole = activeMole;

        // Removing active class for previous mole
        if (activeMole > -1) {
            moles[activeMole].className = '';
        }

        activeMole = getRandomMole(4, 3);

        if (tempMole === activeMole && activeMole > 0) {
            activeMole--;
        }

        // Updating active mole
        moles[activeMole].className = 'active';
    }

    // Random Mole
    function getRandomMole(width, height) {
        return Math.floor((Math.random() * (width * height)) + 1) - 1;
    }

    // Default values
    function resetDefaultValues() {
        activeAllMoles(false);
        activeMole = -1;
        gameHits.value = 0;
        gameTime.value = 0;
    }

    // Show or hide all moles
    function activeAllMoles(active) {
        var i;

        for (i = 0; i < moles.length; i++) {
            moles[i].className = active ? 'active' : '';
        }
    }

    // Starts a new game
    function startNewGame() {
        // Possible speeds
        var speeds = {
            0: 60,
            200: 77,
            500: 120,
            800: 300
        };

        // Getting speed based on difficulty
        var speed = difficulty.options[difficulty.selectedIndex].value;

        var moleTimer = new Timer({
            seconds: speeds[speed],
            speed: speed,
            onTime: function() {
                if (!gameEnded) {
                    renderMole();
                }
            }
        });

        // Start timer.
        gameTimer.start();
        moleTimer.start();

        // New game
        gameEnded = false;
    }

    // Toggle for start and reset buttons
    function toggleButtons(start) {
        startGame.className = '';
        resetGame.className = 'no-display';

        if (start) {
            startGame.className = 'no-display';
            resetGame.className = '';
        }
    }
})();
