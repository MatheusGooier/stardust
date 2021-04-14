import axios from "axios";
import React, { useContext } from "react";
import TodosContext from "./contexts/todoContext";

export default function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  // const title = state.todos.length > 0 ? `${state.todos.length} Conta(s) a pagar regitrada(s)` : "Nenhuma conta registrada";
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

  const footerText = `${naoPagos} contas não pagas e ${naoRecebidos} não recebidos`;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="container mx-auto max-w-6xl text-center font-mono border-grey border-2 rounded">
      {/* <h1 className="font-bold">{title}</h1> */}
      <ul className="list-reset text-white p-2">
        <li className="text-black flex">
          <span className="flex-1">Descrição</span>
          <span className="flex-1">Tipo da conta</span>
          <span className="flex-1">Vencimento</span>
          <span className="flex-1">Valor</span>
          <span>Ações</span>
        </li>
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className={`rounded cursor-pointer flex items-center bg-yellow-600 border-grey border-dotted border-2 my-1 py-4            
            ${todo.complete && "bg-yellow-900"}
            ${todo.tipo === "Receber" && "bg-blue-600"}
            ${todo.tipo === "Receber" && todo.complete && "bg-blue-900"}
            `}
            onDoubleClick={async () => {
              const response = await axios.patch(
                `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${todo.id}`,
                { complete: !todo.complete }
              );
              dispatch({ type: "TOGGLE_TODO", payload: response.data });
            }}
          >
            <span className="flex-1">{todo.text}</span>
            <span className="flex-1">{todo.tipo}</span>
            <span
              className={`flex-1 ${
                Date.parse(today) > Date.parse(todo.dataVencimento) &&
                "text-red-500 font-bold"
              }`}
            >
              {todo.dataVencimento}
            </span>
            <span className="flex-1">{formatter.format(todo.price)}</span>
            <button
              className="mr-2"
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="mr-2"
              onClick={async () => {
                await axios.delete(
                  `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${todo.id}`
                );
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <i className="fa fa-remove"></i>
            </button>
          </li>
        ))}
      </ul>
      <div className="font-bold">Saldo atual: {formatter.format(saldo)}</div>{" "}
      <div>{footerText}</div>
    </div>
  );
}
