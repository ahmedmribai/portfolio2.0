import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import theme from '../styles/theme';

interface NavProps {
  isOpen?: boolean;
}

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${theme.colors.background.dark}A0;
  backdrop-filter: blur(10px);
  transition: ${theme.animations.transition.medium};
  
  &.scrolled {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    padding: 0.8rem 2rem;
  }
`;

const Logo = styled.a`
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-family: ${theme.typography.fontFamily.heading};
  background: ${theme.colors.primary.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: ${theme.animations.transition.medium};
  
  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div<NavProps>`
  display: flex;
  gap: 2rem;
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.text.primary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.base};
  position: relative;
  transition: ${theme.animations.transition.medium};
  font-family: ${theme.typography.fontFamily.heading};
  font-weight: ${theme.typography.fontWeight.medium};
  
  &:hover {
    color: ${theme.colors.primary.main};
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: ${theme.colors.primary.gradient};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.xl};
  cursor: pointer;
  transition: ${theme.animations.transition.fast};
  
  &:hover {
    color: ${theme.colors.primary.main};
    transform: scale(1.1);
  }
  
  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)<NavProps>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background: ${theme.colors.background.codeBlock};
  z-index: 99;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
`;

const MobileLink = styled(NavLink)`
  font-size: ${theme.typography.fontSize.lg};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSize.xl};
  cursor: pointer;
  transition: ${theme.animations.transition.fast};
  
  &:hover {
    color: ${theme.colors.primary.main};
    transform: scale(1.1);
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 98;
  backdrop-filter: blur(3px);
`;

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    document.querySelector(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <NavContainer className={isScrolled ? 'scrolled' : ''}>
        <Logo href="#">AM</Logo>
        <NavLinks>
          <NavLink href="#" onClick={() => handleScroll('#hero')}>Home</NavLink>
          <NavLink href="#projects" onClick={(e) => { e.preventDefault(); handleScroll('#projects'); }}>Projects</NavLink>
          <NavLink href="#resume" onClick={(e) => { e.preventDefault(); handleScroll('#resume'); }}>Resume</NavLink>
          <NavLink href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('#contact'); }}>Contact</NavLink>
        </NavLinks>
        <MobileToggle onClick={() => setIsMobileMenuOpen(true)}>
          <i className="fas fa-bars"></i>
        </MobileToggle>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <Overlay 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <MobileMenu
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', damping: 25 }}
            >
              <CloseButton onClick={() => setIsMobileMenuOpen(false)}>
                <i className="fas fa-times"></i>
              </CloseButton>
              <MobileLink href="#" onClick={() => handleScroll('#hero')}>Home</MobileLink>
              <MobileLink href="#projects" onClick={(e) => { e.preventDefault(); handleScroll('#projects'); }}>Projects</MobileLink>
              <MobileLink href="#resume" onClick={(e) => { e.preventDefault(); handleScroll('#resume'); }}>Resume</MobileLink>
              <MobileLink href="#contact" onClick={(e) => { e.preventDefault(); handleScroll('#contact'); }}>Contact</MobileLink>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
