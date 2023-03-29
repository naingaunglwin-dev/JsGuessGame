document.addEventListener('DOMContentLoaded', () => {

    const randomNum = (min, max) => {
        return Math.floor(Math.random() * (max - min - 1) + min + 1)
    }

    const randomMinMax = () => {
        const validNumbers = [10, 20, 30, 40, 50, 60, 70, 80, 90];
        const randomIndex  = randomNum(0, validNumbers.length -1);
        const min = validNumbers[randomIndex];
        const max = min + 10;
        return {min, max};
    }

    let score = 0;
    let {min, max}   = randomMinMax();
    let getRandomNum = randomNum(min, max);

    const submitBtn     = document.getElementById('submit');
    const nextGameBtn   = document.getElementById('nextgame');
    const restartBtn    = document.getElementById('restart');
    const answer        = document.getElementById('answer');
    const conditionDiv  = document.getElementById('condition');
    const titleDiv      = document.getElementById('title');

    titleDiv.textContent = `Guess number between ${min} and ${max}`;

    submitBtn.addEventListener('click', () => {
        let answerValue = answer.value;
        switch (true) {
            case answerValue == min:
                conditionDiv.innerHTML = `<p class="red">Please Answer Only Between ${min} and ${max}`;
                break;
            case answerValue == max:
                conditionDiv.innerHTML = `<p class="red">Please Answer Only Between ${min} and ${max}`;
                break;
            case answerValue > getRandomNum && answerValue <= max:
                conditionDiv.innerHTML = '<p class="red">Sorry, Please Try Smaller Number</p>';
                break;
            case answerValue < getRandomNum && answerValue >= min:
                conditionDiv.innerHTML = '<p class="red">Sorry, Please Try Larger Number</p>';
                break;
            case answerValue == '':
                conditionDiv.innerHTML = '<p class="red">Please put the value first to guess</p>';
                break;
            case answerValue == getRandomNum:
                score++;
                document.getElementById('score').innerHTML = score;
                conditionDiv.innerHTML    = '<p class="green">Your Answer is correct</p>';
                submitBtn.style.display   = 'none';
                nextGameBtn.style.display = 'inline-block';
                break;
            default:
                conditionDiv.innerHTML = `<p class="red">Please Answer Only Between ${min} and ${max}`;
                break;
        }
    });

    nextGameBtn.addEventListener('click', () => {
        ({min, max}  = randomMinMax());
        getRandomNum = randomNum(min, max);
        conditionDiv.innerHTML    = '';
        submitBtn.style.display   = 'inline-block';
        nextGameBtn.style.display = 'none';
        answer.value = '';

        titleDiv.textContent = `Guess number between ${min} and ${max}`;
    })

    restartBtn.addEventListener('click', () => {
        return window.location.reload();
    })

});
