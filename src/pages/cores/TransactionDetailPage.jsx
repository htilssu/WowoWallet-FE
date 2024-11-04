import {useNavigate, useParams} from 'react-router-dom';
import {wGet} from '../../util/request.util.js';
import {useQuery} from '@tanstack/react-query';
import {Card, Skeleton, Avatar, Button, Tooltip} from '@mantine/core';
import {IoIosCheckmarkCircle} from 'react-icons/io';
import {statusStrings, transactionStatusColor} from '../../util/status.util.js';
import {MdArrowOutward} from 'react-icons/md';

const TransactionDetailPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const {isLoading, data: transaction} = useQuery({
    queryKey: ['transaction', id],
    queryFn: () => wGet(`/v1/transaction/${id}`),
    staleTime: 5 * 60 * 1000,
  });

  return (
      <Card className="max-w-2xl mx-auto bg-white shadow-lg p-6 my-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {isLoading ? (
                <Skeleton height={20} width={20}/>
            ) : (
                 // {transactionIcon[transaction.variant]}
                 <div></div>
             )}
            <h2 className="text-xl font-semibold">
              {isLoading ? <Skeleton width="120px"/> : 'Chi tiết giao dịch'}
            </h2>
          </div>
          <span className={`flex items-center ${transactionStatusColor[transaction?.status]}`}>
          <IoIosCheckmarkCircle/>
            {isLoading ? <Skeleton width="80px"/> : statusStrings[transaction.status]}
        </span>
        </div>

        {/* Transaction ID */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Mã giao dịch</p>
          <p className="font-medium">
            {isLoading ? <Skeleton width="100%" height="20px"/> : transaction.id}
          </p>
        </div>

        {/* Amount */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">Số tiền</p>
          <p className="text-2xl font-bold text-green-600">
            {isLoading ? <Skeleton width="150px" height="32px"/> : `${transaction.amount.toLocaleString('vi-VN')} VND`}
          </p>
        </div>

        {/* Transfer Details */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              {/*<p className="text-sm text-gray-500">Người nhận</p>*/}
              <div className="flex items-center space-x-2 mt-1">
                {isLoading ? (
                    <Skeleton circle width="32px" height="32px"/>
                ) : (
                     <Avatar
                         src={transaction.receiver.avatar}
                         alt={transaction.receiver.fullName}
                         name={transaction.receiver.fullName}
                         className="w-12 h-12 rounded-full"
                     />
                 )}
                <div>
                  <p className="font-medium">
                    {isLoading ? <Skeleton width="80px"/> : transaction.receiver.fullName}
                  </p>
                  {transaction?.receiver.email && (
                      <p className="text-sm text-gray-500">
                        {isLoading ? <Skeleton width="120px"/> : transaction.receiver.email}
                      </p>
                  )}
                </div>
              </div>
            </div>
            <MdArrowOutward/>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Nội dung chuyển khoản</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="100%" height="20px"/> : transaction.message || 'Không có nội dung'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Thời gian giao dịch</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="150px"/> : new Date(transaction.created).toLocaleString('vi-VN')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Loại giao dịch</p>
            <p className="font-medium">
              {isLoading ? <Skeleton width="150px"/> : transaction.variant === 'WALLET'
                                                       ? 'Chuyển đến ví cá nhân'
                                                       : 'Chuyển đến quỹ nhóm'}
            </p>
          </div>
        </div>
        <div className={'flex justify-end items-center'}>
          <Tooltip label={"Tính năng đang phát triển"}>
            <Button variant={'outline'} color={'orange'} disabled>Khiếu nại</Button>
          </Tooltip>
        </div>
      </Card>
  );
};

export default TransactionDetailPage;