
"use client";
import { MdTableBar,MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "@/components/dashboard/Metrics";
import RecentOrder from "@/components/dashboard/RecentOrder";
import { act, useState } from "react";
import Modal from "@/components/dashboard/Modal";
import Navbar from "@/components/Navbar";
export default function Dashboard () {

    const [isTableModalOpen,setIsTableModalOpen]=useState(false); 
    const [activeTab,setActiveTab]=useState("Metrics"); 

    const handleOpenModal =(action)=>{
        if(action==="table")
            setIsTableModalOpen(true); 
    }
    const buttons=[
        {
            label:"Add Table",
            icon:<MdTableBar/>,
            action:"table"
        },
         {
            label:"Add Category",
            icon:<MdCategory/>,
            action:"category"
        },
         {
            label:"Add Dishes",
            icon:<BiSolidDish/>,
            action:"dishes"
        },

    ]


    const tabs = ["Metrics", "Orders", "Payments"];
    return (
        <>
        <Navbar />
         <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
            <div className="container mx-auto flex items-center justify-between py-14 px-6 md:px-4">
                    <div className="flex items-center gap-3">
                            {
                                buttons.map(({label,icon,action})=>{
                                        return (
                                            <button key={label} onClick={()=>handleOpenModal(action)} className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ">       {label} {icon}</button>
                                             
                                        )
                                })
                            }
                    </div>
                     <div className="flex items-center gap-3">
                            {
                                tabs.map((tab,index)=>{
                                        return (
                                            <button key={index} onClick={()=>setActiveTab(tab)} className={` hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${activeTab===tab ? 'bg-[#262626]':"bg-[#1a1a1a]"}`}>{tab}</button>
                                             
                                        )
                                })
                            }
                    </div>
            </div>
            {activeTab==="Metrics" &&    <Metrics/>}
             {  activeTab==="Orders" &&  <RecentOrder/>}
          {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen}/>} 
          
         </div>
        </>
    );
}