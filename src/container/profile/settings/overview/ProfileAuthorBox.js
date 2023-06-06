import { React, useState } from 'react';
import { Upload } from 'antd';
import UilCamera from '@iconscout/react-unicons/icons/uil-camera';
import UilSetting from '@iconscout/react-unicons/icons/uil-setting';
import { Link, NavLink } from 'react-router-dom';
import Heading from '../../../../components/heading/heading';

function AuthorBox() {
  const path = '/dashboard/pages/settings';

  const [activeValue, setActiveValue] = useState('account');

  return (
    <>
      <div className="bg-white dark:bg-white10 rounded-[10px]">
        <div className="-mx-3 px-5 pt-[25px] pb-5 text-center border-b border-regular dark:border-white10">
          <figure className="relative max-w-[120px] mx-auto mb-6">
            <img className="mx-auto" src={require('../../../../static/img/users/1.png')} alt="" />
            <Upload className="absolute right-0 -bottom-2 flex items-center justify-center bg-white dark:bg-white10 w-10 h-10 rounded-full">
              <Link to="#" className="inline-flex items-center justify-center bg-primary w-8 h-8 rounded-full">
                <UilCamera className="w-4 h-4 text-white" />
              </Link>
            </Upload>
          </figure>
          <figcaption>
            <Heading as="h4" className="mb-0 text-dark dark:text-white87 text-lg font-semibold">
              Md Rafiq
            </Heading>
            <p className="mb-0 text-light dark:text-white60 text-15">Admin</p>
          </figcaption>
        </div>
        <nav className="px-[25px] pt-8 pb-5">
          <ul className="mb-0">
            <li>
              <NavLink
                to={`${path}/account`}
                onClick={() => {
                  setActiveValue('account');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-full ${
                  activeValue === 'account'
                    ? 'bg-warning text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <UilSetting className="w-4 h-4 ltr:mr-3 rtl:ml-3 mb-0.5" />
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${path}/password`}
                onClick={() => {
                  setActiveValue('password');
                }}
                className={`flex items-center mb-3 px-5 py-3 rounded-full ${
                  activeValue === 'password'
                    ? 'bg-warning text-primary font-medium'
                    : 'bg-transparent text-light dark:text-white60 font-normal'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ltr:mr-3 rtl:ml-3 -mb-0.5 feather feather-key"
                >
                  <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                </svg>
                Change Password
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default AuthorBox;
