import { config } from "../config/config";
import { generateRandomNumber } from "../helpers/helpers";

type State = {
  randomNumber: number;
  score: number;
  highscore: number;
  lives: number;
};

type StateMethods = {
  getFromState: (key: keyof State) => number;
  setState:(key:keyof State,value:number) => void;
};

export const state: State & StateMethods = {
  randomNumber: generateRandomNumber(config.MIN, config.MAX),
  score: config.INITIAL_SCORE,
  highscore: config.INITIAL_HIGHSCORE,
  lives: config.INITIAL_LIVES,

  getFromState(key: keyof State) {
    return this[key];
  },

  setState(key: keyof State, value: number) {
    this[key] = value;
  },
};
