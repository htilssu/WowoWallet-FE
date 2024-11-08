import { useState } from "react";
import PartnerList from "./components/PartnerList.jsx";
import PartnerDetails from "./components/PartnerDetail.jsx";
import TransactionList from "./components/TransactionList.jsx";
import ServiceManagement from "./components/ServiceManagement.jsx";

function PartnerLayout() {
    const [selectedPartner, setSelectedPartner] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
            <div className="flex items-center justify-center mb-8">
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                    Quản Lý Đối Tác
                </h1>
            </div>

            <div className="w-full max-w-6xl grid grid-cols-12 gap-6">
                {/* Partner List Section */}
                <div className="col-span-12 md:col-span-4">
                    <PartnerList setSelectedPartner={setSelectedPartner}/>
                </div>

                {/* Details Section */}
                <div className="col-span-12 md:col-span-8 space-y-6">
                    {selectedPartner ? (
                        <>
                            {/* Partner Details */}
                            <div className="shadow-lg">
                                <PartnerDetails partner={selectedPartner}/>
                            </div>

                            {/* Transaction List */}
                            <div className="shadow-lg ">
                                <TransactionList partner={selectedPartner}/>
                            </div>
                            
                            {/* Service Management */}
                            <div className="shadow-lg">
                                <ServiceManagement partner={selectedPartner}/>
                            </div>

                        </>
                    ) : (
                        <div
                            className="col-span-12 bg-white shadow-lg rounded-lg p-5 flex justify-center items-center h-full">
                            <p className="text-gray-600 text-lg text-center">
                                Chọn đối tác để xem chi tiết.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PartnerLayout;