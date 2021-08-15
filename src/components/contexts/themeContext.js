import React from "react";

const ThemeContext = React.createContext({
  value: "Light",
  currentChecked: false,
});

export default ThemeContext;
