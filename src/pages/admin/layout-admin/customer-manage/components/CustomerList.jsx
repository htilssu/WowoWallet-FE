import { useState } from 'react';
import ViewCustomerModal from './ViewCustomerModal';
import EditCustomerModal from './EditCustomerModal';
import { toast, ToastContainer } from "react-toastify";

const CustomerList = ({ customers }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const openViewModal = (customer) => {
        setSelectedCustomer(customer);
        setIsViewModalOpen(true);
    };

    const openEditModal = (customer) => {
        setSelectedCustomer(customer);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setIsViewModalOpen(false);
        setIsEditModalOpen(false);
    };

    return (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl px-4 mb-4">
            <table className="min-w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-indigo-100 text-indigo-700 font-semibold">
                    <th className="px-6 py-4 text-left">ID</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Họ và Tên</th>
                    <th className="px-6 py-4 text-left">Ngày Sinh</th>
                    <th className="px-6 py-4 text-left">Giới Tính</th>
                    <th className="px-6 py-4 text-left">Trạng Thái</th>
                    <th className="px-6 py-4 text-left">Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {customers.map((customer) => (
                    <tr
                        key={customer.id}
                        className="border-b hover:bg-indigo-100 transition-all duration-200"
                    >
                        <td className="p-4 text-gray-700 font-semibold text-sm">{customer.id}</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold text-sm">{customer.email}</td>
                        <td className="px-6 py-4">{customer.fullName}</td>
                        <td className="px-6 py-4">
                            {customer.dob ? `${customer.dob[2]}/${customer.dob[1]}/${customer.dob[0]}` : 'Chưa có'}
                        </td>
                        <td className="px-6 py-4">{customer.gender ? 'Nam' : 'Nữ'}</td>
                        <td className="px-6 py-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        customer.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                    }`}
                                >
                                    {customer.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                </span>
                        </td>
                        <td className="p-2">
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => openViewModal(customer)}
                                    className="p-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                                >
                                    Xem
                                </button>
                                <button
                                    onClick={() => openEditModal(customer)}
                                    className="px-4 py-2 text-sm rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition duration-200"
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* View Customer Modal */}
            {isViewModalOpen && (
                <ViewCustomerModal
                    customer={selectedCustomer}
                    onClose={closeModal}
                />
            )}

            {/* Edit Customer Modal */}
            {isEditModalOpen && (
                <EditCustomerModal
                    customer={selectedCustomer}
                    onClose={closeModal}
                    toast={toast}
                />
            )}

            <ToastContainer />
        </div>
    );
};

export default CustomerList;
