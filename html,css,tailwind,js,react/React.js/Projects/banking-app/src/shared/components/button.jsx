import React from "react";

const Button = ({ children, ...props }) => {
  // let btnStyle = "px-3 py-1 rounded-sm m-2 bg-blue-500 text-";

  return (
    <button className="px-3 py-1 rounded-sm m-2 bg-blue-800 hover:bg-blue-700 text-white" {...props}>
      {children}
    </button>
  );
};

export default Button;
