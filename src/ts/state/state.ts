import { config } from "../config/config";
import { generateRandomNumber } from "../helpers/helpers";

export const state = {
  randomNumber: generateRandomNumber(config.MIN, config.MAX),
  score: config.INITIAL_SCORE,
  highscore: config.INITIAL_HIGHSCORE,
  lives: config.INITIAL_LIVES,
};
