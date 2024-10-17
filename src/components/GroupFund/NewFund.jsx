import { useState } from "react";
import { Checkbox, Anchor } from "@mantine/core";
import {ScrollRestoration, useNavigate} from "react-router-dom";

// Hàm định dạng số tiền theo VND
const formatCurrency = (value) => {
    const number = parseFloat(value.replace(/[^\d]/g, "")) || 0;
    return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

// Các loại quỹ
const fundTypes = ["Du lịch", "Tiết kiệm", "Sinh nhật", "Khác"];

const NewFund = () => {
    const [formData, setFormData] = useState({
        fundName: "",
        purpose: "",
        contributionAmount: "",
        contributionDeadline: "",
        fundManager: "",
        spendingRules: "",
        fundType: "",
    });
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState("");
    const [emailExists, setEmailExists] = useState(null);
    const [memberList, setMemberList] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setFormData({ ...formData, fundType: type });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "contributionAmount") {
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
        if (email.includes("@") && email.includes(".com")) {
            setEmailExists(true);
            setMemberList([...memberList, email]);
        } else {
            setEmailExists(false);
        }
        setEmail("");
    };

    const validateForm = () => {
        let newErrors = {};
        // Kiểm tra tên quỹ (bắt buộc nhập)
        if (!formData.fundName.trim()) {
            newErrors.fundName = "Vui lòng nhập tên quỹ.";
        }
        // Kiểm tra ngày đóng góp hợp lệ
        if (!formData.contributionDeadline.trim()) {
            newErrors.contributionDeadline = "Vui lòng nhập ngày đóng góp.";
        } else {
            const deadline = new Date(formData.contributionDeadline);
            const today = new Date();

            if (isNaN(deadline.getTime())) {
                newErrors.contributionDeadline = "Ngày đóng góp không hợp lệ.";
            } else if (deadline <= today) {
                newErrors.contributionDeadline = "Ngày đóng góp phải sau ngày hiện tại.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Nếu không có lỗi, trả về true
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            //vo trang chi tiet quy do
            navigate("/fund/${id}");
        }else {
            console.log("Form có lỗi");
        }
    };

    const navigate = useNavigate();
    const handleBack = (e) => {
        e.preventDefault();
        navigate(-1); // Quay lại trang trước
    };

    return (
        <div className={"mb-8"}>
            <div
                className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-50 to-green-100 flex justify-center items-center">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl w-full">
                    <h2 className="text-3xl font-semibold mb-6 text-center text-indigo-600">Tạo Quỹ Nhóm</h2>
                    <div>
                        {/* Tên quỹ nhóm */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Tên Quỹ</label>
                            <input
                                type="text"
                                name="fundName"
                                value={formData.fundName}
                                onChange={handleInputChange}
                                placeholder="Nhập tên quỹ"
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                            {errors.fundName && <p className={"text-red-500"}>{errors.fundName}</p>}
                        </div>

                        {/* Thể loại quỹ */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Bạn Tạo Quỹ Để</label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {fundTypes.map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => handleTypeSelect(type)}
                                        className={`px-4 py-2 rounded-md transition-all duration-200 ${
                                            selectedType === type
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
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
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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
                                min={new Date().toISOString().split("T")[0]}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                            {errors.contributionDeadline && <p className={"text-red-500"}>{errors.contributionDeadline}</p>}
                        </div>

                        {/* Mô tả quỹ */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Mô tả quỹ (0/300)</label>
                            <textarea
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                placeholder="Đi trốn trên Đà Lạt.."
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>

                        {/* Mời thành viên tham gia */}
                        <div className="mb-6">
                            <label className="block text-gray-700">Mời Thành Viên Tham Gia</label>
                            <div className="flex">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    placeholder="Nhập email thành viên"
                                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                                />
                                <button
                                    type="button"
                                    onClick={handleInvite}
                                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
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

                        {/* Điều khoản */}
                        <div>
                            <Checkbox
                                label={
                                    <div className={"text-gray-700"}>
                                        I accept{" "}
                                        <Anchor href="https://mantine.dev" target="_blank" inherit>
                                            terms and conditions
                                        </Anchor>
                                    </div>
                                }
                            />
                        </div>

                        {/* Nút điều khiển */}
                        <div className="flex justify-between gap-4 mt-4">
                            <button
                                onClick={handleBack}
                                className="w-full text-gray p-3 rounded-md hover:bg-gray-200 transition duration-200"
                            >
                                Quay về
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition duration-200"
                            >
                                Tạo Quỹ Nhóm
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default NewFund;