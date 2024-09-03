/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-undef */
import { useEffect, useState } from "react";
import { FaCaretDown } from "react-icons/fa6"; //icon caret
import { FaBars } from "react-icons/fa"; //icon bar

const UnAuthHeader = ({ UnAuthHeader, LoginRegister }) => {
  //Responsive list menu
  const [menuVisible, stateMenu] = useState(window.innerWidth > 770); //true
  useEffect(() => {
    const handleResize = () => {
      //update state
      stateMenu(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize); //get listen
    handleResize(); //update when has change
    return () => {
      window.removeEventListener("resize", handleResize); //clear listen
    };
  }, []);

  //Button bar
  const [dropListVisible, stateVisible] = useState(false);
  const toggleMenu = () => {
    stateVisible(!dropListVisible); //change state
  };

  return (
    <header
      id="unauth-header"
      className="flex fixed top-0 bg-white w-full h-24 text-black items-center border-b border-gray-300 shadow z-40"
    >
      <div className="container flex mx-9 px-5 items-center align-middle">
        <div className="header-row flex items-center max-h-full flex-1">
          <div className="header-column flex flex-grow items-center mr-4">
            <a className="header-logo min-w-18" onClick={UnAuthHeader}>
              <img
                alt="e-wallet"
                width={75}
                height={75}
                src="../../../public/e-wallet.png"
              ></img>
            </a>
          </div>
          <div className="header-column flex flex-grow items-center justify-end">
            <div className="header-nav flex">
              <div className="header-main flex mr-8">
                {menuVisible ? (
                  <ul className="list-menu flex items-center max-md:hidden visible">
                    <li className="h-11 w-full items-center flex p-6 mr-12 hover:bg-customGray hover:text-white rounded-t-lg cursor-pointer">
                      <a className="px-3 text-1xl font-bold text-nowrap">
                        TEST 1
                      </a>
                    </li>
                    <li className="h-11 w-full items-center flex p-6 mr-12  hover:bg-customGray hover:text-white rounded-t-lg hover:visible group cursor-pointer">
                      <a className="pl-3 pr-1 text-1xl font-bold text-nowrap">
                        TEST 2
                      </a>
                      <div className="mr-2">
                        <FaCaretDown />
                      </div>
                      <ul className="drop-menu bg-customGray absolute -bottom-29 right-93 h-auto w-52 rounded-b-lg rounded-tr-lg border-t-1 border-t-slate-500 invisible group-hover:visible">
                        <li className="mt-4 ml-4">
                          <a>list 1</a>
                        </li>
                        <li className="mt-4 ml-4">
                          <a>list 2</a>
                        </li>
                        <li className="mt-4 ml-4 mb-4">
                          <a>list 3</a>
                        </li>
                      </ul>
                    </li>
                    <li className="h-11 w-full items-center flex p-6 mr-12  hover:bg-customGray hover:text-white rounded-t-lg cursor-pointer">
                      <a className="px-3 text-1xl font-bold text-nowrap">
                        TEST 3
                      </a>
                    </li>
                  </ul>
                ) : (
                  <div
                    className="flex px-3 items-center cursor-pointer md:hidden visible border-2 rounded-xl bg-orange-400"
                    onClick={toggleMenu}
                  >
                    <FaBars size="18" />
                  </div>
                )}
                {!menuVisible && dropListVisible && (
                  <div className="absolute top-18 left-0 right-0 bg-white py-2 border-b border-gray-300 shadow z-50 animate-expandHeight">
                    <ul className="items-center w-full">
                      <li className="h-11 w-full items-center flex p-6 hover:bg-customGray hover:text-white cursor-pointer">
                        <a className="px-3 text-1xl font-bold text-nowrap">
                          TEST 1
                        </a>
                      </li>
                      <li className="h-11 w-full items-center flex p-6 hover:bg-customGray hover:text-white cursor-pointer">
                        <a className="px-3 text-1xl font-bold text-nowrap">
                          TEST 2
                        </a>
                      </li>
                      <li className="h-11 w-full items-center flex p-6 hover:bg-customGray hover:text-white cursor-pointer">
                        <a className="px-3 text-1xl font-bold text-nowrap">
                          TEST 3
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="account-link flex items-center mr-3">
                <div className="" onClick={LoginRegister}>
                  <a className="flex px-3 py-2 text-1xl font-bold border-2 rounded-3xl items-center border-black hover:bg-slate-200 cursor-pointer text-nowrap">
                    Tài khoản
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnAuthHeader;
