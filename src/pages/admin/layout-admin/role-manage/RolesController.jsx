import { useEffect, useState } from 'react';

const RolesController = () => {
    const [admins, setAdmins] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAdmins, setFilteredAdmins] = useState([]);
    const [editingAdmin, setEditingAdmin] = useState(null); 
    const [newRole, setNewRole] = useState(''); 
    const [adminToDelete, setAdminToDelete] = useState(null); 

    useEffect(() => {
        const fetchAdmins = async () => {
            const data = [
                { id: 1, name: 'Nguyễn Văn A', email: 'admin1@example.com', role: 'super_admin' },
                { id: 2, name: 'Trần Thị B', email: 'admin2@example.com', role: 'admin' },
                { id: 3, name: 'Lê Văn C', email: 'admin3@example.com', role: 'admin' },
                { id: 4, name: 'Phạm Thị D', email: 'admin4@example.com', role: 'super_admin' },
            ];
            setAdmins(data);
            setFilteredAdmins(data); 
        };
        fetchAdmins();
    }, []);

    useEffect(() => {
        const filtered = admins.filter((admin) =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAdmins(filtered);
    }, [searchTerm, admins]);

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setNewRole(admin.role); 
    };

    const handleSave = () => {
        setAdmins((prevAdmins) =>
            prevAdmins.map((admin) =>
                admin.id === editingAdmin.id ? { ...admin, role: newRole } : admin
            )
        );
        setEditingAdmin(null);
    };

    const handleDelete = () => {
        if (adminToDelete) {
            setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== adminToDelete.id));
            setAdminToDelete(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Danh sách Admin</h1>

            <input
                type="text"
                placeholder="Tìm kiếm Admin theo tên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 mb-6 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />

            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Tên</th>
                        <th className="py-3 px-6 text-left">Email</th>
                        <th className="py-3 px-6 text-left">Quyền</th>
                        <th className="py-3 px-6 text-left">Hành động</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filteredAdmins.length > 0 ? (
                        filteredAdmins.map((admin) => (
                            <tr key={admin.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{admin.id}</td>
                                <td className="py-3 px-6 text-left">{admin.name}</td>
                                <td className="py-3 px-6 text-left">{admin.email}</td>
                                <td className="py-3 px-6 text-left">{admin.role}</td>
                                <td className="py-3 px-6">
                                    <button
                                        className="bg-blue-500 text-white py-1 px-3 rounded-lg mr-2 hover:bg-blue-600"
                                        onClick={() => handleEdit(admin)}
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                                        onClick={() => setAdminToDelete(admin)} 
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                                Không tìm thấy Admin nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {editingAdmin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Chỉnh sửa quyền Admin</h2>

                        <div className="mb-4">
                            <label htmlFor="adminName" className="block text-gray-700">Tên</label>
                            <input
                                type="text"
                                id="adminName"
                                value={editingAdmin.name}
                                readOnly
                                className="w-full p-2 border rounded-lg bg-gray-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="adminEmail" className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                id="adminEmail" 
                                value={editingAdmin.email}
                                readOnly
                                className="w-full p-2 border rounded-lg bg-gray-100"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="adminRole" className="block text-gray-700">Quyền</label>
                            <select
                                id="adminRole" 
                                value={newRole}
                                onChange={(e) => setNewRole(e.target.value)}
                                className="w-full p-2 border rounded-lg"
                            >
                                <option value="admin">Admin</option>
                                <option value="super_admin">Super Admin</option>
                                <option value="ke_toan">Kế Toán</option>
                                <option value="nhan_vien">Nhân Viên</option>
                            </select>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                                onClick={() => setEditingAdmin(null)}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                onClick={handleSave}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {adminToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Xác nhận xóa</h2>
                        <p>Bạn có chắc chắn muốn xóa Admin <strong>{adminToDelete.name}</strong> không?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2"
                                onClick={() => setAdminToDelete(null)} 
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                                onClick={handleDelete} 
                            >
                                Xóa
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RolesController;
