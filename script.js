(function (window, doc) {

    /**
     * Difficulty levels for the guessing game.
     * @enum {string}
     */
    const LEVEL = {
        EASY: "level-easy",
        MEDIUM: "level-medium",
        HARD: "level-hard",
    };

    /**
     * Guesser object to manage the game's state and functionality.
     * @namespace Guesser
     * @property {string} level - The current difficulty level.
     * @property {number} match - The number of successful guesses.
     * @property {number} guess - The number of guesses taken in the current game.
     * @property {number} random - The current random number to be guessed.
     * @property {number} score - The total score.
     */
    let Guesser = {
        level: LEVEL.EASY,
        match: 0,
        guess: 0,
        random: 0,
        score: 0,
    };

    /**
     * Initializes the game.
     * Sets up event listeners and starts a new game.
     * @returns {object} Guesser - The Guesser object.
     */
    Guesser.init = () => {
        Guesser.nextgame();
        Guesser.restart();

        Guesser.btn.level.forEach(button => {
            button.addEventListener("click", () => Guesser.changelvl(button))
        });

        Guesser.random = Guesser.randomNum(__min, __max);

        return Guesser;
    };

    /**
     * Generates a random number between min and max.
     * @param {number} min - The minimum value (inclusive).
     * @param {number} max - The maximum value (inclusive).
     * @returns {number} - A random number between min and max.
     */
    Guesser.randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min - 1)) + min + 1;
    };

    /**
     * Generates an array of numbers in a range from min to max.
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @returns {Array<number>} - Array of numbers in the range.
     */
    Guesser.range = (min, max) => {
        const array = [];
        for (let i = min; i <= max; i++) {
            array.push(i);
        }

        return array;
    }

    /**
     * Generates random minimum and maximum values based on the current difficulty level.
     * @returns {Object} - An object containing min and max values.
     */
    Guesser.randomMaxAndMin = () => {
        let level = Guesser.level;

        const allowed = Guesser.range(1, 90);
        const index = Guesser.randomNum(0, allowed.length)

        let plus, min;

        switch (level) {
            case LEVEL.EASY:
                min  = allowed[index];
                plus = 10;

                break;

            case LEVEL.MEDIUM:
                min = allowed[index < 50 ? index : Guesser.randomNum(0, 60)];
                plus = 40;

                break;

            case LEVEL.HARD:
                min  = 1;
                plus = 99;

                break;

            default:
                min = allowed[index];
                plus = 10;

                break;
        }

        let max = min + plus;

        return {min: min, max: max};
    };

    /**
     * Button elements used in the game.
     */
    Guesser.btn = {
        submit: doc.getElementById('submit'),
        next: doc.getElementById('nextgame'),
        restart: doc.getElementById('restart'),
        level: doc.querySelectorAll('.level-choose'),
    };

    /**
     * Block elements in the game UI.
     */
    Guesser.block = {
        condition: doc.getElementById('condition'),
        title: doc.getElementById('title'),
        guess: doc.getElementById('guess-time'),
        matches: doc.getElementById('matches'),
        answer: doc.getElementById('answer'),
        score: doc.getElementById('score'),
    };

    /**
     * Messages displayed to the user based on game events.
     */
    Guesser.messages = {
        /**
         * Displays different messages based on the game state.
         * @param {Object} data - The data describing the game state.
         * @param {string} data.type - The type of message.
         * @param {string} [data.try] - The direction (larger or smaller) to guess.
         * @param {number} [data.min] - The minimum guessable number.
         * @param {number} [data.max] - The maximum guessable number.
         * @returns {string} - The message to display.
         */
        condition: (data) => {

            switch (data.type) {
                case "almost":
                    return `Almost there, please try with ${data.try} number`;

                case "fail":
                    return `Sorry, please try with ${data.try} number`;

                case "only":
                    return `Please answer only between <br>${data.min} and ${data.max}`;

                case "empty":
                    return `Please enter the value first to guess`;

                case "correct":
                    return `Your answer is correct`;
            }
        },

        /**
         * Generates a title message based on min and max values.
         * @param {number} min - The minimum value.
         * @param {number} max - The maximum value.
         * @returns {string} - The title message.
         */
        title: (min, max) => {
            return `Guess number between ${min} and ${max}`;
        }
    };

    let {min: __min, max: __max} = Guesser.randomMaxAndMin();

    /**
     * Starts the game logic and handles user input for guessing.
     */
    Guesser.run = () => {
        let score, guess, random, level, match;

        score  = Guesser.score;
        guess  = Guesser.guess;
        random = Guesser.random;

        Guesser.block.condition.style.display = "none";
        Guesser.block.answer.style.pointerEvents  = "all";

        Guesser.block.title.textContent = Guesser.messages.title(__min, __max);

        Guesser.btn.submit.addEventListener('click', function () {
            let answer = Guesser.block.answer.value;

            guess++;
            Guesser.block.guess.innerText = guess;

            Guesser.block.condition.style.display = "block";
            Guesser.block.condition.classList.remove("success");
            Guesser.block.condition.classList.add("error");

            if (answer === '') {
                Guesser.sound("wrong", 7);
                Guesser.block.condition.innerText = Guesser.messages.condition({type: "empty"});

                return;
            }

            answer = Number(answer);
            __min  = Number(__min);
            __max  = Number(__max);

            switch (true) {
                case answer === __min:
                    Guesser.sound("wrong", 7);
                    Guesser.block.condition.innerHTML = Guesser.messages.condition({type: "only", min: __min, max: __max});

                    break;

                case answer === __max:
                    Guesser.sound("wrong", 7);
                    Guesser.block.condition.innerHTML = Guesser.messages.condition({type: "only", min: __min, max: __max});

                    break;

                case answer > random && answer <= __max:
                    Guesser.sound("wrong", 7);
                    if (Math.abs(answer - random) <= 2) {
                        Guesser.block.condition.innerText = Guesser.messages.condition({type: "almost", try: "smaller"});
                    } else {
                        Guesser.block.condition.innerText = Guesser.messages.condition({type: "fail", try: "smaller"});
                    }

                    break;

                case answer < random && answer >= __min:
                    Guesser.sound("wrong", 7);
                    if (Math.abs(answer - random) <= 2) {
                        Guesser.block.condition.innerText = Guesser.messages.condition({type: "almost", try: "larger"});
                    } else {
                        Guesser.block.condition.innerText = Guesser.messages.condition({type: "fail", try: "larger"});
                    }

                    break;

                case answer === random:
                    Guesser.block.answer.style.pointerEvents = "none";

                    Guesser.sound("winner", 2);

                    Guesser.match++;

                    score = Guesser.POINT(Guesser.level, guess, Number(score));
                    Guesser.score = score;
                    Guesser.block.score.innerHTML = score;

                    Guesser.block.condition.classList.remove("error");
                    Guesser.block.condition.classList.add("success");
                    Guesser.block.condition.innerText = Guesser.messages.condition({type: "correct"});

                    Guesser.block.matches.innerText = Guesser.match;

                    Guesser.btn.submit.style.display = "none";
                    Guesser.btn.next.style.display = "inline-block";

                    break;

                default:
                    Guesser.sound("wrong", 7);
                    Guesser.block.condition.innerHTML = Guesser.messages.condition({type: "only", min: __min, max: __max});
                    break;
            }
        });
    };

    /**
     * Changes the difficulty level of the game.
     * @param {HTMLElement} clicked - The button clicked to change the level.
     */
    Guesser.changelvl = (clicked) => {
        Guesser.btn.level.forEach(
            button => button.classList.remove("active")
        );

        clicked.classList.add("active");

        Guesser.level = clicked.id;
        Guesser.newgame();
    };

    /**
     * Starts a new game with updated random numbers.
     */
    Guesser.newgame = () => {
        let {min: min, max: max} = Guesser.randomMaxAndMin();
        __min = min;
        __max = max;
        Guesser.random  = Guesser.randomNum(__min, __max);
        Guesser.guess   = 0;
        Guesser.block.guess.innerText = "0";
        Guesser.block.answer.value = "";
        Guesser.block.title.textContent = Guesser.messages.title(__min, __max);
        Guesser.block.condition.innerHTML = "";
        Guesser.match.innerText = "0";
        Guesser.btn.submit.style.display = "inline-block";
        Guesser.btn.next.style.display = "none";
        Guesser.block.condition.style.display = "none";
        Guesser.block.answer.pointerEvents = "all";

        Guesser.run();
    };

    /**
     * Handles starting a new game when the 'Next Game' button is clicked.
     */
    Guesser.nextgame = () => {
        Guesser.btn.next.addEventListener("click", Guesser.newgame);
    };

    /**
     * Restarts the game when the 'Restart' button is clicked.
     */
    Guesser.restart = () => {
        Guesser.btn.restart.addEventListener("click", () => {
            Guesser.block.score.innerHTML = "0";
            Guesser.match = 0;
            Guesser.block.matches.innerText = "0";
            Guesser.score = 0;
            Guesser.newgame()
        });
    };

    /**
     * Plays a sound based on the provided type and number.
     * @param {string} sound - The type of sound to play.
     * @param {number} speed - A speed to the sound.
     */
    Guesser.sound = (sound, speed = 1) => {
        let audio = new Audio(`./audio/${sound}.mp3`);

        audio.playbackRate = speed;

        audio.play();
    };

    /**
     * Calculates the score based on the current level and number of guesses.
     * @param {string} level - The current game difficulty level.
     * @param {number} guess - The number of guesses taken.
     * @param {number} score - The current score.
     * @returns {number} - The updated score.
     */
    Guesser.POINT = (level, guess, score) => {
        if (level === 'level-hard') {
            if (guess === 1) {
                score += 15;
            } else if (guess === 2) {
                score += 12;
            } else if (guess === 3) {
                score += 9;
            } else if (guess === 4 || guess === 5) {
                score += 6;
            } else if (guess === 6) {
                score += 3;
            } else {
                score += 1;
            }
        } else if (level === 'level-medium') {
            if (guess === 1) {
                score += 8;
            } else if (guess === 2) {
                score += 6;
            } else if (guess === 3) {
                score += 4;
            } else if (guess === 4 || guess === 5) {
                score += 3;
            } else {
                score += 1;
            }
        } else {
            if (guess === 1) {
                score += 5;
            } else if (guess === 2) {
                score += 3;
            } else {
                score += 1;
            }
        }

        return score;
    };

    window.Guesser = Guesser;

})(window, document);
