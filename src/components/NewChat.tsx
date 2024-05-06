import { setCurrentSession, setShowChat } from "@/lib/features/chat/chatSlice";
import { useAppDispatch } from "@/lib/hooks";
import React from "react";
import { FaEdit } from "react-icons/fa";

const NewChat = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex items-center justify-between mt-5 font-bold w-full '>
      <p className='text-sm'>New Chat</p>
      <FaEdit
        className='text-gray-500 hover:text-white cursor-pointer'
        onClick={() => {
          dispatch(setCurrentSession(""));
          dispatch(setShowChat(false));
        }}
      />
    </div>
  );
};

export default NewChat;
