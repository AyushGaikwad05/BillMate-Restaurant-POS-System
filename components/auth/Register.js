"use client";
import { useState } from "react";
import { register } from "@/https";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import {useRouter} from "next/navigation";
import { useMutation } from "@tanstack/react-query";
export default function Register() {
  const router=useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    RegisterMutation.mutate(formData); 
  };


  const RegisterMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (response) => {
        const {data}=response
        enqueueSnackbar(data.message,{variant:"success"})
        setFormData({
          name:"",
          email:"",
          phone:"",
          password:"",
          role:""
        })

        router.push("/login")
    },
    onError: (error) => {
        const {response}=error; 
        enqueueSnackbar(response.data.message,{variant:"error"});

    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>

        {/* Name */}
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">Employee Name</label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="name"
              placeholder="Enter Your Name"
              className="bg-transparent flex-1 text-white focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Employee Email</label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="text"
              name="email"
              placeholder="Enter Your Email"
              className="bg-transparent flex-1 text-white focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Phone Number</label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="number"
              name="phone"
              placeholder="Enter Your Phone Number"
              className="bg-transparent flex-1 text-white focus:outline-none"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Password</label>
          <div className="flex item-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="bg-transparent flex-1 text-white focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Choose your role</label>
            <div className="flex item-center gap-3 mt-4">
              {["Waiter", "Cashier", "Admin"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSelect(role)}
                  className={`px-4 py-3 w-full rounded-lg
                    ${formData.role === role
                      ? "bg-[#fff6f6] text-black font-semibold"
                      : "bg-[#1f1f1f] text-[#c5c5c5] hover:bg-[#fff6f6] hover:text-black"
                    }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button className="w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold">
          Sign Up
        </button>
      </form>
    </div>
  );
}
