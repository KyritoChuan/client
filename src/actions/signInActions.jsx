export const CHANGE_LOGIN_VALUE = "CHANGE_LOGIN_VALUE";
export const CHANGE_REGISTER_VALUE = "CHANGE_REGISTER_VALUE";
export const CHANGE_REGISTER_CHECKED = "CHANGE_REGISTER_CHECKED";
export const CHANGE_REGISTER = "CHANGE_REGISTER";

export const VALID_REGISTER_EMAIL = "VALID_REGISTER_EMAIL";
export const VALID_REGISTER_MIN_LENGTH = "VALID_REGISTER_MIN_LENGTH";
export const VALID_REGISTER_CHECKED = "VALID_REGISTER_CHECKED";
export const CHANGE_VALID = "CHANGE_VALID";

export const modifyLoginValue = (state) => ({
  type: CHANGE_LOGIN_VALUE,
  payload: state,
});

export const modifyRegisterValue = (state) => ({
  type: CHANGE_REGISTER_VALUE,
  payload: state,
});

export const modifyRegisterChecked = (state) => ({
  type: CHANGE_REGISTER_CHECKED,
  payload: state,
});

export const modifyRegister = (state) => ({
  type: CHANGE_REGISTER,
  payload: state,
});

export const validRegisterEmail = (state) => ({
  type: VALID_REGISTER_EMAIL,
  payload: state,
});

export const validRegisterMinLength = (state) => ({
  type: VALID_REGISTER_MIN_LENGTH,
  payload: state,
});

export const validRegisterChecked = (state) => ({
  type: VALID_REGISTER_CHECKED,
  payload: state,
});

export const changeValid = (state) => ({
  type: CHANGE_VALID,
  payload: state,
});
