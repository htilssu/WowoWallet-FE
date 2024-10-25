import { ScrollRestoration } from 'react-router-dom';
import RecentActivities from "./recentActivitiesFund.jsx";
import { useParams } from 'react-router-dom';
import DonateForm from "./FundForm/DonateForm.jsx";
import { useEffect, useState } from "react";
import { wGet } from "../../util/request.util.js";
import { useAuth } from "../../modules/hooks/useAuth.jsx";

const FundDetailPage = () => {
    const { id } = useParams(); // Lấy ID của quỹ từ URL
    const [fundData, setFundData] = useState(null);
    const [fundMembers, setFundMembers] = useState(null);
    const [error, setError] = useState(null);
    const [isDonateFormOpen, setIsDonateFormOpen] = useState(false);

    //fetch data Detail Fundroup
    const fetchDetailGroup = async () => {
        try {
            const funds = await wGet(`/v1/group-fund/${id}`);

            setFundData(funds);

            const members = await wGet(`/v1/group-fund/${id}/members`);
            setFundMembers(members);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchDetailGroup();
    }, [id]);

    const handleDonateClick = () => {
        setIsDonateFormOpen(true); // Mở form
    };

    const handleCloseDonateForm = () => {
        setIsDonateFormOpen(false); // Đóng form
    };

    const { user } = useAuth();
    const userId = user.id;
    const isFundManager = !(fundData && fundData.owner && fundData.owner.id === userId);

    const progressPercentage = Math.min((fundData?.balance / fundData?.target) * 100, 100);

    if (!fundData) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Không thể lấy thông tin quỹ</div>;
    }

    return (
        <div className="flex justify-center min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className={"max-w-5xl w-full"}>
                {/* Fund Image */}
                <div className={"justify-between"}>
                    <img
                        src={fundData.image}
                        alt="Ảnh quỹ"
                        className="w-full h-32 sm:h-64 object-cover rounded-lg p-1"
                    />
                </div>
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-8">
                    {/* Fund Title */}
                    <h2 className="text-xl sm:text-3xl font-bold sm:mb-4 mb-2">{fundData.name}</h2>

                    {/* Fund Purpose */}
                    <p className="sm:text-lg mb-4">{fundData.description}</p>

                    {/* Action Buttons */}
                    <div className="mb-2 sm:mb-6 flex justify-center sm:justify-start">
                        <button
                            className="px-2 py-2 ssm:px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 mr-2"
                            onClick={handleDonateClick}
                        >
                            Góp Quỹ
                        </button>
                        {isFundManager && (
                            <>
                                <button
                                    className="px-2 py-2 ssm:px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 mr-2"
                                >
                                    Nhắc Đóng Quỹ
                                </button>
                                <button
                                    className="px-2 py-2 ssm:px-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
                                >
                                    Rút Quỹ
                                </button>
                            </>
                        )}
                    </div>

                    {/* Contribution Details */}
                    <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
                        <div className={"flex flex-col sm:flex-row sm:justify-between sm:items-center items-start"}>
                            <div className="flex justify-items-start items-center mb-2">
                                <span className="sm:text-lg font-semibold mr-2">Số Dư:</span>
                                <div className={"flex flex-grow gap-1 sm:text-lg"}>
                                    <div className={"text-green-500"}>
                                        {fundData.balance.toLocaleString('vi-VN')}
                                    </div>
                                    <div className={"text-gray-900"}>
                                        / {fundData.target.toLocaleString('vi-VN')}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end items-center gap-2">
                                <span className="font-medium">Hạn đến:</span>
                                <span className="font-light">{fundData.targetDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="border-1 border-amber-400 bg-gray-200 rounded-full h-4 mb-6">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>

                    {/* Recent Activities */}
                    <div>
                        <RecentActivities />
                    </div>

                    {/* Fund Manager */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Quản Lý Quỹ</h3>
                        <div className={"flex flex-col sm:flex-row sm:justify-start items-center gap-1"}>
                            <img
                                src={"/avatarH.png"}
                                className="w-12 h-12 rounded-full object-cover mr-2"
                            />
                            <div>
                                <div className="flex-1">
                                    <p className="text-primary">{fundData.owner.email}</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-gray-500">Ngày tạo: {fundData.targetDate}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Members */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Thành Viên</h3>
                        <div className="flex mb-4">
                            <button
                                className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 mr-2"
                            >
                                Mời Bạn
                            </button>
                            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600">
                                Chia Sẻ Quỹ
                            </button>
                        </div>
                        <ul className="list-disc pl-5">
                            {fundMembers && fundMembers.length > 0 ? (
                                fundMembers.map((member, index) => (
                                    <li key={index}>
                                        {member.email}
                                    </li>
                                ))
                            ) : (
                                <li>Chưa có thành viên nào.</li>
                            )}
                        </ul>
                    </div>

                    {isFundManager && (
                        <div>
                            <button
                                className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
                            >
                                Chỉnh Sửa Quỹ
                            </button>
                        </div>
                    )}
                    {!isFundManager && (
                        <div>
                            <button className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-indigo-600">
                                Rời quỹ
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <ScrollRestoration />
            {isDonateFormOpen && <DonateForm onClose={handleCloseDonateForm} />}
        </div>
    );
};

export default FundDetailPage;
