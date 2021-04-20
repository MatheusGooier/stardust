import React from "react";

const ThemeContext = React.createContext({
  value: "Dark",
  currentChecked: false,
});

export default ThemeContext;
