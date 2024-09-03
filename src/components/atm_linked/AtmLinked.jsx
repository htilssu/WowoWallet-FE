import { useNavigate } from 'react-router-dom';
import { GrTransaction } from 'react-icons/gr';
import { IoIosAddCircle } from 'react-icons/io';
import CardAtmComponents from './CardAtmComponents'; // Import the CardAtmComponents component
import Card from "./Card.jsx";
import { useEffect, useState } from "react";
import { deleteR, get } from "../../util/requestUtil.js";
import { toast } from "react-toastify";
import axios from "axios";

const fetchBankList = () => {
    return axios.get("https://api.vietqr.io/v2/banks");
};

const AtmLinked = () => {
    const [bankList, setBankList] = useState([]);
    const [bankInfo, setBankInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBankList()
            .then(result => {
                setBankList(result.data.data);
                localStorage.setItem('atm',JSON.stringify(result.data.data))
            })
            .catch(error => {
                console.error('Error fetching bank list:', error);
            });
    }, []);

    useEffect(() => {
        get("/v1/card")
            .then((res) => {
                if (res.data && Array.isArray(res.data)) {
                    setBankInfo(res.data);
                } else {
                    console.error('Dữ liệu trả về không đúng định dạng:', res.data);
                    toast.error('Dữ liệu trả về không đúng định dạng!');
                }
            })
            .catch((error) => {
                console.error('Lỗi khi lấy thông tin thẻ:', error);
                toast.error('Lỗi khi lấy thông tin thẻ!');
            });
    }, []);

    const handleShowNganHang = (event) => {
        event.preventDefault();
        navigate('/AddInfoAtm'); // Navigate to AddInfoAtm page
    };

    const handleDelete = (cardNumber) => {
        deleteR(`/v1/card/${cardNumber}`).then(() => {
            setBankInfo(prev => prev.filter(card => card.cardNumber !== cardNumber));
            toast.success('Thẻ đã được xóa thành công!');
        }).catch(() => {
            toast.error('Lỗi khi xóa thẻ!');
        });
    };

    // Tìm ngân hàng dựa vào id
    const findBankById = (id) => {
        return bankList.find(bank => bank.id+"" === id) || {};
    };

    return (
        <div className="md:p-6 flex items-center justify-center">
            <div className="form-box w-full max-w-[900px] my-auto mx-0 p-5 bg-white border-0 md:border-[1px] border-solid border-green-500 rounded-3xl">
                <form>
                    {/* Form Header */}
                    <div className="head-form flex items-center mb-5">
                        <div className="icons mr-2 text-green-500">
                            <GrTransaction />
                        </div>
                        <div className="head-title text-green-500">
                            <p>Thẻ/Tài khoản ngân hàng</p>
                        </div>
                    </div>

                    {/* Form Body */}
                    <div className="body-title mb-2 font-semibold text-green-500 flex items-start border-b-[1px] border-black">
                        <p>Thẻ/tài khoản nội địa(rút)</p>
                    </div>
                    <div className="body-section">
                        {/* Body Section Header */}
                        <div className="body-section-head flex justify-between items-center pb-2 mb-2">
                            <div className="body-section-head-left flex items-center relative text-green-500">
                                <p>THẺ ATM</p>
                            </div>
                            <div className="body-section-head-right flex items-center relative">
                                <div className="icon-body-head text-green-500 text-sm" onClick={handleShowNganHang}>
                                    <IoIosAddCircle/>
                                </div>
                                <div className="body-section-head-right-p ml-1 flex items-center text-green-500"
                                     onClick={handleShowNganHang}>
                                    <p>Thẻ ATM</p>
                                </div>
                            </div>
                        </div>

                        {/* Cards Container */}
                        <div className="atm-container grid grid-cols-1  min-w-[781px]:grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 ">
                            {bankInfo.map((card, index) => {
                                const bank = findBankById(card.atmId); // Tìm ngân hàng dựa vào id
                                return (
                                    <Card
                                        key={index}
                                        cardNumber={card.cardNumber}
                                        cardHolder={card.holderName.toUpperCase()}
                                        expiryDate={card.expired}
                                        bankName={bank.shortName || 'Ngân hàng không xác định'} // Hiển thị tên ngân hàng
                                        onDelete={handleDelete}
                                    />
                                );
                            })}
                            <CardAtmComponents
                                title="Thêm thẻ ATM"
                                text="Bạn có thể thêm thẻ ATM vào đây"
                                link="#"
                                onClick={handleShowNganHang}
                            />

                        </div>
                        <div className={"border-1"}></div>
                        <div className="body-section-bottom flex justify-between items-center pb-2 mt-5">
                            <div className="body-section-bottom-left text-green-500 flex items-center relative ">
                                <p>TÀI KHOẢN NGÂN HÀNG</p>
                            </div>
                            <div className="body-section-bottom-right flex items-center relative">
                                <div className="icon-body-bottom relative text-green-500 text-sm"
                                     onClick={handleShowNganHang}>
                                    <IoIosAddCircle/>
                                </div>
                                <div className="body-section-bottom-right-p flex items-center text-green-500"
                                     onClick={handleShowNganHang}>
                                    <p>Thẻ tài khoản</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Card */}
                        <div className="nganhang w-full md:w-1/2 mt-2">
                            <CardAtmComponents
                                title="Thêm tài khoản ngân hàng"
                                text="Bạn có thể thêm tài khoản ngân hàng vào đây"
                                link="#"
                                onClick={handleShowNganHang}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AtmLinked;

