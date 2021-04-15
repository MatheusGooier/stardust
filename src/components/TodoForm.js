import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import React from "react";
import TodosContext from "./contexts/todoContext";
import axios from "axios";
import { Button } from "antd";

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
    for (let key in savedCentroCustos) {
      if (document.getElementById(`ccId${savedCentroCustos[key].titulo}`)) {
        document.getElementById(
          `ccId${savedCentroCustos[key].titulo}`
        ).checked = false;
      }
    }

    for (let key in value) {
      document.getElementById(`ccId${value[key]}`).checked = true;
      let temp = CentroCustoMarcados;
      temp.set(value[key], !CentroCustoMarcados.get(value[key]));
      setCentroCustoMarcados(temp);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTodo.titulo) {
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
    updCCcheckbox("");
    setCentroCustoMarcados(new Map());
  };

  const HandleClear = (e) => {
    setTodo("");
    updCCcheckbox("");
    setCentroCustoMarcados(new Map());
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
    setCentroCustoMarcados(temp);
  };

  const isCentroCustoChecked = (event) => {
    if ([todo.centroCusto].includes(event.target.value)) {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="justify-center px-4 mx-auto max-w-md font-mono border-grey border-2 m-2"
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
        <p className="flex-1 mt-1">
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

      <Button
        type="primary"
        form="formTodo"
        value="Submit"
        className="text-white rounded cursor-pointer items-center bg-green-300 my-4 py-1 px-6 "
        onClick={handleSubmit}
      >
        Salvar
      </Button>
      <Button
        danger
        onClick={HandleClear}
        type="button"
        form="formTodo"
        className="text-white rounded cursor-pointer items-center bg-yellow-200 my-4 py-1 px-6 ml-4"
      >
        Limpar
      </Button>
    </form>
  );
}
