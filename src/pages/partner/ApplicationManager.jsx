import React, {useState} from 'react';
import numeral from 'numeral';
import {Button, TextInput} from '@mantine/core';
import {wGet, wPost} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {useNavigate} from 'react-router-dom';
import {revalidateCache} from '../../modules/cache.js';

function fetchApplications() {
  return wGet('/v1/user/application');
}

const ApplicationManager = () => {
  const navigate = useNavigate();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newApplication, setNewApplication] = useState('');
  const {data: applications, isLoading, error} = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplications,
    staleTime: 5 * 60 * 1000,
  });
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  const cancelForm = () => {
    setIsFormVisible(false);
  };

  // Format date function
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) return <div>Loading...</div>;

  function handleCreateApplication() {
    wPost("v1/application", {
      name: newApplication,
    }).then(() => {
        revalidateCache('applications').then();
    });
  }

  return (
      <div className="flex">
        <div className="sidebar w-64 bg-gray-800 min-h-screen p-5">
          <h2 className="text-xl font-bold text-white">Sidebar</h2>
          {/* Add sidebar content here */}
        </div>
        <div className="main-content flex-grow p-6 bg-gray-100">
          <div className="header flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Ứng dụng</h1>
            <button
                onClick={toggleForm}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Tạo ứng dụng mới
            </button>
          </div>
          <div className={`transition-all duration-300 overflow-hidden ${isFormVisible ? 'h-28' : 'h-0'}`}>
            <TextInput
                value={newApplication}
                onChange={(event) => setNewApplication(event.target.value)}
                size="md"
                placeholder="Tên ứng dụng"
                className="w-full mt-2 rounded-lg"
            />
            <div className={'flex items-center mt-2 justify-start gap-2'}>
              <Button
                  onClick={cancelForm}
                  className="bg-red-500 hover:bg-red-600 text-white transition duration-200"
              >
                Hủy
              </Button>
              <Button onClick={handleCreateApplication}>
                Tạo
              </Button>
            </div>
          </div>

          {/* Applications List */}
          <div className="mt-6">
            <div className="bg-white rounded-lg shadow-md">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created
                      At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                      <tr onClick={() => {
                        //navigate to application detail page
                        navigate(`/application/${app.id}`);
                      }} key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {numeral(app.balance).format('0.0a').toUpperCase()}
                        </td>
                      </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ApplicationManager;