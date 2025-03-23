import { useEffect } from 'react';
import styled from '@emotion/styled';
import Hero from './components/Hero';
// import Projects from './components/Projects';
import FilterableProjects from './components/FilterableProjects';
import Resume from './components/Resume';
// import Skills from './components/Skills';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CodeBackground from './components/CodeBackground';
import ScrollToTop from './components/ScrollToTop';

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  background: #0a0a0a;
  min-height: 100vh;
`;

function App() {
  // Load Font Awesome for icons
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
    
    // Load Source Code Pro font for code snippets
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);
    
    return () => {
      document.head.removeChild(link);
      document.head.removeChild(fontLink);
    };
  }, []);

  return (
    <AppContainer>
      <CodeBackground />
      <Navbar />
      <Hero />
      <FilterableProjects />
      <Resume />
      {/* <Skills /> */}
      <Contact />
      <Footer />
      <ScrollToTop />
    </AppContainer>
  );
}

export default App;
