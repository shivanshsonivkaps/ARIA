import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = () => {
  const { userId } = auth();
  console.log(userId);
  return (
    <div>
      <UserButton />
    </div>
  );
};

export default page;
