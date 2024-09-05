import {get} from '../../util/requestUtil.js';

export async function getUserWallet(userId) {
  return get(`/v1/user/${userId}/wallet`);
}

export async function getUser() {

}
