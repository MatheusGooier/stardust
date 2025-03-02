/* eslint-disable no-template-curly-in-string */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import React from "react";
import TodosContext from "../contexts/todoContext";
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
import locale from "../globals/locale";
import moment from "moment";
import currencyList from "../globals/currency";
import baseUrl from "../globals/baseUrl";

const dateFormat = "DD/MM/YYYY";

const currencyParser = (val) => {
  try {
    if (typeof val === "string" && !val.length) {
      val = "0.0";
    }

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
  const {
    state: { currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

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

  const savedCentroCustos = useAPI(`${baseUrl}/centroCustos`);

  const [selectedTipo, setSelectedTipo] = useState("");
  const [filteredCcs, setFilteredCcs] = useState([]);

  useEffect(() => {
    if (currentTodo._id) {
      form.setFieldsValue({
        titulo: currentTodo.titulo,
        text: currentTodo.text,
        price: currentTodo.price,
        complete: currentTodo.complete,
        tipo: currentTodo.tipo,
        dataVencimento: moment(currentTodo.dataVencimento),
        centroCusto: currentTodo.centroCusto,
      });
      setSelectedTipo(currentTodo.tipo);
    } else {
      form.setFieldsValue({
        titulo: null,
        text: null,
        price: null,
        complete: null,
        tipo: "",
        dataVencimento: moment(),
        centroCusto: null,
      });
    }
  }, [currentTodo._id]);

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

  useEffect(() => {
    setFilteredCcs(returnFilteredCcs(selectedTipo));
  }, [selectedTipo]);

  function returnFilteredCcs(tipo) {
    return savedCentroCustos.reduce(function (addCC, cc) {
      if (cc.tipo === tipo) {
        addCC.push(cc.titulo);
      }
      return addCC;
    }, []);
  }

  const handleSubmit = async (values) => {
    if (currentTodo._id) {
      const reponse = await axios.put(`${baseUrl}/todos/`, {
        _id: currentTodo._id,
        todo: {
          titulo: values.titulo || "",
          text: values.text || "",
          price: values.price || 0,
          tipo: values.tipo,
          dataVencimento: values.dataVencimento,
          centroCusto: values.centroCusto,
        },
      });
      dispatch({ type: "UPDATE_TODO", payload: reponse.data });
    } else {
      const response = await axios.post(`${baseUrl}/todos/`, {
        id: uuid(),
        titulo: values.titulo || "",
        text: values.text || "",
        price: values.price || 0,
        complete: false,
        tipo: values.tipo || [],
        dataVencimento: values.dataVencimento,
        centroCusto: values.centroCusto,
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
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
              <Input placeholder="Nome do título financeiro" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={0}>
            <Form.Item label="Descrição" name="text" form={form}>
              <Input.TextArea
                rows="2"
                placeholder="Detalhes sobre o título financeiro"
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
                allowClear={false}
              />
            </Form.Item>
          </Col>
          <Col span={8} offset={1}>
            <Form.Item
              name="tipo"
              label="Tipo da Conta"
              id="groupcheckboxTipo"
              rules={[{ required: true }]}
            >
              <Radio.Group
                onChange={(value) => {
                  setSelectedTipo(value.target.value);
                }}
              >
                <Radio.Button value="Pagar">Pagar</Radio.Button>
                <Radio.Button value="Receber">Receber</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="centroCusto" label="Centro de custo">
          <Checkbox.Group options={filteredCcs}></Checkbox.Group>
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
