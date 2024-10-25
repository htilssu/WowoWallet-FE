import {FaCreditCard, FaDownload, FaExchangeAlt, FaUndoAlt, FaUpload} from 'react-icons/fa';
import {Link, ScrollRestoration} from 'react-router-dom';
import {Pagination, Paper} from '@mantine/core';
import {formatCurrency} from '../../util/currency.util.js';
import {MdRemoveRedEye} from 'react-icons/md';

// Các icon và màu sắc trạng thái
const transactionIcons = {
  'NẠP TIỀN': <FaDownload/>,
  'RÚT TIỀN': <FaUpload/>,
  'service': <FaCreditCard/>,
  'transfer': <FaExchangeAlt/>,
  'NHẬN TIỀN': <FaDownload/>,
  'HOÀN TIỀN': <FaUndoAlt/>,
};

const statusColor = {
  'PENDING': 'text-green-500',
  'SUCCESS': 'text-green-500',
  'Đang xử lý': 'text-yellow-500',
  'Thất bại': 'text-red-500',
  'Đã hủy': 'text-red-500',
  // thêm các trạng thái khác nếu cần
};

const TransactionTable = ({
  page,
  setPage,
  list,
}) => {

  // Hàm xác định màu của số tiền
  const getAmountColor = (transactionType) => {
    if (['NHẬN TIỀN', 'NẠP TIỀN', 'HOÀN TIỀN'].includes(transactionType)) {
      return 'text-green-600';
    }
    else {
      return 'text-red-600';
    }
  };

  return (
      <>
        <div className="hidden lg:block">
          <Paper padding="md" shadow="xs">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-200 uppercase text-black text-center">
              <tr>
                <th className="py-4">Mã giao dịch</th>
                <th className="py-4">Mã hoá đơn</th>
                <th className="py-4">Loại giao dịch</th>
                <th className="py-4">Số tiền</th>
                <th className="py-4">Thời gian tạo</th>
                <th className="py-4">Trạng thái</th>
                <th className="py-4">Tài khoản nhận</th>
                <th className="py-4">Thao tác</th>
              </tr>
              </thead>
              <tbody>
              {list.map((transaction, index) => (
                  <tr key={index} className="border-2 border-gray-200 hover:bg-gray-100 text-center">
                    <td className="py-6">{transaction.id}</td>
                    <td className="py-6">{transaction.billCode ?? '-'}</td>
                    <td className="py-6 flex items-center gap-2">
                      <div className="text-xl text-green-500">
                        {transactionIcons[transaction.transactionType]}
                      </div>
                      {transaction.type}
                    </td>
                    <td className={`py-6 ${getAmountColor(transaction.type)}`}>
                      -{formatCurrency(transaction.amount)}
                    </td>
                    <td className="py-6">{new Date(transaction.created).toLocaleDateString()}</td>
                    <td className={`py-6 font-semibold ${statusColor[transaction.status]}`}>{transaction.status}</td>
                    <td className="py-6">{transaction.receiverAccount}</td>
                    <td className="py-6 font-semibold text-gray-700 hover:text-green-400 cursor-pointer flex justify-center"
                    >
                      <Link to={`/transaction/${transaction.id}`}>
                        <MdRemoveRedEye size={25}/>
                      </Link>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </Paper>
        </div>
        <div className="block lg:hidden">
          {list.map((transaction, index) => (
              <div key={index} className="mb-4 p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className={'flex flex-col'}>
                    <p className="font-semibold flex items-center gap-2">{transactionIcons[transaction.typeN]} {transaction.transactionType}</p>
                    <p className="text-green-500">{transaction.money} VND</p>
                  </div>
                </div>
                <div className="mt-2">
                  <p><strong>Mã giao dịch: </strong> {transaction.id}</p>
                  <p><strong>Mã hoá đơn:</strong> {transaction.billCode}</p>
                  <p>{transaction.status}</p>
                  <p><strong>Chuyển đến: </strong> {transaction.receiverAccount}</p>
                  <Link to={`/transaction/${transaction.id}`}
                        className="mt-1 px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Xem Chi tiết
                  </Link>
                </div>
              </div>
          ))}
        </div>
        <div className={'flex justify-center items-center'}>
          <Pagination
              page={page}
              onChange={(page) => setPage(page)}
              total={10}
              style={{marginTop: '20px'}}
          />
        </div>

        <ScrollRestoration/>
      </>
  );
};

export default TransactionTable;
