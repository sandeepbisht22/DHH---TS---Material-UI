import axios from "axios";
import setAuthToken from "../../utils/setAuthnToken";
import {
  FAV_RAPPER,
  FAV_BEATPRODUCER,
  FAV_SONG,
  FAV_ADDED,
  DISLIKE_CHECK,
  LIKE_CHECK,
  FAV_REMOVED,
} from "../types";
export const favRappers = (userId) => async (dispatch) => {
  const favRapperInfo = await axios.get(`/userchoice/${userId}/favrapper`);
  dispatch({
    type: FAV_RAPPER,
    payload: favRapperInfo.data,
  });
};

export const favBeatProducers = (userId) => async (dispatch) => {
  const beatProducerInfo = await axios.get(
    `/userchoice/${userId}/favbeatproducer`
  );
  dispatch({
    type: FAV_BEATPRODUCER,
    payload: beatProducerInfo.data,
  });
};

export const favSongs = (userId) => async (dispatch) => {
  const favSongInfo = await axios.get(`/userchoice/${userId}/favsong`);
  dispatch({
    type: FAV_SONG,
    payload: favSongInfo.data,
  });
};

export const addFav = (choice, id) => async (dispatch) => {
  try {
    setAuthToken(localStorage.token);
    const config = {
      header: {
        "content-type": "application/json",
      },
    };
    const favResponse = await axios.post(
      `/userchoice/add/${choice}/${id}`,
      null,
      config
    );
    //pass name and value separately
    const payload = { choice: choice, value: favResponse.data };
    dispatch({
      type: FAV_ADDED,
      payload: payload,
    });
  } catch (error) {
    console.log("[error ]message is " + error.message);
  }
};

export const removeFav = (choice, id) => async (dispatch) => {
  try {
    setAuthToken(localStorage.token);
    const config = {
      header: {
        "content-type": "application/json",
      },
    };
    const favResponse = await axios.post(
      `/userchoice/remove/${choice}/${id}`,
      null,
      config
    );
    //pass name and value separately
    const payload = { choice: choice, value: favResponse.data };
    dispatch({
      type: FAV_REMOVED,
      payload: payload,
    });
  } catch (error) {
    console.log("[error ]message is " + error.message);
  }
};
