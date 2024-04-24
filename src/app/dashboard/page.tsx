import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = () => {
  const { userId } = auth();
  console.log(userId);
  return <div>page</div>;
};

export default page;
