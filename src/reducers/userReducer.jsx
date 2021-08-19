const initialProps = {
  usersActive: [],
  usersInactive: [],
  userEdit: {
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
    case "CHANGE_DATA_USER":
      return Object.assign({}, state, {
        userEdit: {
          ...state.userEdit,
          [action.payload.name]: action.payload.value,
        },
      });
    case "CHANGE_USER":
      return {
        ...state,
        userEdit: action.payload,
      };
    case "LIST_USERACTIVE":
      return {
        ...state,
        usersActive: action.payload,
      };
    case "LIST_USERINACTIVE":
      return {
        ...state,
        usersInactive: action.payload,
      };
    default:
      return state;
  }
}
