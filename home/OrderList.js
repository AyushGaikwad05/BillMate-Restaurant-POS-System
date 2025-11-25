import { getAvatarName } from "@/utils";
import { FaCheckDouble,FaCircle } from "react-icons/fa";
export default function OrderList ({key,order}) {
    return (
        <div className="flex items-center gap-6 mb-3">  
            <button className="bg-[#f6b100] px-3 text-xl font-bold text-[black] rounded-lg">{getAvatarName(order.customerDetails.name)}</button>
            <div className="flex items-center gap-4 justify-between w-[80%]">
                    <div>
                        <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide ">{order.customerDetails.name}</h1>
                        <p className="text-[#ababab]"> {order.items.length} Items</p>
                    </div>

                        <div className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-2">
                            <h1>Table No: {order.tableNumber}</h1>
                        </div>

                    <div className="flex flex-col items-start gap-2">
                        {
                            order.orderStatus==="Ready"?(
                            <>
                             <p className=" text-green-600 px-4 bg-[#2e4a40] "><FaCheckDouble className="inline mr-2" />{order.orderStatus}</p>
                            <p className="text-[#ababab] text-sm"><FaCircle className="inline mr-2 text-[green]" />Ready to Serve</p>
                            </>
                           ):   (<>
                                         <p className=" text-yellow-600 px-4 bg-[#4a452e] rounded-lg "><FaCircle className="inline mr-2" />{order.orderStatus}</p>
                           </>)
                        }
                    </div>
            </div>
        </div>
    ); 
}



