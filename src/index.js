import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import TodoPage from "./components/todo/TodoPage";
import Login from "./components/Login";
import CcPage from "./components/centroCusto/CcPage";
import EventosPage from "./components/eventos/EventosPage";
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
import { TitleComponent } from "./components/TitleComponent";

const App = () => {
  const themeInitialState = useContext(ThemeContext);
  const [theme, dispatch] = useReducer(themeReducer, themeInitialState);

  const handleThemeChange = (checked) => {
    dispatch({ type: "TOGGLE_THEME", payload: checked });
  };

  // withTitle function
  const withTitle = ({ component: Component, title }) => {
    return class Title extends React.Component {
      render() {
        return (
          <React.Fragment>
            <TitleComponent title={title} />
            <Component {...this.props} />
          </React.Fragment>
        );
      }
    };
  };

  // Adding title
  const LoginComponent = withTitle({ component: Login, title: "Login" });
  const TodoPageComponent = withTitle({
    component: TodoPage,
    title: "Financeiro",
  });
  const CcPageComponent = withTitle({
    component: CcPage,
    title: "Centro de Custo",
  });
  const EventosPageComponent = withTitle({
    component: EventosPage,
    title: "Eventos",
  });

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme }}>
        <ThemeProvider theme={theme.value === "Light" ? lightTheme : darkTheme}>
          <>
            <GlobalStyles />
            <HeaderMenu
              handleThemeChange={handleThemeChange}
              themeChecked={theme.currentChecked}
            />
            <div className="mt-16">
              <Switch>
                <Route path="/" exact component={LoginComponent} />
                <PrivateRoute
                  path="/financeiro"
                  component={TodoPageComponent}
                />
                <PrivateRoute path="/cc" component={CcPageComponent} />
                <PrivateRoute
                  path="/eventos"
                  component={EventosPageComponent}
                />
              </Switch>
            </div>
            <Footer />
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
