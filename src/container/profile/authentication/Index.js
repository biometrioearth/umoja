import { Spin } from 'antd';
import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        }
      >
        <div className="bg-warning sticky top-0 h-full xl:h-full 2xl:h-screen">
          <div className="-py-[60px] px-[15px] h-screen">
            <div className="flex justify-center">
              <img
                className="dark:hidden w-44"
                src={require(`../../../static/img/logos/230517_biometrio_earth_Logo_Portrait_DarkGreen.png`)}
                alt=""
              />
            </div>
            <ToastContainer />
            <WraperContent />
          </div>
        </div>
      </Suspense>
    );
  };
};

export default AuthLayout;
