import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";


interface Props{
    children:React.ReactNode
}

const ProtectedRoute=({children}:Props)=>{
const {user,loading}=useAuth();
console.log(user);
if (loading) {
    return <div className="p-4">Loading…</div>;
  }

  // 2️⃣ After loading is done, check user
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ User exists, render children
  return <>{children}</>;
};
export default ProtectedRoute;