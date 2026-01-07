"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useAuthGuard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BILLM_BACKEND_URL}/api/user/verify`,
          { withCredentials: true }
        );
        setChecking(false); // ✅ authenticated
      } catch (err) {
        router.replace("/login"); // 🚀 instant redirect
      }
    };

    checkAuth();
  }, []);

  return checking;
}
