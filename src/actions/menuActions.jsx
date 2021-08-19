export const CHANGE_MENU = "CHANGE_MENU";
export const CHANGE_DATA_MENU = "CHANGE_DATA_MENU";
export const MENU_LIST = "MENU_LIST";

export const changeMenu = (state) => ({
  type: CHANGE_MENU,
  payload: state,
});

export const changeValueMenu = (state) => ({
  type: CHANGE_DATA_MENU,
  payload: state,
});

export const modifyMenuList = (state) => ({
  type: MENU_LIST,
  payload: state,
});
