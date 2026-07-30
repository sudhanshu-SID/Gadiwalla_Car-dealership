import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-text">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
