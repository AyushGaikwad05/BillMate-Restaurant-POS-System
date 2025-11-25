'use client';
import { FaHome } from 'react-icons/fa';
import { CiCircleMore } from "react-icons/ci";
import { FaBellConcierge } from "react-icons/fa6";
import { MdOutlineReceipt, MdOutlineTableBar } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react';
import Modal from '@/shared/Modal';
import classes from './page.module.css';
import { useDispatch } from 'react-redux';
import { setCustomer } from '@/redux/slices/CustomerSlices';

export default function BottomNavBar() {
  const router = useRouter();
  const pathname = usePathname(); // 🔥 Detect current route
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestCounter, setGuestCounter] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔥 Automatically set active button based on route
  const getActive = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/orders")) return "orders";
    if (pathname.startsWith("/tables")) return "tables";
    return "";
  };

  const [selected, setSelected] = useState(getActive());

  useEffect(() => {
    setSelected(getActive());
  }, [pathname]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const increment = () => guestCounter < 6 && setGuestCounter(prev => prev + 1);
  const decrement = () => setGuestCounter(prev => (prev === 0 ? 0 : prev - 1));

  const handleCreateOrder = () => {
    dispatch(setCustomer({ name, phone, guests: guestCounter }));

    // 🔥 Set active to tables before navigation
    setSelected("tables");
    router.push("/tables");

    closeModal();
  };

  const baseBtn = 'p-5 w-[200px] rounded-[20px] transition-colors';
  const active = 'bg-[#343434]';
  const inactive = 'bg-transparent hover:bg-[#343434]/60';

  return (
    <>
      <div className={classes.bottomnav + ' relative flex gap-4'}>
        
        {/* HOME */}
        <button
          onClick={() => { setSelected('home'); router.push('/'); }}
          className={`${baseBtn} ${selected === 'home' ? active : inactive}`}
        >
          <FaHome className='inline mr-4' size={26} />Home
        </button>

        {/* ORDERS */}
        <button
          onClick={() => { setSelected('orders'); router.push('/orders'); }}
          className={`${baseBtn} ${selected === 'orders' ? active : inactive}`}
        >
          <MdOutlineReceipt className='inline mr-4' size={26} />Orders
        </button>

        {/* TABLES */}
        <button
          onClick={() => { setSelected('tables'); router.push('/tables'); }}
          className={`${baseBtn} ${selected === 'tables' ? active : inactive}`}
        >
          <MdOutlineTableBar className='inline mr-4' size={26} />Tables
        </button>

        {/* MORE */}
        <button
          onClick={() => { setSelected('more'); router.push('/orders'); }}
          className={`${baseBtn} ${selected === 'more' ? active : inactive}`}
        >
          <CiCircleMore className='inline mr-4' size={26} />More
        </button>

        {/* CREATE ORDER BUTTON */}
        <button
          onClick={openModal}
          className='bg-[#F6B100] rounded-full text-white p-3 items-center ml-10 absolute -top-8 left-1/2 -translate-x-1/2 z-10'
        >
          <FaBellConcierge size={35} />
        </button>

        {/* MODAL */}
        <Modal isOpen={isModalOpen} onClose={closeModal} title={"Create Order"}>
          <div>
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
            <div className="bg-[#1f1f1f] px-4 py-3 rounded-lg">
              <input
                value={name}
                onChange={(e)=> setName(e.target.value)}
                type="text"
                placeholder="Enter customer name"
                className="bg-transparent w-full text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Phone</label>
            <div className="bg-[#1f1f1f] px-4 py-3 rounded-lg">
              <input
                value={phone}
                onChange={(e)=> setPhone(e.target.value)}
                type="number"
                placeholder="Enter phone number"
                className="bg-transparent w-full text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-[#ababab]">Guest</label>
            <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
              <button onClick={decrement} className="text-yellow-500 text-2xl">&minus;</button>
              <span className="text-white">{guestCounter} Persons</span>
              <button onClick={increment} className="text-yellow-500 text-2xl">&#43;</button>
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            className="w-full bg-[#F6B100] text-white font-semibold rounded-lg py-3 mt-8 hover:bg-amber-700"
          >
            Create Order
          </button>
        </Modal>
      </div>
    </>
  );
}
