import { config } from "./config/config";
import { showError } from "./helpers/dom";
import { generateRandomNumber, getInputValueAsNumber } from "./helpers/helpers";
import { state } from "./state/state";
import { Messages, GameErrors } from "./utils/errors";
import { isValidGuessNumber } from "./validation/validation";

const setMessage = (message: string) => {
  if (!messageElement) return;

  messageElement.textContent = message;
};

const setUI = () => {
  if (!scoreElement) return;

  scoreElement.textContent = String(state.score);

  if (!livesElement) return;

  livesElement.textContent = String(state.lives);

  if (!highscoreElement) return;

  highscoreElement.textContent = String(state.highscore);
};

const setHighscore = () => {
  if (state.highscore <= state.score) {
    state.highscore = state.score;
  }

  state.score = config.INITIAL_SCORE;
  setUI();
};

const clearInput = () => {
  if (!guessInput) return;

  guessInput.value = "";
};

const unsuccesfullUI = () => {
  state.lives--;
  setUI();
};

const succesfullUI = () => {
  if (secretNumberElement) {
    secretNumberElement.textContent = String(state.randomNumber);
    secretNumberElement?.classList.add("correct");
  }

  state.score++;
  state.randomNumber = generateRandomNumber(config.MIN, config.MAX);
  setMessage(Messages.CORRECT_GUESS);
  setUI();
  clearInput();
};

const resetGame = () => {
  state.score = config.INITIAL_SCORE;
  state.lives = config.INITIAL_LIVES;
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

const guessNumber = () => {
  if (secretNumberElement) {
    secretNumberElement?.classList.remove("correct");
    secretNumberElement.textContent = "?";
  }

  try {
    if (state.lives <= config.LOST_GAME_LIVES) {
      setHighscore();
      throw new Error(GameErrors.END_GAME);
    }

    const guessNumber = getInputValueAsNumber(guessInput);

    const { isValid, error } = isValidGuessNumber(
      guessNumber,
      state.randomNumber
    );

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
