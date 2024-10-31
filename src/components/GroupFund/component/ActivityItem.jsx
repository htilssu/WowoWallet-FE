import { format } from 'date-fns';

const ActivityItem = ({ activity }) => {
    const getTypeStyles = (type) => {
        switch (type) {
            case "TOP_UP":
                return { textColor: "text-green-600", bgColor: "bg-green-50", symbol: "+", text: "Góp quỹ" };
            case "WITHDRAW":
                return { textColor: "text-red-600", bgColor: "bg-red-50", symbol: "-", text: "Rút quỹ" };
            default:
                return { textColor: "text-gray-600", bgColor: "bg-gray-200", symbol: "?", text: "Không xác định" };
        }
    };

    const { textColor, bgColor, symbol ,text} = getTypeStyles(activity.transactionType);

    return (
        <li className="flex items-center px-5 py-2 transition-transform transform bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 mb-4 space-x-4">
            {/* Avatar */}
            <img
                src={activity.member.avatar || "/avatarH.png"}
                alt={`${activity.member.firstName} avatar`}
                className="w-14 h-14 rounded-full object-cover border-2 border-gray-300 shadow-sm"
            />

            {/* Content */}
            <div className="flex-1">
                <div className="mb-1">
                    <p className="text-lg font-bold text-gray-900">{`${activity.member.firstName} ${activity.member.lastName}`}</p>
                    <p className="text-sm text-gray-500">
                        {format(new Date(activity.transaction.created), 'HH:mm dd/MM/yyyy')}
                    </p>
                </div>
                {activity.description &&
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-600">Ghi chú:</p>
                        <p className="text-sm text-gray-500">{activity.description}</p>
                    </div>
                }
            </div>

            {/* Amount and Type */}
            <div className="text-right flex flex-col items-end space-y-1">
                <div className="flex items-center space-x-1">
                    <span className={`text-2xl font-bold ${textColor}`}>{symbol}</span>
                    <span className={`text-lg font-medium ${textColor}`}>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(activity.transaction.amount)}
                    </span>
                </div>
                <span className={`text-xs font-semibold ${textColor} ${bgColor} px-3 py-1 rounded-full inline-block shadow`}>
                    {text}
                </span>
            </div>
        </li>
    );
};

export default ActivityItem;
