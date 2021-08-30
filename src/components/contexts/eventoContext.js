import React from "react";

const EventosContext = React.createContext({
  eventos: [],
  currentEvento: {},
  calendarDay: new Date(),
  eventoTodos: [],
});

export default EventosContext;
