import { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa"; // calendar icon
import ReCAPTCHA from "react-google-recaptcha"; // reCAPTCHA
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post } from '../../util/requestUtil.js';
import ManagementPersonalInfo from './ManagementPersonalInfo.jsx';

const ChangeBirth = () => {
    const [birthDateInput, setBirthDateInput] = useState('');
    const [birthDateTouched, setBirthDateTouched] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [changeBirthCompleted, setChangeBirthCompleted] = useState(false); 

    const handleRecaptchaChange = (value) => {
        setRecaptchaVerified(!!value);
    };

    const isOver18 = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        const age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDifference = today.getMonth() - birthDateObj.getMonth();
        const dayDifference = today.getDate() - birthDateObj.getDate();
        
        return age > 18 || (age === 18 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
    };

    const handleSubmit = async () => {
        if (!recaptchaVerified) {
            toast.error('Vui lòng xác nhận bạn không phải là robot');
        } else if (birthDateInput === '') {
            toast.error('Vui lòng nhập ngày sinh');
        } else if (!isOver18(birthDateInput)) {
            toast.error('Bạn phải trên 18 tuổi để tiếp tục');
        } else {
            post("/v1/user/birthdate", {
                birthDate: birthDateInput
            })
            .then((res) => {
                if (res.data.user) {
                    setChangeBirthCompleted(true);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((res) => {
                if (res.data && res.data.message) {
                    toast.error(res.data.message);
                }
            });
        }
    };

    const handleBirthDateChange = (e) => {
        setBirthDateInput(e.target.value);
        setBirthDateTouched(true);
    };

    const handleGoBack = () => {
        
    };

    if (changeBirthCompleted) {
        return <ManagementPersonalInfo />;
    }

    return (
        <div className="transaction-account grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><FaCalendarAlt size={20} /></div>
                <div className="font-normal text-md ml-2">ĐỔI NGÀY SINH</div>
                <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 1/2</div>
            </div>
            <div className="info-container row-span-9 ml-2 mt-3 flex flex-col space-y-9">
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Ngày sinh</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type="date"
                            className={`border rounded p-2 sm:w-full ${birthDateTouched && (birthDateInput === '' ? 'border-red-500' : 'border-green-500')}`}
                            value={birthDateInput}
                            onChange={handleBirthDateChange}
                        />
                        {birthDateTouched && birthDateInput === '' && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                Vui lòng nhập ngày sinh
                            </p>
                        )}
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right mr-3 ml-20 lg:ml-0 text-textGray0 font-medium text-base">Xác nhận bảo mật</p>
                    <div className="relative mt-2 lg:mt-0">
                        <ReCAPTCHA 
                            sitekey="6LesSQ8qAAAAAKqx5VBJpBKKrbX_M4t4cEeHsa-e"
                            onChange={handleRecaptchaChange}
                        />
                        {birthDateTouched && !recaptchaVerified && (
                            <p className="absolute mt-1 text-xs text-red-500">
                                Vui lòng xác nhận bạn không phải là robot
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center mt-auto justify-end space-x-4 mr-5">
                    <button
                        className="hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4 font-medium"
                        onClick={handleGoBack}
                    >
                        Quay lại
                    </button>
                    <button
                        className="bg-primaryColor hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSubmit}
                    >
                        Tiếp tục
                        <ToastContainer />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChangeBirth;
