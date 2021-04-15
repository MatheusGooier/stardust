import axios from "axios";
import React, { useContext } from "react";
import TodosContext from "./contexts/todoContext";
import { Table, Tag, Space } from "antd";
import "antd/dist/antd.css";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  // const title = state.todos.length > 0 ? `${state.todos.length} Conta(s) a pagar regitrada(s)` : "Nenhuma conta registrada";

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  const columns = [
    {
      title: "Descrição",
      dataIndex: "titulo",
      key: "titulo",
    },
    {
      title: "Tipo da conta",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Vencimento",
      dataIndex: "dataVencimento",
      key: "dataVencimento",
    },
    {
      title: "Valor",
      dataIndex: "price",
      className: "column-money",
      key: "price",
    },

    {
      title: "Ações",
      key: "action",
      render: (text, record) => (
        <Space size="middle" key={record.id}>
          <a
            onClick={() =>
              dispatch({ type: "SET_CURRENT_TODO", payload: record })
            }
          >
            Editar
          </a>
          <a
            onClick={async () => {
              await axios.delete(
                `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${record.id}`
              );
              dispatch({ type: "REMOVE_TODO", payload: record });
            }}
          >
            Remover
          </a>
        </Space>
      ),
    },
  ];

  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  const today = year + "/" + month + "/" + day;

  const naoPagos = state.todos.reduce(function (sum, todo) {
    return !todo.complete && todo.tipo === "Pagar" ? sum + 1 : sum;
  }, 0);

  const naoRecebidos = state.todos.reduce(function (sum, todo) {
    return !todo.complete && todo.tipo === "Receber" ? sum + 1 : sum;
  }, 0);

  const saldo = state.todos.reduce(function (sum, todo) {
    if (todo.tipo === "Receber" && todo.complete) {
      sum = sum + parseFloat(todo.price);
    } else if (todo.tipo === "Pagar" && todo.complete) {
      sum = sum - parseFloat(todo.price);
    }
    return sum;
  }, 0);

  // const footerText = `${naoPagos} contas não pagas e ${naoRecebidos} não recebidos`;

  return (
    <div className="container mx-auto max-w-6xl text-center font-mono border-grey border-2 rounded p-2 ">
      <Table
        columns={columns}
        dataSource={state.todos}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <div className="flex justify-between">
              <p className="flex-1">{record.text}</p>
              <a
                onClick={async () => {
                  const response = await axios.patch(
                    `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${record.id}`,
                    { complete: !record.complete }
                  );
                  dispatch({ type: "TOGGLE_TODO", payload: response.data });
                }}
              >
                {record.complete ? "Cancelar pagamento" : "Concluír pagamento"}
              </a>
            </div>
          ),
          rowExpandable: (record) => record.text !== "",
        }}
        rowClassName={(record, index) =>
          record.tipo === "Pagar"
            ? record.complete
              ? "bg-yellow-100"
              : "bg-yellow-200"
            : record.complete
            ? "bg-green-100"
            : "bg-green-200"
        }
      />
      <div className="font-bold">Saldo atual: {formatter.format(saldo)}</div>{" "}
    </div>
  );
}
