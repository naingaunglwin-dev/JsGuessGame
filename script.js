document.addEventListener('DOMContentLoaded', () => {

    let level = "level-easy";
    let match = 0;

    const levelBtn = document.querySelectorAll('.level-choose');

    levelBtn.forEach(button => {
        button.addEventListener('click', () => ChangeLevel(button))
    });

    console.log(level);

    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min - 1) + min + 1);
    };

    const randomMinMax = (level = 0) => {
        const validNumbers = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];
        const randomIndex  = randomNum(0, validNumbers.length -1);

        let plus, min;

        switch (level) {
            case "level-easy":
                min  = validNumbers[randomIndex];
                plus = 10;
                break;

            case "level-medium":
                min  = validNumbers[randomIndex < 8 ? randomIndex : randomNum(0, 8)];
                plus = 40;
                break;

            case "level-hard":
                min  = 10
                plus = 80;
                break;

            default:
                min  = validNumbers[randomIndex];
                plus = 10;
                break;
        }

        const max = min + plus;
        return {min, max};
    };

    let score = 0;
    let guessTime    = 0;
    let {min, max}   = randomMinMax();
    let getRandomNum = randomNum(min, max);

    const submitBtn         = document.getElementById('submit');
    const nextGameBtn       = document.getElementById('nextgame');
    const restartBtn        = document.getElementById('restart');
    const answer            = document.getElementById('answer');
    const conditionDiv      = document.getElementById('condition');
    const titleDiv          = document.getElementById('title');
    const guessDiv          = document.getElementById('guess-time');
    const totalMatchesDiv   = document.getElementById('matches');

    conditionDiv.style.display = 'none';
    answer.style.pointerEvents = "all";

    titleDiv.textContent = `Guess number between ${min} and ${max}`;

    submitBtn.addEventListener('click', () => {
        let answerValue = Number(answer.value);
        guessTime++;
        guessDiv.innerText = guessTime;
        conditionDiv.style.display = 'block';
        conditionDiv.classList.remove("success");
        conditionDiv.classList.add("error");

        switch (true) {
            case answerValue == min:
                GameSounds("./audio/wrong.mp3", 7);
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
            case answerValue == max:
                GameSounds("./audio/wrong.mp3", 7);
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
            case answerValue > getRandomNum && answerValue <= max:
                GameSounds("./audio/wrong.mp3", 7);
                if (Math.abs(answerValue - getRandomNum) <= 2) {
                    conditionDiv.innerText = 'Almost there, please try a smaller number';
                } else {
                    conditionDiv.innerText = 'Sorry, Please Try Smaller Number';
                }
                break;
            case answerValue < getRandomNum && answerValue >= min:
                GameSounds("./audio/wrong.mp3", 7);
                if (Math.abs(answerValue - getRandomNum) <= 2) {
                    conditionDiv.innerText = 'Almost there, please try a larger number';
                } else {
                    conditionDiv.innerText = 'Sorry, Please Try Larger Number';
                }
                break;
            case answerValue == '':
                conditionDiv.innerText = 'Please put the value first to guess';
                break;
            case answerValue == getRandomNum:
                answer.style.pointerEvents = "none";

                GameSounds("./audio/winner.mp3", 2);

                match++;

                if (level === 'level-hard') {
                    if (guessTime == 1) {
                        score += 15;
                    } else if (guessTime == 2) {
                        score += 12;
                    } else if (guessTime == 3) {
                        score += 9;
                    } else if (guessTime == 4 || guessTime == 5) {
                        score += 6;
                    } else if (guessTime == 6) {
                        score += 3;
                    } else {
                        score += 1;
                    }
                } else if (level === 'level-medium') {
                    if (guessTime == 1) {
                        score += 8;
                    } else if (guessTime == 2) {
                        score += 6;
                    } else if (guessTime == 3) {
                        score += 4;
                    } else if (guessTime == 4 || guessTime == 5) {
                        score += 3;
                    } else {
                        score += 1;
                    }
                } else {
                    if (guessTime == 1) {
                        score += 5;
                    } else if (guessTime == 2) {
                        score += 3;
                    } else {
                        score += 1;
                    }
                }

                document.getElementById('score').innerHTML = score;
                conditionDiv.classList.remove("error");
                conditionDiv.classList.add("success");

                totalMatchesDiv.innerText = match;

                conditionDiv.innerText    = 'Your Answer is correct';
                submitBtn.style.display   = 'none';
                nextGameBtn.style.display = 'inline-block';

                break;
            default:
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
        }
    });

    const ChangeLevel = (clicked) => {
        levelBtn.forEach(button => button.classList.remove('active'));
        clicked.classList.add('active');

        level = clicked.id;
        NewGame(clicked.id);
    };

    const GameSounds = (sound, speed = 1) => {
        let audio = new Audio(sound);
        audio.playbackRate = speed
        audio.play();
    };

    const NewGame = (level) => {
        ({min, max}  = randomMinMax(level));
        getRandomNum = randomNum(min, max);
        guessTime = 0;
        answer.value = '';
        titleDiv.textContent = `Guess number between ${min} and ${max}`;
        conditionDiv.innerHTML    = '';
        guessDiv.innerText = '0';
        submitBtn.style.display   = 'inline-block';
        nextGameBtn.style.display = 'none';
        conditionDiv.style.display = 'none';
        answer.style.pointerEvents = "all";
    }

    nextGameBtn.addEventListener('click', () => {
        NewGame(level);
    });

    restartBtn.addEventListener('click', () => {
        document.getElementById('score').innerHTML = '0';
        match = 0;
        totalMatchesDiv.innerText = "0";
        score = 0;
        NewGame(level);
    });

});
