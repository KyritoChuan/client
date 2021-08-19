const initialProps = {
  user: null,
  isLoading: true,
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "UPDATE_AUTH":
      return action.payload;
    default:
      return state;
  }
}
