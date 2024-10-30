import { format } from 'date-fns';

const ActivityItem = ({ activity }) => {
    const getTypeStyles = (type) => {
        switch (type) {
            case "TOP_UP":
                return { textColor: "text-green-600", bgColor: "bg-green-100", symbol: "+" };
            case "WITHDRAW":
                return { textColor: "text-red-600", bgColor: "bg-red-100", symbol: "-" };
            default:
                return { textColor: "text-gray-600", bgColor: "bg-gray-100", symbol: "?" };
        }
    };

    const { textColor, bgColor, symbol } = getTypeStyles(activity.transactionType);

    return (
        <li className={`flex items-center p-4 hover:bg-gray-50 transition duration-150 ease-in-out rounded-lg shadow-sm mb-4`}>
            {/* Avatar */}
            <img
                src={activity.member.avatar || "/avatarH.png"}
                alt={`${activity.member.firstName} avatar`}
                className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-300 shadow-sm"
            />

            {/* Content */}
            <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{`${activity.member.firstName} ${activity.member.lastName}`}</p>
                <p className="text-sm text-gray-500">
                    {format(new Date(activity.transaction.created), 'dd/MM/yyyy HH:mm')}
                </p>
            </div>

            {/* Amount and Type */}
            <div className="text-right flex items-center">
                <span className={`text-2xl font-bold ${textColor}`}>{symbol}</span>
                <span className={`ml-1 text-lg font-medium ${textColor}`}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(activity.transaction.amount)}
                </span>
                <p className={`ml-4 text-sm font-semibold ${textColor} ${bgColor} px-2 py-1 rounded-md inline-block`}>
                    {activity.transactionType}
                </p>
            </div>
        </li>
    );
};

export default ActivityItem;
