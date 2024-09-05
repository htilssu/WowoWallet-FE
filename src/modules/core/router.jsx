import {createBrowserRouter} from 'react-router-dom';
import {PageNotFound} from './system-component/PageNotFound.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import SignInPage from '../../pages/SignInPage.jsx';
import SignUpPage from '../../pages/SignUpPage.jsx';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage.jsx';
import {MainLayout} from './layouts/MainLayout.jsx';
import Home from '../../pages/HomePage.jsx';
import IntroPage from '../../pages/IntroPage.jsx';
import TopUp from '../../components/topup/TopUp.jsx';
import PersonalInfoForm from '../../components/infoAccount/PersonalInfoForm.jsx';
import ServicePayment from '../../components/bank/paymentMethods/ServicePayment.jsx';
import TransactionHistoryPage from '../../pages/TransactionHistoryPage.jsx';
import AtmPage from '../../pages/AtmPage.jsx';
import AnalysisPage from '../../components/bdsd/bdsd.jsx';
import AuthorizedView from './system-component/AuthorizedView.jsx';

function AdminLayout() {
  return null;
}

export const router = createBrowserRouter([
  {
    path: '/', element: <ProtectedLayout/>, children: [
      {
        element: <MainLayout/>, children: [
          {
            path: 'home', element: <Home/>,
          },
          {
            path: 'top-up', element: <TopUp/>,
          },
          {
            path: 'profile', element: <PersonalInfoForm/>,
          },
          {
            path: 'invoice/:id?', element: <ServicePayment/>,
          },
          {
            path: 'history', element: <TransactionHistoryPage/>,
          },
          {
            path: 'bank', element: <AtmPage/>,
          },
          {
            path: 'analysis', element: <AnalysisPage/>,
          },
        ],
      },
    ], errorElement: <PageNotFound/>,
  },
  {
    path: '/',
    element: <MainLayout/>, children: [
      {
        index: true,
        element: <IntroPage/>,
      },
    ],
  },
  {
    path: '/',
    element: <AuthorizedView ROLE={'ADMIN'}/>,
    children:
        [
          {
            element: <AdminLayout/>
          }
        ],
  },
  {
    children: [
      {
        path: '/sign-in', element: <SignInPage/>,
      }, {
        path: '/sign-up', element: <SignUpPage/>,
      }, {
        path: '/reset-password', element: <ForgotPasswordPage/>,
      },
    ],
  },
]);