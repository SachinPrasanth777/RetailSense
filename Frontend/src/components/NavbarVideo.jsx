import React from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full mx-auto flex justify-between items-center p-6 pt-4 mt-3 text-black">
      <div className="flex justify-center items-center gap-4">
        <div className="bg-white rounded-full p-3">
          <FaUser size={20} />
        </div>
        <p className=" text-2xl font-extrabold">
          Retail <span className="text-2xl font-light">Sense</span>
        </p>
      </div>

      <div
        className="hidden max bg-white 0 rounded-full justify-center justify-self-end md:flex md:text-[10px] md:py-2 md:px-5 md:gap-4
        lg:text-xs lg:py-3 lg:px-7 lg:gap-10"
      >
        <a href="#" className="hover:underline">
          About
        </a>
        <a href="#" className="hover:underline">
          Github
        </a>
      </div>
    </div>
  );
};

export default Navbar;
