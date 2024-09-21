import { useState } from "react";
import { Checkbox, Anchor } from '@mantine/core';

// Hàm định dạng số tiền theo VND
const formatCurrency = (value) => {
    const number = parseFloat(value.replace(/[^\d]/g, '')) || 0;
    return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const NewFund = () => {
    const [formData, setFormData] = useState({
        fundName: "",
        purpose: "",
        contributionAmount: "",
        contributionDeadline: "",
        fundManager: "",
        spendingRules: "",
    });
    const [errors, setErrors] = useState({}); // Để lưu lỗi

    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(null); // Kiểm tra email tồn tại
    const [memberList, setMemberList] = useState([]);
    const [selectedType, setSelectedType] = useState(""); // Trạng thái để lưu thể loại đã chọn

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setFormData({ ...formData, fundType: type });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "contributionAmount") {
            // Định dạng số tiền khi thay đổi
            setFormData({ ...formData, [name]: formatCurrency(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailExists(null);
    };

    const handleInvite = () => {
        // Giả lập kiểm tra email (giả sử các email hợp lệ chứa "@" và ".com")
        if (email.includes("@") && email.includes(".com")) {
            setEmailExists(true);
            setMemberList([...memberList, email]);
        } else {
            setEmailExists(false);
        }
        setEmail("");
    };

    //kiểm tra ngày mục tiêu
    const validateForm = () => {
        const today = new Date().toISOString().split('T')[0]; // Ngày hiện tại dưới dạng yyyy-mm-dd
        const errors = {};

        if (formData.contributionDeadline < today) {
            errors.contributionDeadline = "Ngày hoàn thành không được nhỏ hơn ngày hiện tại.";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Trả về true nếu không có lỗi
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi dữ liệu hoặc xử lý ở đây
        console.log("Form data submitted:", formData);
        console.log("Members invited:", memberList);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">Tạo Quỹ Nhóm</h2>
                <form onSubmit={handleSubmit}>
                    {/* Tên quỹ nhóm */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên Quỹ</label>
                        <input
                            type="text"
                            name="fundName"
                            value={formData.fundName}
                            onChange={handleInputChange}
                            placeholder="Nhập tên quỹ"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Thể loại quỹ */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Bạn Tạo Quỹ Để</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {/* Các nút thể loại */}
                            <button
                                type="button"
                                onClick={() => handleTypeSelect("Du lịch")}
                                className={`px-4 py-2 rounded-md ${
                                    selectedType === "Du lịch" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                Du lịch
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTypeSelect("Tiết kiệm")}
                                className={`px-4 py-2 rounded-md ${
                                    selectedType === "Tiết kiệm" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                Tiết kiệm
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTypeSelect("Sinh nhật")}
                                className={`px-4 py-2 rounded-md ${
                                    selectedType === "Sinh nhật" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                Sinh nhật
                            </button>
                            <button
                                type="button"
                                onClick={() => handleTypeSelect("Khác")}
                                className={`px-4 py-2 rounded-md ${
                                    selectedType === "Khác" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                                }`}
                            >
                                Khác
                            </button>
                        </div>
                    </div>

                    {/* Số tiền đóng góp */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Số Tiền Mục Tiêu (nếu có)</label>
                        <input
                            type="text"
                            name="contributionAmount"
                            value={formData.contributionAmount}
                            onChange={handleInputChange}
                            placeholder="Nhập số tiền"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Ngày hoàn thành mục tiêu */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Ngày Hoàn Thành Mục Tiêu</label>
                        <input
                            type="date"
                            name="contributionDeadline"
                            value={formData.contributionDeadline}
                            onChange={handleInputChange}
                            min={new Date().toISOString().split('T')[0]} // Ngày hiện tại không thể chọn
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        {errors.contributionDeadline && (
                            <p className="text-red-500 mt-2">{errors.contributionDeadline}</p>
                        )}
                    </div>

                    {/* Mô tả quỹ */}
                    <div className="mb-4">
                        <label className="block text-gray-700">Mô tả quỹ (0/300)</label>
                        <textarea
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleInputChange}
                            placeholder="Đi trốn trên Đà Lạt.."
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Thêm thành viên tham gia */}
                    <div className="mb-6">
                        <label className="block text-gray-700">Mời Thành Viên Tham Gia</label>
                        <div className="flex">
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="Nhập email thành viên"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button
                                type="button"
                                onClick={handleInvite}
                                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Mời
                            </button>
                        </div>
                        {emailExists === false && (
                            <p className="text-red-500 mt-2">Email không tồn tại.</p>
                        )}
                    </div>

                    {/* Danh sách thành viên */}
                    {memberList.length > 0 && (
                        <div className="mb-4">
                            <h4 className="text-gray-700">Thành viên đã mời:</h4>
                            <ul className="list-disc list-inside">
                                {memberList.map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div>
                        <Checkbox
                            label={
                                <div className={"text-gray-700"}>
                                    I accept{' '}
                                    <Anchor href="https://mantine.dev" target="_blank" inherit>
                                        terms and conditions
                                    </Anchor>
                                </div>
                            }
                        />
                    </div>
                    <div className={"flex justify-between gap-4"}>
                        {/* Nút Back */}
                        <button
                            className="w-full text-gray p-2 rounded-md hover:bg-gray-200 transition duration-200"
                        >
                            Quay về
                        </button>
                        {/* Nút Submit */}
                        <button
                            type="submit"
                            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200"
                        >
                            Tạo Quỹ Nhóm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewFund;
