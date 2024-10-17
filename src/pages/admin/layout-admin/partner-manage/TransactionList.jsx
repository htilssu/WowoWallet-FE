import { useState } from "react";

const transactions = [
    { id: 1, date: "2024-10-01", amount: 1000, status: "Completed", description: "Payment for order #1234" },
    { id: 2, date: "2024-09-15", amount: 500, status: "Pending", description: "Deposit for service A" },
    { id: 3, date: "2024-08-10", amount: 1200, status: "Failed", description: "Failed payment for subscription" },
];

const TransactionList = ({ partner }) => {
    const [selectedTransaction, setSelectedTransaction] = useState(null); // State to store selected transaction

    const handleViewDetails = (transaction) => {
        setSelectedTransaction(transaction); // Set selected transaction to show details
    };

    const closeDetails = () => {
        setSelectedTransaction(null); // Close the details view
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-semibold">Transactions for {partner.name}
            </h2>
            <table className="min-w-full mt-4">
                <thead>
                <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left">Date</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                    <th className="py-2 px-4 text-left">Status</th>
                    <th className="py-2 px-4 text-left">Actions</th>
                </tr>
                </thead>
                <tbody>
                {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                        <td className="py-2 px-4">{transaction.date}</td>
                        <td className="py-2 px-4">${transaction.amount}</td>
                        <td className="py-2 px-4">
                <span
                    className={`${
                        transaction.status === "Completed"
                            ? "text-green-500"
                            : transaction.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                    }`}
                >
                  {transaction.status}
                </span>
                        </td>
                        <td className="py-2 px-4">
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                                onClick={() => handleViewDetails(transaction)}
                            >
                                View Details
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal to show transaction details */}
            {selectedTransaction && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-2xl font-semibold mb-4">Transaction Details</h3>
                        <p>
                            <strong>Date:</strong> {selectedTransaction.date}
                        </p>
                        <p>
                            <strong>Amount:</strong> ${selectedTransaction.amount}
                        </p>
                        <p>
                            <strong>Status:</strong> {selectedTransaction.status}
                        </p>
                        <p className="mt-2">
                            <strong>Description:</strong> {selectedTransaction.description}
                        </p>
                        <div className="mt-4 text-right">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                                onClick={closeDetails}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionList;
