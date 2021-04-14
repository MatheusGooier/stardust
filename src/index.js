import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import TodoPage from "./components/TodoPage";
import CcPage from "./components/CcPage";
import Menu from "./components/Menu";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>,
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>,
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>,
  },
];

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
