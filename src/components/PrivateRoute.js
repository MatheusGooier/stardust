import React from "react";
import { isLogin } from "../utils";

import { Route, Redirect } from "react-router";

const PrivateRoute = (props) => {
  // return isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;
  return isLogin() ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
