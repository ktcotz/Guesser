enum Errors {
  NOT_FOUND_GUESS_INPUT = "Can't find a guess input 🛑",
  EMPTY_INPUT = "Empty input 🛑",
  INVALID_INPUT = "Accept numbers between 1-20 🛑",
}

const config = {
  MIN: 1,
  MAX: 20,
};

const handleGuesserGame = () => {
  const messageElement =
    document.querySelector<HTMLSpanElement>("[data-message]");
  const guessInput = document.querySelector<HTMLInputElement>("[data-guess]");
  const checkButton = document.querySelector<HTMLButtonElement>("[data-check]");

  const getGuessInputNumber = () => {
    if (!guessInput) {
      throw new Error(Errors.NOT_FOUND_GUESS_INPUT);
    }

    const number = Number(guessInput.value);

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

  const setMessage = (message: string) => {
    if (!messageElement) return;

    messageElement.textContent = message;
  };

  const guessNumber = () => {
    try {
      const guessNumber = getGuessInputNumber();
      console.log(guessNumber);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
    }
  };

  checkButton?.addEventListener("click", () => {
    guessNumber();
  });
};

handleGuesserGame();
