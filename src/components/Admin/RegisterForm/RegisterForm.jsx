import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  modifyRegisterValue,
  modifyRegisterChecked,
  modifyRegister,
  validRegisterEmail,
  validRegisterChecked,
  validRegisterMinLength,
  changeValid,
} from "../../../actions/signInActions";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const registerForm = useSelector((store) => store.signIns.registerForm);
  const registerValid = useSelector((store) => store.signIns.registerValid);

  const changeForm = (e) => {
    if (e.target.name === "privacyPolicy") {
      dispatch(modifyRegisterChecked(e.target));
    } else {
      dispatch(modifyRegisterValue(e.target));
    }
  };

  const inputValidation = (e) => {
    const { type } = e.target;

    if (type === "email") {
      dispatch(validRegisterEmail(e.target));
    }
    if (type === "password") {
      dispatch(validRegisterMinLength(e.target));
    }
    if (type === "checkbox") {
      dispatch(validRegisterChecked(e.target));
    }
  };

  //Funcion asyncrona:
  const register = async () => {
    const { email, password, repeatPassword, privacyPolicy } = registerValid; //inputValidation;

    if (!email || !password || !repeatPassword || !privacyPolicy) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    //if (password !== repeatPassword) {
    if (registerForm.password !== registerForm.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguales.",
      });
      return;
    }

    const result = await signUpApi(registerForm);

    if (!result.ok) {
      notification["error"]({
        message: result.message,
      });
    } else {
      notification["success"]({
        message: result.message,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    dispatch(
      modifyRegister({
        email: "",
        password: "",
        repeatPassword: "",
        privacyPolicy: false,
      })
    );

    dispatch(
      changeValid({
        email: false,
        password: false,
        repeatPassword: false,
        privacyPolicy: false,
      })
    );
  };

  return (
    <Form className="register-form" onFinish={register} onChange={changeForm}>
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo electronico"
          className="register-form__input"
          onChange={inputValidation}
          value={registerForm.email}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={registerForm.password}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={registerForm.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={registerForm.privacyPolicy}
        >
          He leído y acepto la politica de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}
