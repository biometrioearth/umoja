
import React from 'react';
import { Route, Routes } from "react-router-dom";

import Login from "./modules/Auth/Login/Index"
import Dashboard from "./modules/Dashboard/Index";

function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </div>
  );
}

export default App;