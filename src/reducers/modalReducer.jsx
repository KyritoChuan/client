const initialProps = {
  title: "",
  content: null,
  isVisible: false,
};

// eslint-disable-next-line
export default function (state = initialProps, action) {
  switch (action.type) {
    case "MODIFY_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "MODIFY_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    case "IS_VISIBLE":
      return {
        ...state,
        isVisible: action.payload,
      };

    default:
      return state;
  }
}
