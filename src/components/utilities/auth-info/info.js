/* eslint-disable camelcase */
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import { Avatar } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Search from './Search';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';
import { logOut } from '../../../redux/authentication/actionCreator';

const AuthInfo = React.memo(() => {
  const token = localStorage.getItem('authData');
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cookiesExpired = jwt_decode(token).exp * 1000 <= Date.now();
  useEffect(() => {
    // Check if cookies have expired or user is not authenticated

    if (cookiesExpired) {
      navigate('/login');
      // Redirect to login page
      dispatch(logOut(() => navigate('/login')));
    }
  }, [cookiesExpired]);

  const SignOut = (e) => {
    e.preventDefault();
    dispatch(logOut(() => navigate('/login')));
  };

  const userContent = (
    <div>
      <div className="min-w-[280px] sm:min-w-full pt-4">
        <figure className="flex items-center text-sm rounded-[8px] bg-section dark:bg-white10 py-[20px] px-[25px] mb-[12px]">
          <img className="ltr:mr-4 rtl:ml-4" src={require('../../../static/img/avatar/chat-auth.png')} alt="" />
          <figcaption>
            <Heading className="text-dark dark:text-white87 mb-0.5 text-sm" as="h5">
              Abdullah Bin Talha
            </Heading>
            <p className="mb-0 text-xs text-body dark:text-white60">UI Expert</p>
          </figcaption>
        </figure>
        <ul className="mb-0">
          <li>
            <Link
              to="#"
              className="inline-flex items-center text-light dark:text-white60 hover:text-primary  hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Settings
            </Link>
          </li>
        </ul>
        <Link
          to="#"
          onClick={SignOut}
          className="flex items-center justify-center text-sm font-medium bg-[#f4f5f7] dark:bg-[#32333f] h-[50px] text-light hover:text-primary dark:hover:text-white60 dark:text-white87 mx-[-15px] mb-[-15px] rounded-b-6"
        >
          <UilSignout className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Sign Out
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-end flex-auto">
      <div className="md:hidden">
        <Search />
      </div>
      <div className="flex ltr:ml-3 rtl:mr-3 ltr:mr-4 rtl:ml-4 ssm:mr-0 ssm:rtl:ml-0">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="flex items-center text-light whitespace-nowrap">
            <Avatar src="https://cdn0.iconfinder.com/data/icons/user-pictures/100/matureman1-512.png" />
            <span className="ltr:mr-1.5 rtl:ml-1.5 ltr:ml-2.5 rtl:mr-2.5 text-body dark:text-white60 text-sm font-medium md:hidden">
              Md. Rafiq
            </span>
            <UilAngleDown className="w-4 h-4 ltr:md:ml-[5px] rtl:md:mr-[5px]" />
          </Link>
        </Popover>
      </div>
    </div>
  );
});

export default AuthInfo;
