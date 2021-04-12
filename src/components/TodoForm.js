import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import React from "react";
import TodosContext from "../context";
import axios from "axios";

export default function TodoForm() {
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
  }, [currentTodo.id, currentTodo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentTodo.text) {
      const reponse = await axios.patch(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${currentTodo.id}`,
        {
          titulo: todo.titulo,
          text: todo.text,
          price: todo.price,
          tipo: todo.tipo,
          dataVencimento: todo.dataVencimento,
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const response = await axios.post(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/`,
        {
          id: uuid(),
          titulo: todo.titulo,
          text: todo.text,
          price: todo.price,
          complete: false,
          tipo: todo.tipo,
          dataVencimento: todo.dataVencimento,
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
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
        onClick={(e) => setTodo({ ...todo })}
        form="formTodo"
        className="text-white rounded cursor-pointer items-center bg-yellow-800 border-2 my-4 py-1 px-6"
      >
        Limpar
      </button>
    </form>
  );
}
