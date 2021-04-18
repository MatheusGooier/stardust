import React, { useContext } from "react";
import { Table } from "antd";
import EventosContext from "./contexts/eventoContext";

export default function EventoParcelas() {
  const { state, dispatch } = useContext(EventosContext);

  const columns = [
    {
      title: "Parcela",
      dataIndex: "parcela",
      key: "parcela",
    },
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Valor",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Vencimento",
      dataIndex: "dataVencimento",
      key: "dataVencimento",
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={state.eventoTodos}
      rowKey={(record) => record.id}
    />
  );
}
