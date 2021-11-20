import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { userActions, alertActions } from "../../state/actions";
import { useSelector, useDispatch } from "react-redux";
import LoginGoogle from "./LoginGoogle";

const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneno: "",
    password: "",
    password2: "",
  });

  const { name, email, phoneno, password, password2 } = user;

  const onSubmit = (e) => {
    e.preventDefault();

    if (
      email === "" ||
      name === "" ||
      phoneno === "" ||
      password === "" ||
      password2 === ""
    ) {
      //TODO throw alert to show empty field
      console.log("Fill every field");
    } else if (password !== password2) {
      //TODO throw alert to show that password1 is not equal to password2
      console.log("password1 is not equal to password2");
    } else {
      dispatch(
        userActions.signUpUser({
          name,
          email,
          phoneno,
          password,
        })
      );
    }
    console.log("On Submit called");
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    } else if (error === "invalid Email" || error === "invalid Password") {
      dispatch(alertActions.setAlert(error, "danger"));
      dispatch(userActions.clearErrors());
    }
  }, [error, isAuthenticated, history]);
  return (
    <div style={{ backgroundColor: "grey" }} className="container py-4">
      <div
        className="row justify-content-center p-3"
        style={{
          backgroundColor: "#272727",
          color: "#61892F",
        }}
      >
        <div className="col-md-4 border border-3 d-flex justify-content-evenly align-items-center">
          <div className="card text-center card-signup">
            <div className="text-decoration-none">
              <LoginGoogle />
            </div>
            <h6>Google Sign in</h6>
          </div>
          <div className="card text-center card-signup">
            <h2>OR</h2>
          </div>
          <div className="card text-center card-signup">
            <a href="!#" className="text-decoration-none">
              <i
                className="fab fa-facebook fa-5x card-img-top"
                style={{ color: "grey" }}
              ></i>
              <h6>Facebook Sign in</h6>
            </a>
          </div>
        </div>
        <div className="col-md-6 border border-3">
          <form onSubmit={onSubmit} className="py-3">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control"
                id="name"
                placeholder="User Name"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="form-control"
                id="email"
                value={email}
                placeholder="userEmail@sample.com"
                onChange={onChange}
              />
            </div>
            <div className="mb3">
              <label htmlFor="phoneno" className="form-label">
                Mobile No.
              </label>
              <input
                type="number"
                className="form-control"
                id="phoneno"
                name="phoneno"
                value={phoneno}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password2" className="form-label">
                Re-enter Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                onChange={onChange}
              />
            </div>
            <button className="btn btn-primary " type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
