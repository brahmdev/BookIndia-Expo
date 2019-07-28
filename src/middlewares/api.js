import {CALL_API, userActionTypes} from '../actions/actionTypes';
import {actionWith, SERVER_BASE_PATH} from '../utils/index';
import {apiExecutionState} from "../actions/actionTypes";
import {
  executeNextFailureHandlers,
  executeNextSuccessHandlers,
  notifyReducersWithFailure,
  notifyReducersWithSuccess
} from '../utils/middlewareHelper';
import base64 from 'base-64';

export default (store) => (next) => (action) => {
  if (!action) {
    return;
  }
  if (action.apiType !== CALL_API) {
    return next(action);
  }

  next(
    actionWith(action, {
      type: action.type + apiExecutionState.STARTED
    })
  );

  makeRequest(store, action, next).catch((error) => {
    console.log('in failure ', error);
    notifyReducersWithFailure(action, next, error);
    executeNextFailureHandlers(action, store, error);
  });
};

async function makeRequest(store, action, next) {
  const API_BASE_PATH = '/api/v1';
  const {
    callAPI: {apiPathWithParam, options, payload}
  } = action;


  const url = SERVER_BASE_PATH + API_BASE_PATH + apiPathWithParam;
  const headers = new Headers();

  if (action.type === userActionTypes.API_USER_LOGIN) {
    headers.append('Authorization', 'Basic ' + base64.encode(payload.username + ':' + payload.password));
  } else {
    const authString = payload.authString;
    headers.append('Authorization', 'Basic ' + authString);
  }

  console.log('headers are ', headers, ' and url is: ', url, ' with action type: ', action.type);
  if (options.contentType) {
    headers.append('content-type', options.contentType);
  }
  const response = await fetch(url, {
    method: options.method,
    body: options.body,
    headers: headers
  });

  response.text = await response.text();
  if (response.ok) {
    notifyReducersWithSuccess(action, next, response.text);
    executeNextSuccessHandlers(action, store, response.text);
  } else {
    notifyReducersWithFailure(action, next, response);
    executeNextFailureHandlers(action, store, response);
  }
}
