import React, { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

// Define types for resume data
interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'tools' | 'soft';
}

type ResumeSection = 'experience' | 'education' | 'skills' | 'projects';

// Styled components
const ResumeSection = styled.section`
  min-height: 100vh;
  background: #0a0a0a;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  max-width: 800px;
  margin: 0 auto 3rem auto;
  text-align: center;
`;

const CodeComment = styled.p`
  font-family: 'Source Code Pro', monospace;
  color: #6A9955;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    border-radius: 2px;
  }
`;

const ResumeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0.5rem;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const TabButton = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? 'linear-gradient(45deg, #3498db, #2ecc71)' : '#1a1a1a'};
  color: ${props => props.active ? 'white' : '#888'};
  border: 1px solid ${props => props.active ? 'transparent' : '#333'};
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(45deg, #3498db, #2ecc71)' : '#222'};
    color: ${props => props.active ? 'white' : '#aaa'};
  }
`;

const ContentContainer = styled(motion.div)`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #2a2a2a;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  padding-left: 2rem;
  padding-bottom: 1.5rem;
  border-left: 2px solid #3498db;
  
  &:last-child {
    padding-bottom: 0;
  }
  
  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 0;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: linear-gradient(45deg, #3498db, #2ecc71);
  }
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const TimelineTitle = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin: 0;
`;

const TimelineSubtitle = styled.h4`
  color: #ccc;
  font-size: 1.1rem;
  font-weight: normal;
  margin: 0.5rem 0;
`;

const TimelinePeriod = styled.span`
  color: #3498db;
  font-family: 'Source Code Pro', monospace;
  background: rgba(52, 152, 219, 0.1);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
`;

const TimelineContent = styled.p`
  color: #aaa;
  line-height: 1.6;
  margin: 0.5rem 0;
`;

const TechTagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const TechTag = styled.span`
  background: #2a2a2a;
  color: #00f260;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  border: 1px solid rgba(0, 242, 96, 0.3);
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled.div`
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 12px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
    margin-right: 8px;
    border-radius: 2px;
  }
`;

const SkillItem = styled.div`
  margin-bottom: 1rem;
`;

const SkillHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const SkillName = styled.span`
  color: #ddd;
`;

const SkillLevel = styled.span`
  color: #888;
  font-size: 0.9rem;
`;

const SkillBar = styled.div`
  height: 8px;
  background: #2a2a2a;
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled.div<{ level: number }>`
  height: 100%;
  width: ${props => props.level * 20}%;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  border-radius: 4px;
`;

const DownloadButton = styled(motion.a)`
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: fit-content;
  margin: 3rem auto 0;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 242, 96, 0.2);
  }
