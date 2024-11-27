import {startAuthentication} from '@simplewebauthn/browser';

export async function handleAuth(callback) {
  const authJSON = JSON.parse(localStorage.getItem('webauthn'));
  if (authJSON === null) {
    return;
  }
  const asseResp = await startAuthentication({optionsJSON: authJSON});
  if (asseResp) {
    callback();
  }
}