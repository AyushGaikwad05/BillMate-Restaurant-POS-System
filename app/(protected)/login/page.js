import Image from "next/image";
import bg from "@/public/resto-bg.jpg";
import logo from "@/public/assets/BillMate.png"
import Login from '@/components/auth/Login'
import Link from "next/link";

export default function LoginPage() {



  return (
    <>
      <div className="flex min-h-screen w-full">
        {/* Left Section */}
        <div className="relative w-4/2 min-h-screen">
          {/* Background Image */}
          <Image
            src={bg}
            alt="Restaurant Image"
            fill              // make it fill the parent
            className="object-cover" // cover the whole area
          />

          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/55 z-10" />

          {/* Quote */}
          <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white z-20" >
            -- Your shift today creates someone’s best meal memory.
            <br />
          </blockquote>
        </div>

        {/* Right Section */}
        <div className="w-2/2 min-h-screen bg-[#1a1a1a] p-10">
          {/* form goes here */}
          <div className="flex flex-col items-center gap-2">
            <Image src={logo} alt="BillMate Logo" width={150} />

          </div>

          <hr className=" pt-8 px-5 mt-4 text-[#a1a1a1] opacity-100" />

          <h2 className="text-3xl text-center  font-semibold text-yellow-400 mb-5">Employee Login</h2>
          <Login />
          <div className="flex justify-center mt-6">

            <p className="text-sm text-[#ababab]">Dont have account ? <Link className="text-yellow-400 font-semibold hover:underline" href="/signup">Sign Up</Link></p>

          </div>
          <div className="text-center mt-8 bg-[#626F47] rounded-lg px-5 py-5 ">
            <p className="text-white font-semibold">You can use the credentials below to continue as a guest:</p>
            <p><span className="font-bold text-white">Email: </span> guest@gmail.com</p>
            <p><span className="font-bold text-white">Password:</span> 12345</p>
          </div>

        </div>
      </div>
    </>
  )
}