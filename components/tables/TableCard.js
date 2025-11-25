"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { updateTable } from "@/redux/slices/CustomerSlices";
import { getRandomBG,getAvatarName } from "@/utils/index"; 

export default function TableCard({ id, name, status, initials, seats }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const bgColor = useMemo(() => getRandomBG(), []);

  function handleTableClick(name) {
    if (status === "Booked") return;

    dispatch(updateTable({ tableId: id, tableNo: name  }));
    router.push("/menu");
  }

  return (
    <div
      onClick={() => handleTableClick(name)}
      key={id}
      className="relative bg-[#1f1f1f] w-[400px] h-[190px] hover:bg-[#2c2c2c] rounded-lg p-4 mb-4 cursor-pointer"
    >
      <div className="flex items-center justify-between px-2">
        <h1 className="text-[#f5f5f5] font-semibold text-lg">Table: {name}</h1>

        <p
          className={`${
            status === "Booked"
              ? "text-green-600 bg-[#2e4a40]"
              : "bg-[#664a04] text-white"
          } px-2 py-1 rounded-lg`}
        >
          {status}
        </p>
      </div>

      <div className="flex items-center justify-center mt-4 mb-2">
        <h1
          style={{ backgroundColor: initials? bgColor :"#1a1a1a" }}
          className="text-[#f5f5f5] rounded-full p-4 text-2xl font-semibold"
        >
          {getAvatarName(initials) ||"N/A"} 
        </h1>
      </div>

      {/* Seats bottom-left */}
      <p className="absolute bottom-3 left-4 text-[#c9c9c9] text-sm font-medium">
        Seats: {seats}
      </p>
    </div>
  );
}
