import {
  FAV_BEATPRODUCER,
  FAV_RAPPER,
  FAV_SONG,
  FAV_ADDED,
  FAV_REMOVED,
} from "../types";
import { artistInterface, singleArtist } from "./artistReducer";
import { songInterface } from "./songReducer";
interface userChoiceInterface {
  favrapper: singleArtist[] | null;
  favbeatproducer: singleArtist[] | null;
  favsong: songInterface | null;
  currartistchoiceinfo: artistInterface | null;
  error: string | null; // fill with Actual error type
}
export type UserChoiceAction =
  | {
      type: "FAV_RAPPER";
      payload: singleArtist[];
    }
  | {
      type: "FAV_BEATPRODUCER";
      payload: singleArtist[];
    }
  | {
      type: "FAV_SONG";
      payload: songInterface[];
    }
  | {
      type: "FAV_ADDED";
      payload: {
        choice: string;
        value: songInterface | singleArtist;
      };
    }
  | {
      type: "FAV_REMOVED";
      payload: {
        id: string;
      };
    };
const initialState: userChoiceInterface = {
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
        favrapper: state.favrapper?.map((rapper) => {
          if (rapper._id !== action.payload.id) {
            return rapper;
          }
        }),
      };
    default:
      return state;
  }
};
