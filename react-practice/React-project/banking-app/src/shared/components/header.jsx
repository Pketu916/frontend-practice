import React from "react";

const Header = ({ name, balance }) => {
  return (
    <header className="bg-blue-900 p-7 h-24">
      <div className="flex justify-between max-w-6xl mx-auto text-orange-600 font-bold uppercase text-4xl ">
        <h1>{name}</h1>
        <span>{balance}</span>
      </div>
    </header>
  );
};

export default Header;
