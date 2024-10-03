import {createBrowserRouter} from 'react-router-dom';
import {PageNotFound} from './system-component/PageNotFound.jsx';
import ProtectedLayout from './layouts/ProtectedLayout.jsx';
import {MainLayout} from './layouts/MainLayout.jsx';
import TopUp from '../../components/topup/TopUp.jsx';
import InformationCard from '../../components/account/InformationCard.jsx';
import ServicePayment from '../../components/payment/ServicePayment.jsx';
import AnalysisPage from '../../components/bdsd/bdsd.jsx';
import AuthorizedView from './system-component/AuthorizedView.jsx';
import QRPayment from '../../components/payment/QRPayment.jsx';
import AdminDashboard from '../../pages/admin/AdminDashboard.jsx';
import ResetPasswordPage from '../../pages/ResetPasswordPage.jsx';
import SignInFederation from '../federation/SignInFederation.jsx';
import TransactionHistoryPage from "../../pages/cores/TransactionHistoryPage.jsx";
import AtmPage from "../../pages/cores/AtmPage.jsx";
import IntroPage from "../../pages/cores/IntroPage.jsx";
import SignInPage from "../../pages/cores/SignInPage.jsx";
import SignUpPage from "../../pages/cores/SignUpPage.jsx";
import HomePage from "../../pages/cores/HomePage.jsx";
import GroupFundPage from "../../pages/GroupFundPage.jsx";
import NewFund from "../../components/GrounpFund/NewFund.jsx";
import FundDetailPage from "../../components/GrounpFund/FundDetailPage.jsx";
import Dashboard from "../../components/admin/dashboard/Dashboard.jsx";
import CustomerManage from "../../pages/admin/layout-admin/customer-manage/CustomerLayout.jsx";
import StatisticLayout from "../../pages/admin/layout-admin/statistics-manage/StatisticLayout.jsx";

export const router = createBrowserRouter([
    {
        path: 'admin1',
        element: <AdminDashboard/>,
        children:
            [
                {
                    index: true,
                    element: <Dashboard/>,
                },
                {
                    path: 'customer-manage',
                    element: <CustomerManage/>,
                },
                {
                    path: 'statistic-manage',
                    element: <StatisticLayout/>,
                },
            ],
    },
    {
        path: 'admin',
        element: <AuthorizedView ROLE={'ADMIN'}/>,
        children:
            [
            ],
    },
    {
        path: '/',
        element: <ProtectedLayout/>,
        children: [
            {
                element: <MainLayout/>,
                children: [
                    {
                        path: 'home',
                        element: <HomePage/>,
                    },
                    {
                        path: 'top-up',
                        element: <TopUp/>,
                    },
                    {
                        path: 'me',
                        element: <InformationCard/>,
                    },
                    {
                        path: 'order/:id?',
                        element: <ServicePayment/>,
                    },
                    {
                        path: 'history',
                        element: <TransactionHistoryPage/>,
                    },
                    {
                        path: 'bank',
                        element: <AtmPage/>,
                    },
                    {
                        path: 'analysis',
                        element: <AnalysisPage/>,
                    },
                    {
                        path: 'qr-payment',
                        element: <QRPayment/>,
                    },
                    {
                        path: 'group-fund',
                        element: <GroupFundPage/>,
                    },
                    {
                        path: 'group-fund/new-group',
                        element: <NewFund/>,
                    },
                    {
                        path: 'fund/:id?',
                        element: <FundDetailPage/>,
                    },
                ],
            },
        ],
        errorElement: <PageNotFound/>,
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <IntroPage/>,
            },
        ],
    },
    {
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
                    },
                    {
                        path: 'change',
                        element: <ResetPasswordPage/>, //TODO: change password page
                    },
                ],
            },
            {
                path: 'test',
                element: <SignInFederation/>,
            },
        ],
    },
]);