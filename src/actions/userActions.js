import { userActionTypes, CALL_API, UPDATE_STORE } from './actionTypes';

export function login(username, password) {
  return {
    type: userActionTypes.API_USER_LOGIN,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/login/${username}`,
      options: {
        method: 'GET'
      },
      payload: {
        username,
        password
      }
    }
  };
}

export function loginWithToken(token) {
  return {
    type: userActionTypes.API_USER_TOKEN_LOGIN,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/login`,
      options: {
        method: 'POST'
      },
      payload: {
        token
      }
    }
  };
}

export function updateLoggedInUserData(user) {
  return {
    type: userActionTypes.STORE_UPDATE_LOGGED_IN_USER,
    apiType: UPDATE_STORE,
    data: user
  };
}

export function getAuthorities(user) {
  const username = JSON.parse(user).username;
  return {
    type: userActionTypes.API_GET_USER_AUTHORITIES,
    apiType: CALL_API,
    callAPI: {
      apiPathWithParam: `/admin/users/${username}/authorities`,
      options: {
        method: 'GET'
      }
    },
  };
}

export function clearErrorMessage() {
  return { type: userActionTypes.CLEAR_USER_ERROR_MESSAGES };
}

export function logout() {
  return { type: userActionTypes.USER_LOG_OUT };
}
