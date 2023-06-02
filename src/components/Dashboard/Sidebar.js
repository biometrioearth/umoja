import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-gray-800 text-gray-100 flex flex-col h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar content */}
      <div className="flex items-center justify-center py-4">
        {/* Add your logo or brand icon here */}
      </div>
      {/* Toggle button */}
      <button
        className={`flex items-center justify-center bg-gray-900 text-gray-100 transition-all duration-300 ${
          collapsed ? 'rounded-r-md' : 'rounded-l-md'
        }`}
        onClick={toggleCollapse}
      >
        <svg
          className="w-6 h-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {/* Add your toggle button icon here */}
        </svg>
      </button>

      <nav className={`flex-grow ${collapsed ? 'hidden' : 'block'}`}>
        <ul>
          {/* Add your sidebar items here */}
          <li>
            <a href="#">
              <svg
                className={`w-6 h-6 ${collapsed ? 'mx-auto' : 'mr-2'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* Add your sidebar icon here */}
              </svg>
              {collapsed ? null : 'Dashboard'}
            </a>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </nav>

      
    </aside>
  );
};

export default Sidebar;
