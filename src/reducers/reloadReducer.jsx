const initialProps = {
  reloadUsers: false,
  reloadMenus: false,
};

// eslint-disable-next-line
export default function (state = initialProps, action) {
  switch (action.type) {
    case "RELOAD_USER":
      return {
        ...state,
        reloadUsers: action.payload,
      };
    case "RELOAD_MENU":
      return {
        ...state,
        reloadMenus: action.payload,
      };
    default:
      return state;
  }
}
