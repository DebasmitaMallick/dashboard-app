import React from "react";

const CustomButton = ({ wrapper = "button", children, ...props }) => {
  const WrapperTag = wrapper;
  return (
    <WrapperTag
      {...props}
      className="rounded-3xl px-3 py-2.5 border-2 border-stone-300 cursor-pointer outline-0"
    >
      {children}
    </WrapperTag>
  );
};

export default CustomButton;
