import {useEffect, useState} from 'react';
import {toast, ToastContainer} from 'react-toastify';
import {ScrollRestoration, useLocation, useNavigate} from 'react-router-dom';
import {PinInput} from '@mantine/core';
import {post} from '../util/requestUtil.js';
import {useAuth} from '../modules/hooks/useAuth.jsx';

const OTPForm = () => {
      const {user} = useAuth();
      const [otp, setOtp] = useState('');
      const [resendTime, setResendTime] = useState(50);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();

      //nhận type từ các trang chuyển đến OTP...
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const type = urlParams.get('type');

      //nhận số tiền và email
      const location = useLocation();
      const {amount, recipientEmail} = location.state || {};

      const handleSubmit = async (e) => {
        e.preventDefault();

        if (otp.length === 0 || otp.length < 6) {
          setError('Vui lòng nhập đầy đủ OTP!');
          return;
        }

        try {
          post('/v1/otp/verify', {
            otp: otp,
          })
              .then((res) => {
                toast.success(res.data.message);
                setError(null);
                if (type === 'service') {
                  handlePaymentRequest();
                }
                if (type === 'transfer') {
                  handleSendMoney();
                }
              })
              .catch((e) => {
                setError(e.response.data.message);
              });
        } catch (error) {
          toast.error('Đã xảy ra lỗi trong quá trình xác thực OTP!');
          setError('Đã xảy ra lỗi trong quá trình xác thực OTP!');
        }
      };

      const handleChange = (value) => {
        setOtp(value);
        setError(null);
      };

      const handleResendOtp = async () => {
        setOtp('');
        setError(null);
        setLoading(true); // Bắt đầu loading

        post('/v1/otp', {
          otpType: 'email',
        })
            .then((res) => {
              toast.success(res.data.message);
              setError(null);
              setLoading(false);
              setResendTime(50);
            })
            .catch((e) => {
              toast.error('Đã xảy ra lỗi gửi lại OTP!');
              setError('Đã xảy ra lỗi gửi lại OTP! Vui lòng thử lại.');
              setLoading(false);
            });

      };

      useEffect(() => {
        if (resendTime > 0) {
          const timer = setInterval(() => {
            setResendTime((prevResendTime) => prevResendTime - 1);
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [resendTime]);

      const handlePaymentRequest = () => {
        const {pid} = location.state || {};
        post(`/v1/prequest/${pid}`, {}).then((res) => {
          navigate(`/transactions/transaction/success/${res.data.id}`);
        });
      };

      const handleSendMoney = () => {
        try {
          post('/v1/transfer', {
            transactionTarget: 'wallet',
            type: type,
            sendTo: recipientEmail,
            money: amount,
          })
              .then((res) => {
                toast.success(res.data.message);
                setError(null);
                setLoading(false);
                //chuyển thành công chuyển sang trang success kèm theo id Transaction
                navigate(`/transactions/transaction/success/${res.data.id}`);
              })
              .catch((e) => {
                toast.error('Đã xảy ra lỗi Chuyển tiền!');
                setError('Đã xảy ra lỗi khi Chuyển tiền! Vui lòng thử lại.');
                setLoading(false);
              });
        } catch (error) {
          toast.error('Đã xảy ra lỗi trong quá trình Chuyển tiền!');
          setError('Đã xảy ra lỗi trong quá trình Chuyển tiền!');
          setLoading(false);
        }
      };

      return (
          <div className={''}>
            <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
              <div className="bg-white rounded-lg shadow-md w-full max-w-md mt-6 p-6">
                <div className="flex flex-col items-center">
                  <img
                      src="otp_veri.png"
                      alt="OTP Verification"
                      className="w-24 mb-4"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Xác thực OTP
                  </h2>
                  <p className="text-gray-600 text-center">
                    Nhập mã OTP được gửi đến Email:
                  </p>
                  <div className="font-medium text-md text-gray-800 mb-4">
                    {user.email}
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex flex-col justify-center items-center">
                    <PinInput
                        length={6}
                        type={/^[0-9]*$/}
                        inPutType="tel"
                        inPutMode="numeric"
                        value={otp}
                        onChange={handleChange}
                    />
                    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
                  </div>

                  <div className="flex justify-between items-center gap-6">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="w-1/2 px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-200 hover:text-red-600"
                    >
                      Hủy
                    </button>
                    <button
                        type="submit"
                        className="w-1/2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2"
                    >
                      Xác nhận
                    </button>
                  </div>
                </form>
                <div className="mt-6 text-center">
                  {resendTime > 0 ? (
                      <p className="text-gray-600">
                        Mã OTP hết hiệu lực sau:{' '}
                        <span className="font-medium text-red-600">{resendTime}s</span>
                      </p>
                  ) : (
                       <button
                           onClick={handleResendOtp}
                           disabled={loading}
                           className="text-blue-500 hover:underline"
                       >
                         {loading ? 'Đang gửi lại...' : 'Gửi lại OTP'}
                       </button>
                   )}
                </div>
              </div>
            </div>
            <ScrollRestoration/>
            <ToastContainer stacked/>
          </div>
      );
    }
;

export default OTPForm;
