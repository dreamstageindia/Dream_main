import React from 'react';
import CircularGallery from './CircularGallery';

const CircularGal = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1
        style={{
          fontSize: '8rem',
          fontWeight: 900,
          color: '#ff0000',
          margin: '0 0 20px',
          lineHeight: 0.8,
          textTransform: 'uppercase',
          '@media (max-width: 768px)': {
            fontSize: '3rem',
          },
        }}
      >
        WE ALIGN WITH UNSDG
      </h1>
      <div style={{ height: '600px', position: 'relative' }}>
        <CircularGallery bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02} />
      </div>
    </div>
  );
};

export default CircularGal;