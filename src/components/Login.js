import { Form, Input, Button, Checkbox, Typography, Row, Col } from "antd";
import { login, logout } from "../utils";
import logo from "../img/logo.png";

const { Title } = Typography;
const SignUp = (props) => {
  const onFinish = (values) => {
    if (process.env.REACT_APP_NOT_SECRET_CODE === values.password) {
      login();
      props.history.push("/financeiro");
    } else {
      logout();
    }
  };

  // const onFinishFailed = (errorInfo) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div className="flex justify-center pt-20">
      <Row>
        <Col span={11} className="p-10">
          <img src={logo} alt="Logo" />
        </Col>
        <Col span={12} className="p-10">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Title level={5}>
              Bem vinda Mariana, qual sua senha de acesso?
            </Title>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Entrar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default SignUp;
