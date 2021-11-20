import React, { useEffect, useState } from "react";
import SocialMedia from "./../../common/SocialMedia";
import YoutubeVideo from "../../common/YoutubeVideo";
import { artistActions, userChoiceAction } from "../../../state/actions";
import { useSelector, useDispatch } from "react-redux";
import Songs from "../../common/Songs";
import axios from "axios";
import setAuthToken from "../../../utils/setAuthnToken";

const BeatProducer = ({ match }) => {
  const dispatch = useDispatch();
  const artistType = useSelector((state) => state.artist.artistType);

  const [artistFavouriteIconClass, setArtistFavouriteIconClass] =
    useState("far fa-heart fa-3x");
  const currArtist = useSelector((state) => state.artist.currArtist);

  const artistFavourite = (e) => {
    dispatch(userChoiceAction.addFav("favbeatproducer", currArtist._id));
    setArtistFavouriteIconClass(
      artistFavouriteIconClass === "far fa-heart fa-3x"
        ? "fas fa-heart fa-3x"
        : "far fa-heart fa-3x"
    );

    //TODO other things also like informing backend
  };

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  async function likeArtist(config, addRemove) {
    setAuthToken(localStorage.token);
    await axios.post(
      `/userchoice/likedartist/likedbeatproducer/${addRemove}/${currArtist._id}`,
      null,
      config
    );
  }

  async function disLikedArtist(config, addRemove) {
    setAuthToken(localStorage.token);
    await axios.post(
      `/userchoice/dislikedartist/dislikedbeatproducer/${addRemove}/${currArtist._id}`,
      null,
      config
    );
  }
  function setLocalState(like, dislike) {
    setDisliked(dislike);
    setLiked(like);
  }
  function dbUpdate(currentAction, action) {
    const likeUnlikeInfo = {
      id: currArtist._id,
      action: action,
    };

    dispatch(
      artistActions.likeUnLikeArtist(
        "beatProducers",
        likeUnlikeInfo,
        currentAction
      )
    );
  }

  function artistLikedUnliked(currentAction) {
    const config = {
      header: {
        "content-type": "application/json",
      },
    };
    if (
      (currentAction === "like" && liked) ||
      (currentAction === "unLike" && disliked)
    ) {
      return;
    } else if (currentAction === "like" && disliked) {
      setLocalState(true, false);
      disLikedArtist(config, "remove");
      likeArtist(config, "add");
      dbUpdate("like", "inc");
      dbUpdate("unLike", "dec");
      //remove from disliked list and add to liked list backend
    } else if (currentAction === "unLike" && liked) {
      setLocalState(false, true);
      disLikedArtist(config, "add");
      likeArtist(config, "remove");
      dbUpdate("like", "dec");
      dbUpdate("unLike", "inc");
      //remove from liked list and add to disliked list backend
    } else if (currentAction === "like") {
      setLocalState(true, false);
      likeArtist(config, "add");
      dbUpdate("like", "inc");
    } else if (currentAction === "unLike") {
      setLocalState(false, true);
      disLikedArtist(config, "add");
      dbUpdate("unLike", "inc");
    }
  }
  useEffect(async () => {
    try {
      setAuthToken(localStorage.token);
      const disLikedCheck = await axios.get(
        `/userchoice/likecheck/dislikedbeatproducer/${currArtist._id}`
      );
      setDisliked(disLikedCheck.data.res === "true");

      const likedCheck = await axios.get(
        `/userchoice/likecheck/likedbeatproducer/${currArtist._id}`
      );

      setLiked(likedCheck.data.res === "true");

      dispatch(
        artistActions.currentArtistInfo(artistType, match.params.beatProducer)
      );
    } catch (error) {}
  }, []);

  return (
    currArtist !== null && (
      <div style={{ backgroundColor: "#272727" }}>
        <div className="d-inline-flex flex-row">
          <div className="pe-3 pb-3 ps-3">
            <img
              style={{
                height: "400px",
                width: "300px",
              }}
              className="border border-5 border-white"
              src={
                require(`../../../resources/artist/images/page/${currArtist.profileImage}`)
                  .default
              }
            />
          </div>
          <div className="position-relative">
            <h1 style={{ color: "#61892F" }}>
              {currArtist.name} - The [{currArtist.title} ]of DHH
            </h1>
            <div style={{ color: "#FFFFFF" }}>{currArtist.about}</div>
            <div className="position-absolute bottom-0 container">
              <div
                style={{ color: "#FFFFFF" }}
                className="d-flex justify-content-evenly"
              >
                <div>
                  <i
                    onClick={() => artistLikedUnliked("like")}
                    className="fas fa-microphone fa-3x"
                  ></i>
                  <span className="ps-3">{currArtist.like}</span>
                </div>
                <div>
                  <i
                    onClick={artistFavourite}
                    className={artistFavouriteIconClass}
                  ></i>
                </div>
                <div>
                  <i
                    onClick={() => artistLikedUnliked("unLike")}
                    className="fas fa-microphone-slash fa-3x"
                  ></i>
                  <span className="ps-3">{currArtist.unLike}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{ margin: "0px" }}>
          <h3 style={{ color: "#61892F" }}>Famous Bars</h3>
          <div className="scroll">
            <div className="row flex-row flex-nowrap">
              <Songs songsList={currArtist.songs}></Songs>
              {/* <YoutubeVideo
                youtubeKey="AIzaSyB47-Z2ZklkZUzSVKohYBoazrKVqM3ddxc"
                channelId="UCMXMp3Lc6v6v8dJH5ZGwtqA"
              ></YoutubeVideo> */}
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h3 style={{ color: "#61892F" }} className="text-center">
            Social Links
          </h3>
          <div className="container-fluid">
            <div className="row justify-content-md-center">
              {currArtist.sociallinks.map((socialaccount, i) => (
                <SocialMedia socialaccount={socialaccount} i={i}></SocialMedia>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default BeatProducer;
