import { apiExecutionState } from "../actions/actionTypes";


export function notifyReducersWithSuccess(action, next, text) {
  next(
    actionWith(action, {
      type: action.type + apiExecutionState.FINISHED,
      response: text,
      payload: action.callAPI.payload,
      data: action.data
    })
  );
}

export function notifyReducersWithFailure(action, next, error) {
  next(
    actionWith(action, {
      type: action.type + apiExecutionState.ERROR,
      error
    })
  );
}

export function executeNextSuccessHandlers(action, store, text) {
  // Nested callback function
  if (typeof action.onSuccess === 'function') {
    store.dispatch(action.onSuccess(text));
  }
}

export function executeNextFailureHandlers(action, store, error) {
  // Nested callback function
  if (typeof action.onFailure === 'function') {
    store.dispatch(action.onFailure(error));
  }
}

export function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction.callAPI;
  return finalAction;
}
