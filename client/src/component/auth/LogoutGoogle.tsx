import React from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { userActions } from "../../state/actions";

const LogoutGoogle = () => {
  const dispatch = useDispatch();
  const logoutSucess = () => {
    console.log("logout Sucesss");
    dispatch(userActions.logoutUser());
  };
  return (
    <GoogleLogout
      clientId={process.env.REACT_APP_GOOGLE_O_AUTH_CLIENT_ID}
      buttonText="Plug Off"
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          style={{ backgroundColor: "#FFFFFF", color: "#61892F" }}
        >
          <b>Log Out</b>
        </button>
      )}
      onLogoutSuccess={logoutSucess}
      onFailure={logoutSucess}
    ></GoogleLogout>
  );
};

export default LogoutGoogle;
