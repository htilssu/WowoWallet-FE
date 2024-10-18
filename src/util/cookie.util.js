import {parse} from 'cookie';

function getCookie(name) {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies[name];
  }

  return null;
}

function setCookie(key, value, age) {
  const secure = location.protocol === 'https:' ? 'Secure' : '';
  if (document?.cookie) document.cookie = `${key}=${value};Path=/; Max-Age=${age}; Domain=${location.hostname};${secure}`;
}

function removeCookie(key) {
  if (document?.cookie) document.cookie = `${key}=; Domain=${location.hostname}; Max-Age=0; Path=/`;
}

export {getCookie, setCookie, removeCookie};
