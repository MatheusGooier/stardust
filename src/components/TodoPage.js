/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import TodosContext from "./contexts/todoContext";
import todosReducer from "./reducers/todoReducer";
import TodoList from "./TodosList";
import TodoForm from "./TodoForm";
import baseUrl from "./globals/baseUrl";

export default function TodoPage() {
  const useAPI = (endpoint) => {
    const [data, setData] = useState([]);

    useEffect(() => {
      getData();
    }, [endpoint]);

    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    return data;
  };

  const App = () => {
    const todoInitialState = useContext(TodosContext);
    const [state, dispatch] = useReducer(todosReducer, todoInitialState);
    const savedTodos = useAPI(`${baseUrl}/todos`);
    useEffect(() => {
      dispatch({
        type: "GET_TODOS",
        payload: savedTodos,
      });
    }, [savedTodos]);

    return (
      <TodosContext.Provider value={{ state, dispatch }}>
        <TodoList />
        <TodoForm />
      </TodosContext.Provider>
    );
  };

  return <App />;
}
