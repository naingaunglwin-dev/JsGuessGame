document.addEventListener('DOMContentLoaded', () => {

    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min - 1) + min + 1);
    }

    const randomMinMax = () => {
        const validNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
        const randomIndex  = randomNum(0, validNumbers.length -1);
        const min = validNumbers[randomIndex];
        const max = min + 10;
        return {min, max};
    }

    let score = 0;
    let guessTime    = 0;
    let {min, max}   = randomMinMax();
    let getRandomNum = randomNum(min, max);
    let bestGuessCount = Infinity;

    const submitBtn         = document.getElementById('submit');
    const nextGameBtn       = document.getElementById('nextgame');
    const restartBtn        = document.getElementById('restart');
    const answer            = document.getElementById('answer');
    const conditionDiv      = document.getElementById('condition');
    const titleDiv          = document.getElementById('title');
    const guessDiv          = document.getElementById('guess-time');
    const bestGuessCountDiv = document.getElementById('guess');

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
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
            case answerValue == max:
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
            case answerValue > getRandomNum && answerValue <= max:
                if (Math.abs(answerValue - getRandomNum) <= 2) {
                    conditionDiv.innerText = 'Almost there, please try a smaller number';
                } else {
                    conditionDiv.innerText = 'Sorry, Please Try Smaller Number';
                }
                break;
            case answerValue < getRandomNum && answerValue >= min:
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
                score++;
                document.getElementById('score').innerHTML = score;
                conditionDiv.classList.remove("error");
                conditionDiv.classList.add("success");

                if (guessTime < bestGuessCount) {
                    bestGuessCount = guessTime;
                }

                bestGuessCountDiv.innerText = bestGuessCount;

                conditionDiv.innerText    = 'Your Answer is correct';
                submitBtn.style.display   = 'none';
                nextGameBtn.style.display = 'inline-block';

                break;
            default:
                conditionDiv.innerHTML = `Please Answer Only Between <br>${min} and ${max}`;
                break;
        }
    });

    const NewGame = () => {
        ({min, max}  = randomMinMax());
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
        NewGame();
    });

    restartBtn.addEventListener('click', () => {
        document.getElementById('score').innerHTML = '0';
        bestGuessCount = Infinity;
        bestGuessCountDiv.innerText = ' - ';
        NewGame();
    });

});
