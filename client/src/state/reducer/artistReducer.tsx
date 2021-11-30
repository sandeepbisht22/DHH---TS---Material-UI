import {
  ARTIST_TYPE,
  ARTISTS_INFO,
  CURRENT_ARTIST,
  ARTIST_UNLIKED,
  ARTIST_LIKED,
} from "../types";

interface artist {
  _id: string;
  name: string;
  about: string;
  title: string;
  sociallinks: { [k: string]: string }[];
  originalName: string;
  profileImage: string;
  like: number;
  unLike: number;
  songs: string[];
}

export interface artistInterface {
  artists: artist[] | null;
  currArtist: artist | null;
  artistType: string;
  loading: boolean;
  error: string;
}
export type ArtistAction =
  | { type: "ARTIST_TYPE"; payload: string }
  | { type: "ARTISTS_INFO"; payload: artist[] }
  | { type: "CURRENT_ARTIST"; payload: artist }
  | { type: "ARTIST_LIKED"; payload: { id: string; action: string } }
  | { type: "ARTIST_UNLIKED"; payload: { id: string; action: string } }
  | { type: "ARTIST_TYPE"; payload: string }
  | { type: "ARTIST_TYPE"; payload: string };
const initialState = {
  artists: null,
  currArtist: null,
  artistType: null,
  loading: false,
  error: null,
};
export default (
  state: artistInterface = initialState,
  action: ArtistAction
) => {
  switch (action.type) {
    case ARTIST_TYPE: {
      return {
        ...state,
        artistType: action.payload,
      };
    }
    case ARTISTS_INFO: {
      return {
        ...state,
        artists: action.payload,
      };
    }
    case CURRENT_ARTIST: {
      return {
        ...state,
        currArtist: action.payload,
      };
    }
    case ARTIST_LIKED:
      const likedVal = action.payload.action === "inc" ? 1 : -1;
      return {
        ...state,
        currArtist: {
          ...state.currArtist,
          like: state.currArtist.like + likedVal,
        },
        artists: state.artists.map((artist) =>
          artist._id === action.payload.id
            ? {
                ...artist,
                like: artist.like + likedVal,
              }
            : artist
        ),
      };
    case ARTIST_UNLIKED:
      const unLikedVal = action.payload.action === "inc" ? 1 : -1;

      return {
        ...state,
        currArtist: {
          ...state.currArtist,
          unLike: state.currArtist.unLike + unLikedVal,
        },
        artists: state.artists.map((artist) =>
          artist._id === action.payload.id
            ? {
                ...artist,
                unLike: artist.unLike + unLikedVal,
              }
            : artist
        ),
      };
    default:
      return state;
  }
};
