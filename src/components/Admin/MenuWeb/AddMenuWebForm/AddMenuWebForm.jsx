import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, Select, notification } from "antd";
import { FontSizeOutlined } from "@ant-design/icons";
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import { reloadMenus } from "../../../../actions/reloadActions";
import { isVisibleModal } from "../../../../actions/modalActions";
import "./AddMenuWebForm.scss";

export default function AddMenuWebForm() {
  const [menuWebData, setMenuWebData] = useState({});
  const { Option } = Select;
  const dispatch = useDispatch();

  const addMenu = async () => {
    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "http://") + menuWebData.url,
    };

    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000;

      const response = await addMenuApi(accessToken, finalData);
      if (response.status !== 200) {
        notification["error"]({
          message: response.data.message,
        });
      } else {
        notification["success"]({
          message: response.data.message,
        });
        dispatch(isVisibleModal(false));
        dispatch(reloadMenus(true));
        setMenuWebData({});
      }
    }

    console.log(finalData);
  };

  const selectBefore = (
    <Select
      defaultValue="http://"
      style={{ width: 90 }}
      onChange={(e) => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <div className="add-menu-web-form">
      <Form className="form-add" onFinish={addMenu}>
        <Form.Item>
          <Input
            prefix={<FontSizeOutlined />}
            placeholder="Titulo"
            value={menuWebData.title}
            onChange={(e) =>
              setMenuWebData({ ...menuWebData, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Input
            addonBefore={selectBefore}
            placeholder="URL"
            value={menuWebData.url}
            onChange={(e) =>
              setMenuWebData({ ...menuWebData, url: e.target.value })
            }
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Menú
        </Button>
      </Form>
    </div>
  );
}
