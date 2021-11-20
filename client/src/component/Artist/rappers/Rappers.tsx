import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HorizontalScroll from "./../../common/HorizontalScroll";
import { artistActions } from "../../../state/actions";
const Rappers = () => {
  const artistType = "rappers";
  const dispatch = useDispatch();
  dispatch(artistActions.currentArtistType(artistType));

  const titles = ["OG", "Upcoming"];
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
      {artists !== null &&
        artists.map((horizontalScroll, i) => (
          <HorizontalScroll
            key={i}
            horizontalScroll={horizontalScroll}
            title={titles[i]}
          ></HorizontalScroll>
        ))}
    </div>
  );
};
export default Rappers;
