import { formatDate, formateDateAndTIme, getAvatarName } from "@/utils";
import { FaCheckDouble, FaCircle } from "react-icons/fa";
export default function OrderCard({order}) {


    return (
        <>
           <div className="w-full max-w-[480px] bg-[#1f1f1f] p-5 rounded-lg">

                <div className="flex itesm-center gap-5">
                    <button className="bg-[#f6b100] px-3 text-xl font-bold text-[black] rounded-lg p-3">{getAvatarName(order.customerDetails.name)}</button>
                    <div className="flex items-center gap-4 justify-between w-[100%]">
                        <div className="flex flex-col items-start gap-2">
                            <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide ">{order.customerDetails.name}</h1>
                            <p className="text-[#ababab] text-sm"> #{Math.floor(new Date(order.orderDate).getTime())}/ Dine in</p>
                            <p className="text-[#ababab] text-sm">Table: {order.tableNumber}</p>
                        </div>

                        

                        <div className="flex flex-col items-start gap-2">
                        {
                            order.orderStatus==="Ready"?(
                            <>
                             <p className=" text-green-600 px-4 bg-[#2e4a40] rounded-lg "><FaCheckDouble className="inline mr-2" />{order.orderStatus}</p>
                            <p className="text-[#ababab] text-sm"><FaCircle className="inline mr-2 text-[green]" />Ready to Serve</p>
                            </>
                           ):   (<>
                                         <p className=" text-yellow-600 px-4 bg-[#4a452e] rounded-lg "><FaCircle className="inline mr-2" />{order.orderStatus}</p>
                            <p className="text-[#ababab] text-sm"><FaCircle className="inline mr-2  text-yellow-600" />Preparing your order</p>
                           </>)
                        }
                        </div>
                    </div>


                </div>
                <div className="flex justify-between items-center mt-4 text-[#ababab]">
                    <p>{formateDateAndTIme(order.createdAt)}</p> 
                    <p>{order.items.length} Items</p>
                </div>
                <hr className="text-[#ababab] w-full mt-3" />
                <div className="flex justify-between mt-2 gap-2">
                    <h1 className="text-[#f5f5f5] text-xl" >Total</h1>
                    <p className="text-[#f5f5f5] text-lg font-semibold">₹{order.bills.totalWithTax}</p>
                </div>
            </div>
        </>
    );
}