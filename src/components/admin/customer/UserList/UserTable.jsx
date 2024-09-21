import { MdAccountCircle } from "react-icons/md";
import { FiInbox } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useRef, useState } from "react";
import { Button } from "@mantine/core";

const UserTable = ({ users }) => {
    const [showMenu, setShowMenu] = useState(null);
    const menuRef = useRef(null);

    // Đóng menu khi nhấn ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMenuClick = (userId) => {
        setShowMenu(showMenu === userId ? null : userId);
    };

    const handleDelete = (userId) => {
        // Logic to delete user
        console.log(`Delete user with id: ${userId}`);
        setShowMenu(null);
    };

    const handleEdit = (userId) => {
        // Logic to edit user
        console.log(`Edit user with id: ${userId}`);
        setShowMenu(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
                <thead>
                <tr>
                    <th className="py-2 border-b">#</th>
                    <th className="py-2 border-b">Name</th>
                    <th className="py-2 border-b">Id</th>
                    <th className="py-2 border-b">Email</th>
                    <th className="py-2 border-b">Tags</th>
                    <th className="py-2 border-b">Transaction</th>
                    <th className="py-2 border-b">Action</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">{index + 1}</td>
                        <td className="border px-4 py-2">
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div
                                        className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
                                        {user.initials}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-lg font-medium">{user.name}</div>
                                    <div className="text-sm text-green-500">{user.role}</div>
                                </div>
                            </div>
                        </td>
                        <td className="border px-4 py-2">{user.id}</td>
                        <td className="border px-4 py-2">{user.email}</td>
                        <td className="border px-4 py-2">
                            {user.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                                >
                                        {tag}
                                    </span>
                            ))}
                        </td>
                        <td className="border px-4 py-2">{user.list}</td>
                        <td className="border px-4 py-2">
                            <div className="relative" ref={menuRef}>
                                <div className="flex space-x-2">
                                    <MdAccountCircle className="text-xl text-green-500 cursor-pointer"/>
                                    <FiInbox className="text-xl text-black cursor-pointer"/>
                                    <CiMenuKebab
                                        className="text-xl cursor-pointer"
                                        onClick={() => handleMenuClick(user.id)}
                                    />
                                </div>
                                {showMenu === user.id && (
                                    <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10">
                                        <div className="p-2 space-y-2">
                                            <Button onClick={() => handleEdit(user.id)}
                                                    className="w-full bg-green-500 hover:bg-green-600 text-white">
                                                Sửa
                                            </Button>
                                            <Button onClick={() => handleDelete(user.id)}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white">
                                                Xóa
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;