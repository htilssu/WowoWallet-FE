import {wPost} from '../util/request.util.js';

export async function topUp(walletId, amount, topUpMethod, sourceId, sourceType) {
  switch (topUpMethod) {
    case 'paypal':
      return topUpByPaypal(walletId, amount);
    default:
      return null;
  }
}

function topUpByPaypal(walletId, amount) {
  return wPost(
      '/v1/top-up',
      {
        to: walletId,
        amount: amount,
        method: 'PAYPAL',
      },
  );
}