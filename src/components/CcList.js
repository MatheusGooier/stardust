import axios from "axios";
import React, { useContext } from "react";
import CentroCustoContext from "./contexts/centroCustoContext";
import { Table, Space } from "antd";

export default function CcList() {
  const { state, dispatch } = useContext(CentroCustoContext);

  const columns = [
    {
      title: "Descrição",
      dataIndex: "titulo",
      key: "titulo",
      render: (text) => <a>{text}</a>,
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
        <Space size="middle" key={record.id}>
          <a
            onClick={() =>
              dispatch({ type: "SET_CURRENT_CC", payload: record })
            }
          >
            Editar {record.name}
          </a>
          <a
            onClick={async () => {
              await axios.delete(
                `https://hooks-api-matheusalex-hotmailcom.vercel.app/centroCusto/${record.id}`
              );
              dispatch({ type: "REMOVE_CC", payload: record });
            }}
          >
            Remover
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl text-center font-mono border-grey border-2 rounded">
      <Table
        columns={columns}
        dataSource={state.centroCustos}
        rowKey={(record) => record.id}
      />
    </div>
  );
}
