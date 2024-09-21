import {MyWallet} from '../account/InformationCard.jsx';
import {ScrollRestoration} from 'react-router-dom';
import InfoPopup from './InfoPopup.jsx';

const TopUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center items-center flex-1">
        <div className="container mx-auto p-6 flex flex-col md:flex-row">
          <div className="flex justify-end w-full md:w-2/3 ml-auto">
            <InfoPopup/>
          </div>
          <div className="order-first  md:order-last w-full md:w-1/3 mb-6 md:mb-0 md:ml-9">
            <div className={"border-2 rounded-lg"}>
              <MyWallet />
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default TopUp;
