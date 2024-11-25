
import { FaWallet } from "react-icons/fa";
import {CiCircleList} from "react-icons/ci";

const WalletList = ({ onSelectWallet }) => {
    const wallets = [
        { id: 1, name: 'Ví ABC', balance: '1,000,000' },
        { id: 2, name: 'Ví XYZ', balance: '2,000,000' },
    ];

    return (
        <div className="p-6 bg-white rounded-lg transition-transform transform">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CiCircleList className="text-blue-600 mr-3" size={32}/>
                Danh Sách Ví Của Bạn
            </h2>
            <button
                className="mb-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-300">
                Tạo Ví Mới
            </button>
            <ul className="space-y-4">
                {wallets.map((wallet) => (
                    <li
                        key={wallet.id}
                        className="p-4 bg-gray-100 rounded-lg shadow hover:shadow-md hover:bg-gray-200 transition duration-300 flex items-center gap-4"
                        onClick={() => onSelectWallet(wallet)}
                    >
                        {/* Icon ở đầu mỗi mục */}
                        <div className="text-blue-500">
                            <FaWallet size={24} />
                        </div>

                        {/* Tên ví và số dư */}
                        <div className="flex justify-between w-full">
                            {/* Tên ví */}
                            <span className="text-lg font-semibold text-gray-700">
                                {wallet.name}
                            </span>

                            {/* Số dư (màu xanh + đơn vị VNĐ) */}
                            <span className="text-lg font-bold text-green-600">
                                <span className="text-lg font-semibold text-gray-700 mr-2">
                                Số dư:
                                </span>
                                {wallet.balance} VNĐ
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WalletList;