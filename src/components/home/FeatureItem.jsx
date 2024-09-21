import {FaBook, FaDownload, FaUpload} from 'react-icons/fa';
import {HiOutlineViewGridAdd} from 'react-icons/hi';
import {PiHandWithdrawBold} from 'react-icons/pi';

// Mảng các mục cho thanh điều hướng
export const FeatureItem = [
  {
    link: '/top-up',
    icon: <FaDownload size={30} className="text-green-500"/>,
    title: 'Nạp tiền',
  }, {
    link: '/transfer',
    icon: <FaUpload size={30} className="text-green-500"/>,
    title: 'Chuyển tiền',
  }, {
    link: '/withdraw',
    icon: <PiHandWithdrawBold size={30} className="text-green-500"/>,
    title: 'Rút tiền',
  }, {
    link: '/transaction',
    icon: <FaBook size={30} className="text-green-500"/>,
    title: 'Lịch sử giao dịch',
  }, {
    link: '/',
    icon: <HiOutlineViewGridAdd size={30} className="text-green-500"/>,
    title: 'Xem thêm dịch vụ',
  },
];

