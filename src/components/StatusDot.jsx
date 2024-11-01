const getStatusDotColor = (status) => {
  switch (status) {
    case 'SUCCESS':
      return 'bg-green-500';
    case 'PENDING':
      return 'bg-yellow-500';
    case 'CANCEL' | 'FAILED':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

function StatusDot({status}) {
  return (
      <div className="flex items-center justify-center gap-2">
      <span
          className={`inline-block w-2 h-2 rounded-full ${getStatusDotColor(
              status,
          )}`}
      ></span>
        <span className="font-semibold">{status}</span>
      </div>
  );
}

export default StatusDot;
