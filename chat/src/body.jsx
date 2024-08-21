import React, { useState, useRef, useEffect } from 'react';
import pic3 from "./media/pic3.png";
import pic2 from "./media/pic2.png";
import pic1 from "./media/pic1.png";

const Body = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [pic1, pic2, pic3];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div>
       <div className="relative w-full h-[400px] md:h-[600px]">
        <img
          src={images[currentImageIndex]}
          alt="Slideshow"
          className="object-cover w-full h-full brightness-75 contrast-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-20">
          <h1 className="text-3xl md:text-6xl font-serif font-extrabold text-white mb-4">
            Let's Chat with Reachat
          </h1>
          <p className="text-lg md:text-xl text-white mb-2">
            Link up with nearby people and make good connections.
          </p>
          <p className="text-white">
            Start sending messages to people now.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Body;
