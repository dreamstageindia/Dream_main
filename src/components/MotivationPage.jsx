import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import BigBlockText from './BigBlockText';

const MotivationContainer = styled.div`
  background: #000;
  padding: 50px 20px;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.h1)`
  font-size: 8rem;
  font-weight: 900;
  color: purple;
  margin: 0 0 20px;
  line-height: 0.8;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Text = styled(motion.p)`
  font-size: 1.1rem;
  color: #aaa;
  max-width: 800px;
  margin: 0 auto 15px;
  line-height: 1.6;
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const MotivationComponent = () => {
  return (
    <div className='bg-black h-[720px]'>
      <BigBlockText
        title="OUR MOTIVATION"
        text={
          [
            "Artists often struggle with delayed payments, unfair wages, and unreliable gigs—leading many to question their creative path.",
            "On the other side, venue owners, curators, and HoReCa professionals face unmet expectations, unclear terms, and difficulty finding talent.", 
            "These issues persist across cities like Goa, Mumbai, Bangalore, Gurgaon, and Himachal.", 
            "It became clear: we need a platform that simplifies discovery, aligns expectations, and makes the process seamless for both artists and curators."
          ]
        }
        fontSize="2.5rem"
      />
    </div>
  );
};

export default MotivationComponent;