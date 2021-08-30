import React from "react";
import { isLogin } from "../utils";

import { Route, Redirect } from "react-router";

const PrivateRoute = (props) => {
  return isLogin() ? <Route {...props} /> : <Redirect to="/" />;
};

export default PrivateRoute;
