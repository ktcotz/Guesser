import { GameErrors } from "../utils/errors";

export const isValidGuessNumber = (
  guessNumber: number,
  randomNumber: number
) => {
  if (guessNumber < randomNumber) {
    return { isValid: false, error: GameErrors.NUMBER_TO_LOW };
  }

  if (guessNumber > randomNumber) {
    return { isValid: false, error: GameErrors.NUMBER_TO_HIGH };
  }

  return { isValid: true };
};
