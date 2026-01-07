'use client';
import BottomNavBar from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import TableCard from "@/components/tables/TableCard";
import BackButton from "@/shared/BackButton";
import { useState } from 'react';
import { tables } from "@/home/index";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "@/https/index";
import { enqueueSnackbar } from "notistack";
export default function Tables() {

    const { data: resData, isError } = useQuery({
        queryKey: ["tables"],
        queryFn: async () => {
            return await getTables();

        },
        placeholderData: keepPreviousData
    })

    if (isError) {
        enqueueSnackbar("Something Went Wrong! ", { variant: "error" })
    }
    console.log(resData);

    const [status, setStatus] = useState('all');
    return (
        <section className="bg-[#1a1a1a] h-[100vh] flex flex-col">
            <Navbar />

            {/* Header */}
            <div className="flex items-center justify-between px-10 py-4 ">
                <div className="flex items-center gap-4">
                    <BackButton></BackButton>
                </div>
                <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">Tables</h1>
                <div className="flex items-center justify-around gap-4">
                    <button onClick={() => setStatus("all")} className={`text-[#ababab] text-lg ${status === 'all' && " bg-[#383838]"} rounded-lg px-4 py-2 font-semibold`}>All</button>
                    <button onClick={() => setStatus("booked")} className={`text-[#ababab] text-lg ${status === 'booked' && " bg-[#383838]"} rounded-lg px-4 py-2 font-semibold`}>Booked</button>

                </div>
            </div>

            {/* Scrollable list area */}
            <div className="flex flex-wrap content-start items-start h-[calc(100vh-5rem-5rem)] px-14 py-1 gap-6 overflow-y-auto scrollbar-hide">
                {
                    resData?.data.data.map((table) => {
                        return (<TableCard
                            key={table._id}
                            id={table._id}
                            name={table.tableNo}
                            status={table.status}
                            initials={table?.currentOrder?.customerDetails?.name}
                            seats={table.currentOrder?.customerDetails.guests}
                        />)
                    })
                }
            </div>


            <BottomNavBar />
        </section>
    );
}