import {FaWallet, FaExchangeAlt, FaChartPie, FaMoneyBillWave, FaChartLine} from "react-icons/fa";
import {wGet} from "../../../util/request.util.js";
import {useQuery} from "@tanstack/react-query"; // Import các icon từ react-icons

const BasicStats = ({id}) => {

    // Fetch dữ liệu thống kê từ API nếu có ID
    const {data, isLoading, isError} = useQuery({
        queryKey: ['applicationInfo', id],
        queryFn: () => wGet(`/v1/application/${id}`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
        enabled: !!id, // Chỉ gọi API khi có ID
    });

    // Xử lý khi tải dữ liệu
    if (isLoading) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
                <p className="text-gray-600">Đang tải dữ liệu...</p>
            </div>
        );
    }

    // Xử lý khi gặp lỗi
    if (isError) {
        return (
            <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
                <p className="text-red-600">Đã xảy ra lỗi khi tải dữ liệu.</p>
            </div>
        );
    }

    // Đảm bảo data.balance tồn tại và có giá trị hợp lệ
    const balance = data?.balance ?? 1000000;

    const stats = [
        { id: 1, label: "Tổng số ví", value: 2, icon: <FaWallet className="text-blue-500" size={28} /> },
        { id: 2, label: "Giao dịch hôm nay", value: 20, icon: <FaExchangeAlt className="text-cyan-500" size={28} /> },
        { id: 3, label: "Tổng số giao dịch", value: 150, icon: <FaChartPie className="text-orange-500" size={28} /> },
        { id: 4, label: "Tổng số dư", value: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(balance), icon: <FaMoneyBillWave className="text-green-500" size={28} /> },
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