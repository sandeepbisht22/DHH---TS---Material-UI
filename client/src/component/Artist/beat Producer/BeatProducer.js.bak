import React, { useEffect, useState } from "react";
import SocialMedia from "./../../common/SocialMedia";
import YoutubeVideo from "../../common/YoutubeVideo";
import { useSelector, useDispatch } from "react-redux";
import { artistActions } from "../../../state/actions";
import Songs from "../../common/Songs";

const BeatProducer = ({ match }) => {
  const dispatch = useDispatch();
  const [artistFavouriteIconClass, setArtistFavouriteIconClass] =
    useState("far fa-heart fa-3x");
  const artistType = useSelector((state) => state.artist.artistType);
  const currArtist = useSelector((state) => state.artist.currArtist);
  const artistUpVoteIconClass = "fas fa-microphone fa-3x";
  const artistDownVoteIconClass = "fas fa-microphone-slash fa-3x";
  const artistFavourite = (e) => {
    setArtistFavouriteIconClass(
      artistFavouriteIconClass === "far fa-heart fa-3x"
        ? "fas fa-heart fa-3x"
        : "far fa-heart fa-3x"
    );

    //TODO other things also like informing backend
  };
  useEffect(() => {
    try {
      dispatch(
        artistActions.currentArtistInfo(artistType, match.params.beatProducer)
      );
    } catch (error) {}
  }, []);

  function artistLikedUnliked(currentAction) {
    const likeUnlikeInfo = {
      id: currArtist._id,
      action: "inc",
    };
    dispatch(
      artistActions.likeUnLikeArtist(
        "beatProducers",
        likeUnlikeInfo,
        currentAction
      )
    );
  }
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
                    className={artistUpVoteIconClass}
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
                    className={artistDownVoteIconClass}
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
              <Songs></Songs>
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
