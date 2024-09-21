import {get, post} from '../../util/requestUtil.js';

export async function getUserWallet(userId) {
  return await get(`/v1/user/${userId}/wallet`);
}

export async function getUser() {
  return await get('/v1/user');
}

export async function resetPassword(email) {
  return await post("/v1/password/reset", {
    email: email
  })
}
