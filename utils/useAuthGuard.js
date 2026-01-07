"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(
          `${process.env.NEXT_PUBLIC_BILLM_BACKEND_URL}/api/user/verify`,
          { withCredentials: true }
        );
      } catch (err) {
        router.replace("/login");
      }
    };

    checkAuth();
  }, []);
}
