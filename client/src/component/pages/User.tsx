import React, { useState, useEffect, Fragment } from "react";
// import profileImage from "../../resources/images/defaultProfile.png";
import { useSelector, useDispatch } from "react-redux";
import Songs from "../common/Songs";
import FavArtist from "../common/FavArtist";
import { songAction, userChoiceAction } from "../../state/actions";
import { UserChoiceInterface } from "./../../../../backend/src/models/UserChoices";
import { userInterface } from "../../state/reducer/userReducer";
import {
  songInterface,
  songListInterface,
} from "../../state/reducer/songReducer";

const User = () => {
  const dispatch = useDispatch();
  const songsList = useSelector<
    songListInterface,
    songListInterface["songList"]
  >((state) => state.songList);

  const globalUser = useSelector<userInterface, userInterface["user"]>(
    (state) => state.user
  );

  const favRapper = useSelector<
    UserChoiceInterface,
    UserChoiceInterface["favrapper"]
  >((state) => state.favrapper);

  const favBeatProducer = useSelector<
    UserChoiceInterface,
    UserChoiceInterface["favbeatproducer"]
  >((state) => state.favbeatproducer);

  const favSong = useSelector<
    UserChoiceInterface,
    UserChoiceInterface["favsong"]
  >((state) => state.favrapper);

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
    <Fragment>
      {user !== null && (
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
                  src="../../resources/images/defaultProfile.png"
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
                      disabled={!isEditable ? true : false}
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
                      disabled={!isEditable ? true : false}
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
                      disabled={!isEditable ? true : false}
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
      )}
    </Fragment>
  );
};

export default User;
