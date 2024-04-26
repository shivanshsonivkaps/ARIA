"use client";
import ChatGPT from "@/assets/chatgpt.png";
import Avatar from "@/components/avatar";
import Image from "next/image";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { FaArrowUp } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
import Message from "@/app/(routes)/chat/Message";
import { Suggestions } from "@/lib/constants";
const ChatPage = ({ fullName }: { fullName: string }) => {
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState<any>({});
  const [lastInput, setLastInput] = useState("");
  const [loader, setLoader] = useState(false);
  const [answer, setAnswer] = useState<any>("...");

  const handlePrompt = async (e: any) => {
    setShowChat(true);
    setLoader(true);
    e.preventDefault();
    const Id = new Date().toLocaleString();
    const ques = { req: input, res: "..." };

    // setChatData({ ...chatData, [Id]: { req: input, res: "..." } });

    setChatData((prevChatData: any) => ({
      ...prevChatData,
      [Id]: ques,
    }));

    try {
      if (input) {
        console.log("inside try");
        setLastInput(input);
        const res = await axios.post("http://127.0.0.1:5000/chat", {
          question: input,
        });
        const ans = res.data.answer;
        if (!ans) {
          setChatData((prevChatData: any) => ({
            ...prevChatData,
            [Id]: { req: input, res: "something went wrong. Refresh the page" },
          }));
        }
        setAnswer([ans]);
        setLoader(false);
        // setChatData({ ...chatData, [Id]: newData });
        setChatData((prevChatData: any) => ({
          ...prevChatData,
          [Id]: { req: input, res: ans },
        }));
      }
    } catch (error) {
      console.log(error);
      setChatData((prevChatData: any) => ({
        ...prevChatData,
        [Id]: { req: input, res: "something went wrong. Refresh the page" },
      }));
    }

    setInput("");
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-end  lg:px-32 '>
      {/* Chat */}

      {showChat && (
        // <Message
        //   fullName={fullName}
        //   chatData={chatData}
        //   lastInput={lastInput}
        // />
        <div className=' w-full h-full overflow-y-scroll  flex flex-col items-start justify-start p-5 text-sm'>
          {chatData &&
            Object.keys(chatData).map((id: any) => {
              const { req, res } = chatData[id];
              return (
                <div key={id} className='flex flex-col my-5 gap-10  w-full'>
                  <div className='flex flex-col gap-3'>
                    <Avatar fullName={fullName} showName='You' />
                    <p>{req || lastInput}</p>
                  </div>
                  <div className='flex flex-col gap-3'>
                    <Avatar fullName='GPT' showName='GPT' />
                    {req === lastInput ? (
                      <Typewriter
                        words={[res]}
                        loop={res !== "..." ? 1 : 0}
                        typeSpeed={80}
                      />
                    ) : (
                      <p className='text-sm'>{res}</p>
                    )}
                  </div>
                </div>
              );
            })}
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
            classNames={{
              label: "text-black/50 dark:text-white/90",
              inputWrapper: ["!h-[60px] rounded-2xl"],
            }}
            endContent={
              <Button
                id='submit'
                className='bg-white  text-black rounded-xl'
                disabled={input === "" ? true : false}
                onClick={handlePrompt}
              >
                <FaArrowUp className='' />
              </Button>
            }
          />
        </div>
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
