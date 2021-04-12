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
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    if (currentTodo) {
      setTodo(currentTodo);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async (event) => {
    console.log(currentTodo);
    event.preventDefault();
    if (currentTodo.text) {
      const reponse = await axios.patch(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/${currentTodo.id}`,
        {
          text: todo.text,
          price: todo.price,
          tipo: todo.tipo,
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const response = await axios.post(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/todos/`,
        {
          id: uuid(),
          text: todo.text,
          price: todo.price,
          complete: false,
          tipo: todo.tipo,
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="justify-center p-5 mx-auto max-w-md font-mono "
      id="formTodo"
    >
      <p className="mt-2">Descrição</p>
      <input
        type="text"
        placeholder=""
        className="flex-1 border-grey border-solid border-2 mr-2"
        onChange={(event) => setTodo({ ...todo, text: event.target.value })}
        value={todo.text || ""}
      ></input>
      <p className="mt-2">Valor</p>
      <input
        id="valor"
        placeholder="R$ 0,00"
        type="number"
        className="flex-1 border-grey border-solid border-2 "
        onChange={(event) => setTodo({ ...todo, price: event.target.value })}
        value={todo.price || ""}
      ></input>{" "}
      <p className="mt-2">
        Tipo da conta:
        <input
          type="radio"
          id="pagar"
          checked={todo.tipo === "Pagar"}
          name="tipodaconta"
          value="Pagar"
          className="ml-2"
          onChange={(event) => setTodo({ ...todo, tipo: event.target.value })}
        />
        Pagar
        <input
          type="radio"
          id="receber"
          checked={todo.tipo === "Receber"}
          name="tipodaconta"
          value="Receber"
          className="ml-2"
          onChange={(event) => setTodo({ ...todo, tipo: event.target.value })}
        />
        Receber
      </p>
      <br></br>
      <button
        type="submit"
        form="formTodo"
        value="Submit"
        className="text-white rounded cursor-pointer items-center bg-green-700 border-2 my-4 py-1 px-6"
      >
        Enviar
      </button>
    </form>
  );
}
