import { useRef, useEffect } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const TransactionDetails = ({ transaction, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        // Dọn dẹp sự kiện khi component unmount
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    if (!transaction) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
                {/* Nút đóng modal */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaRegWindowClose className="h-6 w-6" />
                </button>

                {/* Tiêu đề */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chi Tiết Giao Dịch</h2>

                {/* Nội dung chi tiết giao dịch */}
                <div className="space-y-2">
                    <p className="text-gray-700">
                        <strong>Ngày:</strong> {transaction.date}
                    </p>
                    <p className="text-gray-700">
                        <strong>Số tiền:</strong> ${transaction.amount.toLocaleString()}
                    </p>
                    <p className="text-gray-700">
                        <strong>Trạng thái:</strong>
                        <span
                            className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
                                transaction.status === "Completed"
                                    ? "bg-green-100 text-green-600"
                                    : transaction.status === "Pending"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-red-100 text-red-600"
                            }`}
                        >
                            {transaction.status}
                        </span>
                    </p>
                    <p className="text-gray-700">
                        <strong>Mô tả:</strong> {transaction.description}
                    </p>
                </div>

                {/* Nút đóng modal */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetails;