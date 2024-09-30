import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { post } from '../../util/requestUtil.js';
import InfoAccount from './InfoAccount.jsx';

const ChangePhoneNumber = () => {
    const [oldPhone, setOldPhone] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [changePhoneCompleted, setChangePhoneCompleted] = useState(false);

    const handleRecaptchaChange = (value) => {
        setRecaptchaVerified(!!value);
    };


    const handleSubmit = async () => {
        if (!recaptchaVerified) {
            toast.error('Vui lòng xác nhận bạn không phải là robot');
        } else if (oldPhone === '' || newPhone === '') {
            toast.error('Vui lòng nhập cả email cũ và email mới');
        } else {
            post("/v1/user/change-phone", {
                oldPhone,
                newPhone
            })
            .then((res) => {
                if (res.data.success) {
                    setChangePhoneCompleted(true);
                } else {
                    toast.error(res.data.message);
                }
            })
            .catch((err) => {
                toast.error(err.response.data.message || 'Đã xảy ra lỗi');
            });
        }
    };

    const handleGoBack = () => {
        setChangePhoneCompleted(true);
    };

    if (changePhoneCompleted) {
        return <InfoAccount />;
    }

    return (
        <div className="change-email-container grid grid-rows-10 gap-x-3 ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header row-span-1 ml-2 items-center mt-2 flex mb-1">
                <div className="font-normal text-md ml-2">ĐỔI SỐ ĐIỆN THOẠI</div>
                <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 1/2</div>
            </div>
            <div className="info-container row-span-9 ml-2 mt-3 flex flex-col space-y-9">
            <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Số điện thoại cũ</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0 bg-gray-50">
                        <div
                            type="email"
                            className="border rounded p-2 w-full h-10"
                            value={oldPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3 text-textGray0 font-medium text-base">Số điện thoại mới</p>
                    <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                        <input
                            type="email"
                            className="border rounded p-2 w-full"
                            value={newPhone}
                            onChange={(e) => setNewPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right mr-3 ml-20 lg:ml-0 text-textGray0 font-medium text-base">Cách xác thực</p>
                    <div>
                        <div className='flex'>
                            <input className='mr-1' type='radio'></input>
                            <p>Xác thực bằng mã xác thực đến email cũ</p>
                        </div>
                        <div className='flex'>
                            <input className='mr-1' type='radio'></input>
                            <p>Nếu email cũ mất, xác thực bằng CCCD/Hộ chiếu</p>
                        </div>
                    </div>
                </div>
                <div className="lg:flex items-center">
                    <p className="w-48 flex-none text-left lg:text-right mr-3 ml-20 lg:ml-0 text-textGray0 font-medium text-base">Xác nhận bảo mật</p>
                    <ReCAPTCHA
                        sitekey="6LesSQ8qAAAAAKqx5VBJpBKKrbX_M4t4cEeHsa-e"
                        onChange={handleRecaptchaChange}
                    />
                </div>
                <div className="flex items-center mt-auto justify-end space-x-4 mr-5">
                    <button
                        className="hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4 font-medium"
                        onClick={handleGoBack}
                    >
                        Quay lại
                    </button>
                    <button
                        className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
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

export default ChangePhoneNumber;
