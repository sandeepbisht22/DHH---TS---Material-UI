import {
  ARTIST_TYPE,
  ARTISTS_INFO,
  CURRENT_ARTIST,
  ARTIST_UNLIKED,
  ARTIST_LIKED,
} from "../types";
import axios from "axios";
export const currentArtistType = (artist) => async (dispatch) => {
  try {
    dispatch({
      type: ARTIST_TYPE,
      payload: artist,
    });
  } catch (error) {
    //TODO
  }
};

export const artistsInfo = (artistType, titles) => async (dispatch) => {
  try {
    console.log("Start executing calls inside for");
    axios
      .all(
        titles.map((title) => axios.get(`/artist/${artistType}/title/${title}`))
      )
      .then(
        axios.spread(function (...res) {
          // all requests are now complete
          console.log("final response is" + res);
          dispatch({
            type: ARTISTS_INFO,
            payload: res,
          });
        })
      );
  } catch (error) {
    console.log("Error is " + error);
  }
};

////Like artist

export const likeUnLikeArtist =
  (artistType, likeUnlikeInfo, likeUnLike) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post(
      `/artist/${artistType}/rate/${likeUnLike}`,
      likeUnlikeInfo,
      config
    );
    const action = likeUnLike === "like" ? ARTIST_LIKED : ARTIST_UNLIKED;
    dispatch({
      type: action,
      payload: likeUnlikeInfo,
    });
    //Nothing needed from backend just dispatch to reducer and tell it to update state.
  };

//Fetch current artist Info
export const currentArtistInfo =
  (artistType, artistName) => async (dispatch) => {
    try {
      const res = await axios.get(`/artist/${artistType}/name/${artistName}`);
      const id = res.data[0]._id;
      const songs = await axios.get(`/song/${artistType}/${id}`);
      res.data[0].songs = songs.data;
      console.log(JSON.stringify(res.data[0].songs));

      dispatch({
        type: CURRENT_ARTIST,
        payload: res.data[0],
      });
    } catch (error) {
      //TODO
    }
  };
