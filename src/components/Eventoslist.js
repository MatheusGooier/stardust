/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { List, Divider, Button, Col } from "antd";
import EventosContext from "./contexts/eventoContext";
import axios from "axios";
import returnStrDateFromObj from "./globals/returnStrDateFromObj";
import baseUrl from "./globals/baseUrl";
import moment from "moment";

export default function EventosList() {
  const { state, dispatch } = useContext(EventosContext);
  const dateFormat = "DD/MM/YYYY";

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const eventosByDate = state.eventos.filter(function (evento) {
    if (state.calendarDay === "") {
      return evento.dataEvento === returnStrDateFromObj();
    } else {
      return datesAreOnSameDay(
        new Date(state.calendarDay),
        new Date(evento.dataEvento)
      );
    }
  });

  const CreateEventoTodos = async (event) => {
    try {
      const todos = await axios.get(`${baseUrl}/todos`);
      const EventoTodos = todos.data.filter(
        (todo) => todo.eventoId === event._id
      );
      dispatch({ type: "SET_EVENTO_TODOS", payload: EventoTodos });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Col span={22} offset={1}>
      <List
        itemLayout="horizontal"
        className=" p-2 min-h-600"
        dataSource={eventosByDate}
        size="large"
        header={
          <Divider orientation="left">
            Lista de eventos para o dia selecionado
            <span> {moment(state.calendarDay).format(dateFormat)}</span>
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
                  CreateEventoTodos(evento);
                }}
              >
                Editar
              </a>,
              <a
                key="list-event-delete"
                className="text-red-500"
                onClick={async () => {
                  const response = await axios.delete(`${baseUrl}/eventos/`, {
                    data: { _id: evento._id },
                  });
                  dispatch({ type: "REMOVE_EVENTO", payload: response.data });
                }}
              >
                Remover
              </a>,
            ]}
          >
            <List.Item.Meta
              title={
                <div>
                  <span>{evento.titulo}</span>
                </div>
              }
              description={evento.text}
            />
            <Button></Button>
          </List.Item>
        )}
      />
    </Col>
  );
}
