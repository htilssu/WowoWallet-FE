import { useState, useEffect } from 'react';
import UserTable from "./UserTable.jsx";
import {Button} from "@mantine/core";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Gọi API để lấy danh sách người dùng (dưới đây là dữ liệu mẫu)
        setUsers([
            {
                id: '22dh1111',
                name: 'Colin Melton',
                role: 'Backend Developer',
                email: 'colin@skote.com',
                tags: ['Php', 'Java', '1 more'],
                transactions: 136,
                initials: 'CM',
            },
            {
                id: '22dh1113',
                name: 'John Santiago',
                role: 'Full Stack Developer',
                email: 'john@skote.com',
                tags: ['Ruby', 'Php'],
                transactions: 125,
                initials: 'JS',
            },
            {
                id: '22dh1114',
                name: 'Shirley Smith',
                role: 'UI/UX Designer',
                email: 'shirley@skote.com',
                tags: ['Photoshop', 'Illustrator'],
                transactions: 136,
                initials: 'SS',
            },
            {
                id: '22dh1115',
                name: 'Minnie Walter',
                role: 'Frontend Developer',
                email: 'minnie@skote.com',
                tags: ['Html', 'Css', '1 more'],
                transactions: 145,
                initials: 'MW',
            },
        ]);
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={""}>
            <div className="px-6 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className={"flex justify-between"}>
                        <h2 className="text-2xl font-semibold mb-4">Users List</h2>
                        <div>
                            <Button>+ Add User</Button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border border-gray-300 rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <UserTable users={filteredUsers}/>
                </div>
            </div>
        </div>
    );
};

export default UserList;