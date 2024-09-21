import {FaUpload} from 'react-icons/fa';
import {useState} from 'react';
import {CiBank} from 'react-icons/ci';
import {MyWallet} from '../components/account/InformationCard.jsx';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [displayAmount, setDisplayAmount] = useState('');
  const [error, setError] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setAmount(numericValue);
    setDisplayAmount(numericValue);
    if (parseInt(numericValue, 10) >= 100000 || numericValue === '') {
      setError(false);
    }
  };

  const handleAmountBlur = () => {
    if (amount) {
      const formattedAmount = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      setDisplayAmount(formattedAmount);
    }
  };

  const suggestedAmounts = [100000, 200000, 300000, 400000, 500000, 1000000];

  const handleContinue = (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định của form
    if (!amount || parseInt(amount, 10) < 100000) {
      setError(true);
      return;
    }
    console.log('Continue button clicked with amount:', amount);
  };

  return (
      <div className="flex flex-col md:flex-row justify-center">
        <div className="w-full md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-lg overflow-hidden mb-9">
          <div className="flex items-center p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-t-lg">
            <FaUpload size={25}/>
            <h2 className="text-2xl font-bold ml-3">Rút tiền</h2>
          </div>
          <form className="mt-5 px-4 md:px-8 lg:px-20" onSubmit={handleContinue}>
            <div className="mb-6 flex justify-start">
              <h1 className="text-xl md:text-2xl lg:text-4xl text-gray-500 font-light">
                Thông tin rút tiền
              </h1>
            </div>
            <div className="mb-2 flex flex-col">
              <div className="flex items-center mb-4">
                <label
                    className="mr-4 text-gray-700 text-sm font-bold mb-2 "
                    htmlFor="amount"
                >
                  Số Tiền
                </label>
                <input
                    type="text"
                    id="amount"
                    placeholder="Số tiền tối thiểu phải lớn hơn 100,000 VND"
                    value={displayAmount}
                    onChange={handleAmountChange}
                    onBlur={handleAmountBlur}
                    className={`placeholder:text-sm flex-grow text-2xl md:text-lg w-full px-3 py-2 text-red-700 font-sans ring-1 hover:ring-emerald-500 rounded-lg focus:outline-none focus:shadow-outline ${error
                                                                                                                                                                                                             ? 'ring-red-500'
                                                                                                                                                                                                             : 'ring-blue-500'}`}
                />
              </div>
              {error && (
                  <p className="text-red-600 text-md ml-2 md:ml-4 mb-4">
                    Vui lòng nhập số tiền hợp lệ (tối thiểu 100,000 VND)
                  </p>
              )}
              <div className="grid grid-cols-2 gap-2 md:gap-4 justify-center md:grid-cols-3">
                {suggestedAmounts.map((val) => (
                    <button
                        key={val}
                        type="button"
                        onClick={() => {
                          const formattedAmount = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(val);
                          setAmount(val.toString());
                          setDisplayAmount(formattedAmount);
                          setError(false);
                        }}
                        className="h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-1
                   rounded-lg hover:from-cyan-600 hover:to-blue-600 hover:bg-gradient-to-r focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      {val.toLocaleString()}
                    </button>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t-[1px] border-gray-600">
              <label className="block text-gray-700 text-sm font-bold mb-3 mt-5">
                CHỌN PHƯƠNG THỨC NẠP
              </label>
              <div
                  className="flex border-[1px] h-[100px] w-full md:w-1/2 rounded-xl items-center justify-center bg-amber-100">
                <div className="text-5xl text-amber-500 mr-5">
                  <CiBank/>
                </div>
                <div>
                  <p className="text-black font-medium">
                    Rút tiền về tài khoản ngân hàng
                  </p>
                  <a
                      href="#"
                      className="decoration-0 text-sky-500 hover:text-amber-500"
                  >
                    Xem biểu phí rút
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-2xl">
              <p className="font-bold">Thông báo:</p>
              <div className="flex">
                <p>
                  THT sẽ thu 1% trên tổng số tiền rút nếu nguồn tiền nhận được từ
                  giao dịch nạp. Giấy ủy quyền sau khi xác nhận, vui lòng gửi về
                  email THT@htilssu.com. Mẫu giấy ủy quyền{' '}
                  <a
                      href="#"
                      className="decoration-0 text-sky-500 hover:text-amber-500"
                  >
                    tại đây.
                  </a>
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-5 mb-6">
              <button
                  type="submit"
                  className="px-3 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 hover:bg-gradient-to-r focus:outline-none focus:shadow-outline transition duration-300"
              >
                Tiếp tục
              </button>
            </div>
          </form>
        </div>
        <div className="order-first md:order-last w-full md:w-1/3 lg:w-1/4 mb-6 md:mb-0 md:ml-9">
          <MyWallet/>
        </div>
      </div>
  );
};

export default WithdrawPage;
