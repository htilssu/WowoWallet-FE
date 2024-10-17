import {useState} from "react";

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
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-2xl font-semibold">Service Management</h2>
            <ul className="mt-4">
                {serviceList.map((service) => (
                    <li key={service.id} className="flex justify-between p-2 mb-2 bg-gray-50 rounded">
                        <span>{service.name}</span>
                        <button
                            className={`${
                                service.enabled ? "bg-green-500" : "bg-red-500"
                            } text-white px-4 py-1 rounded`}
                            onClick={() => toggleService(service.id)}
                        >
                            {service.enabled ? "Disable" : "Enable"}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceManagement;
