import { Spin } from 'antd';
import React, { Suspense } from 'react';

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
        <div className="bg-top bg-no-repeat bg-warning">
          <div className="py-[20px] 2xl:py-[60px] px-[15px]">
            <div className="flex justify-center">
              <img
                className="dark:hidden w-44"
                src={require(`../../../static/img/logos/230517_biometrio_earth_Logo_Portrait_DarkGreen.png`)}
                alt=""
              />
            </div>
            <WraperContent />
          </div>
        </div>
      </Suspense>
    );
  };
};

export default AuthLayout;
