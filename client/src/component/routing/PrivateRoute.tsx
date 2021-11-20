import React from "react";

import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login"></Redirect>
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  );
};

export default PrivateRoute;
