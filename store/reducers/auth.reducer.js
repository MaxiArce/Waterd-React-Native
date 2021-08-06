import { SIGNUP, LOGIN, SET_INIT,LOG_OUT } from '../actions/auth.actions';

const INITIAL_STATE = {
  token: null,
  user: null
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        token: action.token,
        user: action.user,
      }
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOGIN:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    case LOG_OUT:
      return {
        ...state,
        token: action.token,
        user: action.user,
      };
    default:
      return state;
  }
}

export default AuthReducer;