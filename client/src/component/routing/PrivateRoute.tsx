import React from "react";

import { Route, Navigate } from "react-router-dom";
import * as ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { userInterface } from "../../state/reducer/userReducer";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector<
    userInterface,
    userInterface["isAuthenticated"]
  >((state) => state.isAuthenticated);

  return !isAuthenticated ? (
    <Navigate to="/login"></Navigate>
  ) : (
    <Component></Component>
  );
};

export default PrivateRoute;
