import {ScrollRestoration, useNavigate} from 'react-router-dom';
import InviteFund from "../components/GroupFund/InviteFundGroup.jsx";
import {useEffect, useState} from "react";
import axios from "axios";

const GroupFundPage = ({userId}) => {
    const [createdFunds, setCreatedFunds] = useState([]);
    const [joinedFunds, setJoinedFunds] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Gọi API lấy danh sách quỹ nhóm của user
        const fetchGroupFunds = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/v1/group-fund/user/${1}`);
                const {createdFunds, joinedFunds} = response.data;

                if (createdFunds.length === 0 && joinedFunds.length === 0) {
                    setErrorMessage('Bạn chưa tạo hoặc tham gia quỹ nào.');
                } else {
                    setCreatedFunds(createdFunds);
                    setJoinedFunds(joinedFunds);
                }
            } catch (error) {
                console.error('Lỗi khi lấy danh sách quỹ:', error);
                setErrorMessage('Có lỗi xảy ra khi lấy danh sách quỹ.');
            }
        };

        fetchGroupFunds();
    }, [userId]);

    const navigate = useNavigate();

    // Hàm điều hướng đến trang chi tiết quỹ
    const handleFundClick = (id) => {
        navigate(`/group-fund/${id}`);
    };

    const handleCreateNewFund = () => {
        navigate('/group-fund/new-group');
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-blue-50 p-6">
                <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
                    {/* Header */}
                    <div className="bg-emerald-500 w-full rounded-lg p-6 mb-2 shadow-lg text-center">
                        <h1 className="text-4xl font-extrabold text-white mb-4">Quỹ Nhóm của Bạn</h1>
                        <p className="text-lg text-gray-100">
                            Quản lý tất cả các quỹ mà bạn đã tạo hoặc đang tham gia.
                        </p>
                    </div>
                    {/*lời mời tham gia quỹ*/}
                    <div className={"mb-6"}>
                        <InviteFund/>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {/* Created Funds */}
                    <div className="w-full mb-8">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Quỹ Đã Tạo</h2>
                        {createdFunds.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {createdFunds.map((fund) => (
                                    <div key={fund.id}
                                         className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                                         onClick={() => handleFundClick(fund.id)}
                                    >
                                        <img src={fund.image} alt={fund.name}
                                             className="rounded-lg w-full h-48 object-cover mb-4"/>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{fund.name}</h3>
                                        <p className="text-gray-600">
                                            Số tiền đã góp:
                                            <span className="font-semibold text-green-500 ml-2">
                                            {fund.balance.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Bạn chưa tạo quỹ nào.</p>
                        )}
                    </div>

                    {/* Participating Funds */}
                    <div className="w-full mb-12">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Quỹ Đang Tham Gia</h2>
                        {joinedFunds.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {joinedFunds.map((fund) => (
                                    <div key={fund.id}
                                         className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                                         onClick={() => handleFundClick(fund.id)} // Điều hướng khi nhấn vào quỹ
                                    >
                                        <img src={fund.image} alt={fund.name}
                                             className="rounded-lg w-full h-48 object-cover mb-4"/>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{fund.name}</h3>
                                        <p className="text-gray-600">Số tiền đã góp:
                                            <span className="font-semibold text-green-500 ml-2">
                                            {fund.balance.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})}
                                            </span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>Bạn chưa tham gia quỹ nào.</p>
                        )}
                    </div>

                    {/* Nút Tạo Quỹ Mới */}
                    <div className="fixed bottom-8 right-16">
                        <button
                            onClick={handleCreateNewFund}
                            className="relative inline-flex items-center justify-center px-6 py-4 text-lg font-semibold text-white transition-transform transform bg-gradient-to-r from-blue-500 to-green-400 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 overflow-hidden"
                        >
                            <span className="relative z-10">Tạo Quỹ Mới +</span>
                        </button>
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default GroupFundPage;
