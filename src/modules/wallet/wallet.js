import {wGet} from '../../util/requestUtil.js';

export async function getWallet(userId) {
  return (await wGet(`/v1/user/${userId}/wallet`)).data;
}