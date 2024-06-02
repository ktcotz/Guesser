var Errors;
(function (Errors) {
    Errors["NOT_FOUND_GUESS_INPUT"] = "Can't find a guess input \uD83D\uDED1";
    Errors["EMPTY_INPUT"] = "Empty input \uD83D\uDED1";
    Errors["INVALID_INPUT"] = "Accept numbers between 1-20 \uD83D\uDED1";
})(Errors || (Errors = {}));
var config = {
    MIN: 1,
    MAX: 20,
};
var handleGuesserGame = function () {
    var messageElement = document.querySelector("[data-message]");
    var guessInput = document.querySelector("[data-guess]");
    var checkButton = document.querySelector("[data-check]");
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
        if (number <= config.MIN || number >= config.MAX) {
            throw new Error(Errors.INVALID_INPUT);
        }
        return number;
    };
    var setMessage = function (message) {
        if (!messageElement)
            return;
        messageElement.textContent = message;
    };
    var guessNumber = function () {
        try {
            var guessNumber_1 = getGuessInputNumber();
            console.log(guessNumber_1);
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
};
handleGuesserGame();