`;

// Sample resume data - replace with your own
const educationData: Education[] = [
  {
    id: 'edu1',
    degree: 'Master of Computer Science',
    institution: 'Stanford University',
    location: 'California, USA',
    period: '2018 - 2020',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Neural Network optimization techniques.'
  },
  {
    id: 'edu2',
    degree: 'Bachelor of Engineering',
    institution: 'MIT',
    location: 'Massachusetts, USA',
    period: '2014 - 2018',
    description: 'Graduated with honors. Focused on software engineering and computer systems.'
  }
];

const experienceData: Experience[] = [
  {
    id: 'exp1',
    position: 'Senior Frontend Developer',
    company: 'Tech Innovations Inc.',
    location: 'Remote',
    period: '2021 - Present',
    description: 'Leading the frontend development team of 5 engineers. Redesigned the company\'s main product interface resulting in 35% increase in user engagement.',
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'Emotion']
  },
  {
    id: 'exp2',
    position: 'Frontend Developer',
    company: 'Digital Solutions Ltd.',
    location: 'New York, USA',
    period: '2018 - 2021',
    description: 'Developed and maintained multiple client websites and web applications. Implemented modern frontend architectures and optimized performance.',
    technologies: ['JavaScript', 'React', 'Redux', 'SCSS', 'Webpack']
  },
  {
    id: 'exp3',
    position: 'Web Developer Intern',
    company: 'StartUp Vision',
    location: 'San Francisco, USA',
    period: '2017 - 2018',
    description: 'Assisted in developing the company website and internal tools. Learned modern web development practices in a fast-paced environment.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap']
  }
];

const projectsData: Project[] = [
  {
    id: 'proj1',
    title: 'E-commerce Platform',
    description: 'Developed a full-featured e-commerce platform with payment integration, user authentication, and admin dashboard.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe API'],
    link: 'https://github.com/username/ecommerce-platform'
  },
  {
    id: 'proj2',
    title: 'AI Image Generator',
    description: 'Created a web application that uses AI to generate images based on text descriptions.',
    technologies: ['Python', 'TensorFlow', 'React', 'Flask', 'Docker'],
    link: 'https://github.com/username/ai-image-generator'
  },
  {
    id: 'proj3',
    title: 'Task Management System',
    description: 'Built a collaborative task management system with real-time updates and team features.',
    technologies: ['Next.js', 'Firebase', 'TypeScript', 'Tailwind CSS'],
    link: 'https://github.com/username/task-management'
  }
];

const skillsData: Skill[] = [
  // Frontend
  { name: 'React', level: 5, category: 'frontend' },
  { name: 'TypeScript', level: 4, category: 'frontend' },
  { name: 'JavaScript', level: 5, category: 'frontend' },
  { name: 'HTML/CSS', level: 5, category: 'frontend' },
  { name: 'Next.js', level: 4, category: 'frontend' },
  { name: 'Redux', level: 4, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 4, category: 'backend' },
  { name: 'Express', level: 3, category: 'backend' },
  { name: 'MongoDB', level: 3, category: 'backend' },
  { name: 'GraphQL', level: 3, category: 'backend' },
  { name: 'SQL', level: 2, category: 'backend' },
  
  // Tools
  { name: 'Git', level: 4, category: 'tools' },
  { name: 'Docker', level: 3, category: 'tools' },
  { name: 'Webpack', level: 3, category: 'tools' },
  { name: 'Jest', level: 3, category: 'tools' },
  { name: 'CI/CD', level: 3, category: 'tools' },
  
  // Soft Skills
  { name: 'Problem Solving', level: 5, category: 'soft' },
  { name: 'Communication', level: 4, category: 'soft' },
  { name: 'Teamwork', level: 5, category: 'soft' },
  { name: 'Time Management', level: 4, category: 'soft' }
];

const Resume: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ResumeSection>('experience');
  
  const renderExperience = () => (
    <TimelineContainer>
      {experienceData.map((item, index) => (
        <TimelineItem 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TimelineHeader>
            <div>
              <TimelineTitle>{item.position}</TimelineTitle>
              <TimelineSubtitle>{item.company} - {item.location}</TimelineSubtitle>
            </div>
            <TimelinePeriod>{item.period}</TimelinePeriod>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
          <TechTagsContainer>
            {item.technologies.map(tech => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </TechTagsContainer>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
  
  const renderEducation = () => (
    <TimelineContainer>
      {educationData.map((item, index) => (
        <TimelineItem 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TimelineHeader>
            <div>
              <TimelineTitle>{item.degree}</TimelineTitle>
              <TimelineSubtitle>{item.institution} - {item.location}</TimelineSubtitle>
            </div>
            <TimelinePeriod>{item.period}</TimelinePeriod>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
  
  const renderProjects = () => (
    <TimelineContainer>
      {projectsData.map((item, index) => (
        <TimelineItem 
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TimelineHeader>
            <TimelineTitle>
              {item.title}
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#3498db' }}>
                  <i className="fas fa-external-link-alt"></i>
                </a>
              )}
            </TimelineTitle>
          </TimelineHeader>
          <TimelineContent>{item.description}</TimelineContent>
          <TechTagsContainer>
            {item.technologies.map(tech => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </TechTagsContainer>
        </TimelineItem>
      ))}
    </TimelineContainer>
  );
  
  const renderSkills = () => {
    const frontendSkills = skillsData.filter(skill => skill.category === 'frontend');
    const backendSkills = skillsData.filter(skill => skill.category === 'backend');
    const toolsSkills = skillsData.filter(skill => skill.category === 'tools');
    const softSkills = skillsData.filter(skill => skill.category === 'soft');
    
    return (
      <SkillsContainer>
        <div>
          <CategoryTitle>Frontend</CategoryTitle>
          {frontendSkills.map(skill => (
            <SkillItem key={skill.name}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/5</SkillLevel>
              </SkillHeader>
              <SkillBar>
                <SkillProgress level={skill.level} />
              </SkillBar>
            </SkillItem>
          ))}
        </div>
        
        <div>
          <CategoryTitle>Backend</CategoryTitle>
          {backendSkills.map(skill => (
            <SkillItem key={skill.name}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/5</SkillLevel>
              </SkillHeader>
              <SkillBar>
                <SkillProgress level={skill.level} />
              </SkillBar>
            </SkillItem>
          ))}
        </div>
        
        <div>
          <CategoryTitle>Tools & Technologies</CategoryTitle>
          {toolsSkills.map(skill => (
            <SkillItem key={skill.name}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/5</SkillLevel>
              </SkillHeader>
              <SkillBar>
                <SkillProgress level={skill.level} />
              </SkillBar>
            </SkillItem>
          ))}
        </div>
        
        <div>
          <CategoryTitle>Soft Skills</CategoryTitle>
          {softSkills.map(skill => (
            <SkillItem key={skill.name}>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <SkillLevel>{skill.level}/5</SkillLevel>
              </SkillHeader>
              <SkillBar>
                <SkillProgress level={skill.level} />
              </SkillBar>
            </SkillItem>
          ))}
        </div>
      </SkillsContainer>
    );
  };
  
  const getActiveContent = () => {
    switch(activeSection) {
      case 'experience':
        return renderExperience();
      case 'education':
        return renderEducation();
      case 'projects':
        return renderProjects();
      case 'skills':
        return renderSkills();
      default:
        return renderExperience();
    }
  };
  
  return (
    <ResumeSection id="resume">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Resume
        </SectionTitle>
        <CodeComment>
          // Experience, education and skills
        </CodeComment>
      </SectionHeader>
      
      <ResumeContainer>
        <TabsContainer>
          <TabButton 
            active={activeSection === 'experience'}
            onClick={() => setActiveSection('experience')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-briefcase mr-2"></i> Experience
          </TabButton>
          <TabButton 
            active={activeSection === 'education'}
            onClick={() => setActiveSection('education')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-graduation-cap mr-2"></i> Education
          </TabButton>
          <TabButton 
            active={activeSection === 'skills'}
            onClick={() => setActiveSection('skills')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-code mr-2"></i> Skills
          </TabButton>
          <TabButton 
            active={activeSection === 'projects'}
            onClick={() => setActiveSection('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <i className="fas fa-project-diagram mr-2"></i> Projects
          </TabButton>
        </TabsContainer>
        
        <ContentContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={activeSection}
        >
          {getActiveContent()}
        </ContentContainer>
        
        <DownloadButton 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.98 }}
        >
          <i className="fas fa-download"></i> Download Full Resume
        </DownloadButton>
      </ResumeContainer>
    </ResumeSection>
  );
};

export default Resume;
