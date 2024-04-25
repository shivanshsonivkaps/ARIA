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
      <div className='w-6 h-6 text-sm rounded-full p-2 bg-gray-500 flex items-center justify-center'>
        {initials}
      </div>
      {showName && showName}
    </div>
  );
};

export default Avatar;
