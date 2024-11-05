import { useState } from "react";
import { CheckCircleIcon, ClockIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { FaSearch } from "react-icons/fa";

const partners = [
    { id: 1, name: "Tuan Anh Shop", status: "Active" },
    { id: 2, name: "Viet A Bank", status: "Inactive" },
    { id: 3, name: "Food Speed T", status: "Pending" },
];

const statusIcons = {
    Active: <CheckCircleIcon className="h-5 w-5 text-green-500 inline" />,
    Inactive: <XCircleIcon className="h-5 w-5 text-red-500 inline" />,
    Pending: <ClockIcon className="h-5 w-5 text-yellow-500 inline" />,
};

const PartnerList = ({ setSelectedPartner }) => {
    const [searchTerm, setSearchTerm] = useState(""); // State for search term

    // Function to filter partners based on search term
    const filteredPartners = partners.filter((partner) =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Partners</h2>

            {/* Search Input */}
            <div className="mb-6 relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Search partners..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    value={searchTerm} // Bind search term to input
                    onChange={(e) => setSearchTerm(e.target.value)} // Update state when typing
                />
            </div>

            {/* Partners List */}
            <ul className="space-y-4">
                {filteredPartners.length > 0 ? (
                    filteredPartners.map((partner) => (
                        <li
                            key={partner.id}
                            className="flex items-center justify-between p-2 bg-gradient-to-r from-gray-200 to-gray-50 rounded-lg shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
                            onClick={() => setSelectedPartner(partner)}
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                                    <svg
                                        className="w-6 h-6 text-blue-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10 0C4.485 0 0 4.485 0 10s4.485 10 10 10 10-4.485 10-10S15.515 0 10 0zM5 10a5 5 0 0110 0 5 5 0 01-10 0z" />
                                    </svg>
                                </div>
                                <span className="text-xl font-medium text-gray-700">{partner.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="flex items-center">
                                    {statusIcons[partner.status]}
                                    <span
                                        className={`ml-1 font-semibold ${partner.status === "Active"
                                            ? "text-green-600"
                                            : partner.status === "Inactive"
                                                ? "text-red-600"
                                                : "text-yellow-600"
                                        }`}
                                    >
                                        {partner.status}
                                    </span>
                                </span>
                                <svg
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-center text-gray-500">No partners found</li> // Handle no results
                )}
            </ul>
        </div>
    );
};

export default PartnerList;
