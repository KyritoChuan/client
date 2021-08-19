import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modifyLoginValue } from "../../../actions/signInActions";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { signInApi } from "../../../api/user";

import "./LoginForm.scss";

export default function LoginForm() {
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.signIns.loginForm);

  const login = async () => {
    const result = await signInApi(formData);

    if (result.status !== 200) {
      notification["error"]({
        message: result.data.message,
      });
      return;
    }

    const { accessToken, refreshToken } = result.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);

    notification["success"]({
      message: "Login correcto.",
    });

    //window.location.href = "/#/admin";
    window.location.replace("/admin/");
  };

  return (
    <Form className="login-form" onFinish={login}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="login-form__input"
          onChange={(e) => dispatch(modifyLoginValue(e.target))}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-form__input"
          onChange={(e) => dispatch(modifyLoginValue(e.target))}
        />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form__button">
          Entrar
        </Button>
      </Form.Item>
    </Form>
  );
}
