import React, { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import axios from "axios";
import { Form, Input, Button, DatePicker, Divider, InputNumber } from "antd";
import moment from "moment";
import EventosContext from "./contexts/eventoContext";
// import eventosReducer from "./reducers/eventoReducer";

export default function EventosForm() {
  const formRef = React.createRef();

  //Busca o dia de hoje e formata
  const dateObj = new Date();
  const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateObj.getUTCDate().toString().padStart(2, "0");
  const year = dateObj.getUTCFullYear();
  const today = day + "/" + month + "/" + year;
  const dateFormat = "DD/MM/YYYY";
  const [form] = Form.useForm();

  //Criação do Evento
  const [evento, setEvento] = useState("");
  const {
    state: { currentEvento = {} },
    dispatch,
  } = useContext(EventosContext);

  useEffect(() => {
    if (
      Object.keys(currentEvento).length !== 0 ||
      currentEvento.constructor !== Object
    ) {
      setEvento(currentEvento);

      var momentDataEvento = moment(currentEvento.dataEvento).format(
        dateFormat
      );
      // var dateMonthAsWord = moment("2014-02-27T10:00:00").format('DD-MMM-YYYY');

      form.setFieldsValue({
        titulo: currentEvento.titulo,
        text: currentEvento.text,
        price: currentEvento.price,
        dataEvento: moment(momentDataEvento),
      });
    } else {
      onReset();
    }
  }, [currentEvento.id, currentEvento]);

  const onReset = () => {
    formRef.current.resetFields();
    setEvento({ ...evento, dataEvento: moment() });
  };

  const handleDateChange = (date, dateString) => {
    if (!!date) {
      setEvento({ dataEvento: dateString });
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const App = () => {
    const onFinish = async (values) => {
      const newValues = {
        ...values,
        dataEvento: values["dataEvento"].format(dateFormat),
      };

      if (evento.titulo) {
        const reponse = await axios.patch(
          `https://hooks-api-matheusalex-hotmailcom.vercel.app/eventos/${currentEvento.id}`,
          {
            titulo: newValues.titulo || "Sem título",
            dataEvento: newValues.dataEvento || "01/04/2021",
            text: newValues.text || "Sem Descrição",
            price: newValues.price || 10,
          }
        );
        dispatch({ type: "UPDATE_EVENTO", payload: reponse.data });
      } else {
        const response = await axios.post(
          `https://hooks-api-matheusalex-hotmailcom.vercel.app/eventos/`,
          {
            id: uuid(),
            titulo: newValues.titulo || "Sem título",
            text: newValues.text || "Sem Descrição",
            dataEvento: newValues.dataEvento || "01/04/2021",
            price: newValues.price || 10,
          }
        );
        dispatch({ type: "ADD_EVENTO", payload: response.data });
      }
    };

    return (
      <Form
        onFinish={onFinish}
        ref={formRef}
        layout="vertical"
        form={form}
        initialValues="vertical"
        className="flex-1 m-2 "
        validateMessages={validateMessages}
      >
        <Divider orientation="left">Registro de evento</Divider>
        <Form.Item
          label="Título"
          name="titulo"
          rules={[{ required: true }]}
          form={form}
        >
          <Input placeholder="Nome do evento" />
        </Form.Item>
        <Form.Item
          label="Descrição"
          name="text"
          rules={[{ required: true }]}
          form={form}
        >
          <Input.TextArea
            rows="2"
            placeholder="Descreva um pouco o evento"
            className="flex-1 border-grey border-solid border-2 mr-2 p-1 w-full"
          />
        </Form.Item>
        <Form.Item
          label="Valor do ensaio"
          name="price"
          rules={[{ required: true }]}
          form={form}
        >
          <InputNumber
            // defaultValue={0}
            style={{ width: 200 }}
            placeholder="R$ 0.00"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
        <Form.Item
          label="Data do evento"
          name="dataEvento"
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
        {/* <Form.Item {...buttonItemLayout}> */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mr-4"
            // onClick={handleSubmit}
          >
            Salvar
          </Button>
          <Button danger htmlType="button" onClick={onReset}>
            Limpar
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <App />;
}
