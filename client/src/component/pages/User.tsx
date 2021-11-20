import React, { useState, useEffect } from "react";
import profileImage from "../../resources/images/defaultProfile.png";
import { useSelector, useDispatch } from "react-redux";
import Songs from "../common/Songs";
import FavArtist from "../common/FavArtist";
import { songAction, userChoiceAction } from "../../state/actions";

const User = () => {
  const dispatch = useDispatch();
  const songsList = useSelector((state) => state.song.songList);
  const globalUser = useSelector((state) => state.user.user);
  const favRapper = useSelector((state) => state.userChoice.favrapper);
  const favSong = useSelector((state) => state.userChoice.favsong);

  const favBeatProducer = useSelector(
    (state) => state.userChoice.favbeatproducer
  );

  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState(globalUser);
  useEffect(() => {
    dispatch(songAction.userFavSong());
  }, []);
  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: [e.target.value],
    });
  };
  const onSubmit = () => {
    if (!isEditable) {
      setIsEditable(!isEditable);
    } else {
      //TODO update user data here
    }
  };

  return (
    user !== null && (
      <div className="container-fluid page">
        <div className="row">
          <div className="col-md-9 ">
            <div>
              <div>
                <FavArtist
                  favArtist={favRapper}
                  title="Favourite Rapper"
                ></FavArtist>
              </div>
              <div>
                <FavArtist
                  favArtist={favBeatProducer}
                  title="Favourite Beat Producer"
                ></FavArtist>
              </div>
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="row-cols-md-3 text-center">
              <img
                src={profileImage}
                alt="Profile image"
                style={{ width: "60%", height: "70%" }}
                className="border rounded-circle"
              />

              <form onSubmit={onSubmit} style={{ width: "100%" }}>
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="userName"
                    value={user.name}
                    onChange={onChange}
                    disabled={!isEditable ? "disabled" : ""}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    User Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    disabled={!isEditable ? "disabled" : ""}
                    id="userEmail"
                    value={user.email}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="userPhone" className="form-label">
                    User Phone Number
                  </label>
                  <input
                    type="text"
                    disabled={!isEditable ? "disabled" : ""}
                    name="phoneno"
                    id="userPhone"
                    value={user.phoneno}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>

                {/* <button type="submit">{isEditable ? "Update" : "Edit"}</button> */}
              </form>
              <button onClick={onSubmit}>
                {isEditable ? "Update" : "Edit"}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3>Favourite Songs</h3>
          <div className="scroll">
            <div
              className="row flex-row flex-nowrap "
              style={{ height: "35vh" }}
            >
              <Songs songsList={songsList}></Songs>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default User;
