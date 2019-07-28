
import {userActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  userName: '',
  admin: '',
  isRequesting: false,
  isLoggedIn: false,
  loginError: false,
  loginErrorMessage: '',
  authString: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.API_USER_LOGIN + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: false
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.ERROR:
    case userActionTypes.CLEAR_USER_ERROR_MESSAGES:
      return {
        ...state,
        loginError: false,
        loginErrorMessage: '',
      };
      case userActionTypes.USER_LOG_OUT:
        return {
          ...state,
          userName: '',
          admin: '',
          isRequesting: false,
          isLoggedIn: false,
          loginError: false,
          loginErrorMessage: '',
          authString: ''
        };
    default:
      return state;
  }
}
