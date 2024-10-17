import {parse} from 'cookie';

function getCookie(name) {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies[name];
  }

  return null;
}

function setCookie(key, value, age) {
  document.cookie = `${key}=${value}; path=/;max-age=${age}`;
}

export {getCookie, setCookie};
