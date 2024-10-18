import {parse} from 'cookie';

function getCookie(name) {
  const cookies = parse(document.cookie);
  return cookies[name];
}

function setCookie(key, value, age) {
  const secure = location.protocol === 'https:' ? 'Secure' : '';
  document.cookie = `${key}=${value};Path=/; Max-Age=${age}; Domain=${location.hostname};${secure}`;
}

function removeCookie(key) {
  document.cookie = `${key}=; Domain=${location.hostname}; Max-Age=0; Path=/`;
}

export {getCookie, setCookie, removeCookie};
