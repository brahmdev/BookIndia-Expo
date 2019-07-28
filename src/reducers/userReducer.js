import {userActionTypes, apiExecutionState} from '../actions/actionTypes';

const initialState = {
  firstname: '',
  lastname: '',
  name: '',
  email: '',
  photoUrl: '',
  admin: '',
  appToken: '',
  accessToken: '',
  isRequesting: false,
  isLoggedIn: false,
  loginError: false,
  loginErrorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionTypes.API_USER_LOGIN + apiExecutionState.STARTED:
    case userActionTypes.API_USER_TOKEN_LOGIN + apiExecutionState.STARTED:
      return {
        ...state,
        isRequesting: false
      };
    case userActionTypes.API_USER_TOKEN_LOGIN + apiExecutionState.FINISHED:
      console.log('in userReducer ', action.headers.get('Authorization'));
      const appToken = action.headers.get('Authorization');
      return {
        ...state,
        appToken,
        isLoggedIn: true,
        isRequesting: false
      };
    case userActionTypes.STORE_UPDATE_LOGGED_IN_USER:
      const loggedInUser = action.data.user;
      const accessToken = action.data.accessToken;
      const isLoggedIn = action.data.isLoggedIn;
      console.log('action data ', action.data);
      return {
        ...state,
        firstname: loggedInUser.familyName,
        lastname: loggedInUser.givenName,
        email: loggedInUser.email,
        photoUrl: loggedInUser.photoUrl,
        name: loggedInUser.name,
        accessToken,
        appToken: loggedInUser.appToken,
        isLoggedIn: loggedInUser.isLoggedIn,
        isRequesting: false
      };
    case userActionTypes.API_USER_LOGIN + apiExecutionState.ERROR:
    case userActionTypes.API_USER_TOKEN_LOGIN + apiExecutionState.ERROR:
    case userActionTypes.CLEAR_USER_ERROR_MESSAGES:
      console.log("in the error block");
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
