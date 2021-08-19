import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reloadUsers } from "../../../../actions/reloadActions";
import { isVisibleModal } from "../../../../actions/modalActions";
import { changeUser, changeValueUser } from "../../../../actions/userActions";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import {
  updateUserApi,
  uploadAvatarApi,
  getAvatarApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user } = props;
  const [avatar, setAvatar] = useState(null);
  const { Option } = Select;
  const dispatch = useDispatch();
  const userUpdate = useSelector((store) => store.users.userEdit);

  useEffect(() => {
    dispatch(
      changeUser({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        password: "",
        repeatPassword: "",
      })
    );

    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (avatar) {
      dispatch(
        changeValueUser({
          name: "avatar",
          value: avatar.file,
        })
      );
    }
    // eslint-disable-next-line
  }, [avatar]);

  const updateUser = async () => {
    const token = getAccessTokenApi();

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        delete updateUser.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "El nombre, apellido y email son obligatorios",
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      const avatarName = await uploadAvatarApi(
        token,
        userUpdate.avatar,
        user._id
      );
      if (avatarName.status !== 200) {
        notification["error"]({
          message: avatarName.data.message,
        });
        return;
      } else {
        userUpdate.avatar = avatarName.message;
      }
    }
    const messageUpdate = await updateUserApi(token, userUpdate, user._id);
    if (messageUpdate.status !== 200) {
      notification["error"]({
        message: messageUpdate.data.message,
      });
    } else {
      notification["success"]({
        message: messageUpdate.data.message,
      });
      dispatch(isVisibleModal(false));
      dispatch(reloadUsers(true));
      dispatch(
        changeUser({ name: "", lastname: "", email: "", role: "", avatar: "" })
      );
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <Form className="form-edit" onFinish={updateUser}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined type="user" />}
                placeholder="Nombre"
                name="name"
                value={userUpdate.name}
                onChange={(e) => dispatch(changeValueUser(e.target))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<UserOutlined type="user" />}
                placeholder="Apellidos"
                name="lastname"
                value={userUpdate.lastname}
                onChange={(e) => dispatch(changeValueUser(e.target))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<MailOutlined type="mail" />}
                placeholder="Correo electrónico"
                value={userUpdate.email}
                name="email"
                onChange={(e) => dispatch(changeValueUser(e.target))}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Select
                placeholder="Selecciona un rol"
                value={userUpdate.role}
                name="role"
                onChange={(e) =>
                  dispatch(
                    changeValueUser({
                      name: "role",
                      value: e,
                    })
                  )
                }
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
                placeholder="Contraseña"
                name="password"
                onChange={(e) => dispatch(changeValueUser(e.target))}
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
                onChange={(e) => dispatch(changeValueUser(e.target))}
              />
            </Form.Item>
          </Col>
        </Row>
        <Col span={24}>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Actualizar Usuario
          </Button>
        </Col>
      </Form>
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyBoard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}
