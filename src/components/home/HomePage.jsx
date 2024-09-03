import {BsFillMenuButtonWideFill} from "react-icons/bs";
import {Link, ScrollRestoration, useNavigate} from "react-router-dom";
import PersonalInfoForm from "../infoAccount/PersonalInfoForm.jsx";
import navbarItems from "./navbarItems.jsx";
import ScrollableCardList from "./ScrollableCardList.jsx";
import Slider from "../library component/Slider.jsx";
import Statistical from "./Statistical.jsx";
import {useEffect} from "react";
import {useAuth} from "../../modules/hooks/useAuth.jsx";

const Card = ({icon, title, onClick}) => {
    return (
        <div
            className="w-full h-32 sm:h-36 bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={onClick}
        >
            <div className="p-8 flex flex-col items-center justify-center">
                {icon}
                <h2 className="text-sm sm:text-xl font-semibold mt-4">{title}</h2>
            </div>
        </div>
    );
};

const HomePage = () => {

    const {user, isAuthenticate} = useAuth()
    const pathName = location.pathname;

    const router = useNavigate();
    useEffect(() => {
        if (!isAuthenticate) {
            router("/sign-in?returnUrl=" + pathName);
        }
    }, [isAuthenticate]);


    return (
        <div className={"flex flex-col bg-gray-100 "}>
            <div className={"flex w-full justify-center items-center "}>
                <div className={"flex w-full flex-col xg:flex-row justify-center"}>
                    <div className={"order-first xg:order-last md:ml-9"}>
                        <PersonalInfoForm/>
                    </div>
                    <div className="min-h-screen flex flex-col max-w-3xl">
                        <div className="flex items-center justify-between p-4 w-full bg-white">
                            <div className="flex items-center">
                                <BsFillMenuButtonWideFill size={25} className="text-gray-800"/>
                                <h1 className="text-2xl font-bold ml-3">Tiện ích</h1>
                            </div>
                        </div>
                        <div className="flex-1 p-4">
                            <div className="max-w-5xl mx-auto">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {navbarItems.map((item, index) => (
                                        <Link
                                            to={item.link}
                                            key={index}
                                            className={"hover:no-underline"}
                                        >
                                            <Card icon={item.icon} title={item.title}/>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-col p-4 sm:mt-2"}>
                            <div className={""}>
                                <ScrollableCardList/>
                            </div>
                        </div>
                        <div className={"w-full flex flex-col p-4 mb-10 sm:mt-2"}>
                            <div className={"flex flex-col justify-center gap-4"}>
                                <div className={"rs-text-medium text-lg"}>
                                    Có thể bạn quan tâm
                                </div>
                                <div>
                                    <Slider/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"md:px-10 border-t-2"}>
                <div className={"rs-text-medium text-lg md:ml-6"}>
                    Thống kê giao dịch
                </div>
                <Statistical/>
            </div>
            <ScrollRestoration/>
        </div>
    );
};

export default HomePage;
