import AppInfo from "./components/AppInfo.jsx";
import BasicStats from "./components/BasicStats.jsx";
import WalletList from "./components/WalletList.jsx";
import WalletDetails from "./components/WalletDetails.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../modules/core/system-component/Footer.jsx";
import { FaSignOutAlt } from "react-icons/fa"; // Import icon cho nút đăng xuất

const PartnerDashboard = () => {
    const [selectedWallet, setSelectedWallet] = useState(null);

    return (
        <div>
            <div className="p-4 bg-gradient-to-br from-blue-100 to-gray-100 min-h-screen">
                {/* Header */}
                <header className="flex items-center justify-between bg-white shadow-lg rounded-lg p-8 mb-6">
                    <div className="flex items-center gap-4">
                        <img src={"/logoTCB.png"} alt="Logo" className="w-32 h-auto"/>
                        <h1 className="text-3xl font-bold text-gray-800">Quản Lý Ví Của Ứng Dụng</h1>
                    </div>
                    <Link to={"/sign-in"}>
                        <button
                            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                            <FaSignOutAlt className="mr-2"/>
                            Đăng xuất
                        </button>
                    </Link>
                </header>

                {/* App Info */}
                <AppInfo/>

                {/* Main stats */}
                <div className="">
                    <BasicStats/>
                    {/* Có thể thêm các widget khác nếu cần */}
                </div>

                {/* Wallets Section */}
                <section className="bg-white shadow-md rounded-lg p-6">
                    {!selectedWallet ? (
                        <WalletList onSelectWallet={setSelectedWallet}/>
                    ) : (
                        <WalletDetails wallet={selectedWallet} onBack={() => setSelectedWallet(null)}/>
                    )}
                </section>

            </div>
            {/* Footer */}
            <footer className="text-center text-gray-500 mt-12">
                <Footer/>
            </footer>
        </div>
    );
};

export default PartnerDashboard;