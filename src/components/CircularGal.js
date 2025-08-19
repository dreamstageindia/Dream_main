import React from 'react';
import CircularGallery from './CircularGallery';
import BigBlockText from './BigBlockText';

const CircularGal = () => {
  return (
    <div className=' pb-10'>
      <div className='flex items-left md:flex-row flex-col justify-left'>
      <h2
          className="uppercase font-bold ml-10 text-[2rem] md:text-[3.5rem]"
          style={{
            // fontSize:"3.2rem",
            background:
              "linear-gradient(to right, #ec4899, #8b5cf6, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          WE ALIGN WITH
        </h2>
      <h1 className='bg-black flex justify-left items-center py-4 gap-3 pl-[5%]'>
        <img 
          src="/assets/image/sdg/unsdg_logo.png" 
          alt="UNSDG Logo" 
          className="h-10 md:h-16"
        />
      </h1>

      </div>
      <div className='h-[800px] md:h-[600px]' style={{ position: 'relative', backgroundColor:"black" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
      </div>
    </div>
  );
};

export default CircularGal;