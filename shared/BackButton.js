'use client';
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="mt-3 ml-5 flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#025cca] hover:bg-[#014bb0] transition-all duration-200"
    >
      <IoArrowBack size={20} color="white" />
    </button>
  );
}
