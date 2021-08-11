/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import React from "react";
import TodosContext from "./contexts/todoContext";
import axios from "axios";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Divider,
  InputNumber,
  DatePicker,
  Checkbox,
  Radio,
} from "antd";
import locale from "./globals/locale";
import moment from "moment";
import currencyList from "./globals/currency";

let selectedTipo = "Pagar";
const dateFormat = "DD/MM/YYYY";

const currencyParser = (val) => {
  try {
    // for when the input gets clears
    if (typeof val === "string" && !val.length) {
      val = "0.0";
    }

    // detecting and parsing between comma and dot
    var group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
    var decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
    var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
    reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
    reversedVal = reversedVal.replace(/[^0-9.]/g, "");
    const digitsAfterDecimalCount = (reversedVal.split(".")[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  } catch (error) {
    console.error(error);
  }
};

export default function TodoForm() {
  const formRef = React.createRef();
  const [form] = Form.useForm();

  const currencyFormatter = (selectedCurrOpt) => (value) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: selectedCurrOpt.split("::")[1],
    }).format(value);
  };

  //Criação do currentTodo
  const [todo, setTodo] = useState({});
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.id) {
      setTodo(currentTodo);
      form.setFieldsValue({
        titulo: currentTodo.titulo,
        text: currentTodo.text,
        price: currentTodo.price,
        complete: currentTodo.complete,
        tipo: currentTodo.tipo,
        dataVencimento: moment(currentTodo.dataVencimento, dateFormat),
        centroCusto: currentTodo.centroCusto,
      });
    } else {
      setTodo({});
      form.setFieldsValue({
        titulo: null,
        text: null,
        price: null,
        complete: null,
        tipo: "Pagar",
        dataVencimento: moment(),
        centroCusto: null,
      });
    }
  }, [currentTodo.id]);

  //Busca o centro de custo
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

  const handleDateChange = (date, dateString) => {
    if (!!date) {
      setTodo({ dataVencimento: dateString });
    }
  };

  const validateMessages = {
    required: "${label} é obrigatório",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const savedCentroCustos = useAPI("http://localhost:3001/centroCustos");

  const filteredCc = savedCentroCustos.reduce(function (addCC, cc) {
    if (cc.tipo === selectedTipo) {
      addCC.push(cc.titulo);
    }
    return addCC;
  }, []);

  const handleSubmit = async (values) => {
    const newValues = {
      ...values,
      dataVencimento: moment(values["dataVencimento"]).format(dateFormat),
    };
    if (currentTodo.titulo) {
      const reponse = await axios.patch(
        `http://localhost:3001/todos/${currentTodo.id}`,
        {
          titulo: newValues.titulo || "Sem título",
          text: newValues.text || "Sem descrição",
          price: newValues.price || 0,
          tipo: newValues.tipo,
          dataVencimento: newValues.dataVencimento,
          centroCusto: newValues.centroCusto,
        }
      );
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const response = await axios.post(`http://localhost:3001/todos/`, {
        id: uuid(),
        titulo: newValues.titulo || "Sem título",
        text: newValues.text || "Sem descrição",
        price: newValues.price || 0,
        complete: false,
        tipo: newValues.tipo,
        dataVencimento: newValues.dataVencimento,
        centroCusto: newValues.centroCusto,
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  const onchangeTipo = (value) => {
    selectedTipo = value.target.value;
  };

  const onReset = () => {
    dispatch({ type: "SET_CURRENT_TODO", payload: {} });
    form.setFieldsValue({
      titulo: null,
      text: null,
      price: null,
      complete: null,
      tipo: "Pagar",
      dataVencimento: moment(),
      centroCusto: null,
    });
  };

  return (
    <Col span={16} offset={4}>
      <Form
        onFinish={handleSubmit}
        ref={formRef}
        layout="vertical"
        form={form}
        initialValues="vertical"
        className="flex-1 m-2 "
        validateMessages={validateMessages}
      >
        <Divider orientation="left">Registro de Título financeiro</Divider>
        <Row>
          <Col span={24} offset={0}>
            <Form.Item
              label="Título"
              name="titulo"
              rules={[{ required: true }]}
              form={form}
            >
              <Input placeholder="Nome do título" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={0}>
            <Form.Item label="Descrição" name="text" form={form}>
              <Input.TextArea
                rows="2"
                placeholder="Detalhes sobre o título"
                className="flex-1 border-grey border-solid border-2 mr-2 p-1 w-full"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6} offset={0}>
            <Form.Item
              label="Valor do título"
              name="price"
              rules={[{ required: true }]}
              form={form}
            >
              <InputNumber
                style={{ width: "auto" }}
                placeholder="R$ 0.00"
                prefix="R$ "
                formatter={currencyFormatter(
                  `${currencyList.CtryNm}::${currencyList.Ccy}`
                )}
                parser={currencyParser}
              />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item
              label="Data do evento"
              name="dataVencimento"
              rules={[{ required: true }]}
              form={form}
            >
              <DatePicker
                format={dateFormat}
                placeholder="01/01/2001"
                onChange={handleDateChange}
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item
              name="tipo"
              label="Tipo da Conta"
              id="groupcheckboxTipo"
              rules={[{ required: true, message: "Please pick an item!" }]}
            >
              <Radio.Group onChange={onchangeTipo}>
                <Radio.Button value="Pagar">Pagar</Radio.Button>
                <Radio.Button value="Receber">Receber</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="centroCusto" label="Centro de custo">
          <Checkbox.Group options={filteredCc}></Checkbox.Group>
        </Form.Item>
        <Col span={8} offset={0}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="mr-4">
              Salvar
            </Button>
            <Button danger htmlType="button" onClick={onReset}>
              Limpar
            </Button>
          </Form.Item>
        </Col>
      </Form>
    </Col>
  );
}
