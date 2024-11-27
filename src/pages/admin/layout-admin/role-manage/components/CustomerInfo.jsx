// CustomerInfo.jsx
const CustomerInfo = ({ customer }) => {
    const handleGrantRole = () => {
        // Logic to grant a new role to the user
        console.log(`Cấp quyền cho: ${customer.username}`);
        alert(`Cấp quyền cho: ${customer.username}`);
        // You can add an API call here to update the customer's role
    };

    return (
        <div className="bg-gradient-to-r from-gray-50 to-cyan-100 p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Thông tin khách hàng</h2>

            {/* Avatar */}
            <div className="flex items-center space-x-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                    <img
                        src={'/avatarH.png'}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-xl font-medium text-gray-900">{customer.username || `${customer.lastName} ${customer.firstName}`}</p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                </div>
            </div>

            {/* Details */}
            <div className="text-gray-600 space-y-4">
                <div className="flex justify-between">
                    <span className="font-medium">Tên đăng nhập:</span>
                    <span>{customer.username}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>{customer.email}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Trạng thái tài khoản:</span>
                    <span className={`font-semibold ${customer.isActive ? 'text-green-500' : 'text-red-500'}`}>
                        {customer.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Xác thực tài khoản:</span>
                    <span className={`font-semibold ${customer.isVerified ? 'text-green-500' : 'text-orange-500'}`}>
                        {customer.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="font-medium">Vai trò:</span>
                    <span className={`font-semibold ${customer.role ? 'text-green-500' : 'text-orange-500'}`}>
                        {customer.role ? customer.role.name : 'Chưa phân quyền'}
                    </span>
                </div>

                {/* Show "Cấp quyền" button only if the role is "user" */}
                {customer.role && customer.role.id === "3" && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleGrantRole}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Cấp quyền
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerInfo;