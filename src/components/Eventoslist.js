/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { List, Divider, Button } from "antd";
import EventosContext from "./contexts/eventoContext";
import axios from "axios";
import returnStrDateFromObj from "./globals/returnStrDateFromObj";

export default function EventosList() {
  const { state, dispatch } = useContext(EventosContext);

  const eventosByDate = state.eventos.filter(function (evento) {
    if (state.calendarDay === "") {
      dispatch({ type: "SET_CALENDARDAY", payload: returnStrDateFromObj() });
    }
    return evento.dataEvento === state.calendarDay;
  });

  return (
    <List
      itemLayout="horizontal"
      className=" p-2 min-h-600"
      dataSource={eventosByDate}
      size="large"
      header={
        <Divider orientation="left">
          Lista de eventos para o dia selecionado
          {/* <span> {state.calendarDay}</span> */}
        </Divider>
      }
      renderItem={(evento) => (
        <List.Item
          className="bg-gray-50"
          actions={[
            <a
              key="list-event-edit"
              onClick={() => {
                dispatch({ type: "SET_CURRENT_EVENTO", payload: evento });
              }}
            >
              Editar
            </a>,
            <a
              key="list-event-delete"
              className="text-red-500"
              onClick={async () => {
                await axios.delete(
                  `https://hooks-api-matheusalex-hotmailcom.vercel.app/EVENTOS/${evento.id}`
                );
                dispatch({ type: "REMOVE_EVENTO", payload: evento });
              }}
            >
              Remover
            </a>,
          ]}
        >
          <List.Item.Meta
            title={<span>{evento.titulo}</span>}
            description={evento.text}
          />
          <Button></Button>
        </List.Item>
      )}
    />
  );
}
