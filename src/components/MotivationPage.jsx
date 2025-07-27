import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

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
    <MotivationContainer>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Title variants={itemVariants}>OUR MOTIVATION</Title>
        <Text variants={itemVariants} className='uppercase'>
          We’ve witnessed countless artists struggle. Struggling to get paid on time, to find their next gig, to secure regular work, and to receive fair wages. Breaches of agreements, delayed payments, and broken promises became far too common. It was our friends, breaking down, questioning their creative path.<br/> But the struggle wasn’t one-sided.<br/> Venue owners, event curators, wedding planners, and HoReCa professionals faced their own challenges. From unmet expectations to unclear terms and difficulty finding the right talent, their frustration was real. These issues repeated across art forms and cities—Goa, Mumbai, Bangalore, Gurgaon, Himachal. <br/>That’s when it became clear. We need a platform to simplify discovery, align expectations, and make the process seamless for both artists and curators.
        </Text>
      </motion.div>
    </MotivationContainer>
  );
};

export default MotivationComponent;