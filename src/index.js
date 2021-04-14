import React from "react";
import ReactDOM from "react-dom";
import TodoPage from "./components/TodoPage";
import CcPage from "./components/CcPage";
import Menu from "./components/Menu";
// import { BrowserRouter, Switch, Route } from "react-router-dom"; usar o switch para single page app
import { BrowserRouter, Route } from "react-router-dom";

// const routes = [
//   {
//     path: "/",
//     exact: true,
//     componentName: TodoPage,
//   },
//   {
//     path: "/cc",
//     componentName: CcPage,
//   },
// ];

const App = () => {
  return (
    <BrowserRouter className="bg-gray-600">
      <Menu />
      <Route path="/" exact={true} component={TodoPage} />
      <Route path="/cc" component={CcPage} />
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);
