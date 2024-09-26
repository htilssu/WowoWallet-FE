import { useNavigate } from 'react-router-dom';
import InviteFund from "../components/GrounpFund/InviteFundGroup.jsx";

const createdFunds = [
    {
        fundName: "Quỹ Du Lịch Đà Lạt",
        balanceAmount: "10,000,000 VNĐ",
        fundImage: "/sanmay.png",
        id: 1, // ID của quỹ để điều hướng
    },
    {
        fundName: "Quỹ Sinh Nhật Cô Ba",
        balanceAmount: "5,000,000 VNĐ",
        fundImage: "/sinhnhat.png",
        id: 2,
    }
];

const participatingFunds = [
    {
        fundName: "Quỹ Mua Gạo Từ Thiện",
        balanceAmount: "3,000,000 VNĐ",
        fundImage: "/tuthien.png",
        id: 3,
    },
    {
        fundName: "Quỹ Dã Ngoại Nhóm",
        balanceAmount: "2,000,000 VNĐ",
        fundImage: "/sanmay.png",
        id: 4,
    }
];

const GroupFundPage = () => {
    const navigate = useNavigate(); // Khởi tạo hook để điều hướng

    // Hàm điều hướng đến trang chi tiết quỹ
    const handleFundClick = (id) => {
        navigate(`/fund/${id}`); // Điều hướng đến trang chi tiết quỹ với ID
    };

    // Hàm điều hướng đến trang tạo quỹ mới
    const handleCreateNewFund = () => {
        navigate('/group-fund/new-group'); // Điều hướng đến trang tạo quỹ mới
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
                    <div>
                        <InviteFund/>
                    </div>
                    {/* Created Funds */}
                    <div className="w-full mb-12">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Quỹ Đã Tạo</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {createdFunds.map((fund) => (
                                <div key={fund.id}
                                     className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                                     onClick={() => handleFundClick(fund.id)} // Điều hướng khi nhấn vào quỹ
                                >
                                    <img src={fund.fundImage} alt={fund.fundName}
                                         className="rounded-lg w-full h-48 object-cover mb-4"/>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{fund.fundName}</h3>
                                    <p className="text-gray-600">Số tiền đã góp:
                                        <span className="font-semibold text-green-500"> {fund.balanceAmount}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Participating Funds */}
                    <div className="w-full mb-12">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Quỹ Đang Tham Gia</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {participatingFunds.map((fund) => (
                                <div key={fund.id}
                                     className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                                     onClick={() => handleFundClick(fund.id)} // Điều hướng khi nhấn vào quỹ
                                >
                                    <img src={fund.fundImage} alt={fund.fundName}
                                         className="rounded-lg w-full h-48 object-cover mb-4"/>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{fund.fundName}</h3>
                                    <p className="text-gray-600">Số tiền đã góp:
                                        <span className="font-semibold text-green-500"> {fund.balanceAmount}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Create New Fund Button */}
                    <div className="fixed bottom-8 right-16">
                        <button
                            onClick={handleCreateNewFund} // Điều hướng khi nhấn vào nút tạo quỹ mới
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2">
                            Tạo Quỹ Mới +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupFundPage;
