
const PartnerDetails = ({ partner }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h2 className="text-2xl font-semibold">Partner Details</h2>
            <p className="mt-2">
                <strong>Name:</strong> {partner.name}
            </p>
            <p className="mt-2">
                <strong>Status:</strong>{" "}
                <span
                    className={`${
                        partner.status === "Active"
                            ? "text-green-500"
                            : partner.status === "Inactive"
                                ? "text-red-500"
                                : "text-yellow-500"
                    }`}
                >
          {partner.status}
        </span>
            </p>
        </div>
    );
};

export default PartnerDetails;