import {parse} from 'cookie';
import {removeCookie} from './cookie.util.js';
import {decodeJwt} from 'jose';

export function getToken() {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies['Token'];
  }
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