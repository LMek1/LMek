import Sidebar from './Sidebar';
import TopBar from './TopBar';
import Footer from './Footer';
import { useState } from 'react';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <Sidebar isOpen={isSidebarOpen} />
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="lg:ml-64">
        <TopBar onMenuClick={toggleSidebar} onSearchChange={setSearchQuery} />
        <div className="p-6 max-w-7xl mx-auto">
          {React.isValidElement(children) ? React.cloneElement(children, { searchQuery }) : children}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
