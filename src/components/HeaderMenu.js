import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Switch, Layout, Menu } from "antd";
// import { Avatar, Image, Switch, Layout, Menu } from "antd";
const { Header } = Layout;

// export default function Menu() {
const HeaderMenu = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div
      className="w-full h-16 flex bg-gray-800 fixed"
      style={{ zIndex: 9999, backgroundColor: "#031529" }}
    >
      <div className="w-full m-0">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal">
              <Menu.Item key="1">
                <Link to={"/"} className="nav-link">
                  Financeiro
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={"/cc"} className="nav-link">
                  Centro de custos
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to={"/eventos"} className="nav-link">
                  Eventos
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      </div>
      <div className="w-32 justify-center flex items-center">
        <Switch
          checked={checked}
          onChange={() => {
            handleChange();

            props.handleThemeChange(!checked);
          }}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
      </div>
      {/* <div className="w-1/12 m-0 max-w-xs justify-center flex items-center bg-gray-800">
  

        <div>
          {" "}
          <Avatar
            size={50}
            src={
              <Image
                preview={false}
                src="https://media-exp1.licdn.com/dms/image/C4E03AQHSvFZRwo9Sow/profile-displayphoto-shrink_200_200/0/1618777388255?e=1624492800&v=beta&t=0T7Uf2IQwKXk4C2IJXbaVxlVt6RegmlWfZpfSnr5L7s"
                fallback="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            }
          />
        </div>
      </div> */}
    </div>
  );
};
export default HeaderMenu;
