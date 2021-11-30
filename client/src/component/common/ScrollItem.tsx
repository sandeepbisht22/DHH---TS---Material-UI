import React, { Fragment } from "react";
import { useNavigate } from "react-router";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useSelector } from "react-redux";
import { artistInterface } from "./../../state/reducer/artistReducer";

const ScrollItem = ({ itemId, profileImage, name, selected }) => {
  const visibility = React.useContext(VisibilityContext);
  const navigate = useNavigate();
  const artistType = useSelector<
    artistInterface,
    artistInterface["artistType"]
  >((state) => state.artistType);

  console.log("artist type is " + artistType);
  return (
    <Fragment>
      <div
        className="mx-2"
        onClick={() => navigate(`/artist/${artistType}/${name}`, name)}
        style={{
          width: "350px",
        }}
        tabIndex={0}
      >
        <div className="card " style={{ backgroundColor: "#272727" }}>
          <img
            className="card-img-top rounded "
            style={{ objectFit: "cover", height: "55vh" }}
            src={
              require(`../../resources/artist/images/profile/${profileImage}`)
                .default
            }
          />
          <div className="card-body">
            <div className="card-text" style={{ color: "#61892F" }}>
              {name}
            </div>
          </div>
        </div>
        <div
          style={{
            height: "50px",
          }}
        />
      </div>
    </Fragment>
  );
};

ScrollItem.propTypes = {};

export default ScrollItem;
