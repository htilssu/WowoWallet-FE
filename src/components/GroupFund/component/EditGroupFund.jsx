// src/component/EditGroupFund.jsx
import { useEffect, useState } from 'react';
import { wPost } from "../../../util/request.util.js";
import {Confirm} from "react-admin";

const EditGroupFund = ({ fundData, onClose, fundId }) => {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        type: '',
        description: '',
        target: 0,
        targetDate: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal xác nhận

    useEffect(() => {
        if (fundData) {
            setFormData({
                name: fundData.name,
                image: fundData.image,
                type: fundData.type,
                description: fundData.description,
                target: fundData.target,
                targetDate: fundData.targetDate
            });
        }
    }, [fundData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Chỉ định dạng lại khi mục tiêu được cập nhật
        if (name === 'target') {
            // Chuyển đổi giá trị thành số và định dạng
            const numberValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
            setFormData((prev) => ({
                ...prev,
                [name]: isNaN(numberValue) ? 0 : numberValue
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Hàm định dạng số
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true); // Mở modal xác nhận
    };

    const confirmUpdate = async () => {
        try {
            const response = await wPost(`/v1/group-fund/${fundId}`, formData);
            alert(response.message);
            onClose();
            location.reload();
        } catch (error) {
            console.error("Error updating group fund:", error);
            alert("Có lỗi xảy ra khi cập nhật quỹ.");
        } finally {
            setIsModalOpen(false); // Đóng modal xác nhận
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Chỉnh Sửa Quỹ</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tên Quỹ:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Loại:</label>
                        <input
                            type="text"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mô Tả:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                            rows="2"
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mục Tiêu:</label>
                        <input
                            type="text" // Thay đổi từ type="number" thành type="text" để cho phép định dạng
                            name="target"
                            value={formatNumber(formData.target)} // Hiển thị số đã định dạng
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ngày Hạn:</label>
                        <input
                            type="date"
                            name="targetDate"
                            value={formData.targetDate}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex justify-between mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white rounded-md px-4 py-2 shadow hover:bg-blue-600 transition duration-200"
                        >
                            Cập Nhật
                        </button>
                        <button
                            type="button"
                            className="ml-2 w-full bg-gray-300 text-black rounded-md px-4 py-2 shadow hover:bg-gray-400 transition duration-200"
                            onClick={onClose}
                        >
                            Đóng
                        </button>
                    </div>
                </form>
            </div>
            <Confirm
                isOpen={isModalOpen}
                title={`Nhóm Quỹ: ${formData.name}`}
                content="Bạn có chắc chắn muốn cập nhật không?"
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={confirmUpdate}
                onClose={closeModal}
            />
        </div>
    );
};

export default EditGroupFund;