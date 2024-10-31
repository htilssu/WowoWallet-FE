import {ScrollRestoration, useNavigate} from 'react-router-dom';
import RecentActivities from "./component/recentActivitiesFund.jsx";
import {useParams} from 'react-router-dom';
import DonateForm from "./component/DonateForm.jsx";
import {Fragment, useEffect, useState} from "react";
import {wGet, wPost} from "../../util/request.util.js";
import {useAuth} from "../../modules/hooks/useAuth.jsx";
import InviteMember from "./component/InviteForm.jsx";
import MemberList from "./component/MemberList.jsx";
import FundManager from "./component/FundManager.jsx";
import {Confirm} from "react-admin";
import WithdrawForm from "./component/WithdrawForm.jsx";
import EditGroupFund from "./component/EditGroupFund.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";

const FundDetailPage = () => {
    const {id} = useParams(); // Lấy ID của quỹ từ URL
    const [isDonateFormOpen, setIsDonateFormOpen] = useState(false);
    const [isWithdrawFormOpen, setWithdrawFormOpen] = useState(false);
    const [isInviteOpen, setIsInviteOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditFundOpen, setIsEditFundOpen] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Fetch dữ liệu quỹ
    const { data: fundData, isLoading: isLoadingFund, isError: isErrorFund } = useQuery({
        queryKey: ['groupFund', id],
        queryFn: () => wGet(`/v1/group-fund/${id}`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    // Fetch dữ liệu thành viên quỹ
    const { data: fundMembers, isLoading: isLoadingMembers, isError: isErrorMembers } = useQuery({
        queryKey: ['groupFundMembers', id],
        queryFn: () => wGet(`/v1/group-fund/${id}/members`),
        staleTime: 5 * 60 * 1000,
        cacheTime: 30 * 60 * 1000,
    });

    const handleDonateClick = () => {
        setIsDonateFormOpen(true); // Mở form
    };
    const handleCloseDonateForm = () => {
        setIsDonateFormOpen(false); // Đóng form
    };
    //form rút tiền
    const handleWithdrawForm = () => {
        setWithdrawFormOpen(!isWithdrawFormOpen);
    };

    // Hàm để xử lý khi nhấn nút Mời Bạn
    const handleInviteClick = () => {
        setIsInviteOpen(!isInviteOpen);
    };

    // Hàm để mở/đóng form chỉnh sửa quỹ
    const handleEditFundClick = () => {
        setIsEditFundOpen(true);
    };

    const {user} = useAuth();
    const userEmail = user.getEmail;
    const userId = user.id;
    const isFundManager = (fundData && fundData.owner && fundData.owner.id === userId);

    const progressPercentage = Math.min((fundData?.wallet.balance / fundData?.target) * 100, 100);

    if (!fundData) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Không thể lấy thông tin
            quỹ</div>;
    }

    const handleLeaveGroup = async () => {
        const body = {
            groupId: id,
            memberId: userId,
        };
        try {
            const response = await wPost(`/v1/group-fund/members/leave`, body);
            setMessage(response.message);
            queryClient.invalidateQueries({ queryKey: ['groupFunds'] });
            queryClient.invalidateQueries({ queryKey: ['groupFundMembers', id], });
            navigate(-1);
        } catch (error) {
            setErrorMessage("Có lỗi xảy ra khi rời quỹ.");
            setMessage(null);
        }
    };

    const confirmCancel = () => {
        setIsModalOpen(false);
        handleLeaveGroup().then(r => {});
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (isLoadingFund || isLoadingMembers) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Loading...</div>;
    }

    if (isErrorFund || isErrorMembers) {
        return <div className="min-h-screen bg-gray-100 flex justify-center items-center">Không thể lấy thông tin quỹ</div>;
    }

    return (
        <Fragment>
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
                    <div className="bg-white rounded-lg shadow-lg py-4 px-6 sm:px-10 mb-8">
                        {/* Fund Title */}
                        <h2 className="text-xl sm:text-3xl font-bold sm:mb-2 mb-1">{fundData.name}</h2>

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
                                        onClick={handleWithdrawForm}
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
                                            {fundData?.wallet.balance?.toLocaleString('vi-VN')}
                                        </div>
                                        <div className={"text-gray-900"}>
                                            / {fundData?.target?.toLocaleString('vi-VN')}
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
                            <div className="bg-green-500 h-full rounded-full"
                                 style={{width: `${progressPercentage}%`}}></div>
                        </div>

                        {/* Recent Activities */}
                        <div>
                            <RecentActivities id={id}/>
                        </div>

                        {/* Fund Manager */}
                        <div>
                            <FundManager
                                ownerEmail={fundData.owner.email}
                                avatar={fundData.owner.avatar}
                                createdDate={fundData.createdDate}
                            />
                        </div>

                        {/* Members */}
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-2">Thành Viên</h3>
                            <div className="flex space-x-2 mb-4">
                                <button
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition duration-150"
                                    onClick={handleInviteClick}
                                >
                                    Mời Bạn
                                </button>
                                <button
                                    className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition duration-150">
                                    Chia Sẻ Quỹ
                                </button>
                            </div>

                            {isInviteOpen && (
                                <InviteMember fundId={id} userId={userId} onCancel={handleInviteClick}/>
                            )}

                            <div>
                                <MemberList fundMembers={fundMembers}/>
                            </div>
                        </div>

                        {isFundManager && (
                            <div>
                                <button
                                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow-md hover:bg-indigo-600"
                                    onClick={handleEditFundClick}
                                >
                                    Chỉnh Sửa Quỹ
                                </button>
                            </div>
                        )}
                        {!isFundManager && (
                            <div>
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-700"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Rời quỹ
                                </button>
                                {message && <p className="text-green-500 mt-2">{message}</p>}
                                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                            </div>
                        )}
                    </div>
                </div>
                <ScrollRestoration/>
                {isDonateFormOpen &&
                    <DonateForm onClose={handleCloseDonateForm} fundId={id} balance={fundData.wallet.balance} senderId={userId} userEmail={userEmail}/>}
                {isWithdrawFormOpen &&
                    <WithdrawForm onClose={handleWithdrawForm} fundId={id} balance={fundData.wallet.balance} senderId={userId}/>}
                {isEditFundOpen && (
                    <EditGroupFund fundData={fundData} onClose={() => setIsEditFundOpen(false)} fundId={id}/>)}
            </div>
            <Confirm
                isOpen={isModalOpen}
                title={`Nhóm Quỹ: ${fundData.name}`}
                content="Bạn có chắc chắn muốn rời quỹ này không?"
                cancel="Quay lại"
                confirm="Xác nhận"
                onConfirm={confirmCancel}
                onClose={closeModal}
            />
        </Fragment>
    );
};

export default FundDetailPage;
