import type from '../types'

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case type.LOGIN_ERROR:
        console.log('LOGIN_ERROR')
        return {
            ...state,
            authError: "Login failed"
        };
    case type.LOGIN_SUCCESS:
        console.log("LOGIN_SUCCESS");
        return {
            ...state,
            authError: null
        };
    case type.SIGNOUT_SUCCESS:
        console.log("SIGNOUT_SUCCESS");
        return state;
    case type.SIGNUP_SUCCESS:
        console.log("SIGNUP_SUCCESS");
        return {
            ...state,
            authError: null
        };
        case type.SIGNUP_ERROR:
        console.log("SIGNUP_ERROR", action.err.message);
        return {
            ...state,
            authError: action.err.message
        };
    default:
        return state;
  }
}

export default authReducer;