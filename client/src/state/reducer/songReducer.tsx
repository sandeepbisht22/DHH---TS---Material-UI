import { LIKE_SONG, ALL_SONG } from "./../types";

export interface songInterface {
  _id: string;
  name: string;
  like: number;
  dislike: number;
  rapper: string;
  songLinks: string[][];
  img: string;
}
export interface songListInterface {
  songList: songInterface[] | null;
}

const initialState: songListInterface = {
  songList: null,
};

export type SongAction =
  | { type: "ALL_SONG"; payload: songInterface[] }
  | {
      type: "LIKE_SONG";
      payload: { id: songInterface["_id"]; data: songInterface };
    };

export default (state = initialState, action: SongAction) => {
  switch (action.type) {
    case LIKE_SONG:
      return {
        ...state,
        songList: state.songList?.map((song) =>
          song._id === action.payload.id ? action.payload.data : song
        ),
      };
    case ALL_SONG:
      return { ...state, songList: action.payload };
    default:
      return state;
  }
};
