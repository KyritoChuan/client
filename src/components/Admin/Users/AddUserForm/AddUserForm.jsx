import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadUsers } from "../../../../actions/reloadActions";
import { isVisibleModal } from "../../../../actions/modalActions";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm() {
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    role: "",
    avatar: "",
  });
  const { Option } = Select;
  const dispatch = useDispatch();

  const addUser = async () => {
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.email ||
      !userData.role ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
      return;
    }

    if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas no coinciden",
      });
      return;
    }

    const accessToken = getAccessTokenApi();
    const response = await signUpAdminApi(accessToken, userData);

    if (response.status !== 200) {
      notification["error"]({
        message: response.data.message,
      });
    } else {
      notification["success"]({
        message: response.data.message,
      });
      dispatch(isVisibleModal(false));
      dispatch(reloadUsers(true));
      setUserData({
        name: "",
        lastname: "",
        email: "",
        role: "",
        avatar: "",
      });
    }
  };

  return (
    <div className="add-user-form">
      <Form className="form-add" onFinish={addUser}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined type="user" />}
                placeholder="Nombre"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined type="user" />}
                placeholder="Apellidos"
                name="lastname"
                value={userData.lastname}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    lastname: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<MailOutlined type="mail" />}
                placeholder="Correo Electronico"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                placeholder="Selecciona un rol"
                name="role"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    role: e,
                  })
                }
                value={userData.role}
              >
                <Option value="admin">Administrador</Option>
                <Option value="editor">Editor</Option>
                <Option value="revisor">Revisor</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<LockOutlined type="lock" />}
                type="password"
                name="password"
                placeholder="Contraseña"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<LockOutlined type="lock" />}
                type="password"
                name="repeatPassword"
                placeholder="Repetir Contraseña"
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    repeatPassword: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Col span={24}>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Crear Usuario
          </Button>
        </Col>
      </Form>
    </div>
  );
}
