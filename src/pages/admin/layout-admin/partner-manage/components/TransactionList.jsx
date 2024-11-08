import { useState } from "react";
import TransactionDetails from "./TransactionDetails";
import { IoIosEye } from "react-icons/io";

const transactions = [
    { id: 1, date: "2024-10-01", amount: 1000, status: "Completed", description: "Thanh toán đơn hàng #1234" },
    { id: 2, date: "2024-09-15", amount: 500, status: "Pending", description: "Đặt cọc dịch vụ A" },
    { id: 3, date: "2024-08-10", amount: 1200, status: "Failed", description: "Thanh toán không thành công cho đăng ký" },
];

const TransactionList = ({ partner }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleViewDetails = (transaction) => setSelectedTransaction(transaction);
    const closeDetails = () => setSelectedTransaction(null);

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 mx-auto">
            {/* Header */}
            <header className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Lịch Sử Giao Dịch {partner.name}</h2>
            </header>

            {/* Transaction Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                <table className="w-full table-auto text-left bg-white">
                    <thead className="bg-gray-100">
                    <tr>
                        {["Date", "Amount", "Status", "Actions"].map((header) => (
                            <th key={header} className="py-3 px-4 text-gray-600 font-semibold">
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 transition-colors border-b">
                            <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
                            <td className="py-3 px-4 text-gray-700 font-semibold">
                                ${transaction.amount.toLocaleString()}
                            </td>
                            <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                                            transaction.status === "Completed"
                                                ? "bg-green-100 text-green-600"
                                                : transaction.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-600"
                                                    : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {transaction.status}
                                    </span>
                            </td>
                            <td className="py-3 px-4">
                                <button
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-full hover:bg-blue-700 transition-colors"
                                    onClick={() => handleViewDetails(transaction)}
                                >
                                    <IoIosEye className="text-white" />
                                    <span>Chi tiết</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Transaction Details Modal */}
            {selectedTransaction && (
                <TransactionDetails
                    transaction={selectedTransaction}
                    onClose={closeDetails}
                />
            )}
        </div>
    );
};

export default TransactionList;
