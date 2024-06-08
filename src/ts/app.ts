import { config } from "./config/config";
import {
  clearInput,
  manageElementState,
  setElementContent,
  setFocus,
  showError,
  showMessage,
} from "./helpers/dom";
import { generateRandomNumber, getInputValueAsNumber } from "./helpers/helpers";
import { state } from "./state/state";
import { Messages, GameErrors } from "./utils/errors";
import { isValidGuessNumber } from "./validation/validation";

const setUI = () => {
  setFocus(guessInput);

  setElementContent(scoreElement, state.getFromState("score"));
  setElementContent(livesElement, state.getFromState("lives"));
  setElementContent(highscoreElement, state.getFromState("highscore"));
};

const setHighscore = () => {
  if (state.getFromState("highscore") <= state.getFromState("score")) {
    state.setState("highscore", state.getFromState("score"));
  }

  state.setState("score", config.INITIAL_SCORE);
  setUI();
};

const unsuccessfulUI = () => {
  state.setState("lives", state.getFromState("lives") - 1);
  setUI();
};

const successfulUI = () => {
  showMessage(messageElement, Messages.CORRECT_GUESS);

  manageElementState(
    secretNumberElement,
    { type: "add", className: "correct" },
    state.getFromState("randomNumber")
  );

  state.setState("score", state.getFromState("score") + 1);
  state.setState("randomNumber", generateRandomNumber(config.MIN, config.MAX));

  clearInput(guessInput);

  setUI();
};

const resetGame = () => {
  state.setState("score", config.INITIAL_SCORE);
  state.setState("lives", config.INITIAL_LIVES);

  showMessage(messageElement, Messages.WAITING);

  clearInput(guessInput);

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
  manageElementState(
    secretNumberElement,
    { type: "remove", className: "correct" },
    "?"
  );

  try {
    if (state.getFromState("lives") <= config.LOST_GAME_LIVES) {
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
      return unsuccessfulUI();
    }

    successfulUI();
  } catch (err) {
    if (err instanceof Error) {
      showError(errorElement, err.message);
    }
  }
};

checkButton?.addEventListener("click", () => {
  guessNumber();
});

document.body.addEventListener("keypress", ({ target, key }) => {
  if (key === "Enter" && target === guessInput) {
    guessNumber();
  }
});

resetButton?.addEventListener("click", () => {
  resetGame();
});

const initGame = () => {
  showMessage(messageElement, Messages.WAITING);
  setUI();
};

initGame();
