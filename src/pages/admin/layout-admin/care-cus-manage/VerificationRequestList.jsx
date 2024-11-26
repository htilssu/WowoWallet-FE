import { useState } from "react";
import PropTypes from 'prop-types';

const VerificationRequestList = ({ verifications, onDeleteField, onApprove }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredVerifications = verifications.filter((verification) => {
        const idString = verification.customer.id.toString().toLowerCase();
        const typeString = verification.type.toLowerCase();
        const numberCardString = verification.numberCard.toString().toLowerCase();
        const searchLower = searchTerm.toLowerCase();

        return (
            idString.includes(searchLower) ||
            typeString.includes(searchLower) ||
            numberCardString.includes(searchLower)
        );
    });

    return (
        <div>
            <input
                type="text"
                placeholder="Tìm kiếm theo ID khách hàng, loại, số thẻ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <table className="min-w-full">
                <thead>
                <tr>
                    <th className="border px-4 py-2">ID Khách Hàng</th>
                    <th className="border px-4 py-2">Loại Xác Thực</th>
                    <th className="border px-4 py-2">Số Thẻ</th>
                    <th className="border px-4 py-2">Ngày Mở</th>
                    <th className="border px-4 py-2">Ngày Đóng</th>
                    <th className="border px-4 py-2">Hình Ảnh</th>
                    <th className="border px-4 py-2">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {filteredVerifications.length > 0 ? (
                    filteredVerifications.map((verification) => (
                        <tr key={verification.id}>
                            <td className="border px-4 py-2">{verification.customer.id}</td>
                            <td className="border px-4 py-2">{verification.type}</td>
                            <td className="border px-4 py-2">{verification.numberCard}</td>
                            <td className="border px-4 py-2">{verification.openDay.toString()}</td>
                            <td className="border px-4 py-2">{verification.closeDay.toString()}</td>
                            <td className="border px-4 py-2">
                                <img src={verification.userImage} alt="User" className="w-16 h-16 object-cover rounded" />
                            </td>
                            <td className="border px-4 py-2">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                                    onClick={() => onApprove(verification.customer.id)}
                                >
                                    Xác thực
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => onDeleteField(verification.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7" className="text-center py-4 text-gray-500">Không có yêu cầu xác thực nào.</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

VerificationRequestList.propTypes = {
    verifications: PropTypes.array.isRequired,
    onDeleteField: PropTypes.func.isRequired,
    onApprove: PropTypes.func.isRequired,
};

export default VerificationRequestList;