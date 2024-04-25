"use client";
import ChatGPT from "@/assets/chatgpt.png";
import Avatar from "@/components/avatar";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@nextui-org/react";
import { FaArrowUp } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import axios from "axios";
const ChatPage = ({ fullName }: { fullName: string }) => {
  const [input, setInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState([]);

  const handlePrompt = async (e: any) => {
    e.preventDefault();

    try {
      if (input) {
        const res = await axios.post("http://127.0.0.1:5001/chat", {
          question: input,
        });
        console.log(res);
        // const data = await res.json();
        // setChatData([...chatData, { req: input, res: data.message }]);
        // setInput("");
        // setShowChat(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full h-full flex flex-col items-center justify-end  lg:px-32 '>
      {/* Chat */}
      {showChat && (
        <div className=' w-full h-full overflow-y-scroll  flex flex-col items-start justify-start p-5 text-sm'>
          {chatData.map(({ req, res, id }: IChat) => (
            <div key={id} className='flex flex-col my-5 gap-10  w-full'>
              <div className='flex flex-col gap-3'>
                <Avatar fullName={fullName} showName='You' />
                <p>{req}</p>
              </div>

              <div className='flex flex-col gap-3'>
                <Avatar fullName='GPT' showName='GPT' />
                {chatData.length - 1 === id ? (
                  <Typewriter words={[res]} />
                ) : (
                  <p className='text-sm'>{res}</p>
                )}
              </div>
            </div>
          ))}
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
        {!showChat && (
          <div className='grid lg:grid-cols-2 gap-x-2 gap-y-2 mt-10 w-full'>
            <div className='suggestion-container'>
              <p className='font-semibold'>Chatgpt starter guide</p>
              <p className='text-[#8a8a8a]'>write with simple examples</p>
            </div>
            <div className='suggestion-container'>
              <p className='font-semibold'>Chatgpt starter guide</p>
              <p className='text-[#8a8a8a]'>write with simple examples</p>
            </div>
            <div className='suggestion-container'>
              <p className='font-semibold'>Chatgpt starter guide</p>
              <p className='text-[#8a8a8a]'>write with simple examples</p>
            </div>
            <div className='suggestion-container'>
              <p className='font-semibold'>Chatgpt starter guide</p>
              <p className='text-[#8a8a8a]'>write with simple examples</p>
            </div>
          </div>
        )}

        {/* CHAT */}
        <div className='w-full mt-5 flex items-center '>
          <Input
            type='text'
            fullWidth
            onChange={(e) => setInput(e.target.value)}
            placeholder='you@example.com'
            variant='bordered'
            classNames={{
              label: "text-black/50 dark:text-white/90",
              inputWrapper: ["!h-[60px] rounded-2xl"],
            }}
            endContent={
              <Button
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
