import Sidebar from "@/components/sidebar";
import React from "react";
import Chat from "@/components/Chat";
import { auth } from "@clerk/nextjs/server";
const layout = () => {
  const { sessionClaims } = auth();
  const fullName: any = sessionClaims?.fullName;
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center '>
      <div className='main-container  basis-[25%] bg-[#171717]'>
        <Sidebar fullName={fullName} />
      </div>

      {/* CONTENT */}
      <div className='main-container bg-[#212121] '>
        {" "}
        <Chat fullName={fullName} />
      </div>
    </div>
  );
};

export default layout;
