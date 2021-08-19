import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reloadUsers } from "../../../../actions/reloadActions";
import {
  isVisibleModal,
  modalContent,
  modalTitle,
} from "../../../../actions/modalActions";
import {
  Switch,
  List,
  Avatar,
  Button,
  Modal as ModalAntd,
  notification,
} from "antd";
import {
  EditOutlined,
  StopOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  getAvatarApi,
  activateUserApi,
  deleteUserApi,
} from "../../../../api/user";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const [viewUsersActives, setViewUsersActives] = useState(true);
  const usersActive = useSelector((store) => store.users.usersActive);
  const usersInactive = useSelector((store) => store.users.usersInactive);
  const dispatch = useDispatch();

  const addUserModal = () => {
    dispatch(isVisibleModal(true));
    dispatch(modalTitle("Creando nuevo usuario"));
    dispatch(modalContent(<AddUserForm />));
  };

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUsersActives(!viewUsersActives)}
          />
          <span>
            {viewUsersActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>

        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>

      {viewUsersActives ? (
        <List
          className="users-active"
          itemLayout="horizontal"
          dataSource={usersActive}
          renderItem={(user) => <TypeUser typeUser={"active"} user={user} />}
        />
      ) : (
        <List
          className="users-active"
          itemLayout="horizontal"
          dataSource={usersInactive}
          renderItem={(user) => <TypeUser typeUser={"inactive"} user={user} />}
        />
      )}

      <Modal />
    </div>
  );
}

function TypeUser(props) {
  const { user, typeUser } = props;
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const showDeleteConfirm = () => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Usuario",
      content: `¿Estás seguro que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      async onOk() {
        const deletedUser = await deleteUserApi(accessToken, user._id);
        if (deletedUser.status !== 200) {
          notification["error"]({
            message: deletedUser.data.message,
          });
          return;
        } else {
          notification["success"]({
            message: deletedUser.data.message,
          });
          dispatch(reloadUsers(true));
        }
      },
    });
  };

  let arrayActions = [];
  if (typeUser === "active") {
    arrayActions.push(<UserActive user={user} />);
  } else {
    arrayActions.push(<UserInactive user={user} />);
  }

  arrayActions.push(
    <Button type="danger" onClick={showDeleteConfirm}>
      <DeleteOutlined type="delete" />
    </Button>
  );

  return (
    <List.Item actions={arrayActions}>
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`}
        description={user.email}
      />
    </List.Item>
  );
}

function UserActive(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const editUser = (user) => {
    dispatch(isVisibleModal(true));
    dispatch(
      modalTitle(
        `Editar ${user.name ? user.name : "..."} ${
          user.lastname ? user.lastname : "..."
        }`
      )
    );
    dispatch(modalContent(<EditUserForm user={user} />));
  };

  const desactivateUser = async () => {
    const accessToken = getAccessTokenApi();

    const messageActivate = await activateUserApi(accessToken, user._id, false);
    if (messageActivate.status !== 200) {
      notification["error"]({
        message: messageActivate.data.message,
      });
      return;
    } else {
      notification["success"]({
        message: messageActivate.data.message,
      });
      dispatch(reloadUsers(true));
    }
  };

  return (
    <>
      <li
        style={{
          display: "inline-block",
          paddingLeft: "8px",
          paddingRight: "8px",
        }}
      >
        <Button type="primary" onClick={() => editUser(user)}>
          <EditOutlined type="edit" />
        </Button>
      </li>
      <li
        style={{
          display: "inline-block",
          paddingLeft: "8px",
        }}
      >
        <Button type="danger" onClick={desactivateUser}>
          <StopOutlined type="stop" />
        </Button>
      </li>
    </>
  );
}

function UserInactive(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const activateUser = async () => {
    const accessToken = getAccessTokenApi();

    const messageActivate = await activateUserApi(accessToken, user._id, true);
    if (messageActivate.status !== 200) {
      notification["error"]({
        message: messageActivate.data.message,
      });
      return;
    } else {
      notification["success"]({
        message: messageActivate.data.message,
      });
      dispatch(reloadUsers(true));
    }
  };

  return (
    <Button type="primary" onClick={activateUser}>
      <CheckOutlined type="check" />
    </Button>
  );
}
