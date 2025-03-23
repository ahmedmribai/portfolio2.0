import React from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

const SkillsSection = styled.section`
  min-height: 100vh;
  padding: 4rem 2rem;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
  padding-top: 80px; /* Added padding for navbar */
  background-image: linear-gradient(rgba(10, 10, 10, 0.97), rgba(10, 10, 10, 0.97)), 
                    repeating-linear-gradient(45deg, rgba(80, 80, 80, 0.05), rgba(80, 80, 80, 0.05) 1px, transparent 1px, transparent 10px);
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: #ffffff;
  font-size: 3.5rem;
  margin-bottom: 4rem;
  position: relative;
  font-weight: 700;
  font-family: 'Raleway', 'Segoe UI', Roboto, sans-serif;
  text-transform: none;
`;

const ExpertiseContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ExpertiseCard = styled(motion.div)`
  background: rgba(25, 25, 25, 0.8);
  border: 1px solid rgba(50, 50, 50, 0.5);
  border-radius: 0;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
    border-color: rgba(0, 242, 96, 0.3);
  }
  
  &:hover .card-icon {
    color: #00f260;
    transform: scale(1.1);
  }
  
  &:hover .card-title {
    color: #00f260;
  }
  
  &:hover .card-tag,
  &:hover .card-tag-close {
    color: #bd93f9;
  }
`;

const ExpertiseIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  i {
    color: #ffffff;
    margin-right: 0.8rem;
    font-size: 2.8rem;
    transition: all 0.2s ease;
  }
`;

const CodeContent = styled.div`
  font-family: 'Source Code Pro', monospace;
  color: #aaaaaa;
  font-size: 1rem;
  line-height: 1.6;
  flex-grow: 1;
  margin-top: 0.5rem;
`;

const CommentText = styled.div`
  color: #666666;
  margin-top: 20px;
  font-size: 0.875rem;
  font-family: 'Source Code Pro', monospace;
`;

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const expertiseData = [
    {
      icon: "fas fa-laptop-code",
      title: "Software Development",
      subtitle: "Python, Ruby, JavaScript, TypeScript",
      content: "Experienced in developing both front and back end technologies. Python, Ruby, JavaScript, TypeScript."
    },
    {
      icon: "fab fa-react",
      title: "Frontend Dev",
      subtitle: "React, NextJS",
      content: "Passionate about UI/UX. Over 5 years of development experience in HTML, CSS, JS, React and NextJS frameworks."
    },
    {
      icon: "fas fa-paint-brush",
      title: "Web Design", 
      subtitle: "CSS3, Figma",
      content: "Skilled in creating and designing high-end visuals and animations with CSS3 and WebGL."
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      }
    })
  };

  return (
    <SkillsSection id="skills" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Expertise
      </SectionTitle>
      
      <ExpertiseContainer>
        {expertiseData.map((expertise, index) => (
          <ExpertiseCard
            key={index}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            custom={index}
          >
            <ExpertiseIcon>
              <i className={`${expertise.icon} card-icon`}></i>
            </ExpertiseIcon>
            
            <h3 className="card-title" style={{
              color: '#ffffff',
              fontSize: '1.5rem',
              marginBottom: '0.25rem',
              fontWeight: 600,
              fontFamily: "'Raleway', 'Segoe UI', Roboto, sans-serif",
              transition: 'all 0.2s ease'
            }}>
              {expertise.title}
            </h3>
            
            <h4 style={{
              color: '#aaaaaa',
              fontSize: '1.125rem',
              marginBottom: '1.5rem',
              fontWeight: 400,
              fontFamily: "'Raleway', 'Segoe UI', Roboto, sans-serif"
            }}>
              {expertise.subtitle}
            </h4>
            
            <CodeContent>
              <span className="card-tag" style={{
                color: '#f06292',
                display: 'block',
                marginBottom: '0.5rem',
                transition: 'all 0.2s ease'
              }}>
                &lt;h3&gt;
              </span>
              
              <span style={{
                color: '#ffffff',
                display: 'block',
                marginLeft: '1rem',
                marginBottom: '0.5rem'
              }}>
                {expertise.content}
              </span>
              
              <span className="card-tag-close" style={{
                color: '#f06292',
                transition: 'all 0.2s ease'
              }}>
                &lt;/h3&gt;
              </span>
              
              <CommentText>
                {index === 0 && (
                  <>&lt;div className=&quot;skills&quot; style=&#123;&#123;width:device-width, initial-scale:1.0&#125;&#125;&gt;</>
                )}
                {index === 1 && (
                  <>&lt;div&gt;What do I do&lt;/div&gt;</>
                )}
                {index === 2 && (
                  <>&lt;div&gt;Things I do to get a perfect background image&lt;/div&gt;</>
                )}
              </CommentText>
            </CodeContent>
          </ExpertiseCard>
        ))}
      </ExpertiseContainer>
    </SkillsSection>
  );
};

export default Skills;
