import React from "react";
import Slider from "react-slick";
// import rapperImage from "../../resources/HomeSlider/Rapper-bohemia.jpg";
// import djImage from "../../resources/HomeSlider/nucleya-in-action.jpg";
// import bboyImage from "../../resources/HomeSlider/bboying girl.jpg";
// import beatBoxerImage from "../../resources/HomeSlider/Beatboxer-1.jpg";
// import GrafImage from "../../resources/HomeSlider/Grafeti.jpg";

const HomeSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div style={{ backgroundColor: "white" }} className="px-5 py-2">
      <Slider {...settings}>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/Rapper-bohemia.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>MC</h2>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/nucleya-in-action.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>DJing</h2>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/bboying girl.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>B-Boying</h2>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/Beatboxer-1.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>Graffiti </h2>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/Beatboxer-1.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>Beat-Boxing</h2>
          </div>
        </div>
        <div className="card">
          <img
            className="card-img"
            src="../../resources/HomeSlider/Grafeti.jpg"
            alt=""
          />
          <div className="card-img-overlay overlay-grey text-white d-flex justify-content-center align-items-center">
            <h2>Graffiti </h2>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default HomeSlider;
