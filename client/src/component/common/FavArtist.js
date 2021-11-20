import React, { Fragment } from "react";

const FavArtist = ({ favArtist, title }) => {
  return (
    favArtist !== null && (
      <Fragment>
        <h3>{title}</h3>
        <div className="scroll">
          <div
            className="row flex-row flex-nowrap col-md-5"
            style={{ height: "25vh" }}
          >
            {favArtist.map((rapper) => (
              <div
                className="d-flex row border rounded"
                style={{
                  backgroundColor: "#0B0B0B",
                  color: "#494949",
                  margin: "0 2em 0 2em",
                }}
              >
                <div className="col-sm-6 p-2" style={{ height: "100%" }}>
                  <img
                    className="img-fluid"
                    style={{ height: "100%" }}
                    src={
                      require(`../../resources/artist/images/profile/${rapper.profileImage}`)
                        .default
                    }
                  />
                </div>
                <div className="col-sm-6">
                  <div>Name: {rapper.name}</div>
                  <div>Title: {rapper.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fragment>
    )
  );
};

export default FavArtist;
