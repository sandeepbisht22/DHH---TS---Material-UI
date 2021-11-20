import { LIKE_SONG, ALL_SONG } from "./../types";

const initialState = {
  songList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIKE_SONG:
      return {
        ...state,
        songList: state.songList.map((song) =>
          song._id === action.payload.id ? action.payload.data : song
        ),
      };
    case ALL_SONG:
      return { ...state, songList: action.payload };
    default:
      return state;
  }
};
