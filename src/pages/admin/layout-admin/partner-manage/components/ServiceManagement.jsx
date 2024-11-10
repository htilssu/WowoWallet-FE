import { useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";

const services = [
    { id: 1, name: "Payment Gateway", enabled: true },
    { id: 2, name: "Bill Payment", enabled: false },
    { id: 3, name: "Top-Up Service", enabled: true },
];

const ServiceManagement = ({ partner }) => {
    const [serviceList, setServiceList] = useState(services);

    const toggleService = (id) => {
        setServiceList((prev) =>
            prev.map((service) =>
                service.id === id ? { ...service, enabled: !service.enabled } : service
            )
        );
    };

    return (
        <div className="bg-white text-gray-800 border rounded-lg px-8 py-4 shadow-sm mb-2">
            <header className="text-center mb-2">
                <h2 className="text-2xl font-bold text-gray-900">Service Management</h2>
            </header>
            <ul className="space-y-3 mb-2">
                {serviceList.map((service) => (
                    <li
                        key={service.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                    >
                        <span className="text-md font-medium">{service.name}</span>

                        <button
                            className={`flex items-center px-3 py-1 rounded-md transition-colors duration-200 ${
                                service.enabled ? "bg-green-500" : "bg-gray-300"
                            }`}
                            onClick={() => toggleService(service.id)}
                        >
                            {service.enabled ? (
                                <FaToggleOn className="text-white h-5 w-5 mr-1"/>
                            ) : (
                                <FaToggleOff className="text-gray-500 h-5 w-5 mr-1"/>
                            )}
                            <span className={`text-sm ${service.enabled ? "text-white" : "text-gray-600"}`}>
                                {service.enabled ? "Enabled" : "Disabled"}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceManagement;
