'use client';
import BottomNavBar from "@/components/BottomNav";
import Navbar from "@/components/Navbar";
import BackButton from "@/shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";
import MenuContainer from "@/components/menu/MenuContainer";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import CustomerInfo from "@/components/menu/CustomerInfo";
import CartInfo from "@/components/menu/CartInfo";
import Bills from "@/components/menu/Bills";
import {useSelector} from "react-redux";
import useAuthGuard from "@/utils/useAuthGuard";
export default function MenuPage() {
   const checking = useAuthGuard();
    
  
  const customerData= useSelector(state=>state.customer);
    if (checking) {
        return null; // ⛔ NOTHING renders
        // OR return <Loader />
      }
  return (
    <section className="bg-[#1a1a1a] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex flex-1 gap-3 px-4 py-0 overflow-hidden">
        {/* Left Section */}
        <div className="flex-[3] bg-[#1f1f1f] rounded-xl flex flex-col justify-start p-4">
          {/* Top Row: Back Button + Menu Title + Customer Info */}
          <div className="flex items-center justify-between">
            {/* Left side - Back and Menu */}
            <div className="flex items-center gap-3">
              <BackButton />
              <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
                Menu
              </h1>
            </div>

            {/* Right side - Customer Info */}
            <div className="flex items-center gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-[#f5f5f5] text-3xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
                  {customerData.customerName || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                 {customerData.tableNo || "Table N/A"}
                </p>
              </div>
            </div>
          </div>
                  <MenuContainer></MenuContainer>
        </div>




        {/* Right Section */}
        <div className="flex-[1] bg-[#1f1f1f] rounded-xl">
          <CustomerInfo></CustomerInfo>
          <hr className="border-[#2a2a2a] border-t-2" />

          {/* Cart Items */ }
            <CartInfo/>
                <hr className="border-[#2a2a2a] border-t-2" />
            <Bills/>
        </div>
       

      </div>
      

      {/* Bottom Navbar */}
      <BottomNavBar />
    </section>
  );
}
