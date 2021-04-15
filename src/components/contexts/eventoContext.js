import React from "react";

const EventosContext = React.createContext({
  eventos: [],
  currentEvento: {},
  calendarDay: "",
});

export default EventosContext;
