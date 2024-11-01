import 'react-toastify/dist/ReactToastify.css';
import {ScrollRestoration, useNavigate, useParams} from 'react-router-dom';
import {wGet} from '../../util/request.util.js';
import {useEffect, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {formatCurrency} from '../../util/currency.util.js';
import MyWallet from '../account/WalletSection.jsx';
import {useQuery} from '@tanstack/react-query';

const ServicePayment = () => {
  //lấy thông tin thanh toán
  const navigate = useNavigate();
  const {id} = useParams();

  const {data: order} = useQuery({
    queryKey: ['order', id],
    queryFn: () => wGet(`/v1/orders/${id}`),
  });

  return (
      <div className={'flex justify-around w-full px-10 py-5'}>
        <div className={'w-full'}>
          <MyWallet/>
        </div>
        <div className="flex justify-center w-full items-start min-h-screen bg-gray-100">
          <div className="bg-white p-4 pb-12 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              Chi Tiết Thanh Toán
            </h2>
            <form onSubmit={() => {
            }} className="space-y-5">
              <div>
                <label className="block text-gray-800 font-medium">
                  Mã Hóa Đơn
                </label>
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                  {order?.id}
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Tên dịch vụ
                </label>
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                  {order?.serviceName}
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Số Tiền Thanh Toán
                </label>
                <div
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50 text-green-500">
                  {formatCurrency(order?.money)}
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Mã Khuyến Mãi
                </label>
                <div className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                  {order?.voucherId}
                </div>
              </div>
              <div>
                <label className="block text-gray-800 font-medium">
                  Giá Khuyến Mãi
                </label>
                <div
                    className="text-red-500 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-gray-50">
                  {order?.voucherDiscount} VND
                </div>
              </div>
              <div
                  className={'flex flex-grow items-center gap-4 justify-between'}
              >
                <label className="text-gray-800 font-semibold text-lg">
                  Tổng Số Tiền:
                </label>
                <div className="font-semibold text-lg text-green-600">
                  {formatCurrency(order?.money)}
                </div>
              </div>
              <div>
                <button
                    className="w-full p-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 text-lg font-semibold"

                >
                  {'Xác Nhận Thanh Toán'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <ToastContainer stacked/>
        <ScrollRestoration/>
      </div>
  );
};

export default ServicePayment;
