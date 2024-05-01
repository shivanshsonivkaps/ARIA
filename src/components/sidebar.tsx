import { UserButton } from "@clerk/nextjs";
import Avatar from "@/components/avatar";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { FaEdit } from "react-icons/fa";

const Sidebar = ({ fullName }: { fullName: string }) => {
  return (
    <div className='flex flex-col justify-between h-full p-3 w-full'>
      <div className='flex items-center justify-between p-3'>
        <p className='text-sm'>New Chat</p>
        <FaEdit className='text-gray-500 hover:text-white cursor-pointer' />
      </div>

      {/* HISTORY */}
      <div className=''>
        <p>History</p>
      </div>

      {/* USER */}
      <div className='flex items-center gap-2 mb-4'>
        <UserButton />
        <Avatar fullName={fullName} />
        <p>{fullName || ""}</p>
      </div>
    </div>
  );
};

export default Sidebar;
