import { useState } from "react";
import { wGet } from "../../../util/request.util.js";
import { useQuery } from "@tanstack/react-query";
import ActivityItem from "./ActivityItem.jsx";

const RecentActivities = ({ id }) => {
    const [showAll, setShowAll] = useState(false);

    // Fetch transactions using useQuery
    const { data: transactions = [], isLoading, isError } = useQuery({
        queryKey: ['transactions', id],
        queryFn: () => wGet(`/v1/group-fund/transactions/${id}`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    // Sắp xếp giao dịch theo ngày tháng giảm dần
    const sortedTransactions = transactions.sort((a, b) => new Date(b.transaction.created) - new Date(a.transaction.created));
    const activitiesToShow = showAll ? sortedTransactions : sortedTransactions.slice(0, 3);

    // Handle loading and error states
    if (isLoading) return <div className="text-center text-gray-500">Loading activities...</div>;
    if (isError) return <div className="text-center text-red-600">Error fetching activities.</div>;

    return (
        <div
            className="mb-3 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform duration-300">
            {/* Header */}
            <div
                className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-t-lg">
                <h3 className="text-2xl font-bold text-gray-800">Hoạt động gần đây</h3>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-indigo-600 hover:underline font-medium transition duration-150 ease-in-out"
                >
                    {showAll ? "Thu gọn" : "Xem tất cả"}
                </button>
            </div>

            {/* Activities List */}
            <ul className="divide-y divide-gray-200">
                {activitiesToShow.map((activity, index) => (
                    <ActivityItem key={index} activity={activity}/>
                ))}
            </ul>

            {/* Optional Empty State Message */}
            {activitiesToShow.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                    Không có hoạt động nào để hiển thị.
                </div>
            )}
        </div>
    );
};

export default RecentActivities;
