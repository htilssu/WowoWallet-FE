
import UserListComponent from "./UserList/UserListComponent.jsx";

const CutomerManage = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div>
                    <UserListComponent/>
                </div>
            </div>
        </div>
    );
};

export default CutomerManage;