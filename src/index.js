import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import TodoPage from "./components/TodoPage";
import CcPage from "./components/CcPage";
import EventosPage from "./components/EventosPage";
import HeaderMenu from "./components/HeaderMenu";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import { GlobalStyles } from "./global";
import { BrowserRouter, Route } from "react-router-dom";
import ThemeContext from "./components/contexts/themeContext";
import themeReducer from "./components/reducers/themeReducer";
import Footer from "./components/Footer";
import "./default.css";

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
              <Route path="/" exact={true} component={TodoPage} />
              <Route path="/cc" component={CcPage} />
              <Route path="/eventos" component={EventosPage} />
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
