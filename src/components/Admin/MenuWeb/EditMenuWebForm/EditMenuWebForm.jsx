import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import { changeMenu, changeValueMenu } from "../../../../actions/menuActions";
import { reloadMenus } from "../../../../actions/reloadActions";
import { isVisibleModal } from "../../../../actions/modalActions";

import "./EditMenuWebForm.scss";
import { FontSizeOutlined, LinkOutlined } from "@ant-design/icons";

export default function EditMenuWebForm(props) {
  const { menu } = props;
  const dispatch = useDispatch();
  const menuUpdate = useSelector((store) => store.menus.menuEdit);

  useEffect(() => {
    dispatch(changeMenu(menu));
  }, [menu]);

  const editMenu = async () => {
    if (!menuUpdate.title || !menuUpdate.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccessTokenApi();

      const messageUpdate = await updateMenuApi(
        accessToken,
        menuUpdate._id,
        menuUpdate
      );
      if (messageUpdate.status !== 200) {
        notification["error"]({
          message: messageUpdate.data.message,
        });
      } else {
        notification["success"]({
          message: messageUpdate.data.message,
        });
        dispatch(isVisibleModal(false));
        dispatch(reloadMenus(true));
      }
    }
  };

  return (
    <div className="edit-menu-web-form">
      <EditForm editMenu={editMenu} />
    </div>
  );
}

function EditForm(props) {
  const { editMenu } = props;
  const dispatch = useDispatch();
  const menuUpdate = useSelector((store) => store.menus.menuEdit);
  return (
    <Form className="form-edit" onFinish={editMenu}>
      <Form.Item>
        <Input
          prefix={<FontSizeOutlined />}
          placeholder="Titulo"
          name="title"
          value={menuUpdate.title}
          onChange={(e) => dispatch(changeValueMenu(e.target))}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL"
          name="url"
          value={menuUpdate.url}
          onChange={(e) => dispatch(changeValueMenu(e.target))}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-submit">
        Actualizar Menú
      </Button>
    </Form>
  );
}
