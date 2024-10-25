import {useEffect, useState} from 'react';
import {useAuth} from "../../modules/hooks/useAuth.jsx";
import {wGet} from "../../util/request.util.js";

// Component hiển thị thông tin lời mời
const InviteCard = ({ inviter, avatar, groupName, groupDescription, onJoin, onDecline }) => {
    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-sm mx-auto my-4 transition-transform transform hover:scale-105 duration-300">
            <div className="mb-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">{groupName}</h3>
                <p className="text-gray-600 text-sm">{groupDescription}</p>
            </div>
            <div className="flex items-center space-x-4">
                <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                    src={avatar}
                    alt={`${inviter}'s avatar`}
                />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{inviter}</h2>
                    <p className="text-sm text-gray-500">(Người lập quỹ)</p>
                </div>
            </div>

            <div className="mt-6 flex justify-center space-x-6">
                <button
                    className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    onClick={onDecline}
                >
                    Từ chối
                </button>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-lg"
                    onClick={onJoin}
                >
                    Tham gia
                </button>
            </div>
        </div>
    );
};

// Component hiển thị danh sách lời mời
const InviteFund = () => {
    const [invites, setInvites] = useState([
        {
            inviter: 'Nguyễn Anh Tuấn',
            avatar: '/avatarT.jpeg',
            groupName: 'Quỹ Nhóm Từ Thiện',
            groupDescription: 'Đây là quỹ từ thiện để giúp đỡ trẻ em nghèo và người già không nơi nương tựa.',
        },
        {
            inviter: 'Trần Thị Bích',
            avatar: '/avatarH.png',
            groupName: 'Quỹ Hỗ Trợ Học Sinh',
            groupDescription: 'Chúng tôi giúp đỡ học sinh có hoàn cảnh khó khăn trong học tập.',
        },
        {
            inviter: 'Lê Văn Cường',
            avatar: '/avatarT.jpeg',
            groupName: 'Quỹ Bảo Vệ Môi Trường',
            groupDescription: 'Chúng tôi cam kết bảo vệ môi trường và nâng cao ý thức cộng đồng.',
        },
    ]);

    const [invitations, setInvitations] = useState([]);
    const [error, setError] = useState(null);

    const {user} = useAuth();
    const userId = user.id;

    const fetchInvitations = async () => {
        try {
            const response = await wGet(`/v1/invitations/received`);
            if (!response.ok) {
                throw new Error(`Mã lỗi: ${response.status}`);
            }
            const data = await response.json();
            setInvitations(data);
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchInvitations();
    });

    // Hàm xử lý tham gia
    const handleJoin = (groupName) => {
        alert(`Bạn đã tham gia quỹ nhóm: ${groupName}`);
    };

    // Hàm xử lý từ chối
    const handleDecline = (groupName) => {
        alert(`Bạn đã từ chối lời mời quỹ nhóm: ${groupName}`);
    };

    return (
        <div className="bg-gray-100 py-4">
            <div className="text-2xl font-bold text-center text-gray-800 mb-4">Lời mời tham gia quỹ</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
                {invites.map((invite, index) => (
                    <InviteCard
                        key={index}
                        inviter={invite.inviter}
                        avatar={invite.avatar}
                        groupName={invite.groupName}
                        groupDescription={invite.groupDescription}
                        onJoin={() => handleJoin(invite.groupName)}
                        onDecline={() => handleDecline(invite.groupName)}
                    />
                ))}
            </div>
        </div>
    );
};

export default InviteFund;