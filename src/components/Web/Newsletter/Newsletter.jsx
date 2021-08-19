import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { suscribeNewsletterApi } from "../../../api/newsletter";
import "./Newsletter.scss";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const onFinish = () => {
    const emailValid =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultValidation = emailValid.test(email);

    if (!resultValidation) {
      notification["error"]({
        message: "El correo electrónico no es válido.",
      });
    } else {
      suscribeNewsletterApi(email).then((response) => {
        if (response.status !== 200) {
          notification["warning"]({
            message: response.data.message,
          });
        } else {
          notification["success"]({
            message: response.data.message,
          });
          setEmail("");
        }
      });
    }
  };
  return (
    <div className="newsletter">
      <h3>Newsletter..</h3>
      <Form onFinish={onFinish}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)" }} />}
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            ¡Me suscribo!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
