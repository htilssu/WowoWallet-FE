import {wGet} from '../../util/request.util.js';

export async function getWallet(userId) {
  return (await wGet(`/v1/user/${userId}/wallet`)).data;
}