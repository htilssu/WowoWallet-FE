import {get} from '../../util/requestUtil.js';

export async function getWallet(userId) {
  return (await get(`/v1/user/${userId}/wallet`)).data;
}