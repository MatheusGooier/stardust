import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import React from "react";
import TodosContext from "./contexts/todoContext";
import axios from "axios";

export default function TodoForm() {
  //Busca o centro de custo
  const useAPI = (endpoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
    });

    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    return data;
  };

  const savedCentroCustos = useAPI(
    "https://hooks-api-matheusalex-hotmailcom.vercel.app/centroCusto"
  );

  //Criação do currentTodo
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo);
    } else {
      setTodo("");
    }
    updCCcheckbox(currentTodo.centroCusto);
  }, [currentTodo.id, currentTodo]);

  function updCCcheckbox(value) {
    console.log("savedCentroCustos:", savedCentroCustos);
    for (let key in savedCentroCustos) {
      if (document.getElementById(`ccId${savedCentroCustos[key].titulo}`)) {
        document.getElementById(
          `ccId${savedCentroCustos[key].titulo}`
        ).checked = false;
      }
    }

    console.log("value: ", value);
    for (let key in value) {
      document.getElementById(`ccId${value[key]}`).checked = true;
      let temp = CentroCustoMarcados;
      temp.set(value[key], !CentroCustoMarcados.get(value[key]));
      setCentroCustoMarcados(temp);
    }
  }

  const handleSubmit = async (event) => {
    console.log("[...CentroCustoMarcados.keys()]: ", [
      ...CentroCustoMarcados.keys(),
    ]);
    event.preventDefault();
    if (currentTodo.text) {
      const reponse = await axios.patch(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${currentTodo.id}`,
        {
          titulo: todo.titulo || "Sem título",
          text: todo.text || "Sem descrição",
          price: todo.price || 0,
          tipo: todo.tipo,
          dataVencimento: todo.dataVencimento,
          centroCusto: [...CentroCustoMarcados.keys()],
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const response = await axios.post(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/`,
        {
          id: uuid(),
          titulo: todo.titulo || "Sem título",
          text: todo.text || "Sem descrição",
          price: todo.price || 0,
          complete: false,
          tipo: todo.tipo,
          dataVencimento: todo.dataVencimento,
          centroCusto: [...CentroCustoMarcados.keys()],
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  //Lista de centro de custos selecionados
  const [CentroCustoMarcados, setCentroCustoMarcados] = useState(new Map());

  const updateCentroCusto = (event) => {
    let temp = CentroCustoMarcados;

    if (event.target.checked) {
      temp.set(
        event.target.value,
        !CentroCustoMarcados.get(event.target.value)
      );
    } else {
      temp.delete(event.target.value);
    }
    console.log("setCentroCustoMarcados(temp);", CentroCustoMarcados);
    setCentroCustoMarcados(temp);
  };

  const isCentroCustoChecked = (event) => {
    console.log("event:", event);
    if ([todo.centroCusto].includes(event.target.value)) {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="justify-center p-5 mx-auto max-w-md font-mono border-grey border-2 m-6"
      id="formTodo"
    >
      <p className="mt-2 ">Título</p>
      <input
        type="text"
        placeholder=""
        className="flex-1 border-grey border-solid border-2 mr-2 p-1 w-full"
        onChange={(event) => setTodo({ ...todo, titulo: event.target.value })}
        value={todo.titulo || ""}
      ></input>
      <p className="mt-2">Descrição</p>
      <textarea
        rows="2"
        className="flex-1 border-grey border-solid border-2 mr-2 p-1 w-full"
        onChange={(event) => setTodo({ ...todo, text: event.target.value })}
        value={todo.text || ""}
      ></textarea>
      <div className="flex">
        <p className="flex-1 ">
          Valor
          <input
            id="valor"
            placeholder=" R$ 0,00"
            type="number"
            className="border-grey border-solid border-2 p-1 w-5/6"
            onChange={(event) =>
              setTodo({ ...todo, price: event.target.value })
            }
            value={todo.price || ""}
          ></input>
        </p>
        <p className="mt-1">
          Tipo da conta:<br></br>
          <input
            type="radio"
            id="pagar"
            checked={todo.tipo === "Pagar"}
            name="tipodaconta"
            value="Pagar"
            className="mr-2"
            onChange={(event) => setTodo({ ...todo, tipo: event.target.value })}
          />
          Pagar
          <input
            type="radio"
            id="receber"
            checked={todo.tipo === "Receber"}
            name="tipodaconta"
            value="Receber"
            className="mx-2"
            onChange={(event) => setTodo({ ...todo, tipo: event.target.value })}
          />
          Receber
        </p>
      </div>
      <p className="mt-2">Vencimento</p>
      <input
        id="date"
        type="date"
        value={todo.dataVencimento || ""}
        className={`border-grey border-solid border-2 p-1 w-3/6`}
        onChange={(event) =>
          setTodo({ ...todo, dataVencimento: event.target.value })
        }
      ></input>

      <p className="mt-2">Centro de custos:</p>
      <ul>
        {savedCentroCustos.map((CentroCusto) => (
          <li key={CentroCusto.id}>
            <input
              type="checkbox"
              id={`ccId${CentroCusto.titulo}`}
              className="ml-2 checkbox"
              value={CentroCusto.titulo}
              onChange={updateCentroCusto}
              defaultChecked={isCentroCustoChecked}
            />
            <span className="mx-2">{CentroCusto.titulo}</span>
          </li>
        ))}
      </ul>
      <br></br>
      <button
        type="submit"
        form="formTodo"
        value="Submit"
        className="text-white rounded cursor-pointer items-center bg-green-700 border-2 my-4 py-1 px-6"
      >
        Salvar
      </button>
      <button
        onClick={(e) => {
          setTodo({ ...todo });
          updCCcheckbox(currentTodo.centroCusto);
          setCentroCustoMarcados(new Map());
        }}
        type="button"
        form="formTodo"
        className="text-white rounded cursor-pointer items-center bg-yellow-800 border-2 my-4 py-1 px-6"
      >
        Limpar
      </button>
    </form>
  );
}
