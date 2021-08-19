const initialProps = {
  listMenu: [],
  menuEdit: {
    name: "",
    lastname: "",
    email: "",
    role: "",
    avatar: "",
  },
};

// eslint-disable-next-line
export default function (state = initialProps, action) {
  switch (action.type) {
    case "CHANGE_MENU":
      return {
        ...state,
        menuEdit: action.payload,
      };
    case "CHANGE_DATA_MENU":
      return Object.assign({}, state, {
        menuEdit: {
          ...state.menuEdit,
          [action.payload.name]: action.payload.value,
        },
      });
    case "MENU_LIST":
      return {
        ...state,
        listMenu: action.payload,
      };
    default:
      return state;
  }
}
