import { useState } from "react";
import PartnerList from "./components/PartnerList.jsx";
import PartnerDetails from "./components/PartnerDetail.jsx";
import TransactionList from "./components/TransactionList.jsx";
import ServiceManagement from "./components/ServiceManagement.jsx";

function PartnerLayout() {
    const [selectedPartner, setSelectedPartner] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-bold text-center text-primaryColor mb-8">
                Quản Lý Đối Tác
            </h1>

            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <PartnerList setSelectedPartner={setSelectedPartner} />
                </div>
                <div className="col-span-2">
                    {selectedPartner ? (
                        <>
                            <PartnerDetails partner={selectedPartner} />
                            <TransactionList partner={selectedPartner} />
                            <ServiceManagement partner={selectedPartner} />
                        </>
                    ) : (
                        <p className="text-center text-lg text-gray-600">
                            Chọn đối tác để xem chi tiết.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PartnerLayout;