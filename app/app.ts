enum Errors {
  NOT_FOUND_GUESS_INPUT = "Can't find a guess input 🛑",
  EMPTY_INPUT = "Empty input 🛑",
  INVALID_INPUT = "Accept numbers between 1-20 🛑",
  NUMBER_TO_LOW = "Too low!",
  NUMBER_TO_HIGH = "Too high!",
  END_GAME = "Game just finished!",
}

enum Messages {
  CORRECT_GUESS = "Correct! 😊",
  WAITING = "Waiting... ✌️",
}

const config = {
  MIN: 1,
  MAX: 20,
  INITIAL_SCORE: 0,
  INITIAL_LIVES: 5,
  INITIAL_HIGHSCORE: 0,
  LOST_GAME_LIVES: 0,
};

const handleGuesserGame = () => {
  const generateRandomNumber = (min: number, max: number) => {
    return Math.trunc(Math.random() * (max - min) + min);
  };

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

    if (number < config.MIN || number > config.MAX) {
      throw new Error(Errors.INVALID_INPUT);
    }

    return number;
  };

  const setMessage = (message: string) => {
    if (!messageElement) return;

    messageElement.textContent = message;
  };

  const isValidNumber = (guessNumber: number) => {
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

  const setUI = () => {
    if (!scoreElement) return;

    scoreElement.textContent = String(score);

    if (!livesElement) return;

    livesElement.textContent = String(lives);

    if (!highscoreElement) return;

    highscoreElement.textContent = String(highscore);
  };

  const setHighscore = () => {
    if (highscore <= score) {
      highscore = score;
    }

    score = config.INITIAL_SCORE;
    setUI();
  };

  const clearInput = () => {
    if (!guessInput) return;

    guessInput.value = "";
  };

  const unsuccesfullUI = () => {
    lives--;
    setUI();
  };

  const succesfullUI = () => {
    score++;
    randomNumber = generateRandomNumber(config.MIN, config.MAX);
    setMessage(Messages.CORRECT_GUESS);
    setUI();
    clearInput();
  };

  const resetGame = () => {
    score = config.INITIAL_SCORE;
    lives = config.INITIAL_LIVES;
    setMessage(Messages.WAITING);
    clearInput();
    setUI();
  };

  const messageElement =
    document.querySelector<HTMLSpanElement>("[data-message]");
  const guessInput = document.querySelector<HTMLInputElement>("[data-guess]");
  const checkButton = document.querySelector<HTMLButtonElement>("[data-check]");
  const resetButton = document.querySelector<HTMLButtonElement>("[data-reset]");
  const scoreElement = document.querySelector<HTMLElement>("[data-score]");
  const livesElement = document.querySelector<HTMLElement>("[data-lives]");
  const highscoreElement =
    document.querySelector<HTMLElement>("[data-highscore]");

  let randomNumber = generateRandomNumber(config.MIN, config.MAX);
  let score = config.INITIAL_SCORE;
  let highscore = config.INITIAL_HIGHSCORE;
  let lives = config.INITIAL_LIVES;

  const guessNumber = () => {
    try {
      if (lives <= config.LOST_GAME_LIVES) {
        setHighscore();
        throw new Error(Errors.END_GAME);
      }

      const guessNumber = getGuessInputNumber();

      if (!isValidNumber(guessNumber)) {
        return unsuccesfullUI();
      }

      succesfullUI();
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
    }
  };

  checkButton?.addEventListener("click", () => {
    guessNumber();
  });

  resetButton?.addEventListener("click", () => {
    resetGame();
  });

  setUI();
};

handleGuesserGame();
