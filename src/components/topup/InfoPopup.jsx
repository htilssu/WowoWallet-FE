import {FaDownload} from "react-icons/fa";
import {useEffect, useState} from "react";
import BankSelect from "../library component/BankSelect.jsx";
import {ScrollRestoration} from "react-router-dom";

const InfoPopup = () => {
    const [amount, setAmount] = useState('');
    const [displayAmount, setDisplayAmount] = useState('');
    const [methodPay, setMethodPay] = useState('');
    const [error, setError] = useState(false); // Thêm state để theo dõi lỗi
    const [showModal, setShowModal] = useState(false);  //chon ngan hang


    useEffect(() => {

    }, []);

    const handleAmountChange = (e) => {
        const value = e.target.value; //Lấy giá trị người dùng nhập vào.
        // Xóa ký tự không phải là số
        const numericValue = value.replace(/[^0-9]/g, "");
        setAmount(numericValue); //Cập nhật state amount với giá trị số đã được xử lý.
        setDisplayAmount(numericValue); // Cập nhật state displayAmount để hiển thị giá trị số tiền mới nhập vào mà không cần định dạng.
        // Reset trạng thái lỗi khi có sự thay đổi giá trị
        setError(false);
    };

    const handleAmountBlur = () => {
        if (amount && amount >= 0) {
            //Kiểm tra nếu amount không rỗng, thực hiện định dạng số tiền theo định dạng tiền tệ Việt Nam (vi-VN) và lưu vào formattedAmount.
            const formattedAmount = new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
            }).format(amount);
            setDisplayAmount(formattedAmount); //Cập nhật state displayAmount để hiển thị số tiền đã được định dạng.
        }
    };

    // Hàm này được gọi khi người dùng chọn một phương thức thanh toán khác nhau.
    const handleMethodChange = (methodPay) => {
        setMethodPay(methodPay);
        // Reset trạng thái lỗi khi chọn phương thức thanh toán mới
        setError(false);
        setShowModal(true); //hien form len
    };


    const suggestedAmounts = [20000, 50000, 100000, 200000, 500000, 1000000];
    const paymentMethods = [
        // {label: "Online bằng thẻ ATM", minAmount: 10000},
        // {label: "Online bằng Internet banking", minAmount: 10000},
        // {label: "Chuyển khoản nhận ngay", minAmount: 50000},
        // {label: "Chuyển khoản offline", minAmount: 10000},
        {label: "Online bằng thẻ liên kết", minAmount: 10000, fee: "0,33%"},
    ];

    return (
        <div>
            <div className="max-w-2xl bg-white shadow-md rounded-lg overflow-hidden mb-9">
                <div
                    className="flex items-center p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
                    <FaDownload size={25}/>
                    <h2 className="text-2xl font-bold ml-3">Nạp tiền</h2>
                </div>
                <form className={"mt-2 p-3"}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            SỐ TIỀN CẦN NẠP
                        </label>
                        <input
                            type="text"
                            id="amount"
                            placeholder="Số tiền tối thiểu phải lớn hơn 10.000 VND"
                            value={displayAmount}
                            onChange={handleAmountChange}
                            onBlur={handleAmountBlur}
                            className={`placeholder:text-lg w-full text-2xl px-3 py-2 text-red-700 font-sans ring-1 hover:ring-emerald-500 rounded-lg focus:outline-none focus:shadow-outline ${error ? 'ring-red-500' : 'ring-blue-500'}`}
                        />
                        {error && <p className="text-red-600 text-sm mt-1">Vui lòng nhập số tiền</p>}
                    </div>
                    <div className="mb-6">
                        <p className="text-gray-700 text-md font-semibold mb-2">Số tiền đề xuất:</p>
                        <div className="grid grid-cols-3 gap-4">
                            {suggestedAmounts.map((val) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => {
                                        const formattedAmount = new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(val);
                                        setAmount(val.toString());
                                        setDisplayAmount(formattedAmount);
                                        setError(false);
                                    }}
                                    className="h-10 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 hover:bg-gradient-to-r focus:outline-none focus:shadow-outline transition duration-300"
                                >
                                    {val.toLocaleString()}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            CHỌN PHƯƠNG THỨC NẠP
                        </label>
                        {error && !amount &&
                            <p className="text-red-600 text-sm mt-1">Vui lòng nhập số tiền trước khi chọn phương
                                thức</p>}
                        <div className="grid grid-cols-2 gap-4">
                            {paymentMethods.map(({label, minAmount, fee}) => (
                                <div
                                    key={label}
                                    onClick={() => handleMethodChange(label)}
                                    className={`p-4 rounded-lg border ${methodPay === label ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100 hover:bg-blue-300'} cursor-pointer`}
                                >
                                    <p className={`font-semibold ${methodPay === label ? 'text-blue-500' : 'text-gray-700'}`}>{label}</p>
                                    <p className="text-sm text-gray-500">Tối
                                        thiểu: {minAmount.toLocaleString()}đ {fee && ` - Phí: ${fee}`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
                <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                    <p className="font-bold">Thông báo:</p>
                    <p>Đối với các hình thức nạp tiền/thanh toán offline (chuyển khoản qua I-banking, ATM), chính sách
                        của
                        một số Ngân hàng sẽ không hỗ trợ kiểm tra sau 19h00: Agribank, Đông Á, Sacombank, Vietinbank,
                        Vietcombank.</p>
                </div>
                <BankSelect show={showModal} onClose={() => setShowModal(false)} amount={amount}
                            methodPay={methodPay}/>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default InfoPopup;
