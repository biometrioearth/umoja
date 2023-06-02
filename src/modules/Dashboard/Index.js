import React from 'react';
import Sidebar from '../../components/Dashboard/Sidebar';
import Navbar from '../../components/Dashboard/Navbar';

const App = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className="flex-grow">
              {/* Header */}
              <Navbar />

        {/* Add your main content here */}
      </div>
    </div>
  );
};

export default App;
