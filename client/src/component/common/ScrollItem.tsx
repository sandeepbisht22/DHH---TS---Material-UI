import React, { Fragment } from "react";
import { useHistory } from "react-router";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { useSelector } from "react-redux";

const ScrollItem = ({ itemId, profileImage, name, onClick, selected }) => {
  const visibility = React.useContext(VisibilityContext);
  const history = useHistory();
  const artistType = useSelector((state) => state.artist.artistType);
  console.log("artist type is " + artistType);
  return (
    <Fragment>
      <div
        className="mx-2"
        onClick={() => history.push(`/artist/${artistType}/${name}`, name)}
        style={{
          width: "350px",
        }}
        tabIndex={0}
      >
        <div className="card " style={{ backgroundColor: "#272727" }}>
          <img
            className="card-img-top rounded "
            style={{ object_fit: "cover", height: "55vh" }}
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
