import { config } from "./config/config";
import { showError } from "./helpers/dom";
import { generateRandomNumber, getInputValueAsNumber } from "./helpers/helpers";
import { Messages, GameErrors, InputErrors } from "./utils/errors";
import { isValidGuessNumber } from "./validation/validation";

const setMessage = (message: string) => {
  if (!messageElement) return;

  messageElement.textContent = message;
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
  if (secretNumberElement) {
    secretNumberElement.textContent = String(randomNumber);
    secretNumberElement?.classList.add("correct");
  }

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
const errorElement = document.querySelector<HTMLSpanElement>("[data-message]");
const guessInput = document.querySelector<HTMLInputElement>("[data-guess]");
const checkButton = document.querySelector<HTMLButtonElement>("[data-check]");
const resetButton = document.querySelector<HTMLButtonElement>("[data-reset]");
const scoreElement = document.querySelector<HTMLElement>("[data-score]");
const livesElement = document.querySelector<HTMLElement>("[data-lives]");
const highscoreElement =
  document.querySelector<HTMLElement>("[data-highscore]");
const secretNumberElement =
  document.querySelector<HTMLParagraphElement>("[data-secret]");

let randomNumber = generateRandomNumber(config.MIN, config.MAX);
let score = config.INITIAL_SCORE;
let highscore = config.INITIAL_HIGHSCORE;
let lives = config.INITIAL_LIVES;

const guessNumber = () => {
  if (secretNumberElement) {
    secretNumberElement?.classList.remove("correct");
    secretNumberElement.textContent = "?";
  }

  try {
    if (lives <= config.LOST_GAME_LIVES) {
      setHighscore();
      throw new Error(GameErrors.END_GAME);
    }

    const guessNumber = getInputValueAsNumber(guessInput);

    const { isValid, error } = isValidGuessNumber(guessNumber, randomNumber);

    if (!isValid && error) {
      showError(errorElement, error);
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
