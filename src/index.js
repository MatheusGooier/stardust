import React, { useContext, useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import reportWebVitals from "./reportWebVitals";
import TodosContext from "./components/contexts/todoContext";

import todosReducer from "./components/reducers/todoReducer";

import TodoList from "./components/TodosList";
import TodoForm from "./components/TodoForm";

const useAPI = (endpoint) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await Axios.get(endpoint);
    setData(response.data);
  };
  return data;
};

const App = () => {
  const todoInitialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, todoInitialState);
  const savedTodos = useAPI(
    "https://hooks-api-matheusalex-hotmailcom.vercel.app/todos"
  );

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos,
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(
  <App />,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
