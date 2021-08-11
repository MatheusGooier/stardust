import { Typography } from "antd";

const Footer = () => {
  const { Title } = Typography;

  return (
    <div className="w-full bg-gray-800 justify-center h-20 mt-10 px-20 py-4">
      <Title level={5}>Controle Agenda de eventos</Title>
      Desenvolvido por: Matheus Cometti
    </div>
  );
};

export default Footer;
