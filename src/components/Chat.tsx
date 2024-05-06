"use client";
import ChatGPT from "@/assets/chatgpt.png";
import Avatar from "@/components/avatar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { FaArrowUp, FaSpinner } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import { Suggestions } from "@/lib/constants";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addNewChat,
  setCurrentSession,
  setShowChat,
} from "@/lib/features/chat/chatSlice";
import { generateRandomAlphaNumeric } from "@/lib/utils";
import { createChat } from "@/lib/actions/chat.actions";

const ChatPage = ({ fullName }: { fullName: string }) => {
  const chats = useAppSelector((state) => state.chats);
  const showChat = useAppSelector((state) => state.showChat);
  const currentSession = useAppSelector((state) => state.currentSession);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const [chatData, setChatData] = useState<any>(chats);
  const [lastInput, setLastInput] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setChatData(chats);
  }, [chats]);

  const handlePrompt = async (e: any) => {
    dispatch(setShowChat(true));
    setLoader(true);
    e.preventDefault();
    setLastInput(input);
    const response = await createChat({
      question: input,
      session: currentSession,
    });
    const ans = response.res;
    if (currentSession === "" || currentSession === null) {
      const newId = generateRandomAlphaNumeric();
      dispatch(setCurrentSession(newId));
      dispatch(addNewChat({ req: "", res: "" }));
    }
    if (ans !== "Something went wrong. Please try again.")
      dispatch(addNewChat({ req: input, res: response.res }));
    setChatData((prevChatData: any) => ({
      ...prevChatData,
      [currentSession]: { req: input, res: ans },
    }));
    setLoader(false);
    setInput("");
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-end  lg:px-32 '>
      {/* Chat */}

      {showChat && (
        <div className=' w-full h-full overflow-y-scroll  flex flex-col items-start justify-start p-5 text-sm'>
          {chatData &&
            chats &&
            chats[currentSession] &&
            chats[currentSession].map(
              ({ req, res }: { req: string; res: string }, index: string) => {
                return (
                  <div
                    key={index}
                    className='flex flex-col my-5 gap-10  w-full'
                  >
                    <div className='flex flex-col gap-3'>
                      <Avatar fullName={fullName} showName='You' />
                      <p>{req || lastInput}</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Avatar fullName='GPT' showName='NasaGPT' />
                      {req === lastInput ? (
                        <Typewriter
                          words={[res]}
                          loop={res !== "..." ? 1 : 0}
                          typeSpeed={30}
                        />
                      ) : (
                        <p className='text-sm'>{res}</p>
                      )}
                    </div>
                  </div>
                );
              }
            )}
        </div>
      )}
      {!showChat && (
        <div className='flex flex-col items-center gap-5'>
          <Image src={ChatGPT} alt='logo' width={50} height={50} />
          <p className='text-xl font-bold'>How can I help you today?</p>
        </div>
      )}

      <div className='w-full'>
        {/* Suggestions and Chat*/}
        <div className='grid lg:grid-cols-2 gap-x-2 gap-y-2 mt-10 w-full'>
          {!showChat &&
            Suggestions.map(({ heading, desc }, index) => (
              <div
                key={index}
                className='suggestion-container cursor-pointer'
                onClick={() => {
                  setInput(heading);
                  // document.getElementById("submit")?.click();
                  setTimeout(() => {
                    document.getElementById("submit")?.click();
                  }, 0);
                }}
              >
                <p className='font-semibold'>{heading}</p>
                <p className='text-[#8a8a8a]'>{desc}</p>
              </div>
            ))}
        </div>
        {/* CHAT */}
        <div className='w-full mt-5 flex items-center '>
          <Input
            type='text'
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Ask your question'
            variant='bordered'
            disabled={loader ? true : false}
            classNames={{
              label: "text-black/50 dark:text-white/90",
              inputWrapper: ["!h-[60px] rounded-2xl"],
            }}
            endContent={
              <Button
                id='submit'
                className='bg-white  text-black rounded-xl'
                disabled={input === "" ? true : loader ? true : false}
                onClick={handlePrompt}
              >
                {loader ? (
                  <FaSpinner className='animate-spin' />
                ) : (
                  <FaArrowUp className='' />
                )}
              </Button>
            }
          />
        </div>
        <p className='text-center text-[11px] my-2'>
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
};

export default ChatPage;

interface IChat {
  id: number;
  req: string;
  res: string;
}
