import {useEffect, useMemo, useState} from 'react';
import {HiMiniCheckBadge} from 'react-icons/hi2';
import {ScrollRestoration, useNavigate} from 'react-router-dom';
import {wGet, wPost} from '../../util/request.util.js';
import {toast} from 'react-toastify';
import {useAuth} from '../../modules/hooks/useAuth.jsx';
import {Modal} from '@mantine/core';
import OTPForm from '../OTPForm.jsx';
import {sendTransferMoneyOtp} from '../../modules/otp.js';
import {transfer} from '../../modules/wallet/wallet.js';

const TransferMoney = () => {
  //lấy thông tin Ví
  const {user} = useAuth();
  const [amount, setAmount] = useState(0);
  const [isShowOtpForm, setIsShowOtpForm] = useState(false);
  const [fee, setFee] = useState(0);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [transferMethod, setTransferMethod] = useState('Chuyển ngay');
  const [feeBearer, setFeeBearer] = useState('Người nhận');
  const [content, setContent] = useState('');

  const suggestedAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];

  const [error1, setError1] = useState(null);
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(Number(value));
    if (Number(value) <= 0) {
      setError1('Vui lòng nhập số tiền!');
    }
    else {
      setError1(null);
    }
  };
  const calculateTotal = (amount, fee) => {
    return (amount + fee);
  };
  const total = useMemo(() => calculateTotal(amount, fee), [amount, fee]);

  const handleSuggestedAmountClick = (val) => {
    setAmount(val);
    setError(null);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [receiver, setReceiver] = useState({});

  useEffect(() => {
    if (!recipientEmail) return;

    // Set new timeout
    const newTimeout = setTimeout(() => {
      wGet(`/v1/transfer/check/${recipientEmail}`)
          .then((res) => {
            setReceiver(res);
            setError(null);
          })
          .catch((e) => {
            setReceiver(null);
            setError('Người dùng không tồn tại! Vui lòng thử lại');
          });
    }, 1300);

    return () => clearTimeout(newTimeout);
  }, [recipientEmail]);

  async function onVerifyOtp(otp) {
    await wPost('/v1/transfer/verify-otp', {
      otp,
    });
    toast.success('Xác thực OTP thành công!');
    setIsShowOtpForm(false);
    await submit();
  }

  async function submit() {
    transfer(null, user.id, recipientEmail, amount, content).then((data) => {
      navigate(`/transaction/${data.id}`);
    }).catch((e) => {
      toast.error(e.response.data.message);
    });
  }

  async function sendOtp() {
    await sendTransferMoneyOtp();
  }

  return (<div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-9">
    {isShowOtpForm &&
        <Modal title={'Xác thực OTP chuyển tiền'} onClose={() => {
          setIsShowOtpForm(false);
        }} opened centered>
          <OTPForm sendTo={user.email} onSubmit={onVerifyOtp} onCancel={() => {
            setIsShowOtpForm(false);
          }} onResendOtp={sendOtp}/>
        </Modal>}
    <div className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-400 text-white rounded-t-lg">
      <h2 className="text-3xl font-bold ml-3">Chuyển Tiền</h2>
    </div>
    <div>
      <form className="p-4 md:p-6">
        <div className="mb-6">
          <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="amount"
          >
            Số tiền cần chuyển
          </label>
          <input
              type="text"
              id="amount"
              placeholder="Số tiền tối thiểu phải lớn hơn 2.000 VND"
              value={amount ? amount.toLocaleString() : ''}
              onChange={handleAmountChange}
              className="placeholder:text-lg w-full text-2xl px-3 py-2 text-red-700 font-sans border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {amount <= 0 && error1 && (<div className="text-red-600 text-md mt-2">{error1}</div>)}
        </div>

        <div className="mb-6">
          <p className="text-gray-700 text-md font-bold mb-2">
            Số tiền gợi ý:
          </p>
          <div className="grid grid-cols-3 gap-4">
            {suggestedAmounts.map((val) => (<button
                key={val}
                type="button"
                onClick={() => handleSuggestedAmountClick(val)}
                className="h-12 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:shadow-outline transition duration-300"
            >
              {val.toLocaleString()}
            </button>))}
          </div>
        </div>

        <div className="mb-6">
          <div className="mb-4">
            <label
                className="block text-gray-700 text-md font-semibold mb-2"
                htmlFor="recipientEmail"
            >
              Email người nhận:
            </label>
            <input
                type="email"
                id="recipientEmail"
                placeholder="Nhập email người nhận"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="placeholder:text-lg w-full text-md px-3 py-2 text-gray-700 font-sans border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          {!error && receiver.fullName && (<div className="flex items-center gap-2">
            <div className="block text-gray-700 text-md font-semibold">
              Tên người nhận:
            </div>
            <div className="flex items-center">
              <div className={'text-green-500 px-1'}>{receiver.fullName}</div>
              <HiMiniCheckBadge size={22} className={user.isVerified ? 'text-blue-600' : 'text-gray-400'}/>
            </div>
          </div>)}
          {error && <div className="text-red-600 text-md mt-2">{error}</div>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-md font-semibold mb-2">
            Hình thức chuyển:
          </label>
          <select
              value={transferMethod}
              onChange={(e) => setTransferMethod(e.target.value)}
              className="placeholder:text-lg w-full text-md px-3 py-2 text-gray-700 font-sans border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Chuyển ngay">Chuyển ngay</option>
            <option value="Sau 10 phút">Chuyển sau 10 phút</option>
            <option value="Sau 1 giờ">Chuyển sau 1 giờ</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-md font-semibold mb-2">
            Người chịu phí:
          </label>
          <div className="flex items-center">
            <label className="mr-4 text-md">
              <input
                  type="radio"
                  name="feeBearer"
                  value="Người nhận"
                  checked={feeBearer === 'Người nhận'}
                  onChange={(e) => setFeeBearer(e.target.value)}
                  className="mr-2"
              />
              Người nhận
            </label>
            <label className="text-md">
              <input
                  type="radio"
                  name="feeBearer"
                  value="Người chuyển"
                  checked={feeBearer === 'Người chuyển'}
                  onChange={(e) => setFeeBearer(e.target.value)}
                  className="mr-2"
              />
              Người chuyển
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
              className="block text-gray-700 text-md font-semibold mb-2"
              htmlFor="content"
          >
            Nội dung:
          </label>
          <textarea
              id="content"
              placeholder="Nhập nội dung chuyển tiền"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="placeholder:text-lg w-full text-lg px-3 py-2 text-gray-700 font-sans border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="mb-2 border-t-2 border-gray-300 pt-4">
          <p className="text-red-500 text-md font-semibold mb-2">
            Phí chuyển tiền: {fee.toLocaleString()} đ
          </p>
          <p className="text-gray-700 text-lg font-semibold mb-2">
            Tổng số tiền: {total.toLocaleString()} đ
          </p>
        </div>
        <button
            type="button"
            disabled={!amount || !recipientEmail || !!error}
            className={`w-full py-3 px-4 rounded-lg text-white font-bold text-lg ${!amount ||
                                                                                   !recipientEmail || !!error
                                                                                   ? 'bg-green-200 cursor-not-allowed'
                                                                                   : 'bg-gradient-to-r from-cyan-500 to-green-500'}`}
            onClick={() => {
              sendOtp().then();
              setIsShowOtpForm(true);
            }}
        >
          Xác Nhận
        </button>
      </form>
    </div>
    <ScrollRestoration/>
  </div>);
};

export default TransferMoney;
