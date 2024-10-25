import {BsFillMenuButtonWideFill} from 'react-icons/bs';
import {Link, ScrollRestoration} from 'react-router-dom';
import MyWallet from '../../components/account/WalletSection.jsx';
import {FeatureItem} from '../../components/home/FeatureItem.jsx';
import ScrollableCardList from '../../components/home/ScrollableCardList.jsx';
import {Slider} from 'rsuite';
import Statistical from '../../components/home/Statistical.jsx';

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

  return (
      <div className={'flex flex-col bg-gray-100 '}>
        <div className={'flex w-full justify-center items-center '}>
          <div className={'flex w-full flex-col xg:flex-row justify-center'}>
            <div className={'order-first xg:order-last md:ml-9'}>
              <MyWallet/>
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
                    {FeatureItem.map((item, index) => (
                        <Link
                            to={item.link}
                            key={index}
                            className={'hover:no-underline'}
                        >
                          <Card icon={item.icon} title={item.title}/>
                        </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className={'flex flex-col p-4 sm:mt-2'}>
                <div className={''}>
                  <ScrollableCardList/>
                </div>
              </div>
              <div className={'w-full flex flex-col p-4 mb-10 sm:mt-2'}>
                <div className={'flex flex-col justify-center gap-4'}>
                  <div className={'rs-text-medium text-lg'}>
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
        <div className={'md:px-10 border-t-2'}>
          <div className={'rs-text-medium text-lg md:ml-6'}>
            Thống kê giao dịch
          </div>
          <Statistical/>
        </div>
        <ScrollRestoration/>
      </div>
  );
};

export default HomePage;
