import {post} from '../../util/requestUtil.js';

export async function signIn(userData) {
  console.log(userData);
  if (userData.username && userData.password) {
    return await post('/v1/auth', userData);
  }

  throw new Error('username hoặc password không được để trống');
}

export async function signUp(userData) {
  if (userData.username && userData.password) {
    return await post('/v1/user', userData);
  }

  throw new Error('username hoặc password không được để trống');
}
