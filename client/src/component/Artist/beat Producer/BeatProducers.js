import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "./../../common/HorizontalScroll";
import { artistActions } from "../../../state/actions";
const BeatProducers = () => {
  const artistType = "beatProducers";
  const titles = ["OG"];
  const dispatch = useDispatch();
  dispatch(artistActions.currentArtistType("beatProducers"));
  const artists = useSelector((state) => state.artist.artists);

  useEffect(() => {
    try {
      dispatch(artistActions.artistsInfo(artistType, titles));
    } catch (error) {
      console.log("error is " + error.message);
    }
  }, []);
  return (
    <div style={{ backgroundColor: "#272727" }}>
      Beat Producers
      {artists !== null &&
        artists.map((horizontalScroll, i) => (
          <HorizontalScroll
            horizontalScroll={horizontalScroll}
            title={titles[i]}
          ></HorizontalScroll>
        ))}
    </div>
  );
};

export default BeatProducers;
