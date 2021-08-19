import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isVisibleModal } from "../../actions/modalActions";
import { Modal as ModalAntd } from "antd";

export default function Modal() {
  const modals = useSelector((state) => state.modals);
  const dispatch = useDispatch();

  return (
    <ModalAntd
      title={modals.title}
      centered
      visible={modals.isVisible}
      onCancel={() => dispatch(isVisibleModal(false))}
      footer={false}
    >
      {modals.content}
    </ModalAntd>
  );
}
