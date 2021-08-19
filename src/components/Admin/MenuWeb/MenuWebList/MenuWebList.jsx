import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import Modal from "../../../Modal";
import { ReactSortable } from "react-sortablejs";
import {
  updateMenuApi,
  activateMenuApi,
  deleteMenuApi,
} from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  isVisibleModal,
  modalContent,
  modalTitle,
} from "../../../../actions/modalActions";
import { modifyMenuList } from "../../../../actions/menuActions";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

import "./MenuWebList.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { reloadMenus } from "../../../../actions/reloadActions";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const [listItems, setListItems] = useState([]);
  const dispatch = useDispatch();
  const listUsers = useSelector((store) => store.menus.listMenu);

  useEffect(() => {
    const listItemsArray = [];
    listUsers.forEach((item) => {
      listItemsArray.push({
        content: (
          <MenuItem
            item={item}
            activateMenu={activateMenu}
            editMenuWebModal={editMenuWebModal}
            deleteMenu={deleteMenu}
          />
        ),
      });
    });
    setListItems(listItemsArray);
  }, [listUsers]);

  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();
    activateMenuApi(accessToken, menu._id, status).then((response) => {
      notification["success"]({
        message: response.data.message,
      });
    });
  };

  const onSort = (customEvent, sortable, object) => {
    let initialRank = 0;
    const { list } = object.dragging.props;
    const accessToken = getAccessTokenApi();
    list.forEach((item) => {
      const { _id } = item.content.props.item;
      const order = initialRank;
      initialRank = initialRank + 1;
      updateMenuApi(accessToken, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    dispatch(isVisibleModal(true));
    dispatch(modalTitle("Creando nuevo menú"));
    dispatch(modalContent(<AddMenuWebForm />));
  };

  const editMenuWebModal = (menu) => {
    dispatch(isVisibleModal(true));
    dispatch(modalTitle(`Editando menú: ${menu.title}`));
    dispatch(modalContent(<EditMenuWebForm menu={menu} />));
  };

  const deleteMenu = (menu) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando menu",
      content: `¿Estás seguro de que quieres eliminar el menú ${menu.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      async onOk() {
        const response = await deleteMenuApi(accessToken, menu._id);
        if (response.status !== 200) {
          notification["error"]({
            message: response.data.message,
          });
          return;
        } else {
          notification["success"]({
            message: response.data.message,
          });
          dispatch(reloadMenus(true));
        }
      },
    });
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>
          Crear Menú
        </Button>
      </div>

      <div className="menu-web-list__items">
        <ReactSortable list={listItems} setList={setListItems} onSort={onSort}>
          {listItems.map((item) => (
            <ul key={item.content.props.item._id}>{item.content}</ul>
          ))}
        </ReactSortable>
      </div>

      <Modal />
    </div>
  );
}

function MenuItem(props) {
  const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(item, e)}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteMenu(item)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
