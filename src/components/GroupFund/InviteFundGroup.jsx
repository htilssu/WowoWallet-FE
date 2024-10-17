import { useState } from 'react';

// Component hiển thị thông tin lời mời
const InviteCard = ({ inviter, avatar, groupName, groupDescription, onJoin, onDecline }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-4">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{groupName}</h3>
                <p className="text-gray-600">{groupDescription}</p>
            </div>
            <div className="flex items-center">
                <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={avatar}
                    alt={`${inviter}'s avatar`}
                />
                <div className="ml-4">
                    <h2 className="text-sm font-semibold">{inviter}</h2>
                    <p className="text-sm text-gray-500">(Người lập quỹ)</p>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
                <button
                    className="bg-gray-200 text-gray-900 px-4 py-2 rounded hover:bg-gray-300"
                    onClick={onDecline}
                >
                    Từ chối
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
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

    // Hàm xử lý tham gia
    const handleJoin = (groupName) => {
        alert(`Bạn đã tham gia quỹ nhóm: ${groupName}`);
    };

    // Hàm xử lý từ chối
    const handleDecline = (groupName) => {
        alert(`Bạn đã từ chối lời mời quỹ nhóm: ${groupName}`);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
    )};

export default InviteFund;
