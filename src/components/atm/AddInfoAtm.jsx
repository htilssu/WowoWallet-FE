import {useEffect, useState} from "react";
import axios from "axios";
import {ToastContainer, toast, Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {wPost} from "../../util/request.util.js";
import {useNavigate} from "react-router-dom";


const fetchBankList = () => {
    return axios.get("https://api.vietqr.io/v2/banks");
};
const AddInfoAtm = () => {
    const [selectedBank, setSelectedBank] = useState('');
    const [bankList, setBankList] = useState([]);
    const [accountName, setAccountName] = useState("");
    const [accountNumber, setAccountNumber] = useState('');
    const [expired, setExpired] = useState('');
    const [previousExpired, setPreviousExpired] = useState('');
    const [errors, setErrors] = useState({
        accountNumber: '',
        expired: ''
    });

    useEffect(() => {
        fetchBankList()
            .then(result => {
                setBankList(result.data.data);
            })
            .catch(error => {
                console.error('Error fetching bank list:', error);
            });
    }, []);

    const selectBank = (shortName) => {
        setSelectedBank(value => shortName);
    };

    const handleCardNumberChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.slice(0, 16);
        setAccountNumber(value);
    };

    const validateDate = (date) => {
        const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Sửa thành yyyy/mm để kiểm tra đúng định dạng
        if (!regex.test(date)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ngayphathanh: 'Ngày phát hành không hợp lệ. Vui lòng nhập lại.'
            }));
            return false;
        }

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;

        const [month, year] = date.split('/').map(Number);
        if (month < 1 || month > 12) {
            setErrors(prevErrors => ({
                ...prevErrors,
                expired: 'Tháng không hợp lệ. Vui lòng nhập lại.'
            }));
            return false;
        }
        if (year > currentYear % 100 || (year === currentYear % 100 && month > currentMonth)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                expired: 'Năm không hợp lệ hoặc vượt quá thời gian hiện tại. Vui lòng nhập lại.'
            }));
            return false;
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            expired: ''
        }));
        return true;
    }

    const handleDateChange = (e) => {
        let value = e.target.value;
        if (value.length === 2 && !value.includes('/')) {
            value = value + '/';
        }
        if (value.length > 5) {
            value = value.slice(0, 5);
        }

        setPreviousExpired(expired);
        setExpired(value);

        if (value.length === 5 || value.length === 2) {
            validateDate(value);
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                expired: ''
            }));
        }
    };
    useEffect(() => {
        const localAtm = localStorage.getItem("atm");
        if (localAtm) {
            setBankList(JSON.parse(localAtm));
        }
    }, []);
    const handleValidation = () => {
        let formIsValid = true;
        const newErrors = {
            accountName: '',
            accountNumber: '',
            expired: ''
        };

        if (!accountNumber) {
            newErrors.accountNumber = 'Vui lòng nhập số tài khoản';
            formIsValid = false;
        }

        if (!expired || !validateDate(expired)) {
            newErrors.expired = 'Vui lòng nhập ngày phát hành';
            formIsValid = false;
        }

        if (!accountName) {
            newErrors.accountName = 'Vui lòng nhập tên tài khoản';
            formIsValid = false;
        }

        setErrors(newErrors);
        return formIsValid;
    };

    const navigate = useNavigate();

    const handleSubmit =(e) => {

        e.preventDefault();
        if (handleValidation()) {
            wPost("/v1/card", {
                cardNumber: accountNumber,
                holderName: accountName,
                expired: expired,
                atmId: selectedBank.split('|')[0],
            }).then((res) => {
                if (res.data.card) {
                    localStorage.setItem("atm", JSON.stringify(res.data.card));
                    toast.success('Thông tin đã được cập nhật thành công.', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                    });
                    setTimeout(() => {
                        navigate('/bank');
                    }, 3000);
                } else {
                    toast.error(res.data.message || 'Có lỗi xảy ra.');
                }
            })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error(error.response?.data?.message || 'Có lỗi xảy ra.');
                });
        }
    };


    return (
        <div className="md:p-6 flex items-center justify-center">
            <ToastContainer/>
            <div
                className="Add-app flex flex-wrap justify-center items-center max-w-[1200px] w-full bg-white border-[1px] mt-5 p-8 rounded-2xl">
                <div className="w-full md:flex">
                    <div className="mb-5 w-full md:w-[400px]">
                        <div
                            className="w-full h-auto bg-[url('/ava.png')] rounded-xl shadow-md overflow-hidden p-5 relative">
                            <div
                                className="text-white text-center text-xl font-semibold mb-2">{selectedBank.split("|")[1]}</div>
                            <div className="flex flex-col items-center">
                                <div
                                    className="w-full h-24 rounded-xl flex items-center justify-center mb-2 relative bg-opacity-50">
                                    <img src={"/chip.png"} alt="Chip"
                                         className="absolute top-2 left-4 w-10"/>
                                    <div className="text-white text-xl font-mono mt-5">{accountNumber}</div>
                                </div>
                                <div className="w-full flex justify-between text-white mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Expiry Date</span>
                                        <span className="text-sm font-semibold">{expired}</span>
                                        <span className="text-sm font-semibold">{accountName}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2">
                                <img src={"/Mastercard.png"} alt="MasterCard" className="w-12"/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 p-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center">
                                <span className="w-1/4 text-right mr-4 text-md">Chọn ngân hàng:</span>
                                <select
                                    className="w-3/4 p-2 border border-gray-300 focus:outline-none"
                                    value={selectedBank}
                                    onChange={(e) => {
                                        selectBank(e.target.value)
                                        console.log(e.target.value)
                                    }}
                                >
                                    <option value="" disabled hidden>Chọn ngân hàng</option>
                                    {bankList.map((bank, index) => (
                                        <option key={index} value={bank.id + "|" + bank.shortName}>
                                            {bank.shortName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center flex-col">
                                <div className="flex w-full mb-4 items-baseline">
                                    <div className="w-1/4 text-right mr-4 text-md items-baseline">
                                        <span>Tên tài khoản:</span>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="relative">
                                            <input
                                                className="w-full p-2 border border-gray-300 focus:outline-none"
                                                type="text"
                                                value={accountName}
                                                onChange={(e) => setAccountName(e.target.value)}
                                            />
                                            {errors.accountName && (
                                                <p className="text-red-500 mt-1">{errors.accountName}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center flex-col">
                                <div className="flex w-full mb-4 items-baseline">
                                    <div className="w-1/4 text-right mr-4 text-md items-baseline">
                                        <span>Số thẻ:</span>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="relative">
                                            <input
                                                className="w-full p-2 border border-gray-300 focus:outline-none"
                                                type="text"
                                                value={accountNumber}
                                                onChange={handleCardNumberChange}
                                                maxLength={16}
                                            />
                                            {errors.accountNumber && (
                                                <p className="text-red-500 mt-1">{errors.accountNumber}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center flex-col border-b-2 border-gray-300 pb-6">
                                <div className="flex items-baseline w-full mb-4">
                                    <div className="w-1/4 text-right mr-4 text-md ">
                                        <span>expired:</span>
                                    </div>
                                    <div className="w-3/4">
                                        <div>
                                            <input
                                                className="w-full p-2 border border-gray-300 focus:outline-none"
                                                type="text"
                                                placeholder="mm/YY"
                                                value={expired}
                                                onChange={handleDateChange}
                                            />
                                            {errors.expired && (
                                                <p className="text-red-500 mt-1">{errors.expired}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="button-bottom flex justify-end">
                                <button
                                    className="button-update text-green-500 p-3 rounded-2xl mr-3 font-bold"
                                    onClick={() => {
                                        setAccountNumber('');
                                        setExpired(previousExpired);
                                        setSelectedBank('');
                                        setAccountName('');
                                        setErrors({});
                                    }}
                                >
                                    Hủy bỏ
                                </button>
                                <button
                                    className="button-update p-3 rounded-2xl bg-green-500 font-bold text-white"
                                    onClick={handleSubmit}
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddInfoAtm;
