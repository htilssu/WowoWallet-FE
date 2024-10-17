import {wPost} from '../../util/requestUtil.js';

export async function signIn(userData) {
  console.log(userData);
  if (userData.username && userData.password) {
    return await wPost('/v1/auth/sign-in', userData);
  }

  throw new Error('username hoặc password không được để trống');
}

export async function signUp(userData) {
  if (userData.username && userData.password) {
    return await wPost('/v1/auth/sign-up', userData);
  }

  throw new Error('username hoặc password không được để trống');
}
