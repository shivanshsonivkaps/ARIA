import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='main-container flex-center'>{children}</div>;
};

export default layout;
