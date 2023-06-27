import { UilArrowGrowth, UilBagAlt, UilTablet, UilCreateDashboard, UilSetting } from '@iconscout/react-unicons';
import { Menu } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import propTypes from 'prop-types';
// import { NavTitle } from './Style';
// import { changeDirectionMode, changeLayoutMode, changeMenuMode } from '../redux/themeLayout/actionCreator';

function MenuItems({ toggleCollapsed }) {
  const { t } = useTranslation();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const { topMenu } = useSelector(() => {
    return {
      topMenu: false,
    };
  });

  const path = '/dashboard';

  const pathName = window.location.pathname;
  const pathArray = pathName?.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath?.split('/');

  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit?.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys?.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item?.keyPath?.length === 1) setOpenKeys([]);
  };

  const items = [
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}`}>
        {t('dashboard')}
      </NavLink>,
      'dashboard',
      !topMenu && <UilCreateDashboard />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}`}>
        Puffer Fish
      </NavLink>,
      'Puffer Fish',
      !topMenu && <UilArrowGrowth />,
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/project/view/list`}>
        {t('project')}
      </NavLink>,
      'project',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/project/view/list`}>
          <UilBagAlt />
        </NavLink>
      ),
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/device/view/list`}>
        {t('device')}
      </NavLink>,
      'device',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/device/view/list`}>
          <UilTablet />
        </NavLink>
      ),
    ),
    getItem(
      <NavLink onClick={toggleCollapsed} to={`${path}/pages/settings`}>
        {t('settings')}
      </NavLink>,
      'settings',
      !topMenu && (
        <NavLink className="menuItem-iocn" to={`${path}/pages/settings`}>
          <UilSetting />
        </NavLink>
      ),
    ),
  ];

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit?.length === 1 ? 'home' : mainPathSplit?.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit?.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
}

MenuItems.propTypes = {
  toggleCollapsed: propTypes.func,
};

export default MenuItems;
