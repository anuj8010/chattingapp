import React from 'react';
import myimage from "./media/myimage.png";

const Homepage = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4">
        <div className="flex gap-4 md:gap-9 items-center">
          <img src={myimage} width={50} height={50} alt="Logo" className="w-14 h-14" />
          <div className="text-2xl md:text-4xl font-bold">Reachat</div>
        </div>
        <div className="flex gap-4 md:gap-8 mt-4 md:mt-0">
          <a href="/login" className="text-indigo-500 font-bold text-base md:text-lg">Login</a>
          <a href="/signup" className="text-indigo-500 font-bold text-base md:text-lg">Sign In</a>
        </div>
        </div>
    </div>
  );
};

export default Homepage;
