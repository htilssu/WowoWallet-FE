import { useEffect, useState } from 'react';
import { wGet, wPost } from "../../../util/request.util.js";

// Component hiển thị thông tin lời mời
const InviteCard = ({ groupName, createdAt, senderEmail, avatar, onJoin, onDecline }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-4 w-56 md:w-72 mx-auto my-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="relative mb-2">
                <img
                    className="w-full h-32 rounded-xl object-cover border-2 border-green-500 shadow-md"
                    src={avatar}
                    alt={`${groupName} avatar`}
                />
            </div>
            <div className="px-2 flex flex-col space-y-3">
                <div className="bg-gray-100 p-2 rounded-lg text-center">
                    <h3 className="text-lg font-bold text-gray-800">{groupName}</h3>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">{senderEmail}</p>
                    <p className="text-xs text-gray-400">Gửi vào: {new Date(createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-around mt-4 space-x-4">
                    <button
                        className="bg-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-200 ease-in-out"
                        onClick={onDecline}
                    >
                        Từ chối
                    </button>
                    <button
                        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 ease-in-out shadow-lg"
                        onClick={onJoin}
                    >
                        Tham gia
                    </button>
                </div>
            </div>
        </div>
    );
};

// Component hiển thị danh sách lời mời
const InviteFund = () => {
    const [invitations, setInvitations] = useState([]);
    const [showAll, setShowAll] = useState(false);
    const [error, setError] = useState(null);

    // Fetch danh sách lời mời
    const fetchInvitations = async () => {
        try {
            const response = await wGet(`/v1/invitations/received`);
            setInvitations(response);
        } catch (error) {
            console.error("Error fetching invitations:", error);
            setError("Có lỗi xảy ra khi tải danh sách lời mời.");
        }
    };

    useEffect(() => {
        fetchInvitations();
    }, []);

    // Xử lý chấp nhận lời mời
    const handleJoin = async (id) => {
        try {
            await wPost(`/v1/invitations/${id}/accept`);
            setInvitations((prev) => prev.filter((invite) => invite.id !== id));
            alert("Bạn đã tham gia quỹ nhóm.");
            location.reload();
        } catch (error) {
            console.error("Error accepting invitation:", error);
            setError("Có lỗi xảy ra khi tham gia quỹ.");
        }
    };

    // Xử lý từ chối lời mời
    const handleDecline = async (id) => {
        try {
            await wPost(`/v1/invitations/${id}/reject`);
            setInvitations((prev) => prev.filter((invite) => invite.id !== id));
            alert("Bạn đã từ chối lời mời.");
        } catch (error) {
            console.error("Error declining invitation:", error);
            setError("Có lỗi xảy ra khi từ chối lời mời.");
        }
    };

    const visibleInvitations = showAll ? invitations : invitations.slice(0, 4);

    return (
        <div className="bg-gray-50 py-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">Lời mời tham gia quỹ</h1>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {invitations.length > 3 && (
                <div className="flex justify-end">
                    <div
                        onClick={() => setShowAll(!showAll)}
                        className="font-semibold px-6 rounded-lg hover:bg-gray-200 transition cursor-pointer"
                    >
                        {showAll ? "Thu gọn" : "Xem tất cả"}
                    </div>
                </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-4">
                {visibleInvitations.map((invite) => (
                    <InviteCard
                        key={invite.id}
                        groupName={invite.nameGroup}
                        createdAt={invite.createdAt}
                        senderEmail={invite.senderEmail}
                        avatar={invite.avatar || "/sanmay.png"}
                        onJoin={() => handleJoin(invite.id)}
                        onDecline={() => handleDecline(invite.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default InviteFund;