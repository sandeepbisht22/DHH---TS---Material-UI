import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { alertActions, userActions } from "../../state/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
var generator = require("generate-password");

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onSuccess = (res) => {
    try {
      dispatch(userActions.loginViaGoogle(res.profileObj.email));
    } catch (error) {
      console.log(
        "Error while loggin in via gogle. User does not exist. Creating new user "
      );
      var password = generator.generate({
        length: 10,
        numbers: true,
      });
      const user = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        usersource: "google",
        password: password,
      };

      dispatch(userActions.signUpUser(user));
    }
  };

  const onFailure = () => {
    console.log("Login Fail");
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);

  const value = process.env.REACT_APP_GOOGLE_O_AUTH_CLIENT_ID;
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    } else if (error === "invalid Email" || error === "invalid Password") {
      dispatch(alertActions.setAlert(error, "danger"));
      dispatch(userActions.clearErrors());
    }
  }, [error, isAuthenticated, history]);
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={value}
        buttonText="Login this shit"
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ backgroundColor: "#272727", color: "#61892F" }}
          >
            <a href="!#">
              <i className="fab fa-google fa-3x" style={{ color: "grey" }}></i>
            </a>
            <div>Login via Google</div>
          </button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        className="mt-5"
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
};
export default LoginGoogle;
