import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function ProtectedLayout({ children }) {
  const token = cookies().get("accessToken");

  if (!token) {
    redirect("/login");
  }

  return children;
}
