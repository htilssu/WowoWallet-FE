import { useState } from "react";
import { FaRegCheckCircle, FaRegClock, FaRegTimesCircle } from "react-icons/fa";

// Dữ liệu giả lập về các yêu cầu hỗ trợ
const mockRequests = [
  { id: "user1", title: "Đăng nhập lỗi", description: "Không thể đăng nhập", status: "Chưa xử lý" },
  { id: "user2", title: "Giao dịch lỗi", description: "Lỗi giao dịch", status: "Đang xử lý" },
  { id: "user3", title: "Thay đổi mật khẩu", description: "Cần thay đổi mật khẩu", status: "Đã xử lý" },
];

const RequestCustomer = () => {
  const [requests, setRequests] = useState(mockRequests);

  // Hàm thay đổi trạng thái yêu cầu
  const handleChangeStatus = (id, newStatus) => {
    setRequests(requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    ));
  };

  // Hàm lấy biểu tượng dựa trên trạng thái
  const getStatusIcon = (status) => {
    if (status === "Chưa xử lý") return <FaRegTimesCircle className="inline mr-2 text-red-500" />;
    if (status === "Đang xử lý") return <FaRegClock className="inline mr-2 text-yellow-500" />;
    if (status === "Đã xử lý") return <FaRegCheckCircle className="inline mr-2 text-green-500" />;
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Danh sách yêu cầu hỗ trợ</h1>

      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-gray-700">ID</th>
            <th className="border px-4 py-2 text-gray-700">Tiêu đề</th>
            <th className="border px-4 py-2 text-gray-700">Lý do</th>
            <th className="border px-4 py-2 text-gray-700">Trạng thái</th>
            <th className="border px-4 py-2 text-gray-700">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-50 transition duration-200">
              <td className="border px-4 py-2 text-gray-600">{request.id}</td>
              <td className="border px-4 py-2 text-gray-600">{request.title}</td>
              <td className="border px-4 py-2 text-gray-600">{request.description}</td>
              <td className="border px-4 py-2">
                <span className="font-semibold">
                  {getStatusIcon(request.status)}
                  {request.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <div className="relative">
                  <select
                    onChange={(e) => handleChangeStatus(request.id, e.target.value)}
                    value={request.status}
                    className="block appearance-none w-full bg-gray-100 text-gray-800 border border-gray-300 rounded p-2 hover:bg-gray-200 focus:outline-none"
                  >
                    <option value="Chưa xử lý">🔴 Chưa xử lý</option>
                    <option value="Đang xử lý">🟡 Đang xử lý</option>
                    <option value="Đã xử lý">🟢 Đã xử lý</option>
                  </select>
                  <div className="absolute right-2 top-2 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestCustomer;
