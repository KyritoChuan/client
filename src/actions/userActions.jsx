export const CHANGE_USER = "CHANGE_USER";
export const CHANGE_DATA_USER = "CHANGE_DATA_USER";
export const LIST_USERACTIVE = "LIST_USERACTIVE";
export const LIST_USERINACTIVE = "LIST_USERINACTIVE";

export const changeUser = (state) => ({
  type: CHANGE_USER,
  payload: state,
});

export const changeValueUser = (state) => ({
  type: CHANGE_DATA_USER,
  payload: state,
});

export const modifyListUsersActive = (state) => ({
  type: LIST_USERACTIVE,
  payload: state,
});

export const modifyListUsersInactive = (state) => ({
  type: LIST_USERINACTIVE,
  payload: state,
});
