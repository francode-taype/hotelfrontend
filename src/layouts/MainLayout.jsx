import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';

const MainLayout = () => {
    return (
        <>
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-6 ">
            <Sidebar />
            <div className="xl:col-span-5 ">
              <Header />
              <div style={{height: 'calc(100vh - 64px) ' }} className="  overflow-y-scroll bg-secondary-100">
                <Outlet />
              </div>
            </div>
          </div>
        </>
    );
}

export default MainLayout;
