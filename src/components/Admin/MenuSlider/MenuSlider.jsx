import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserAddOutlined,
  MenuOutlined,
  BookOutlined,
} from "@ant-design/icons";

import "./MenuSlider.scss";

function MenuSlider(props) {
  const { Sider } = Layout;
  const { menuCollapsed, location } = props;

  return (
    <Sider className="admin-slider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <HomeOutlined type="home" />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to={"/admin/users"}>
            <UserAddOutlined type="users" />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/menu">
          <Link to={"/admin/menu"}>
            <MenuOutlined type="menu" />
            <span className="nav-text">Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/courses">
          <Link to={"/admin/courses"}>
            <BookOutlined />
            <span className="nav-text">Cursos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default withRouter(MenuSlider);
