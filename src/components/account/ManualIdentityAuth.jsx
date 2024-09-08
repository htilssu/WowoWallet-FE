import { FaUserCheck } from "react-icons/fa6"; // icon check-user
import ReCAPTCHA from "react-google-recaptcha"; // reCAPTCHA

const ManualIdentityAuth = () => {
    return (
        <div className="transaction-account ml-2 bg-white w-auto h-auto rounded-lg p-2 pb-9">
            <div className="info-header  ml-2 items-center mt-2 flex mb-1">
                <div className="text-primaryColor"><FaUserCheck size={20}/></div>
                <div className="font-normal text-md ml-2">CHỨNG THỰC TÀI KHOẢN - TỰ CHỨNG THỰC</div>
                <div className="ml-auto font-normal text-md mr-5 text-primaryColor">BƯỚC 1/2</div>
            </div>

            <div className="info-container mx-3 mt-3 h-auto">
                <div className="h-auto w-auto bg-dimPrimaryColor rounded-lg py-3 mt-6">
                    <div className="flex items-center ml-5">
                        <p className="text-base mr-2">Họ và tên chủ TK:</p>
                        <p className="uppercase mb-2 font-medium text-primaryColor">nguyễn anh tuấn</p>
                    </div>
                    <div className="flex items-center ml-5">
                        <p className="text-base mr-2">Loại tài khoản:</p>
                        <p className="mb-2 font-medium">Tài khoản cá nhân</p>
                    </div>
                </div>

                <div className="mt-9">
                    <div>
                        <p className="font-normal text-md ml-2">THÔNG TIN CHỨNG THỰC</p>
                    </div>
                    <div className="grid-rows-4 space-y-7 mt-5">
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                                <p className="text-textGray0 font-medium text-base">Số giấy chứng thực<span className="ml-1 text-red-500">*</span></p>
                            </div>
                            <div className="flex items-center relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0 space-x-2">
                                <select className="form-select block rounded border h-11 w-full">
                                    <option>CCCD</option>
                                    <option>Hộ chiếu</option>
                                </select>
                                <input
                                    type={"text"}
                                    className={`border rounded h-11 w-full `}
                                />

                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                                <p className="text-textGray0 font-medium text-base">Ngày cấp<span className="ml-1 text-red-500">*</span></p>
                            </div>
                            <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <input
                                    type={"date"}
                                    className={`border rounded p-2 sm:w-full text-textGray`}

                                />
                       
                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3">
                                <p className="text-textGray0 font-medium text-base">Nơi cấp<span className="ml-1 text-red-500">*</span></p>
                            </div>
                            <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <textarea
                                    className={`border rounded p-2 sm:w-full min-h-11`}

                                />
                       
                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex-none text-left lg:text-right ml-20 lg:ml-0 mr-3"> 
                                <p className="text-textGray0 font-medium text-base">Địa chỉ<span className="ml-1 text-red-500">*</span></p>
                            </div>
                            <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <textarea
                                    className={`border rounded p-2 sm:w-full min-h-11`}

                                />
                       
                            </div>
                        </div>
                    </div>

                    <div className="border-b-1 my-9"></div>

                    <div>
                        <p className="font-normal text-md ml-2">GIẤY TỜ CHỨNG THỰC</p>
                    </div>
                    <div className="grid-rows-4 space-y-7 mt-5">
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-36 flex text-left lg:text-right ml-20 lg:ml-12 mr-3">
                                <p className="text-textGray0 font-medium text-base">Ảnh mặt trước giấy chứng thực</p>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                            <div className="flex relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <button
                                        className=" hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4"
                                        
                                        >
                                        Chọn ảnh
                                    </button>
                                </div>
                                <div className="flex items-center ml-5">
                                    <p>Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-36 flex text-left lg:text-right ml-20 lg:ml-12 mr-3">
                                <p className="text-textGray0 font-medium text-base">Ảnh mặt sau giấy chứng thực</p>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                            <div className="flex relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <button
                                        className=" hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4"
                                        
                                        >
                                        Chọn ảnh
                                    </button>
                                </div>
                                <div className="flex items-center ml-5">
                                    <p>Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex text-left lg:text-right ml-20 lg:ml-0 mr-3">
                                <p className="text-textGray0 font-medium text-base">Ảnh chân dung chính chủ (cầm CCCD)</p>
                                <span className="ml-1 text-red-500">*</span>
                            </div>
                            <div className="flex relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <div className="flex items-center">
                                    <button
                                        className=" hover:bg-primaryColor hover:text-white rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4"
                                        
                                        >
                                        Chọn ảnh
                                    </button>
                                </div>
                                <div className="flex items-center ml-5">
                                    <p>Ảnh .GIF, .PNG hoặc .JPG không quá 10Mb</p>
                                </div>
                            </div>
                        </div>
                        <div className="row-span-1 lg:flex items-center">
                            <div className="w-48 flex text-left lg:text-right ml-20 lg:ml-0 mr-3"> 
                                <p className="text-textGray0 font-medium text-base">Tích vào ô vuông để xác thực</p>
                            </div>
                            <div className="relative lg:w-1/2 w-1/2 ml-20 lg:ml-0 mt-2 lg:mt-0">
                                <ReCAPTCHA 
                                    sitekey="6LesSQ8qAAAAAKqx5VBJpBKKrbX_M4t4cEeHsa-e"
                                />
                       
                            </div>
                        </div>

                        <div className="w-full h-auto bg-gray-100 rounded-md py-1">
                            <div className="mx-5 my-3">
                                <p className="text-primaryColor font-semibold text-base">Chú ý:</p>
                                <p className="text-black font-normal text-base">Đối với khách hàng là công dân dưới 14 tuổi, vui lòng liên hệ đến Ngân Lượng để được hỗ trợ xác minh.</p>
                                <p className="text-black font-normal text-base">Hotline: 1900 585899</p>
                                <p className="text-black font-normal text-base">Email: support@ewallet.vn</p>
                            </div>
                        </div>

                        <div className="flex items-center mt-6 justify-end">
                            <button
                                className=" hover:bg-primaryColor hover:text-white text-primaryColor rounded-md border mb-3 lg:mb-0 border-primaryColor py-2 px-4 font-medium"
                                
                                >
                                Quay lại
                            </button>
                            <button
                                className="rounded-md border mb-3 lg:mb-0 bg-primaryColor text-white font-medium py-2 px-4 ml-2"
                                
                                >
                                Gửi yêu cầu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManualIdentityAuth;
