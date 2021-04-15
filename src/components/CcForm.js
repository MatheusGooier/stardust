import React from "react";
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import CentroCustoContext from "./contexts/centroCustoContext";
import axios from "axios";
import { Button } from "antd";

export default function CcForm() {
  //Criação do centroCusto
  const [centroCusto, setCentroCusto] = useState("");
  const {
    state: { currentCentroCusto = {} },
    dispatch,
  } = useContext(CentroCustoContext);

  useEffect(() => {
    if (currentCentroCusto) {
      setCentroCusto(currentCentroCusto);
    } else {
      setCentroCusto("");
    }
  }, [currentCentroCusto.id, currentCentroCusto]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentCentroCusto.titulo) {
      const reponse = await axios.patch(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/centroCusto/${currentCentroCusto.id}`,
        {
          titulo: centroCusto.titulo || "Sem título",
          tipo: centroCusto.tipo,
        }
      );
      dispatch({ type: "UPDATE_CC", payload: reponse.data });
    } else {
      const response = await axios.post(
        `https://hooks-api-matheusalex-hotmailcom.vercel.app/centroCusto/`,
        {
          id: uuid(),
          titulo: centroCusto.titulo || "Sem título",
          tipo: centroCusto.tipo,
        }
      );
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setCentroCusto("");
  };

  return (
    <form
      className="justify-center px-4 mx-auto max-w-md font-mono border-grey border-2 m-2"
      id="formCentroCusto"
      onSubmit={handleSubmit}
    >
      <p className="mt-2 ">Descrição</p>
      <input
        type="text"
        placeholder=""
        className="flex-1 border-grey border-solid border-2 mr-2 p-1 w-full"
        onChange={(event) =>
          setCentroCusto({ ...centroCusto, titulo: event.target.value })
        }
        value={centroCusto.titulo || ""}
      ></input>
      <p className="mt-2">
        Tipo da conta:<br></br>
        <input
          type="radio"
          id="pagar"
          checked={centroCusto.tipo === "Pagar"}
          name="tipodaconta"
          value="Pagar"
          className="mr-2"
          onChange={(event) =>
            setCentroCusto({ ...centroCusto, tipo: event.target.value })
          }
        />
        Pagar
        <input
          type="radio"
          id="receber"
          checked={centroCusto.tipo === "Receber"}
          name="tipodaconta"
          value="Receber"
          className="mx-2"
          onChange={(event) =>
            setCentroCusto({ ...centroCusto, tipo: event.target.value })
          }
        />
        Receber
      </p>
      <Button
        type="primary"
        form="formCentroCusto"
        value="Submit"
        className="text-white rounded cursor-pointer items-center bg-green-300 border-2 my-4 py-1 px-6"
        onClick={handleSubmit}
      >
        Salvar
      </Button>
      <Button
        danger
        onClick={(e) => {
          setCentroCusto("");
        }}
        type="button"
        form="formCentroCusto"
        className="text-white rounded cursor-pointer items-center bg-yellow-200 border-2 my-4 py-1 px-6 ml-4"
      >
        Limpar
      </Button>
    </form>
  );
}
