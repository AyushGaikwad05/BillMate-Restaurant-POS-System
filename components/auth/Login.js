"use client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { login } from "@/https";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import {useRouter} from "next/navigation";
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router=useRouter();  
  const dispatch=useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (response) => {
        const {data}=response
        const {_id,name,email,phone,role}=data.data; 
            
        dispatch(setUser({_id,name,email,phone,role})); 
        router.push("/")

      console.log("Login Success:", response.data);

    },
    onError: (error) => {
        const {response}=error; 
        enqueueSnackbar(response.data.message,{variant:"error"});

    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Employee Email
            </label>

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

          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Password
            </label>

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
          </div>
         

          <button className="w-full mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold">
            Sign In
          </button>
        </form>
      </div>
  
    </div>
    
  );
}
