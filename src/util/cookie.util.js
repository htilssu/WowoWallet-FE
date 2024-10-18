import {parse} from 'cookie';

function getCookie(name) {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies[name];
  }

  return null;
}

function setCookie(key, value, age) {
  if (document?.cookie) document.cookie = `${key}=${value};Path=/; Max-Age=${age}; Domain=${location.hostname}`;
}

function removeCookie(key) {
  if (document?.cookie) document.cookie = `${key}=; Domain=${location.hostname}; Max-Age=0; Path=/`;
}

export {getCookie, setCookie, removeCookie};
