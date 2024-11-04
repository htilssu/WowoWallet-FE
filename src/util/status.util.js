const statusStrings = {
  PENDING: 'Đang chờ xử lý',
  SUCCESS: 'Thành công',
  CANCELLED: 'Đã hủy',
  REFUNDED: 'Đã hoàn tiền',
};
const transactionStatusColor = {
  'PENDING': 'text-yellow-500',
  'SUCCESS': 'text-green-500',
  'FAILED': 'text-red-500',
  'CANCEL': 'text-gray-500',
};

const statusColors = {
  PENDING: 'yellow',
  SUCCESS: 'green',
  CANCELLED: 'red',
  REFUNDED: 'gray',
};
export {statusStrings, transactionStatusColor, statusColors};