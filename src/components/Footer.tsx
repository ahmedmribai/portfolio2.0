import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: #0a0a0a;
  color: #888;
  padding: 3rem 2rem;
  border-top: 1px solid #1a1a1a;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
  }
`;

const FooterLink = styled.a`
  color: #888;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: #888;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #3498db;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #1a1a1a;
  font-size: 0.9rem;
`;

const GradientText = styled.span`
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Ahmed Mribai</FooterTitle>
          <p>Full Stack Developer specializing in creating elegant solutions to complex problems.</p>
          <SocialLinks>
            <SocialLink 
              href="https://github.com/yourusername" 
              target="_blank"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-github"></i>
            </SocialLink>
            <SocialLink 
              href="https://linkedin.com/in/yourusername" 
              target="_blank"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-linkedin"></i>
            </SocialLink>
            <SocialLink 
              href="https://twitter.com/yourusername" 
              target="_blank"
              whileHover={{ y: -3 }}
            >
              <i className="fab fa-twitter"></i>
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#projects">Projects</FooterLink>
          <FooterLink href="#skills">Skills</FooterLink>
          <FooterLink href="#contact">Contact</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <p><i className="fas fa-envelope"></i> email@example.com</p>
          <p><i className="fas fa-map-marker-alt"></i> City, Country</p>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        <p>© {currentYear} <GradientText>Ahmed Mribai</GradientText>. All Rights Reserved.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
