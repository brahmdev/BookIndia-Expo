
export function actionWith(action, data) {
  const finalAction = Object.assign({}, action, data);
  delete finalAction.callAPI;
  return finalAction;
}

export const SERVER_BASE_PATH = 'http://192.168.10.180:8080';