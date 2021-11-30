import {
  FAV_BEATPRODUCER,
  FAV_RAPPER,
  FAV_SONG,
  FAV_ADDED,
  FAV_REMOVED,
} from "../types";
import { artistInterface } from "./artistReducer";
import { songInterface } from "./songReducer";
interface userChoiceInterface {
  favRapper: artistInterface[];
  favbeatproducer: artistInterface[];
  favsong: songInterface;
  currartistchoiceinfo: artistInterface;
  error: string; // fill with Actual error type
}
export type UserChoiceAction =
  | {
      type: "FAV_RAPPER";
      payload: artistInterface[];
    }
  | {
      type: "FAV_BEATPRODUCER";
      payload: artistInterface[];
    }
  | {
      type: "FAV_SONG";
      payload: songInterface[];
    }
  | {
      type: "FAV_ADDED";
      payload: {
        choice: string;
        value: songInterface | artistInterface;
      };
    }
  | {
      type: "FAV_REMOVED";
      payload: {
        id: string;
      };
    };
const initialState = {
  favrapper: null,
  favbeatproducer: null,
  favsong: null,
  currartistchoiceinfo: null,
  error: null,
};

export default (state = initialState, action: UserChoiceAction) => {
  switch (action.type) {
    case FAV_RAPPER:
      return {
        ...state,
        favrapper: action.payload,
      };
    case FAV_BEATPRODUCER:
      return {
        ...state,
        favbeatproducer: action.payload,
      };
    case FAV_SONG:
      return {
        ...state,
        favsong: action.payload,
      };
    case FAV_ADDED:
      return {
        ...state,
        [action.payload.choice]: [
          ...state[action.payload.choice],
          action.payload.value,
        ],
      };
    case FAV_REMOVED:
      return {
        ...state,
        favrapper: state.favrapper.map((rapper) => {
          if (rapper._id !== action.payload.id) {
            return rapper;
          }
        }),
      };
    default:
      return state;
  }
};
