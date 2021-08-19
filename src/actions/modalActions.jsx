export const MODIFY_TITLE = "MODIFY_TITLE";
export const MODIFY_CONTENT = "MODIFY_CONTENT";
export const IS_VISIBLE = "IS_VISIBLE";

export const modalTitle = (state) => ({
  type: MODIFY_TITLE,
  payload: state,
});

export const modalContent = (state) => ({
  type: MODIFY_CONTENT,
  payload: state,
});

export const isVisibleModal = (state) => ({
  type: IS_VISIBLE,
  payload: state,
});
