export const RELOAD_USER = "RELOAD_USER";
export const RELOAD_MENU = "RELOAD_MENU";

export const reloadUsers = (state) => ({
  type: RELOAD_USER,
  payload: state,
});

export const reloadMenus = (state) => ({
  type: RELOAD_MENU,
  payload: state,
});
