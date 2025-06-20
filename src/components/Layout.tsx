'use client'
import Link from 'next/link';
import React, { useState, ReactNode } from 'react';
import Image from "next/image";
import { MdOutlineDashboardCustomize, MdPeople, MdInventory, MdReceipt, MdLogout, MdClose, MdMenu, MdAccountCircle, MdNotificationsActive } from 'react-icons/md';
import { GoProject } from "react-icons/go";
import { SlCalender, SlUser } from "react-icons/sl";
import "app/globals.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const menuItems = [
      { name: 'Dashboard', path: '/', icon: <MdOutlineDashboardCustomize size={20} /> },
      { name: 'User Manage', path: '/user', icon: <MdPeople size={20} /> },
      { name: 'Projects', path: '/projects', icon: <GoProject size={20} /> },
      { name: 'calendar', path: '/calendar', icon: <SlCalender size={20} /> },
    ];
    const activityItems = [
      { name: 'Activity', path: '/activity', icon: <MdNotificationsActive size={20} /> },
    ];
    const logoutItems = [
      { name: 'Logout', path: '/login', icon: <MdLogout size={20} /> }
    ];
    
    return (
      <div className="flex h-screen">
        <div className={`
          fixed md:relative z-20 h-full bg-[#38516C] text-white 
          transition-all duration-300 flex flex-col
          ${isSidebarOpen ? 'left-0 w-52' : '-left-52 w-0'} 
          md:left-0 md:w-52
        `}>
          {/* Sidebar content */}
          <div className="px-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-[100px] mx-auto"
            />
          </div>

          <div className="py-4 px-4 border-t border-b border-white">
            {activityItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-white hover:text-[#38516C] transition-all"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex-grow p-4 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center px-3 py-2 mb-2 rounded-lg hover:bg-white hover:text-[#38516C] transition-all"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-white">
            {logoutItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-white hover:text-[#38516C] transition-all"
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Main content area - Right side */}
        <div className="flex-1 flex flex-col overflow-hidden ml-0">
          <nav className="bg-[#A1C5D7] text-white p-4 border-b-1">
            <div className="flex justify-end items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden text-white focus:outline-none"
              >
                {isSidebarOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
              </button>
              <div className="flex items-center space-x-4">
                <SlUser size={20} />
              </div>
            </div>
          </nav>

          {/* Page content */}
          <main className="flex-1 overflow-y-auto p-6 bg-[#A1C5D7]">
            {children}
          </main>
        </div>

        {/* Mobile overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    );
}