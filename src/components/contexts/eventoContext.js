import React from "react";

const EventosContext = React.createContext({
  eventos: [],
  currentEvento: {},
  calendarDay: "",
  eventoTodos: [],
});

export default EventosContext;
