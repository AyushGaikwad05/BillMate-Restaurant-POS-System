'use client';
import BottomNavBar from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import OrderCard from "@/components/orders/OrderCard";
import BackButton from "@/shared/BackButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from 'react'; 
import { getOrder } from "@/https";
import { enqueueSnackbar } from "notistack";
import useAuthGuard from "@/utils/useAuthGuard";
export default function OrderPage() {

   const checking = useAuthGuard();
    
      if (checking) {
        return null; // ⛔ NOTHING renders
        // OR return <Loader />
      }

  const [status, setStatus] = useState('all');
  useEffect(()=>{
    document.title="POS | Orders"
  },[])

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
    <section className="bg-[#1a1a1a] h-[100vh] flex flex-col">
      <Navbar />

      {/* Header */}
      <div className="flex items-center justify-between px-10 py-4 ">
        <div className="flex items-center gap-4">
          <BackButton />
        </div>

        <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
          Orders
        </h1>

        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838]"
            } rounded-lg px-4 py-2 font-semibold`}
          >
            All
          </button>

          <button
            onClick={() => setStatus("progress")}
            className={`text-[#ababab] text-lg ${
              status === "progress" && "bg-[#383838]"
            } rounded-lg px-4 py-2 font-semibold`}
          >
            In Progress
          </button>

          <button
            onClick={() => setStatus("ready")}
            className={`text-[#ababab] text-lg ${
              status === "ready" && "bg-[#383838]"
            } rounded-lg px-4 py-2 font-semibold`}
          >
            Ready
          </button>

          <button
            onClick={() => setStatus("completed")}
            className={`text-[#ababab] text-lg ${
              status === "completed" && "bg-[#383838]"
            } rounded-lg px-4 py-2 font-semibold`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 min-h-0 px-10 py-1 overflow-y-auto scrollbar-hide">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-items-center">

          {resData?.data.data.length > 0 ? (
            resData.data.data.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))
          ) : (
            <p className="text-gray-500">No Orders Available</p>
          )}
        </div>
      </div>

      <BottomNavBar />
    </section>
  );
}
