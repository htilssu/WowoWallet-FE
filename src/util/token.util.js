import {parse} from 'cookie';
import {removeCookie, setCookie} from './cookie.util.js';
import {decodeJwt} from 'jose';

export function getToken() {
    const cookies = parse(document.cookie);
    return cookies['Token'];
}

export function setToken(token) {
  setCookie('Token', token, 60 * 60 * 24 * 7);
}

export function removeToken() {
  removeCookie('Token');
}

export function getAuthByToken() {
  try {
    return decodeJwt(getToken());
  }
  catch (e) {
    return null;
  }
}