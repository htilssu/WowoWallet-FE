import {wGet} from '../../util/request.util.js';

export async function getMyWallet() {
  return (await wGet(`/v1/user/wallet`)).data;
}