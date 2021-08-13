import { SIGNUP, LOGIN, SET_INIT,LOG_OUT } from '../actions/auth.actions';

const INITIAL_STATE = {
  displayName: null,
  token: null,
  user: null
};


const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_INIT:
      return {
        ...state,
        displayName: action.displayName,
        token: action.token,
        user: action.user,
      }
    case SIGNUP:
      return {
        ...state,
        displayName: action.displayName,
        token: action.token,
        user: action.user,
      };
    case LOGIN:
      return {
        ...state,
        displayName: action.displayName,
        token: action.token,
        user: action.user,
      };
    case LOG_OUT:
      return {
        ...state,
        displayName: action.displayName,
        token: action.token,
        user: action.user,
      };
    default:
      return state;
  }
}

export default AuthReducer;