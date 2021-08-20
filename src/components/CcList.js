/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useContext } from "react";
import CentroCustoContext from "./contexts/centroCustoContext";
import { Table, Space, Divider } from "antd";
import BASE_URL from "./globals/baseUrl";

export default function CcList() {
  const { state, dispatch } = useContext(CentroCustoContext);

  const columns = [
    {
      title: "Descrição",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Ações",
      key: "id",
      render: (text, record) => (
        <Space size="middle" key={record._id}>
          <a
            className="cursor-pointer font-medium"
            key="list-event-edit"
            onClick={() =>
              dispatch({ type: "SET_CURRENT_CC", payload: record })
            }
          >
            Editar
          </a>
          <a
            className="cursor-pointer text-red-500 font-medium"
            key="list-event-delete"
            onClick={async () => {
              const response = await axios.delete(`${BASE_URL}/centroCustos/`, {
                data: { _id: record._id },
              });
              dispatch({ type: "REMOVE_CC", payload: response.data });
            }}
          >
            Remover
          </a>
        </Space>
      ),
    },
  ];
  return (
    <div className="container mx-auto max-w-6xl text-center font-mono rounded mt-2">
      <Divider orientation="left">Tabela de Centro de Custo</Divider>
      <Table
        columns={columns}
        dataSource={state.centroCustos}
        rowKey={(record) => record._id}
      />
    </div>
  );
}
