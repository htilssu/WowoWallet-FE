import { useState } from "react";

// Dữ liệu hoạt động gần đây
const recentActivities = [
    {
        name: "Nguyễn Anh Tuấn",
        amount: "1,000,000 VNĐ",
        date: "15/09/2024",
        avatar: "/avatarH.png",
        type: "Góp quỹ"
    },
    {
        name: "Trần Thị B N",
        amount: "500,000 VNĐ",
        date: "16/09/2024",
        avatar: "/ava.png",
        type: "Rút quỹ"
    },
    {
        name: "Vũ Ngọc Lâm",
        amount: "1,000 VNĐ",
        date: "15/09/2024",
        avatar: "/avatarT.jpeg",
        type: "Góp quỹ"
    },
    {
        name: "Lê Minh",
        amount: "2,000 VNĐ",
        date: "17/09/2024",
        avatar: "/avatarT.jpeg",
        type: "Góp quỹ"
    }
];

const RecentActivities = () => {
    const [showAll, setShowAll] = useState(false);

    // Lọc hoạt động để hiển thị
    const activitiesToShow = showAll ? recentActivities : recentActivities.slice(0, 3);

    const getTypeStyles = (type) => {
        switch (type) {
            case "Góp quỹ":
                return { textColor: "text-green-600", bgColor: "bg-green-100", symbol: "+" };
            case "Rút quỹ":
                return { textColor: "text-red-600", bgColor: "bg-red-100", symbol: "-" };
            default:
                return { textColor: "text-gray-600", bgColor: "bg-gray-100", symbol: "?" };
        }
    };

    return (
        <div className="mb-8">
            {/* Header Hoạt động gần đây */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-t-xl">
                <h3 className="text-2xl font-bold text-gray-800">Hoạt động gần đây</h3>
                <div
                    onClick={() => setShowAll(!showAll)}
                    className="text-indigo-600 hover:underline cursor-pointer font-medium"
                >
                    {showAll ? "Thu gọn" : "Xem tất cả"}
                </div>
            </div>

            {/* Danh sách hoạt động */}
            <div className="bg-white shadow-md rounded-b-xl">
                <ul className="divide-y divide-gray-200">
                    {activitiesToShow.map((activity, index) => {
                        const { textColor, bgColor, symbol } = getTypeStyles(activity.type);
                        return (
                            <li key={index} className="flex items-center p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                                {/* Avatar */}
                                <img
                                    src={activity.avatar || "/avatarH.png"}
                                    alt={`${activity.name} avatar`}
                                    className="w-12 h-12 rounded-full object-cover mr-4"
                                />

                                {/* Nội dung hoạt động */}
                                <div className="flex-1">
                                    <p className="text-lg font-semibold text-gray-800">{activity.name}</p>
                                    <p className="text-sm text-gray-500">{activity.date}</p>
                                </div>

                                {/* Số tiền và loại hoạt động */}
                                <div className="text-right">
                                    <span className={`text-2xl font-bold ${textColor}`}>{symbol}</span>
                                    <span className={`ml-1 text-lg font-medium ${textColor}`}>{activity.amount}</span>
                                    <p className={`ml-4 text-sm font-semibold ${textColor} ${bgColor} px-2 py-1 rounded-md inline-block`}>
                                        {activity.type}
                                    </p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default RecentActivities;
