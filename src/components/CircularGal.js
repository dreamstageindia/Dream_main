import React from 'react';
import CircularGallery from './CircularGallery';
import BigBlockText from './BigBlockText';

const CircularGal = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 className='bg-black'
      >
        <
        BigBlockText
        title={'WE ALIGN WITH UNSDG'}
        />
        
      </h1>
      <div className='h-[800px] md:h-[600px]' style={{ position: 'relative', backgroundColor:"black" }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
      </div>
    </div>
  );
};

export default CircularGal;