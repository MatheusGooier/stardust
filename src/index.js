import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import TodoPage from "./components/TodoPage";
import Login from "./components/Login";
import CcPage from "./components/CcPage";
import EventosPage from "./components/EventosPage";
import HeaderMenu from "./components/HeaderMenu";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ThemeContext from "./components/contexts/themeContext";
import themeReducer from "./components/reducers/themeReducer";
import Footer from "./components/Footer";
import "./default.css";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const themeInitialState = useContext(ThemeContext);
  const [theme, dispatch] = useReducer(themeReducer, themeInitialState);

  const handleThemeChange = (checked) => {
    dispatch({ type: "TOGGLE_THEME", payload: checked });
  };

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={theme.value === "light" ? lightTheme : darkTheme}>
          <>
            <GlobalStyles />
            <HeaderMenu
              handleThemeChange={handleThemeChange}
              themeChecked={theme.currentChecked}
            />
            <div className="mt-16">
              <Switch>
                <Route path="/" exact component={Login} />
                <PrivateRoute path="/financeiro" component={TodoPage} />
                <PrivateRoute path="/cc" component={CcPage} />
                <PrivateRoute path="/eventos" component={EventosPage} />
              </Switch>
            </div>
            <Footer></Footer>
          </>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);
