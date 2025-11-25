import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaNotesMedical } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/redux/slices/CartSlice";
import { useEffect,useRef } from "react";



export default function CartInfo() {
  const cartData = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const handleDeleteItem = (itemId)=>{
    dispatch(removeItem(itemId));
  }

  const scrolLRef=useRef();

  useEffect (()=>{
    if(scrolLRef.current)
    {
      scrolLRef.current.scrollTo({
        top:scrolLRef.current.scrollHeight,
        behavior:"smooth"
      })
    }
  },[cartData])
  return (
    <div className="px-4 py-2">
      <h1 className="text-lg text-[#e4e4e4] font-semibold tracking-wide">
        Order Details
      </h1>

<div className="mt-4 overflow-y-scroll hide-scrollbar h-[380px]" ref={scrolLRef}>
  {cartData.length === 0 ? (
    <p className="text-sm text-[gray] font-bold flex justify-center items-center h-[380px]">
      Your cart is empty. Start adding items!
    </p>
  ) : (
    cartData.map((item, index) => {
      return (
        <div key={index} className="bg-[#2c2c2c] rounded-lg px-4 py-4 mb-2">
          <div className="flex items-center justify-between">
            <h1 className="text-[#ababab] font-semibold tracking-wide">
              {item.name}
            </h1>
            <p className="text-[#ababab] font-semibold">x{item.quantity}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <RiDeleteBin2Fill
                onClick={() => handleDeleteItem(item.id)}
                className="text-[#ababab] cursor-pointer"
                size={20}
              />
              <FaNotesMedical className="text-[#ababab] cursor-pointer" size={20} />
            </div>
            <p className="text-[#f5f5f5] text-md font-bold">₹{item.price}</p>
          </div>
        </div>
      );
    })
  )}
</div>

    </div>
  );
}
