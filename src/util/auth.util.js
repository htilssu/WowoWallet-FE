import {startAuthentication} from '@simplewebauthn/browser';

export async function handleAuth(callback) {
  const authJSON = JSON.parse(localStorage.getItem('webauthn'));
  const asseResp = await startAuthentication({optionsJSON: authJSON});
  if (asseResp.id !== null){
    callback();
  }
}