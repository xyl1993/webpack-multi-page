const TokenKey = 'repair-token';
const UserKey = 'repair-info'
export function getToken() {
    return localStorage.getItem(TokenKey);
}

export function setToken(token) {
    return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
    return localStorage.removeItem(TokenKey);
}

export function getUserInfo() {
  return localStorage.getItem(UserKey);
}

export function setUserInfo(user) {
  return localStorage.setItem(UserKey,user);
}

export function removeUserInfo() {
  return localStorage.removeItem(UserKey);
}