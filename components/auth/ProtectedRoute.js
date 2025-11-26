"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://billmate-pos-backend.onrender.com/api/user/verify", {
      method: "GET",
      credentials: "include", // send cookies with request
    })
      .then((res) => {
        if (res.status !== 200) {
          router.push("/signup"); // redirect if not authorized
        } else {
          setLoading(false); // authorized, stop loading
        }
      })
      .catch(() => {
        router.push("/signup");
      });
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner
  }

  return children; // render protected content
}
