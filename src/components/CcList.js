import axios from "axios";
import React, { useContext } from "react";
import CentroCustoContext from "./contexts/centroCustoContext";

export default function TodoList() {
  const { state, dispatch } = useContext(CentroCustoContext);
  console.log("state.centroCustos:", state.centroCustos);

  return (
    <div className="container mx-auto max-w-6xl text-center font-mono border-grey border-2 rounded">
      {/* <h1 className="font-bold">{title}</h1> */}
      <ul className="list-reset text-white p-2">
        <li className="text-black flex">
          <span className="flex-1">Descrição</span>
          <span className="flex-1">Setor financeiro</span>
          <span className="flex-1">Ações</span>
        </li>
        {state.centroCustos.map((cc) => (
          <li className="text-black flex" key={cc.id}>
            <span className="flex-1">{cc.titulo}</span>
            <span className="flex-1">{cc.tipo}</span>
            <span className="flex-1">
              <button
                className="mr-2"
                // onClick={() =>
                //   dispatch({ type: "SET_CURRENT_TODO", payload: todo })
                // }
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="mr-2"
                // onClick={async () => {
                //   await axios.delete(
                //     `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${todo.id}`
                //   );
                //   dispatch({ type: "REMOVE_TODO", payload: todo });
                // }}
              >
                <i className="fa fa-remove"></i>
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
