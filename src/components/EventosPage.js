import React, { useContext, useEffect, useReducer, useState } from "react";
import EventosCalendario from "./EventosCalendario";
import EventosForm from "./EventosForm";
import EventosContext from "./contexts/eventoContext";
import eventosReducer from "./reducers/eventoReducer";
import EventosList from "./Eventoslist";
import axios from "axios";

export default function EventosPage() {
  const useAPI = (endpoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
    }, []);

    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    return data;
  };

  const AppEventosPage = () => {
    const eventoInitialState = useContext(EventosContext);
    const [state, dispatch] = useReducer(eventosReducer, eventoInitialState);

    const savedEventos = useAPI(
      "https://hooks-api-matheusalex-hotmailcom.vercel.app/eventos"
    );

    useEffect(() => {
      dispatch({
        type: "GET_EVENTOS",
        payload: savedEventos,
      });
    }, [savedEventos]);

    return (
      <EventosContext.Provider value={{ state, dispatch }}>
        <div className="flex">
          <EventosCalendario />
          <div className="flex-1">
            <EventosForm />
            <EventosList />
          </div>
        </div>
      </EventosContext.Provider>
    );
  };

  return <AppEventosPage />;
}
