import {FaAppStore, FaRegClock, FaRegCopy, FaUsers} from 'react-icons/fa';
import {useQuery} from '@tanstack/react-query';
import {wGet} from '../../../util/request.util.js';
import {IoIosEye, IoIosEyeOff} from 'react-icons/io';
import {useState} from 'react';
import {CopyButton} from '@mantine/core';

const AppInfo = ({id}) => {
  // Trạng thái hiển thị API Key
  const [isApiKeyVisible, setIsApiKeyVisible] = useState(false);

  // Fetch dữ liệu từ API nếu có ID
  const {data, isLoading, isError} = useQuery({
    queryKey: ['applicationInfo', id],
    queryFn: () => wGet(`/v1/application/${id}`),
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
    enabled: !!id, // Chỉ gọi API khi có ID
  });

  // Xử lý khi tải dữ liệu
  if (isLoading) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaAppStore className="text-blue-600 mr-2" size={28}/>
            Thông Tin Ứng Dụng
          </h2>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
        </div>
    );
  }

  // Xử lý khi gặp lỗi
  if (isError) {
    return (
        <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <FaAppStore className="text-blue-600 mr-2" size={28}/>
            Thông Tin Ứng Dụng
          </h2>
          <p className="text-red-600">Đã xảy ra lỗi khi tải dữ liệu.</p>
        </div>
    );
  }

  // Hàm hiển thị/ẩn API Key
  const toggleApiKeyVisibility = () => {
    setIsApiKeyVisible((prev) => !prev);
  };

  return (
      <div className="bg-gradient-to-r from-blue-50 to-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaAppStore className="text-blue-600 mr-2" size={28}/>
          Thông Tin Ứng Dụng
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              className="flex items-center p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-lg hover:shadow-xl transition duration-300">
            <FaUsers className="text-blue-500 mr-3" size={28}/>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Số người dùng</h3>
              <p className="text-2xl font-bold text-gray-900">10,000</p>
            </div>
          </div>
          <div
              className="flex items-center p-4 bg-white rounded-lg border-l-4 border-orange-500 shadow-lg hover:shadow-xl transition duration-300">
            <FaRegClock className="text-orange-500 mr-3" size={28}/>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Thời gian hoạt động</h3>
              <p className="text-2xl font-bold text-gray-900">2 năm</p>
            </div>
          </div>
          <div
              className="flex items-center p-4 bg-white rounded-lg border-l-4 border-purple-500 shadow-lg hover:shadow-xl transition duration-300">
            <FaUsers className="text-purple-500 mr-3" size={28}/>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Đối tác</h3>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-gray-600"><strong>Tên ứng dụng:</strong> <span
              className="text-gray-800">{data.name}</span></p>
          <p className="text-gray-600"><strong>Ngày tạo:</strong> <span
              className="text-gray-800">{new Date(data.createdAt).toLocaleDateString()}</span></p>

          {/* API Key Section with Toggle Visibility and Copy Button */}
          <div className="flex items-center justify-between mt-4 bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-600">API Key:</p>
            <div className="flex items-center space-x-4">
              <CopyButton
                  value={data.secret}>
                {({copied, copy}) => (
                    copied ? '' : (<FaRegCopy onClick={copy}/>)
                )}
              </CopyButton>
              <p className="text-sm text-gray-700">
                {isApiKeyVisible ? data.secret : '*************************'}
              </p>
              <button
                  onClick={toggleApiKeyVisibility}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={isApiKeyVisible ? 'Hide API Key' : 'Show API Key'}
              >
                {isApiKeyVisible ? <IoIosEyeOff className="h-5 w-5"/> : <IoIosEye className="h-5 w-5"/>}
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AppInfo;