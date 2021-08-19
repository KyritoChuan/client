import { minLengthValidation, emailValidation } from "../utils/formValidation";

const initialProps = {
  loginForm: [],
  registerForm: {
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  },
  registerValid: {
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  },
};

export default function (state = initialProps, action) {
  switch (action.type) {
    case "CHANGE_LOGIN_VALUE":
      return Object.assign({}, state, {
        loginForm: {
          ...state.loginForm,
          [action.payload.name]: action.payload.value,
        },
      });
    case "CHANGE_REGISTER_VALUE":
      return Object.assign({}, state, {
        registerForm: {
          ...state.registerForm,
          [action.payload.name]: action.payload.value,
        },
      });
    case "CHANGE_REGISTER_CHECKED":
      debugger;
      return Object.assign({}, state, {
        registerForm: {
          ...state.registerForm,
          [action.payload.name]: action.payload.checked,
        },
      });
    case "CHANGE_REGISTER":
      return {
        ...state,
        registerForm: action.payload,
      };
    case "VALID_REGISTER_EMAIL":
      debugger;
      return Object.assign({}, state, {
        registerValid: {
          ...state.registerValid,
          [action.payload.name]: emailValidation(action.payload),
        },
      });

    case "VALID_REGISTER_MIN_LENGTH":
      debugger;
      return Object.assign({}, state, {
        registerValid: {
          ...state.registerValid,
          [action.payload.name]: minLengthValidation(action.payload, 6),
        },
      });
    case "VALID_REGISTER_CHECKED":
      debugger;
      return Object.assign({}, state, {
        registerValid: {
          ...state.registerValid,
          [action.payload.name]: action.payload.checked,
        },
      });
    case "CHANGE_VALID":
      return {
        ...state,
        registerValid: action.payload,
      };
    default:
      return state;
  }
}
