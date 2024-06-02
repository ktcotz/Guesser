var Errors;
(function (Errors) {
    Errors["NOT_FOUND_GUESS_INPUT"] = "Can't find a guess input \uD83D\uDED1";
    Errors["EMPTY_INPUT"] = "Empty input \uD83D\uDED1";
    Errors["INVALID_INPUT"] = "Accept numbers between 1-20 \uD83D\uDED1";
    Errors["NUMBER_TO_LOW"] = "Too low!";
    Errors["NUMBER_TO_HIGH"] = "Too high!";
    Errors["END_GAME"] = "Game just finished!";
})(Errors || (Errors = {}));
var config = {
    MIN: 1,
    MAX: 20,
};
var handleGuesserGame = function () {
    var generateRandomNumber = function (min, max) {
        return Math.trunc(Math.random() * (max - min) + min);
    };
    var getGuessInputNumber = function () {
        if (!guessInput) {
            throw new Error(Errors.NOT_FOUND_GUESS_INPUT);
        }
        var number = Number(guessInput.value);
        if (Number.isNaN(number)) {
            throw new Error(Errors.INVALID_INPUT);
        }
        if (!number) {
            throw new Error(Errors.EMPTY_INPUT);
        }
        if (number < config.MIN || number > config.MAX) {
            throw new Error(Errors.INVALID_INPUT);
        }
        return number;
    };
    var setMessage = function (message) {
        if (!messageElement)
            return;
        messageElement.textContent = message;
    };
    var isValidNumber = function (guessNumber) {
        if (guessNumber < randomNumber) {
            setMessage(Errors.NUMBER_TO_LOW);
            return false;
        }
        if (guessNumber > randomNumber) {
            setMessage(Errors.NUMBER_TO_HIGH);
            return false;
        }
        return true;
    };
    var setUI = function () {
        if (!scoreElement)
            return;
        scoreElement.textContent = String(score);
        if (!livesElement)
            return;
        livesElement.textContent = String(lives);
        if (!highscoreElement)
            return;
        highscoreElement.textContent = String(highscore);
    };
    var setHighscore = function () {
        if (highscore <= score) {
            highscore = score;
        }
        score = 0;
        setUI();
    };
    var clearInput = function () {
        if (!guessInput)
            return;
        guessInput.value = "";
    };
    var unsuccesfullUI = function () {
        lives--;
        setUI();
    };
    var succesfullUI = function () {
        score++;
        randomNumber = generateRandomNumber(config.MIN, config.MAX);
        setMessage("Correct!");
        setUI();
        clearInput();
    };
    var resetGame = function () {
        score = 0;
        lives = 5;
        setMessage("Waiting...");
        clearInput();
        setUI();
    };
    var messageElement = document.querySelector("[data-message]");
    var guessInput = document.querySelector("[data-guess]");
    var checkButton = document.querySelector("[data-check]");
    var resetButton = document.querySelector("[data-reset]");
    var scoreElement = document.querySelector("[data-score]");
    var livesElement = document.querySelector("[data-lives]");
    var highscoreElement = document.querySelector("[data-highscore]");
    var randomNumber = generateRandomNumber(config.MIN, config.MAX);
    var score = 0;
    var highscore = 0;
    var lives = 5;
    var guessNumber = function () {
        try {
            if (lives <= 0) {
                setHighscore();
                throw new Error(Errors.END_GAME);
            }
            var guessNumber_1 = getGuessInputNumber();
            if (!isValidNumber(guessNumber_1)) {
                return unsuccesfullUI();
            }
            succesfullUI();
        }
        catch (err) {
            if (err instanceof Error) {
                setMessage(err.message);
            }
        }
    };
    checkButton === null || checkButton === void 0 ? void 0 : checkButton.addEventListener("click", function () {
        guessNumber();
    });
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener("click", function () {
        resetGame();
    });
    setUI();
};
handleGuesserGame();
