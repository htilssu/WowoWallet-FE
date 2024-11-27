import { useQuery } from "@tanstack/react-query";
import { wGet } from "../../../../util/request.util.js";

// Hàm để lấy danh sách người dùng Admin
const fetchAdminUsers = async () => {
    try {
        const response = await wGet('/api/roles/admin');
        console.log('Admin Response:', response);
        if (!response || response.length === 0) {
            throw new Error('No Admin users found or empty response.');
        }
        return response;
    } catch (error) {
        console.error("Error in fetchAdminUsers:", error.message);
        throw new Error(`Error fetching Admin users: ${error.message || 'Unknown Error'}`);
    }
};

// Hàm để lấy danh sách người dùng Manager
const fetchManagerUsers = async () => {
    try {
        const response = await wGet('/api/roles/manager');
        console.log('Manager Response:', response);
        if (!response || response.length === 0) {
            throw new Error('No Manager users found or empty response.');
        }
        return response;
    } catch (error) {
        console.error("Error in fetchManagerUsers:", error.message);
        throw new Error(`Error fetching Manager users: ${error.message || 'Unknown Error'}`);
    }
};

const RoleLayout = () => {
    const { data: adminUsers, isLoading: loadingAdmin, isError: errorAdmin } = useQuery({
        queryKey: ['adminUsers'],
        queryFn: fetchAdminUsers,
        cacheTime: 5 * 60 * 1000,
        staleTime: 60 * 1000,
    });

    const { data: managerUsers, isLoading: loadingManager, isError: errorManager } = useQuery({
        queryKey: ['managerUsers'],
        queryFn: fetchManagerUsers,
        cacheTime: 5 * 60 * 1000,
        staleTime: 60 * 1000,
    });

    if (loadingAdmin || loadingManager) {
        return <div className="flex items-center justify-center h-screen text-xl text-green-600">Loading...</div>;
    }

    if (errorAdmin || errorManager) {
        console.error(errorAdmin || errorManager);
        return (
            <div className="flex items-center justify-center h-screen text-xl text-red-500">
                Không thể tải danh sách. Vui lòng thử lại sau.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-green-100 to-teal-200 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Danh sách người dùng Admin */}
                <h1 className="text-4xl text-center font-extrabold text-green-800 mb-12">Danh Sách Quản Lý</h1>
                <h5 className="text-xl font-bold ml-4 text-black mb-2">Admin</h5>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {adminUsers.length === 0 ? (
                        <p className="text-center text-gray-700 py-6">Không có người dùng Admin nào.</p>
                    ) : (
                        <div className="overflow-x-auto px-4 py-6">
                            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
                                <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                                <tr>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Username</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Email</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Role</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Verify</th>
                                </tr>
                                </thead>
                                <tbody>
                                {adminUsers.map((adminUser) => (
                                    <tr key={adminUser.id}
                                        className="hover:bg-green-50 transition duration-300 ease-in-out">
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{adminUser.username}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{adminUser.email}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{adminUser.role?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{adminUser.isVerified ? 'Verified' : 'Not Verified'}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Danh sách người dùng Manager */}
                <h5 className="text-xl font-bold ml-4 text-black mb-2 mt-12">Manager</h5>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {managerUsers.length === 0 ? (
                        <p className="text-center text-gray-700 py-6">Không có người dùng Manager nào.</p>
                    ) : (
                        <div className="overflow-x-auto px-4 py-6">
                            <table className="table-auto w-full border-collapse border border-gray-300 rounded-lg">
                                <thead className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                                <tr>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Username</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Email</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Role</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Verify</th>
                                    <th className="border border-gray-300 px-6 py-3 text-left text-lg">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {managerUsers.map((managerUser) => (
                                    <tr key={managerUser.id}
                                        className="hover:bg-blue-50 transition duration-300 ease-in-out">
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{managerUser.username}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{managerUser.email}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{managerUser.role?.name || "N/A"}</td>
                                        <td className="border border-gray-300 px-6 py-4 text-gray-700">{managerUser.isVerified ? 'Verified' : 'Not Verified'}</td>
                                        <td className="border border-gray-300 px-6 py-4">
                                            <button
                                                className="bg-green-500 text-white px-2 py-1 rounded"
                                                onClick={() => handleEditRole(managerUser)}
                                            >
                                                Edit Role
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Hàm để xử lý chỉnh sửa vai trò
const handleEditRole = (user) => {
    // Logic để thay đổi vai trò của người dùng
    console.log('Edit role for:', user);
    alert(`Chỉnh sửa vai trò cho: ${user.username}`);
};

export default RoleLayout;