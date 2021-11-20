import axios from "axios";
import setAuthToken from "../../utils/setAuthnToken";
import { LIKE_SONG, ALL_SONG } from "../types";

export const userFavSong = () => async (dispatch) => {
  setAuthToken(localStorage.token);
  const config = {
    header: {
      "content-type": "application/json",
    },
  };

  //Check if Post is actually required because we are just getting the user fav info
  const allSongs = await axios.post("/userchoice/allFavSongs", null, config);

  dispatch({
    type: ALL_SONG,
    payload: allSongs.data,
  });
};

export const allArtistSongs = (artistType, id) => async (dispatch) => {
  const allSongs = await axios.get(`/song/${artistType}/${id}`);
  if (allSongs === null) {
    allSongs.data = null;
  }
  dispatch({
    type: ALL_SONG,
    payload: allSongs.data,
  });
};

export const likeDislikeSong = (songID, action) => async (dispatch) => {
  setAuthToken(localStorage.token);
  const config = {
    header: {
      "content-type": "application/json",
    },
  };
  const route = action === "like" ? "likeSong" : "dislikeSong";

  const res = await axios.post(`/song/${route}/${songID}`, null, config);
  const payload = {
    id: songID,
    data: res.data,
  };
  dispatch({
    type: LIKE_SONG,
    payload: payload,
  });
};
