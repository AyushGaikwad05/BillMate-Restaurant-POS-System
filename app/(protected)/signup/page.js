import Image from "next/image";
import bg from "@/public/resto-bg.jpg";
import logo from "@/public/assets/BillMate.png"
import Register from "@/components/auth/Register";
import Link from "next/link";
export default function SignUpPage() {
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
          -- Great service begins with you.
            <br />
          </blockquote>
        </div>

        {/* Right Section */}
        <div className="w-2/2 min-h-screen bg-[#1a1a1a] p-10">
          {/* form goes here */}
          <div className="flex flex-col items-center gap-2">
            <Image src={logo} alt="BillMate Logo" width={150}/>
            
          </div>

          <hr className=" pt-8 px-5 mt-4 text-[#a1a1a1] opacity-100"/>

            <h2 className="text-3xl text-center  font-semibold text-yellow-400 mb-5">Employee Registration</h2>
        <Register/ >
            <div className="flex justify-center mt-6">
                
                <p className="text-sm text-[#ababab]">Already have an account? <Link 
    className="text-yellow-400 font-semibold hover:underline" 
    href="/login"
  >
    Sign In
  </Link></p>
                
            </div>

        </div>
      </div>
    </>
  );
}
