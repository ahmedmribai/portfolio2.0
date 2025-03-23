import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import FloatingCode from './FloatingCode';
import SkillTags from './SkillTags';
import theme from '../styles/theme';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background: ${theme.colors.background.dark};
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Added padding for navbar */
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle at center, #2a2a2a 0%, transparent 70%);
  filter: blur(40px);
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  color: ${theme.colors.text.primary};
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroInfo = styled.div`
  @media (max-width: ${theme.breakpoints.md}) {
    order: 2;
  }
`;

const HeroVisual = styled.div`
  @media (max-width: ${theme.breakpoints.md}) {
    order: 1;
  }
`;

const Title = styled(motion.h1)`
  font-size: ${theme.typography.fontSize['6xl']};
  margin-bottom: 1rem;
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.bold};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.typography.fontSize['5xl']};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.text.secondary};
  margin-bottom: 2rem;
  font-family: ${theme.typography.fontFamily.body};
`;

const TypedText = styled(motion.div)`
  font-family: ${theme.typography.fontFamily.code};
  font-size: ${theme.typography.fontSize.lg};
  height: 1.5em;
  overflow: hidden;
  position: relative;
  margin-bottom: 1.5rem;
  color: ${theme.colors.secondary.main};
  
  &::after {
    content: '|';
    animation: blink 1s infinite;
    color: ${theme.colors.secondary.main};
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const HighlightBadge = styled(motion.span)`
  background: ${theme.colors.secondary.main}20;
  color: ${theme.colors.secondary.main};
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: ${theme.typography.fontSize.sm};
  margin-right: 0.5rem;
  transition: ${theme.animations.transition.medium};
  
  &:hover {
    background: ${theme.colors.secondary.main}40;
    transform: translateY(-2px);
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.lg};
  transition: ${theme.animations.transition.medium};
  
  &:hover {
    color: ${theme.colors.secondary.main};
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  return (
    <HeroSection id="hero">
      <GlowingOrb
        initial={{ x: -100, y: -100 }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <Content>
        <HeroInfo>
          <HighlightBadge
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <i className="fas fa-code"></i> Full Stack Developer
          </HighlightBadge>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Ahmed Mribai
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Building elegant solutions to complex problems
          </Subtitle>
          
          <TypedText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            &gt; console.log("Hello, World!");
          </TypedText>
          
          <SkillTags />
          
          <SocialLinks
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SocialLink href="https://github.com/yourusername" target="_blank">
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink href="https://linkedin.com/in/yourusername" target="_blank">
              <i className="fab fa-linkedin"></i>
            </SocialLink>
            <SocialLink href="https://twitter.com/yourusername" target="_blank">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="https://codepen.io/yourusername" target="_blank">
              <i className="fab fa-codepen"></i>
            </SocialLink>
          </SocialLinks>
        </HeroInfo>
        
        <HeroVisual>
          <FloatingCode />
        </HeroVisual>
      </Content>
    </HeroSection>
  );
};

export default Hero;
