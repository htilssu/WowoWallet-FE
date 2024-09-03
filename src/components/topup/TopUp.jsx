import { lazy, Suspense } from "react";
import { MyWallet } from "../infoAccount/PersonalInfoForm.jsx";
import {ScrollRestoration} from "react-router-dom";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const InfoTopUp = lazy(() => {
  return delay(100).then(() => import("./InfoPopup.jsx"));
});

const TopUp = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center items-center flex-1">
        <div className="container mx-auto p-6 flex flex-col md:flex-row">
          <div className="flex justify-end w-full md:w-2/3 ml-auto">
            <Suspense fallback={<h1>Loading</h1>}>
              <InfoTopUp />
            </Suspense>
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
