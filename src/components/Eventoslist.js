/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { List, Divider, Button, Col } from "antd";
import EventosContext from "./contexts/eventoContext";
import axios from "axios";
import returnStrDateFromObj from "./globals/returnStrDateFromObj";

export default function EventosList() {
  const { state, dispatch } = useContext(EventosContext);

  const eventosByDate = state.eventos.filter(function (evento) {
    if (state.calendarDay === "") {
      return evento.dataEvento === returnStrDateFromObj();
    } else {
      return evento.dataEvento === state.calendarDay;
    }
  });

  const CreateEventoTodos = async (event) => {
    try {
      const todos = await axios.get("http://localhost:3001/todos");
      const EventoTodos = todos.data.filter(
        (todo) => todo.eventoId === event.id
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
                  CreateEventoTodos(evento);
                }}
              >
                Editar
              </a>,
              <a
                key="list-event-delete"
                className="text-red-500"
                onClick={async () => {
                  await axios.delete(
                    `http://localhost:3001/EVENTOS/${evento.id}`
                  );
                  dispatch({ type: "REMOVE_EVENTO", payload: evento });
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
