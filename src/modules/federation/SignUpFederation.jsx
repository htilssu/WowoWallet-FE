import {useEffect} from 'react';
import {setTitle} from '../../util/titleUtil.js';

const SignUpFederation = () => {

  useEffect(() => {
    setTitle('Tạo tài khoản - WoWo Wallet');
  }, []);

  return (
      <div>
        <div className="flex flex-col justify-center items-center bg-white md:h-screen">
          <div
              className="grid md:grid-cols-2 items-center gap-y-8 max-w-7xl w-full shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] m-6 rounded-xl relative overflow-hidden">
            <div className="max-md:order-1 p-4 bg-gray-50 h-full">
              <img src="https://readymadeui.com/signin-image.webp"
                   className="lg:max-w-[90%] w-full h-full object-contain block mx-auto" alt="login-image"/>
            </div>

            <div className="flex items-center p-6 max-w-md w-full h-full mx-auto">
              <form className="w-full">
                <div className="mb-12">
                  <h3 className="text-blue-500 lg:text-3xl text-2xl font-extrabold max-md:text-center">Tạo tài
                    khoản</h3>
                </div>

                <div>
                  <label className="text-gray-800 text-sm font-semibold block mb-3">Email</label>
                  <div className="relative flex items-center">
                    <input name="name" type="text" required
                           className="w-full bg-transparent text-sm text-gray-800 border-2 focus:border-blue-500 pl-4 pr-12 py-3.5 outline-none rounded-xl"
                           placeholder="Nhập email"/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb"
                         className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path
                          d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                          data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
                <div className="mt-12">
                  <button type="button"
                          className="w-full shadow-xl py-3.5 px-8 text-sm tracking-wide font-semibold rounded-xl bg-blue-500 hover:bg-blue-600 text-white border focus:outline-none transition-all">
                    Tiếp theo
                  </button>

                  <div className="flex items-center justify-center gap-4 mt-12">
                    <div className="w-3 h-3 shrink-0 rounded-full bg-blue-600 cursor-pointer"></div>
                    <div className="w-3 h-3 shrink-0 rounded-full bg-gray-300 cursor-pointer"></div>
                    <div className="w-3 h-3 shrink-0 rounded-full bg-gray-300 cursor-pointer"></div>
                  </div>
                </div>
              </form>
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-blue-400 max-sm:hidden"></div>
          </div>
        </div>
      </div>
  );
};

export default SignUpFederation;