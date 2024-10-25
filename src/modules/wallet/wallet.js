import {wGet, wPost} from '../../util/request.util.js';

export async function getMyWallet() {
  return (await wGet(`/v1/user/wallet`));
}

export async function transfer(sourceId, senderId, receiverId, money, description) {
  return (await wPost(`/v2/transfer`, {
    sourceId,
    senderId,
    receiverId,
    money,
    description,
  }));
}