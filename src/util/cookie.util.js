import {parse} from 'cookie';

function getCookie(name) {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies[name];
  }

  return null;
}

function setCookie(key, value, age) {
  if (document?.cookie) document.cookie = `${key}=${value}; path=/;max-age=${age}; domain=${window.location.hostname}`;
}

function removeCookie(key) {
  if (document?.cookie) document.cookie = `${key}=; path=/;max-age=0`;
}

export {getCookie, setCookie, removeCookie};
