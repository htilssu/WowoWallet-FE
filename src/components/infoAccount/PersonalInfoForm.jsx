import {FaEdit} from 'react-icons/fa';
import {HiMiniCheckBadge} from 'react-icons/hi2';
import {useNavigate} from 'react-router-dom';
import AvatarStatus from '../library component/AvatarStatus.jsx';
import {get} from '../../util/requestUtil.js';
import {toast, ToastContainer} from 'react-toastify';
import {useEffect, useState} from 'react';
import {useAuth} from '../../modules/hooks/useAuth.jsx';
import {useQuery} from '@tanstack/react-query';
import {getUserWallet} from '../../modules/user/user.js';

function MyWallet() {
  //lấy thông tin Ví
  const {user} = useAuth();
  const [wallet, setWallet] = useState({});

  const result = useQuery({
    queryKey: ['user-wallet', 'wallet'],
    queryFn: async () => {
      return await getUserWallet(user.id);
    },
  });

  // Hàm định dạng số tiền
  const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '';
    return amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  };

  return (
      <div className="p-4 border-2 border-gray-200 rounded-2xl bg-white">
        <div>
          <div className="text-zinc-900 font-medium text-xl mb-2">VÍ CỦA TÔI</div>
          <div className="flex flex-wrap">
            <div className={'p-2 me-5'}>
              <p className="text-sm text-gray-600">Số dư tổng</p>
              <p className="text-lg text-rose-600 font-semibold">{formatCurrency(user.balance)}</p>
            </div>
            <div className={'p-2 me-5 '}>
              <p className="text-sm text-gray-600">Số dư khả dụng</p>
              <p className="text-lg font-semibold text-rose-600">0 đ</p>
            </div>
            <div className={'p-2 me-5 '}>
              <p className="text-sm text-gray-600">Số dư đóng băng</p>
              <p className="text-lg font-semibold text-rose-600">0 đ</p>
            </div>
            <div className={'p-2 me-5 '}>
              <p className="text-sm text-gray-600">Số dư chờ chuyển</p>
              <p className="text-lg font-semibold text-rose-600">0 đ</p>
            </div>
          </div>
        </div>
      </div>
  );
}

function TopUpBtn() {
  const navigate = useNavigate();

  const handleTopup = (e) => {
    e.preventDefault();
    navigate('/topup');
  };
  return (
      <div className={'p-5'}>
        <div className="text-center" onClick={handleTopup}>
          <button className="bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
                    transition duration-300 ease-in-out hover:bg-green-800 hover:text-white">
            Nạp tiền vào ví
          </button>
        </div>
      </div>
  );
}

const PersonalInfoForm = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    get('/v1/user').then((res) => {
      setUser(res.data);
    })
  }, []);

  const navigate = useNavigate();
  const handleMpersonal = (e) => {
    e.preventDefault();
    navigate('/management-personal/info-account');
  };

  return (
      <div>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mb-9">
          <div>
            <div className="bg-[url('/backgroundLogin.png')] bg-cover">
              <div className="max-w-lg mx-auto shadow-md backdrop-blur-sm rounded-lg overflow-hidden">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-white text-3xl font-bold mb-2">Thông tin cá nhân</h2>
                  </div>
                  <div className="flex items-center text-green-400 hover:text-red-400"
                       onClick={handleMpersonal}>
                    <FaEdit size={20} className="cursor-pointer mr-2"/>
                    <span className="cursor-pointer">Sửa</span>
                  </div>
                </div>
                <div className="flex items-center px-6 py-4">
                  <div className="flex cursor-pointer mr-4 border-2 border-white rounded-full"
                       onClick={handleMpersonal}>
                    <AvatarStatus
                        src="/avatarH.png"
                        alt="avatar"
                        size="w-16 h-16"
                    />
                  </div>
                  <div>
                    <div className={'flex flex-grow justify-start items-center gap-2'}>
                      <p className="text-white text-lg font-semibold">{user.lastName + ' ' + user.firstName}</p>
                      <HiMiniCheckBadge size={22}
                                        className={user.isVerified ? 'text-blue-600' : 'text-gray-400'}/>
                    </div>
                    <div className="flex items-center">
                      <p className={user.isVerified
                                    ? 'text-emerald-300 font-semibold mr-2'
                                    : 'text-gray-300 font-semibold mr-2'}>{user.isVerified
                                                                           ? 'Đã chứng thực'
                                                                           : 'Chưa chứng thực'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-1 p-6">
              <div className="mb-2">
                <label className="block text-gray-700 text-base font-extralight mb-0.5">
                  Loại tài khoản
                </label>
                <p className="text-gray-900 font-semibold">Tài khoản cá nhân</p>
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 text-base font-extralight mb-0.5">
                  Email đăng nhập
                </label>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
          <MyWallet/>
          <TopUpBtn/>
        </div>
        <ToastContainer stacked/>
      </div>
  );
};

export default PersonalInfoForm;
export {MyWallet, TopUpBtn};
