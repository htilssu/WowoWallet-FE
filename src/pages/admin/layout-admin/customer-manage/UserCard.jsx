
const UserCard = ({ user }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center">
                <div className="mr-4">
                    <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-lg font-semibold">
                        {user.initials}
                    </div>
                </div>
                <div>
                    <div className="text-lg font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.role}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                </div>
            </div>
            <div className="flex-1 px-4">
                {user.tags.map((tag, index) => (
                    <span
                        key={index}
                        className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2 mb-2"
                    >
            {tag}
          </span>
                ))}
            </div>
            <div className="w-24 text-right">{user.projects}</div>
        </div>
    );
};

export default UserCard;