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
    <div className='bg-black h-auto mb-16'>
      <BigBlockText
        title="OUR MOTIVATION"
        text={
          [
            "We have witnessed countless artists struggle. Struggling to get paid on time, to find their next gig, to secure regular work, and to receive fair wages. Breaches of agreements, delayed payments, and broken promises became far too common. And often, it wasn’t just statistics. It was our own friends, breaking down during long venting sessions, questioning their career choices and their place in the creative world. ",
            "But the struggle wasn’t one-sided. ", 
            "We’ve seen venue owners, event curators, wedding planners, and HoReCa professionals facing their own challenges. From unmet expectations to unclear terms and difficulty finding the right talent, their frustration was just as real. These weren’t isolated incidents. The same issues appeared again and again, across art forms and across cities. Whether in Goa, Mumbai, Bangalore, Gurgaon, or Himachal, the story was the same. ", 
            "That’s when it became clear. We don’t just need more talent or more gigs. We need a platform. A space that simplifies discovery, aligns expectations, and makes the process seamless for both artists and curators. "
          ]
        }
        fontSize="1.8rem"
      />
    </div>
  );
};

export default MotivationComponent;