import {parse} from 'cookie';

export function getToken() {
  if (document?.cookie) {
    const cookies = parse(document.cookie);
    return cookies['Token'];
  }
}