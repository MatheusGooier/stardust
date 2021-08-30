/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import React from "react";
import { useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import CentroCustoContext from "./contexts/centroCustoContext";
import axios from "axios";
import { Form, Input, Button, Radio, Divider, Col, Row } from "antd";
import baseUrl from "./globals/baseUrl";

export default function CcForm() {
  const formRef = React.createRef();
  const [form] = Form.useForm();

  const {
    state: { currentCentroCusto = {} },
    dispatch,
  } = useContext(CentroCustoContext);

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

  const onFinish = async (values) => {
    if (currentCentroCusto.titulo) {
      await axios.put(`${baseUrl}/centroCustos/`, {
        _id: currentCentroCusto._id,
        cc: {
          titulo: values.titulo,
          tipo: values.tipo,
        },
      });
      dispatch({
        type: "UPDATE_CC",
        payload: {
          titulo: values.titulo,
          tipo: values.tipo,
        },
      });
    } else {
      const response = await axios.post(`${baseUrl}/centroCustos/`, {
        id: uuid(),
        titulo: values.titulo,
        tipo: values.tipo,
      });
      dispatch({ type: "ADD_CC", payload: response.data });
    }
  };

  useEffect(() => {
    if (
      Object.keys(currentCentroCusto).length !== 0 ||
      currentCentroCusto.constructor !== Object
    ) {
      form.setFieldsValue({
        titulo: currentCentroCusto.titulo,
        tipo: currentCentroCusto.tipo,
      });
    } else {
      onReset();
    }
  }, [currentCentroCusto]);

  const onReset = () => {
    formRef.current.resetFields();
  };

  return (
    <Col span={16} offset={4}>
      <Form
        onFinish={onFinish}
        ref={formRef}
        layout="vertical"
        form={form}
        initialValues="vertical"
        className="flex-1 m-2 "
        validateMessages={validateMessages}
      >
        <Divider orientation="left">Registro de Centro de custo</Divider>
        <Row>
          <Col span={16} offset={0}>
            <Form.Item
              label="Descrição"
              name="titulo"
              rules={[{ required: true }]}
              form={form}
            >
              <Input placeholder="Nome do Centro de custo" />
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item
              name="tipo"
              label="Tipo da Conta"
              rules={[{ required: true, message: "Please pick an item!" }]}
            >
              <Radio.Group>
                <Radio.Button value="Pagar">Pagar</Radio.Button>
                <Radio.Button value="Receber">Receber</Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Form>
    </Col>
  );
}
