import Avatar from "@/components/avatar";
import React, { Suspense, useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Message = ({
  chatData,
  lastInput,
  fullName,
}: {
  chatData: object;
  lastInput: string;
  fullName: string;
}) => {
  const [renderedChat, setRenderedChat] = useState<any>(chatData);
  useEffect(() => {
    setRenderedChat(chatData);
  }, [chatData]);

  return (
    <div className=' w-full h-full overflow-y-scroll  flex flex-col items-start justify-start p-5 text-sm'>
      {chatData &&
        Object.keys(renderedChat).map((id: string) => {
          //@ts-ignore
          const { req, res } = chatData[id];
          return (
            <div key={id} className='flex flex-col my-5 gap-10  w-full'>
              <div className='flex flex-col gap-3'>
                <Avatar fullName={fullName} showName='You' />
                <p>{req}</p>
              </div>

              <div className='flex flex-col gap-3'>
                <Avatar fullName='GPT' showName='GPT' />
                {req === lastInput ? (
                  <Suspense fallback={<p>...</p>}>
                    <Typewriter words={[res]} />
                  </Suspense>
                ) : (
                  <p className='text-sm'>{res}</p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Message;
