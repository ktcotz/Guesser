import { InputErrors } from "../utils/errors";
import { config } from "../config/config";

export const generateRandomNumber = (min: number, max: number) => {
  return Math.trunc(Math.random() * (max - min) + min);
};

export const getInputValueAsNumber = (input: HTMLInputElement | null) => {
  if (!input) {
    throw new Error(InputErrors.NOT_FOUND_GUESS_INPUT);
  }

  const inputValue = input.value;

  if (!inputValue) {
    throw new Error(InputErrors.EMPTY_INPUT);
  }

  const inputValueAsNumber = Number(inputValue);

  if (Number.isNaN(inputValueAsNumber)) {
    throw new Error(InputErrors.INVALID_INPUT);
  }

  if (inputValueAsNumber < config.MIN || inputValueAsNumber > config.MAX) {
    throw new Error(InputErrors.INVALID_INPUT);
  }

  return inputValueAsNumber;
};

