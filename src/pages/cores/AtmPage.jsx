import {useNavigate} from 'react-router-dom';
import {GrTransaction} from 'react-icons/gr';
import {IoIosAddCircle} from 'react-icons/io';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {wDelete, wGet} from '../../util/request.util.js';
import CardAtmComponents from '../../components/atm/CardAtmComponents.jsx';
import {ATMCard} from 'atm-card-react';

const AtmPage = () => {
  const [bankList, setBankList] = useState([]);
  const [atmCardList, setAtmCardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    wGet('/v1/banks').then((res) => {
      setBankList(res);
    });
  }, []);

  useEffect(() => {
    wGet('/v1/card')
        .then((res) => {
          if (res && Array.isArray(res)) {
            setAtmCardList(res);
          }
        });
  }, []);

  const handleShowNganHang = (event) => {
    event.preventDefault();
    navigate('/bank/add');
  };

  const handleDelete = (cardNumber) => {
    wDelete(`/v1/card/${cardNumber}`).then(() => {
      setAtmCardList(prev => prev.filter(card => card.cardNumber !== cardNumber));
      toast.success('Thẻ đã được xóa thành công!');
    });
  };

  // Tìm ngân hàng dựa vào id
  const findBankById = (id) => {
    return bankList.find(bank => bank.id + '' === id) || {};
  };

  return (
      <div className="md:p-6 flex items-center justify-center">
        <div
            className="form-box w-full max-w-[900px] my-auto mx-0 p-5 bg-white border-0 md:border-[1px] border-solid border-green-500 rounded-3xl">
          <form>
            {/* Form Header */}
            <div className="head-form flex items-center mb-5">
              <div className="icons mr-2 text-green-500">
                <GrTransaction/>
              </div>
              <div className="head-title text-green-500">
                <p>Thẻ/Tài khoản ngân hàng</p>
              </div>
            </div>

            {/* Form Body */}
            <div className="body-title mb-2 font-semibold text-green-500 flex items-start border-b-[1px] border-black">
              <p>Thẻ/tài khoản nội địa(rút)</p>
            </div>
            <div className="body-section">
              {/* Body Section Header */}
              <div className="body-section-head flex justify-between items-center pb-2 mb-2">
                <div className="body-section-head-left flex items-center relative text-green-500">
                  <p>THẺ ATM</p>
                </div>
                <div className="body-section-head-right flex items-center relative">
                  <div className="icon-body-head text-green-500 text-sm" onClick={handleShowNganHang}>
                    <IoIosAddCircle/>
                  </div>
                  <div className="body-section-head-right-p ml-1 flex items-center text-green-500"
                       onClick={handleShowNganHang}>
                    <p>Thẻ ATM</p>
                  </div>
                </div>
              </div>

              {/* Cards Container */}
              <div
                  className="atm-container grid min-w-[781px]:grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 ">
                {atmCardList && atmCardList.map((card) => {
                  const bank = findBankById(card.atmId); // Tìm ngân hàng dựa vào id
                  const splitDate = card.expired.split('/');
                  const month = splitDate[0];
                  const year = splitDate[1];
                  return (
                      <div key={card.id} className={'w-full'}>
                        <ATMCard
                            scale={1}
                            year={year}
                            month={month}
                            bankLogo={
                              <img className={'w-2/6'} src={bank.logo} alt={"bank logo"}/>
                            }
                        />
                      </div>
                  );
                })}
                <CardAtmComponents
                    title="Thêm thẻ ATM"
                    text="Bạn có thể thêm thẻ ATM vào đây"
                    link="#"
                    onClick={handleShowNganHang}
                />

              </div>
              <div className={'border-1'}></div>
              <div className="body-section-bottom flex justify-between items-center pb-2 mt-5">
                <div className="body-section-bottom-left text-green-500 flex items-center relative ">
                  <p>TÀI KHOẢN NGÂN HÀNG</p>
                </div>
                <div className="body-section-bottom-right flex items-center relative">
                  <div className="icon-body-bottom relative text-green-500 text-sm"
                       onClick={handleShowNganHang}>
                    <IoIosAddCircle/>
                  </div>
                  <div className="body-section-bottom-right-p flex items-center text-green-500"
                       onClick={handleShowNganHang}>
                    <p>Thẻ tài khoản</p>
                  </div>
                </div>
              </div>

              {/* Second Card */}
              <div className="nganhang w-full md:w-1/2 mt-2">
                <CardAtmComponents
                    title="Thêm tài khoản ngân hàng"
                    text="Bạn có thể thêm tài khoản ngân hàng vào đây"
                    link="#"
                    onClick={handleShowNganHang}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default AtmPage;

