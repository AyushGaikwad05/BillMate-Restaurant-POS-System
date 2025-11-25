"use client";
import Image from "next/image";
import { FaSearch, FaBell, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import logo from "@/public/assets/BillMate.png";
import { logout } from "./../https/index";
import { removeUser } from "@/redux/slices/userSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      console.log(data);
      dispatch(removeUser());
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    router.push("/login");
  };

  const userData = useSelector((state) => state.user);

  return (
    <nav className="flex justify-between items-center py-3 px-6 bg-[#1a1a1a] shadow-md">
      {/* Left: Logo */}
      <div onClick={()=>router.push("/")} className="flex items-center gap-2 cursor-pointer">
        <Image
          src={logo}
          alt="Bill Mate Logo"
          width={320}
          height={320}
          className="w-14 h-auto object-contain"
        />
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md items-center gap-2 bg-[#333] px-3 py-1 rounded-md ml-6">
        <FaSearch className="text-[#f5f5f5]" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-[#f5f5f5] outline-none placeholder-gray-400 w-full"
        />
      </div>

      {/* Right: Notification + User Section */}
      <div className="flex items-center gap-5">
        {/* Dashboard Icon */}
        {(userData.role === "Admin" || userData.role === "admin") && (
          <div className="bg-[#1f1f1f] p-2 rounded-lg cursor-pointer hover:bg-[#2a2a2a] transition">
            <MdDashboard  onClick={()=>router.push("/dashboard")} className="hover:text-amber-300" size={22} />
          </div>
        )}

        {/* Notifications */}
        <div className="relative cursor-pointer hover:text-yellow-400 transition duration-200">
          <FaBell size={20} />
          {/* Example: notification badge */}
          {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 bg-[#1f1f1f] p-2 rounded-lg">
          <FaUser size={20} className="text-[#f5f5f5]" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">
              {userData.name || "Username"}
            </span>
            <span className="text-xs text-gray-400">{userData.role || "Role"}</span>
          </div>
          <IoIosLogOut
            onClick={handleLogout}
            size={22}
            className="text-[#f5f5f5] cursor-pointer hover:text-red-500 transition"
          />
        </div>
      </div>
    </nav>
  );
}
