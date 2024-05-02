"use client";
import { UserButton } from "@clerk/nextjs";
import Avatar from "@/components/avatar";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentSession, setShowChat } from "@/lib/features/chat/chatSlice";
const Sidebar = ({ fullName }: { fullName: string }) => {
  const chats = useAppSelector((state) => state.chats);
  const currentSession = useAppSelector((state) => state.currentSession);
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col justify-between h-full p-3 w-full'>
      <div className='flex items-center justify-between p-3'>
        <p className='text-sm'>New Chat</p>
        <FaEdit
          className='text-gray-500 hover:text-white cursor-pointer'
          onClick={() => {
            dispatch(setCurrentSession(""));
            dispatch(setShowChat(false));
          }}
        />
      </div>

      {/* HISTORY */}
      <div className='flex flex-col gap-4 items-start justify-start h-full p-3 overflow-hidden whitespace-nowrap'>
        {Object.keys(chats).map((id) => (
          <p
            className={`${id === currentSession && "bg-[#2a2a2a]"}
            cursor-pointer
             hover:bg-[#2a2a2a] rounded-lg w-full p-2 overflow-hidden text-ellipsis transition-all ease-in-out `}
            key={id}
            onClick={() => {
              dispatch(setCurrentSession(id));
            }}
          >
            {chats[id][0]?.req}
          </p>
        ))}
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
