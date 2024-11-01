import 'react-toastify/dist/ReactToastify.css';
import {ScrollRestoration, useParams} from 'react-router-dom';
import {wGet} from '../../util/request.util.js';
import {ToastContainer} from 'react-toastify';
import MyWallet from '../account/WalletSection.jsx';
import {useQuery} from '@tanstack/react-query';
import OrderDetails from '../OrderDetails.jsx';

const ServicePayment = () => {
  //lấy thông tin thanh toán
  const {id} = useParams();

  const {isLoading, data: order} = useQuery({
    queryKey: [`order-${id}`, id],
    queryFn: () => wGet(`/v1/orders/${id}`),
  });

  return (<div className={'flex justify-around w-full px-10 py-5'}>
    <div className={'w-full'}>
      <MyWallet/>
    </div>
    <div className="flex justify-center w-full items-start bg-gray-100">
      <OrderDetails order={order} isLoading={isLoading}/>

      <ToastContainer stacked/>
      <ScrollRestoration/>
    </div>
  </div>);
};

export default ServicePayment;
