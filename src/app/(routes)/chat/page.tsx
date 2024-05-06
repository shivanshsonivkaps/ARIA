import Sidebar from "@/components/sidebar";
import React from "react";
import Chat from "@/components/Chat";
import { auth } from "@clerk/nextjs/server";

import MobileHeader from "@/components/MobileHeader";

const layout = () => {
  const { sessionClaims } = auth();
  const fullName: any = sessionClaims?.fullName;
  return (
    <>
      <div className='bg-[#171717] sm:hidden'>
        {/* <PhoneSidebar /> */}
        <MobileHeader />
      </div>
      <div className='w-screen h-screen overflow-hidden flex items-center '>
        <div className='md:main-container   md:basis-[25%] bg-[#171717] h-full'>
          <Sidebar fullName={fullName} />
        </div>
        <div className='main-container bg-[#212121] '>
          <Chat fullName={fullName} />
        </div>
      </div>
    </>
  );
};

export default layout;
