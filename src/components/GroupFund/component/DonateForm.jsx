import {useEffect, useRef, useState} from "react";
import { GiShakingHands } from "react-icons/gi";

const DonateForm = ({ onClose, fundId, balance }) => {
    const [amount, setAmount] = useState("");
    const [note, setNote] = useState("");
    const [fundBalance, setFundBalance] = useState(balance);
    const [isAmountFocused, setIsAmountFocused] = useState(false);
    const [error, setError] = useState("");

    const suggestionAmounts = [20000, 50000, 100000];
    const formRef = useRef(null)

    const handleSuggestionClick = (suggestedAmount) => {
        setAmount(suggestedAmount.toLocaleString("en-US", { style: 'decimal', minimumFractionDigits: 0 }).replace(/,/g, '.')); // Định dạng số tiền gợi ý với dấu chấm
        setError(""); // Reset error when a suggestion is clicked
    };

    //sự kiện đóng form
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                onClose(); // Call the onClose function if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericAmount = parseInt(amount.replace(/\./g, ''), 10);
        if (!amount) {
            setError("Vui lòng nhập số tiền.");
        } else if (numericAmount < 20000) {
            setError("Số tiền góp phải lớn hơn hoặc bằng 20.000 VNĐ.");
        } else {

            //Goi API chuyen tien

            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
            <div ref={formRef} className="w-[500px] sm:max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mb-4">
                <div className="flex justify-center text-green-500">
                    <div className="text-6xl">
                        <GiShakingHands/>
                    </div>
                </div>
                <div className="mb-6 flex justify-between items-center">
                    <p className="text-lg font-medium text-gray-700">
                        Số dư quỹ hiện tại:
                    </p>
                    <span className="font-semibold text-lg text-green-500">
                        {fundBalance.toLocaleString("en-US", {
                            style: 'decimal',
                            minimumFractionDigits: 0
                        }).replace(/,/g, '.')} VNĐ
                    </span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative mb-4">
                        <label
                            className={`absolute left-3 transition-all ${
                                isAmountFocused || amount
                                    ? "-top-5 text-xs text-blue-500"
                                    : "top-2 text-gray-700"
                            }`}
                            htmlFor="amount"
                        >
                            Số Tiền Góp (VND)
                        </label>
                        <input
                            type="text"
                            id="amount"
                            value={amount}
                            onFocus={() => setIsAmountFocused(true)}
                            onBlur={() => {
                                setIsAmountFocused(false);
                                if (!amount) {
                                    setAmount("");
                                    setError("");
                                }
                            }}
                            onChange={(e) => {
                                let value = e.target.value.replace(/\./g, ''); // Xóa dấu chấm
                                if (/^\d*$/.test(value) || value === "") {
                                    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thay đổi từ dấu phẩy sang dấu chấm
                                    setAmount(value);
                                }
                            }}
                            className={`w-full px-3 py-2 border ${
                                error ? "border-red-500" : "border-gray-300"
                            } rounded-md focus:outline-none focus:ring focus:border-blue-500`}
                            placeholder={isAmountFocused ? "0đ" : ""}
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                    </div>

                    {/* Nút gợi ý số tiền */}
                    <div className="grid grid-cols-2 gap-2 md:gap-4 justify-center md:grid-cols-3 mb-4">
                        {suggestionAmounts.map((val) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => handleSuggestionClick(val)}
                                className="h-10 bg-gradient-to-r from-green-500 to-green-500 text-white py-2 px-1
                                    rounded-lg hover:from-green-600 hover:to-green-600 hover:bg-gradient-to-r focus:outline-none focus:shadow-outline transition duration-300"
                            >
                                {val.toLocaleString("en-US", {
                                    style: 'decimal',
                                    minimumFractionDigits: 0
                                }).replace(/,/g, '.')} VNĐ {/* Hiển thị số tiền với định dạng VNĐ */}
                            </button>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="note">
                            Ghi Chú
                        </label>
                        <textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            maxLength={200}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            placeholder="Nhập ghi chú cho đóng góp của bạn"
                        />
                        <p className="text-right text-gray-500 text-sm">
                            {note.length}/200 ký tự
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Góp Quỹ
                    </button>
                </form>

                <div className={"flex justify-center"}>
                    <button
                        onClick={onClose}
                        className="mt-4 text-gray-700 hover:text-red-600"
                    >
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonateForm;
