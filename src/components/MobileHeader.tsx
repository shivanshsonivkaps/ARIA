"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  removeChat,
  setCurrentSession,
  setShowChat,
} from "@/lib/features/chat/chatSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FaEdit } from "react-icons/fa";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { MdDeleteForever } from "react-icons/md";
import NewChat from "./NewChat";
import { Separator } from "./ui/separator";
import { useState } from "react";

const PhoneSidebar = ({
  dispatch,
  session,
  chats,
  dialogOpen,
  handleCloseDialog,
}: {
  dispatch: any;
  session: string;
  dialogOpen: boolean;
  chats: any;
  handleCloseDialog: () => void;
}) => {
  return (
    <Sheet open={dialogOpen} onOpenChange={handleCloseDialog}>
      <SheetTrigger onClick={() => handleCloseDialog()} data-set={dialogOpen}>
        <HiOutlineBars3CenterLeft className='text-gray-500 hover:text-white cursor-pointer text-2xl font-bold' />
      </SheetTrigger>

      <SheetContent
        side={"left"}
        className='bg-[#171717] flex flex-col gap-5 border-2 '
      >
        <NewChat />
        <Separator />
        <div className='flex flex-col gap-4 items-start justify-start h-full p-3 overflow-hidden whitespace-nowrap'>
          {Object.keys(chats).map((id) => (
            <div
              className={`${id === session && "bg-[#2a2a2a]"}

            cursor-pointer
             hover:bg-[#2a2a2a] flex items-center justify-between rounded-lg w-full p-2 overflow-hidden text-ellipsis transition-all ease-in-out `}
              key={id}
            >
              <p
                className='w-8/12 overflow-hidden text-ellipsis'
                onClick={() => {
                  dispatch(setCurrentSession(id));
                  handleCloseDialog();
                  dispatch(setShowChat(true));
                }}
              >
                {chats[id][0]?.req}
              </p>
              <MdDeleteForever
                className='hover:text-white text-[#6b6b6b]'
                onClick={() => {
                  console.log(id);
                  dispatch(removeChat(id));
                }}
              />
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const MobileHeader = () => {
  const dispatch = useAppDispatch();
  const currentSession = useAppSelector((state) => state.currentSession);
  const chats = useAppSelector((state) => state.chats);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleCloseDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div className='w-screen border-2 flex items-center justify-between p-2 bg-transparent'>
      <PhoneSidebar
        dispatch={dispatch}
        session={currentSession}
        chats={chats}
        dialogOpen={dialogOpen}
        handleCloseDialog={handleCloseDialog}
      />

      <div className=''>
        <FaEdit
          className='text-gray-500 hover:text-white cursor-pointer'
          onClick={() => {
            dispatch(setCurrentSession(""));
            dispatch(setShowChat(false));
          }}
        />
      </div>
    </div>
  );
};

export default MobileHeader;