import {FaWallet, FaExchangeAlt, FaChartPie, FaMoneyBillWave, FaChartLine} from "react-icons/fa"; // Import các icon từ react-icons

const BasicStats = () => {
    const stats = [
        { id: 1, label: "Tổng số ví", value: 5, icon: <FaWallet className="text-blue-500" size={28} /> },
        { id: 2, label: "Giao dịch hôm nay", value: 20, icon: <FaExchangeAlt className="text-cyan-500" size={28} /> },
        { id: 3, label: "Tổng số giao dịch", value: 150, icon: <FaChartPie className="text-orange-500" size={28} /> },
        { id: 4, label: "Tổng số dư", value: "3,000,000 VNĐ", icon: <FaMoneyBillWave className="text-green-500" size={28} /> },
    ];

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <FaChartLine className="text-blue-600 mr-3" size={32}/>
                Thống Kê Chung
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map(stat => (
                    <div key={stat.id}
                         className="flex items-center p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-500 transform hover:-translate-y-2">
                        <div
                            className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mr-4">
                            {stat.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{stat.label}</h3>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BasicStats;