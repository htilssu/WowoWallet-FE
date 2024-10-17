import {FaCreditCard, FaDownload, FaExchangeAlt, FaUndoAlt, FaUpload} from 'react-icons/fa';
import {ScrollRestoration, useNavigate, useParams} from 'react-router-dom';
import {IoArrowBackSharp} from 'react-icons/io5';
import {useEffect, useState} from 'react';
import {wGet} from '../../util/requestUtil.js';

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

const TransactionDetailPage = () => {
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState({});
  const {id} = useParams();
  useEffect(() => {
    wGet(`/v1/transaction/${id}`).then(res => {
      setTransaction(res.data);
      console.log(res.data);
    }).catch((e) => {
      navigate('/404');
    });
  }, []);

  // Hàm định dạng số tiền
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '';
    return amount.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'});
  };

  return (
      <div className="p-2 bg-gray-100 mb-10">
        <div className="flex items-center mb-2 cursor-pointer text-blue-600" onClick={() => navigate(-1)}>
          <IoArrowBackSharp size={24}/>
          <span className="ml-2">Quay lại</span>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="text-2xl text-green-500">
              {transactionIcons[transaction.transactionType]}
            </div>
            <p className="text-2xl font-semibold ml-2">{transaction.transactionType === 'transfer'
                                                        ? 'Chuyển Tiền'
                                                        : 'Thanh Toán'}</p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold text-red-600">{formatCurrency(transaction.money)}</p>
            <p className={`text-lg font-semibold ${statusColor[transaction.status]}`}>{transaction.status}</p>
          </div>
          <div className="border-t-2 pt-4">
            <div className="mb-2">
              <p className="font-semibold">Mã giao dịch:</p>
              <p>{transaction.id}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Mã hoá đơn:</p>
              <p>HD1010119299</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Thời gian tạo:</p>
              <p>{transaction.created}</p>
            </div>
            <div className="mb-2">
              <p className="font-semibold">Tài khoản nhận:</p>
              <p>{transaction.receiverEmail}</p>
            </div>
            <div className="mb-2 border-b border-t p-3">
              <p className="font-semibold">Nội dung:</p>
              <p>{transaction.content || 'Không có nội dung'}</p>
            </div>
          </div>
          <div>
            <button
                className="border-2 p-2 text-red-600 rounded-lg bg-yellow-100">
              Khiếu nại
            </button>
          </div>
        </div>
        <ScrollRestoration/>
      </div>
  );
};

export default TransactionDetailPage;