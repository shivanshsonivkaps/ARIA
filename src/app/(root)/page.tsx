"use client";
import Image from "next/image";

import { Button } from "@nextui-org/button";
import { CreateUser } from "@/lib/actions/user.actions";
import React, { useLayoutEffect } from "react";
export default function Home() {
  useLayoutEffect(() => {
    window.location.href = "/chat";
  }, []);

  return (
    <div className='main-container flex-center'>
      <button>Loading...</button>
    </div>
  );
}
