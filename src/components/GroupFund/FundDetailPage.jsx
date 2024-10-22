import {ScrollRestoration, useNavigate} from 'react-router-dom';
import { ScrollRestoration, useLocation } from 'react-router-dom';
import RecentActivities from "./recentActivitiesFund.jsx";
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import axios from "axios";

// Sample data for funds
const sampleFunds = [
    {
        fundName: "Quỹ Du Lịch Đà Lạt",
        purpose: "Đi du lịch Đà Lạt vào mùa hè tới.",
        contributionAmount: "10,000,000 VNĐ",
        contributionDeadline: "2024-12-31",
        fundManager: "Nguyễn Anh Tuấn",
        fundManagerMail: "tuanmeo980@gmail.com",
        spendingRules: "Chi tiêu cho khách sạn và vé máy bay.",
        fundImage: "/sanmay.png",
        members: ["tuanmeo980@gmail.com","example1@gmail.com", "example2@gmail.com"]
    }
];
const user = {
    Gmail: "tuanmeo980@gmail.com",
}

const FundDetailPage = () => {
    const {fundId} = useParams();
    const [fundData, setFundData] = useState(null);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchFundData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/v1/group-fund/${fundId}`);
            setFundData(response.data);
        } catch (err) {
            setError(err.response ? err.response.data : err.message);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/v1/group-fund/${fundId}/members`);
            if (!response.ok) {
                throw new Error(`Mã lỗi: ${response.status}`);
            }
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            setError(error.message);
        }
    };
    useEffect(() => {
        fetchFundData();
        fetchMembers();
    }, [fundId]);

    console.log(error)

    if (!fundData) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Đang tải dữ liệu quỹ...</div>;
    }

    const isFundManager = fundData.owner.id === "1";

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <div className="flex justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 px-4 sm:px-8">
                <div className="max-w-5xl w-full">
                    {/* Fund Image */}
                    <div className="relative">
                        <img
                            src={fundData.image}
                            alt="Ảnh quỹ"
                            className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                        {/* Fund Title */}
                        <h2 className="text-2xl sm:text-4xl font-bold text-center sm:mb-6 mb-4 text-indigo-600">
                            {fundData.name}
                        </h2>

                        {/* Fund Purpose */}
                        <p className="sm:text-lg text-gray-700 text-justify mb-6">
                            {fundData.purpose}
                        </p>

                        {/* Action Buttons */}
                        <div className="mb-4 flex item-center gap-4">
                            <button
                                className="px-4 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300">
                                Góp Quỹ
                            </button>
                            {isFundManager && (
                                <>
                                    <button
                                        className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300">
                                        Nhắc Đóng Quỹ
                                    </button>
                                    <button
                                        className="px-4 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
                                        Rút Quỹ
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Contribution Details */}
                        <div className="bg-gray-100 p-4 rounded-xl shadow-md mb-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-start">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <span className="text-lg font-semibold text-gray-700 mr-2">Số Dư:</span>
                                    <div className="flex items-center gap-1 text-lg">
                                        <span className="text-green-500">1.000.000</span>
                                        <span className="text-gray-900">/ {fundData.target}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="font-semibold text-gray-700">Hạn đến:</span>
                                    <span className="ml-2 text-gray-600">{fundData.targetDate}</span>
                                </div>
                                <span className="font-medium"></span>
                            </div>
                            <div className="flex justify-end items-center gap-2">
                                <span className="font-medium">Hạn đến:</span>
                                <span className="font-light">{fundData.contributionDeadline}</span>
                            </div>
                        </div>
                    </div>

                        {/* Progress Bar */}
                        <div className="relative bg-gray-300 rounded-full h-4 mb-8">
                            <div className="bg-green-500 h-full rounded-full" style={{width: '25%'}}></div>
                        </div>

                        {/* Recent Activities */}
                        <div className="mb-8">
                            <RecentActivities/>
                        </div>

                        {/* Fund Manager */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Quản Lý Quỹ</h3>
                            <div className="flex items-center gap-4">
                                <img
                                    src="/avatarH.png"
                                    alt="Quản lý quỹ"
                                    className="w-14 h-14 rounded-full object-cover shadow-md"
                                />
                                <div>
                                    <p className="font-semibold text-gray-800">{fundData.fundManager}</p>
                                    <p className="text-gray-600">{fundData.owner.id}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-500">{fundData.fundManagerMail}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                        {/* Members */}
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">Thành Viên</h3>
                            <div className="flex gap-4 mb-4">
                                <button
                                    className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition-all duration-300">
                                    Mời Bạn
                                </button>
                                <button
                                    className="px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300">
                                    Chia Sẻ Quỹ
                                </button>
                            </div>
                            <ul className="list-disc pl-5 text-gray-700">
                                {members.length > 0 ? (
                                    members.map((member, index) => <li key={index}>{member.id}</li>)
                                ) : (
                                    <li>Chưa có thành viên nào.</li>
                                )}
                            </ul>
                        </div>

                        {/* Fund Manager Actions */}
                        {isFundManager && (
                            <div className="mb-4">
                                <button
                                    className="px-4 py-2 bg-indigo-500 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-600 transition-all duration-300">
                                    Chỉnh Sửa Quỹ
                                </button>
                            </div>
                        )}
                        {!isFundManager && (
                            <div className="mb-4">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300">
                                    Rời Quỹ
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default FundDetailPage;
