
export function setUser(userName, password) {
  window.localStorage.setItem('amsUser', userName + ':' + password);
  window.localStorage.setItem('userName', userName);
}

export function setAdmin(admin) {
  window.localStorage.setItem('admin', admin);
}

export function setInstituteId(instituteId) {
  window.localStorage.setItem('instituteId', instituteId);
}

export function getInstituteId() {
  return window.localStorage.getItem('instituteId');
}

export function setBranchId(branchId) {
  window.localStorage.setItem('branchId', branchId);
}

export function getBranchId() {
  return window.localStorage.getItem('branchId');
}

export function getAdmin() {
  return !!JSON.parse(window.localStorage.getItem('admin'));
}

export function clearUserInfo() {
  window.localStorage.removeItem('amsUser');
  window.localStorage.removeItem('userName');
  window.localStorage.removeItem('admin');
}

export function getUserName() {
  return window.localStorage.getItem('userName');
}

export function getAMSUser() {
  return window.localStorage.getItem('amsUser');
}

export function setLoggeddIn() {
  window.localStorage.setItem('loggedInToAMS', true);
}

export function isUserLoggedIn() {
  return !!JSON.parse(window.localStorage.getItem('loggedInToAMS'));
}

export function setLoggedOut() {
  window.localStorage.removeItem('loggedInToAMS');
}
