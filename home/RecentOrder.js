"use client";
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrder } from "@/https";
import Link from "next/link";
export default function RecentOrder () {

    const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return await getOrder();
    },
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something Went Wrong!", { variant: "error" });
  }

    return (
       <div className="px-8 mt-6">
            <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
                <div className="flex justify-between items-center px-6 py-4 ">
                    <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">Recent Orders</h1>
                    <Link href="/orders" className="text-[#025cca] text-sm font-semibold">View all</Link>

                </div>

                
                        <div className="flex items-center gap-4 rounded-[15px] px-6 py-4 mx-6">
                            <FaSearch className="text-[#f5f5f5]"/>
                            <input  type="text" className="  text-[#f5f5f5] outline-none " placeholder="Search for recent orders"></input>
                        </div>

                <div className="mt-6 px-6 gap-3 overflow-y-scroll h-[400px] hide-scrollbar">
                  
                   {resData?.data.data.length > 0 ? (
                              resData.data.data.map((order) => (
                                  <OrderList key={order._id} order={order} />
                              ))
                            ) : (
                              <p className="text-gray-500">No Orders Available</p>
                            )}
                  
                  
                  
                  
                  
              
                 
                </div>
                   
            </div>
       </div>
    );
}