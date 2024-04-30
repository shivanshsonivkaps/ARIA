"use client";
import Image from "next/image";

import { Button } from "@nextui-org/button";
import { CreateUser } from "@/lib/actions/user.actions";
import React from "react";
export default function Home() {
  const handleData = async (e: any) => {
    e.preventDefault();
    const user = {
      clerkId: "abc",
      name: "Shivansh Soni",
      email: "abc@example.com",
      phone: "123456789",
    };

    const res = await CreateUser(user);
    console.log(res);
  };
  return (
    <>
      <button onClick={handleData}>Click to enter Data</button>
    </>
  );
}
