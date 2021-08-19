import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import MainLogo from "../../../assets/img/png/logo-white.png";
import { logout } from "../../../api/auth";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={MainLogo}
          alt="Camilo Vallejos Provoste"
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {MenuBotoneraEfecto(menuCollapsed)}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined type="poweroff" />
        </Button>
      </div>
    </div>
  );
}

function MenuBotoneraEfecto(prop) {
  if (prop) {
    return <MenuUnfoldOutlined />;
  } else {
    return <MenuFoldOutlined />;
  }
}
