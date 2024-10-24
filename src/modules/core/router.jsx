import {createBrowserRouter} from 'react-router-dom';
import {lazy} from 'react';
import {PageNotFound} from './system-component/PageNotFound.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import {MainLayout} from './layouts/MainLayout.jsx';
import AuthorizedView from './system-component/AuthorizedView.jsx';
import {callBackUrl} from '../../pages/CallBackHandler.jsx';

// Lazy loading components

const TopUp = lazy(() => import('../../components/topup/TopUp.jsx'));
const MyWallet = lazy(() => import('../../components/account/WalletSection.jsx'));
const ServicePayment = lazy(() => import('../../components/payment/ServicePayment.jsx'));
const AnalysisPage = lazy(() => import('../../components/bdsd/bdsd.jsx'));
const QRPayment = lazy(() => import('../../components/payment/QRPayment.jsx'));
const AdminDashboard = lazy(() => import('../../pages/admin/AdminDashboard.jsx'));
const ResetPasswordPage = lazy(() => import('../../pages/ResetPasswordPage.jsx'));
const CallBackHandler = lazy(() => import('../../pages/CallBackHandler.jsx'));
const TransactionHistoryPage = lazy(() => import('../../pages/cores/TransactionHistoryPage.jsx'));
const AtmPage = lazy(() => import('../../pages/cores/AtmPage.jsx'));
const IntroPage = lazy(() => import('../../pages/cores/IntroPage.jsx'));
const SignInPage = lazy(() => import('../../pages/cores/SignInPage.jsx'));
const SignUpPage = lazy(() => import('../../pages/cores/SignUpPage.jsx'));
const HomePage = lazy(() => import('../../pages/cores/HomePage.jsx'));
const GroupFundPage = lazy(() => import('../../pages/GroupFundPage.jsx'));
const NewFund = lazy(() => import('../../components/GroupFund/NewFund.jsx'));
const FundDetailPage = lazy(() => import('../../components/GroupFund/FundDetailPage.jsx'));
const Dashboard = lazy(() => import('../../components/admin/dashboard/Dashboard.jsx'));
const CustomerManage = lazy(() => import('../../pages/admin/layout-admin/customer-manage/CustomerLayout.jsx'));
const PartnerLayout = lazy(() => import('../../pages/admin/layout-admin/partner-manage/PartnerLayout.jsx'));
const StatisticalLayout = lazy(() => import('../../pages/admin/layout-admin/statistics-manage/StatisticalLayout.jsx'));
const EmployeeLayout = lazy(() => import('../../pages/admin/layout-admin/employee-manage/EmployeeLayout.jsx'));
const WithdrawPage = lazy(() => import('../../pages/cores/WithdrawPage.jsx'));
const TransferMoney = lazy(() => import('../../components/payment/TransferMoney.jsx'));
const AddInfoAtm = lazy(() => import('../../components/atm/AddInfoAtm.jsx'));

export const router = createBrowserRouter([
  {
    path: 'admin1',
    element: <AdminDashboard/>,
    children: [
      {
        index: true,
        element: <Dashboard/>,
      }, {
        path: 'customer-manage',
        element: <CustomerManage/>,
      }, {
        path: 'partner-manage',
        element: <PartnerLayout/>,
      }, {
        path: 'statistic-manage',
        element: <StatisticalLayout/>,
      }, {
        path: 'employee-manage',
        element: <EmployeeLayout/>,
      },
    ],
  }, {
    path: 'admin',
    element: <AuthorizedView ROLE={'ADMIN'}/>,
    children: [],
  }, {
    path: '/',
    element: <ProtectedLayout/>,
    children: [
      {
        element: <MainLayout/>,
        children: [
          {
            index: true,
            element: <IntroPage/>,
          }, {
            path: 'home',
            element: <HomePage/>,
          }, {
            path: 'top-up',
            element: <TopUp/>,
          }, {
            path: 'withdraw',
            element: <WithdrawPage/>,
          }, {
            path: 'transfer',
            element: <TransferMoney/>,
          }, {
            path: 'me',
            element: <MyWallet/>,
          }, {
            path: 'order/:id?',
            element: <ServicePayment/>,
          }, {
            path: 'history',
            element: <TransactionHistoryPage/>,
          }, {
            path: 'bank',
            element: <AtmPage/>,
          }, {
            path: 'bank/add',
            element: <AddInfoAtm/>,
          }, {
            path: 'analysis',
            element: <AnalysisPage/>,
          }, {
            path: 'qr-payment',
            element: <QRPayment/>,
          }, {
            path: 'group-fund',
            element: <GroupFundPage/>,
          }, {
            path: 'group-fund/new-group',
            element: <NewFund/>,
          }, {
            path: 'fund/:id?',
            element: <FundDetailPage/>,
          },
        ],
      },
    ],
    errorElement: <PageNotFound/>,
  }, {
    children: [
      {
        path: '/sign-in',
        element: <SignInPage/>,
      }, {
        path: '/sign-up',
        element: <SignUpPage/>,
      }, {
        path: 'password',
        children: [
          {
            path: 'reset',
            element: <ResetPasswordPage/>,
          }, {
            path: 'change',
            element: <ResetPasswordPage/>,
          },
        ],
      }, {
        path: callBackUrl,
        element: <CallBackHandler/>,
      },
    ],
  },
]);