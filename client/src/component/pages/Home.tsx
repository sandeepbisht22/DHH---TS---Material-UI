import React, { Fragment, useEffect } from "react";

import HomeSlider from "../layout/HomeSlider";
import Footer from "../layout/Footer";
import { userChoiceAction } from "../../state/actions";
import { useDispatch, useSelector } from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user !== null) {
      dispatch(userChoiceAction.favRappers(user._id));
      dispatch(userChoiceAction.favBeatProducers(user._id));
      dispatch(userChoiceAction.favSongs(user._id));
    }
  });

  return (
    <Fragment>
      <HomeSlider></HomeSlider>
      <Footer></Footer>
    </Fragment>
  );
};

export default Home;
