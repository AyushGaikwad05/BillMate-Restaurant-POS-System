import { formatDate, getAvatarName } from '@/utils';
import React from 'react'
import {useSelector} from 'react-redux'; 
import {useState} from 'react';

const CustomerInfo = () => {
  const [dateTime, setDataTime]= useState(new Date());
  const CustomerData= useSelector((state)=>state.customer);
  return (
    <div className="flex items-center justify-between px-4 py-3">
            <div className="flex flex-col items-start">
                   <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">{CustomerData.customerName || "Customer Name"} </h1>
              <p className="text-xs text-[#ababab] font-medium mt-1">#{CustomerData.orderId || "N/A"} / Dine In</p>
              <p className="text-xs text-[#ababab] font-medium mt-2">{formatDate(dateTime)}</p>
            </div>
            <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg text-[#1f1f1f]">{getAvatarName(CustomerData.customerName)}</button>
          </div>
  )
}

export default CustomerInfo
