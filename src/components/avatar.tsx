import { getInitials } from "@/lib/utils";

import React from "react";

const Avatar = ({
  fullName,
  showName = false,
}: {
  fullName: string;
  showName?: any;
}) => {
  const initials = getInitials(fullName);

  return (
    <div className='flex items-center gap-3'>
      <div className='w-6 h-6  rounded-full p-3  bg-gray-500 flex items-center justify-center '>
        <p className='text-sm text-center '>{initials}</p>
      </div>
      {showName && <p className='font-bold'>{showName}</p>}
    </div>
  );
};

export default Avatar;
