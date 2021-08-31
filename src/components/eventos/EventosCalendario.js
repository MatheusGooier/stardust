import React, { useContext } from "react";
import { Calendar, Alert, Divider, Col } from "antd";
import EventosContext from "../contexts/eventoContext";

export default function EventosCalendario() {
  const { state, dispatch } = useContext(EventosContext);

  function dateCellRender(value) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((evento) => (
          <li key={evento._id}>
            <Alert type="success" message={evento.titulo} />
          </li>
        ))}
      </ul>
    );
  }

  const onSelect = (date) => {
    dispatch({ type: "SET_EVENTO_TODOS", payload: [] });
    dispatch({ type: "SET_CURRENT_EVENTO", payload: {} });
    dispatch({ type: "SET_CALENDARDAY", payload: date });
  };

  function getListData(value) {
    const eventosNoDia = [];
    state.eventos.forEach((evento) => {
      if (evento.dataEvento) {
        const ano = parseFloat(evento.dataEvento.substr(0, 4));
        const mes = parseFloat(evento.dataEvento.substr(5, 2));
        const dia = parseFloat(evento.dataEvento.substr(8, 2));

        if (
          dia === value.date() &&
          mes === value.month() + 1 &&
          ano === value.year()
        ) {
          eventosNoDia.push(evento);
        }
      }
    });

    return eventosNoDia || [];
  }

  return (
    <div className="flex-1">
      <Col span={22} offset={1}>
        <Divider orientation="left">Agenda de eventos</Divider>
        <Calendar
          onSelect={onSelect}
          dateCellRender={dateCellRender}
          locale="pt_BR"
        />
      </Col>
    </div>
  );
}
