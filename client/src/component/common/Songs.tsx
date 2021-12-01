import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songAction, userChoiceAction } from "../../state/actions";
import { songListInterface } from "./../../state/reducer/songReducer";

const Songs = (props: songListInterface) => {
  const { songList } = props;
  const dispatch = useDispatch();
  const [songFavouriteIconClass, setSongFavouriteIconClass] =
    useState("far fa-heart");

  function songFavourite(id) {
    dispatch(userChoiceAction.addFav("favsong", id));
    setSongFavouriteIconClass(
      songFavouriteIconClass === "far fa-heart"
        ? "fas fa-heart"
        : "far fa-heart"
    );
  }
  function artistLikedUnliked(currentAction, id) {
    if (currentAction === "unLike") {
      dispatch(userChoiceAction.addFav("dislikedSong", id));
    }
    dispatch(songAction.likeDislikeSong(id, currentAction));
    if (currentAction === "like") {
      dispatch(userChoiceAction.addFav("likedSong", id));
    }
  }
  // useEffect(() => {
  //   if (page !== "user") {
  //     songsList =
  //    }
  // }, []);

  return (
    <Fragment>
      {songList !== null && (
        <div className="d-flex pb-3" style={{ color: "white" }}>
          {songList.map((song) => (
            <div className="col-md-3" id={song._id}>
              <div>
                <a
                  href={song.songLinks[0]["youtube"]}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <img src={song.img} className="border border-3 rounded"></img>
                </a>
              </div>
              <div>{song.name}</div>

              <div
                style={{ color: "#FFFFFF" }}
                className="d-flex justify-content-evenly"
              >
                <div>
                  <i
                    onClick={() => artistLikedUnliked("like", song._id)}
                    className="fas fa-microphone"
                  ></i>
                  <span className="ps-3">{song.like}</span>
                </div>
                <div>
                  <i
                    onClick={() => songFavourite(song._id)}
                    className={songFavouriteIconClass}
                  ></i>
                </div>
                <div>
                  <i
                    onClick={() => artistLikedUnliked("unLike", song._id)}
                    className="fas fa-microphone-slash"
                  ></i>
                  <span className="ps-3">{song.dislike}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Songs;
