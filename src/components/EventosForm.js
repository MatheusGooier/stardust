import React, { useState, useContext, useEffect } from "react";
import { uuid } from "uuidv4";
import axios from "axios";
import { Form, Input, Button, DatePicker, Divider, InputNumber } from "antd";
import moment from "moment";
import EventosContext from "./contexts/eventoContext";
import currencyList from "./globals/currency";
import returnStrDrateFromObj from "./globals/returnStrDateFromObj";
import locale from "./globals/locale";
// import eventosReducer from "./reducers/eventoReducer";

export default function EventosForm() {
  const formRef = React.createRef();

  //Busca o dia de hoje e formata
  const today = returnStrDrateFromObj();
  const dateFormat = "DD/MM/YYYY";

  //Form usado nos componentes antd
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
      console.log("currentEvento", currentEvento);
      var momentDataEvento = moment(currentEvento.dataEvento, dateFormat);
      // var dateMonthAsWord = moment("2014-02-27T10:00:00").format('DD-MMM-YYYY');

      console.log("moment(momentDataEvento)", moment(momentDataEvento));
      console.log("momentDataEvento", momentDataEvento);
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

      console.log(evento.titulo);

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

    const currencyFormatter = (selectedCurrOpt) => (value) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: selectedCurrOpt.split("::")[1],
      }).format(value);
    };

    const currencyParser = (val) => {
      try {
        // for when the input gets clears
        if (typeof val === "string" && !val.length) {
          val = "0.0";
        }

        // detecting and parsing between comma and dot
        var group = new Intl.NumberFormat(locale)
          .format(1111)
          .replace(/1/g, "");
        var decimal = new Intl.NumberFormat(locale)
          .format(1.1)
          .replace(/1/g, "");
        var reversedVal = val.replace(new RegExp("\\" + group, "g"), "");
        reversedVal = reversedVal.replace(new RegExp("\\" + decimal, "g"), ".");
        //  => 1232.21 €

        // removing everything except the digits and dot
        reversedVal = reversedVal.replace(/[^0-9.]/g, "");
        //  => 1232.21

        // appending digits properly
        const digitsAfterDecimalCount = (reversedVal.split(".")[1] || [])
          .length;
        const needsDigitsAppended = digitsAfterDecimalCount > 2;

        if (needsDigitsAppended) {
          reversedVal = reversedVal * Math.pow(10, digitsAfterDecimalCount - 2);
        }

        return Number.isNaN(reversedVal) ? 0 : reversedVal;
      } catch (error) {
        console.error(error);
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
            prefix="R$ "
            formatter={currencyFormatter(
              `${currencyList.CtryNm}::${currencyList.Ccy}`
            )}
            parser={currencyParser}
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
