
// Sample recent activities data with type
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
    // Add more activities here
];

const RecentActivities = () => {
    const getTypeStyles = (type) => {
        switch (type) {
            case 'Góp quỹ':
                return {
                    textColor: 'text-blue-600',
                    symbol: '+'
                };
            case 'Rút quỹ':
                return {
                    textColor: 'text-red-600',
                    symbol: '-'
                };
            default:
                return {
                    textColor: 'text-gray-600',
                    symbol: '?'
                };
        }
    };

    return (
        <div className="mb-6">
            <div className={"flex flex-grow items-center justify-between bg-gray-100 p-4"}>
                <h3 className="text-xl font-semibold mb-2">Hoạt động gần đây</h3>
                <a href="#" className="text-blue-500 hover:underline mb-4 block">Xem tất cả</a>
            </div>
            <div className="bg-white px-2 py-2 sm:px-4 rounded-lg shadow-md">
                <ul className="space-y-4">
                    {recentActivities.map((activity, index) => {
                        const { textColor, symbol } = getTypeStyles(activity.type);
                        return (
                            <li key={index} className="flex items-center border-b border-gray-200 p-1 last:border-b-0">
                                <img
                                    src={activity.avatar}
                                    alt={`${activity.name} avatar`}
                                    className="w-10 h-10 rounded-full object-cover mr-4"
                                />
                                <div className="flex-1">
                                    <p className="text-gray-800 font-medium">{activity.name}</p>
                                    <span className={`ml-1 ${textColor}`}>{activity.type}</span>
                                    <p className="text-sm flex items-center">
                                        <span className={`text-lg font-bold ${textColor}`}>{symbol}</span>
                                        <span className={`ml-1 ${textColor}`}>{activity.amount}</span>
                                        <span className="ml-2 text-gray-500">{activity.date}</span>
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
