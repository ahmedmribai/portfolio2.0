import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

const ProjectsSection = styled.section`
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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #2a2a2a;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    border-color: #3498db;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent 65%, rgba(52, 152, 219, 0.1) 100%);
    z-index: 1;
    pointer-events: none;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(10, 10, 10, 0.2);
    z-index: 1;
  }
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
  position: relative;
`;

const ProjectTitle = styled.h3`
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  
  &::before {
    content: '📂';
    margin-right: 8px;
    font-size: 1.2rem;
  }
`;

const ProjectDescription = styled.p`
  color: #888;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: #3498db;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #2ecc71;
    transform: translateY(-2px);
  }
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 1rem;
`;

const ProjectTag = styled.span`
  background: #2a2a2a;
  color: #888;
  font-size: 0.8rem;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
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

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack web application built with React, Node.js, and MongoDB. Features include authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    github: "https://github.com/yourusername/project1",
    live: "https://project1.com",
    tags: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with animations and interactive elements. Built with React, TypeScript, and Framer Motion.",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b",
    github: "https://github.com/yourusername/project2",
    live: "https://project2.com",
    tags: ['React', 'TypeScript', 'Framer Motion', 'CSS']
  },
  {
    title: "Task Management App",
    description: "A productivity application with drag-and-drop task management, user authentication, and data visualization.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91",
    github: "https://github.com/yourusername/project3",
    live: "https://project3.com",
    tags: ['React', 'Firebase', 'Redux', 'Material UI']
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Featured Projects
        </SectionTitle>
        <CodeComment>
          // Check out some of my recent work
        </CodeComment>
      </SectionHeader>
      
      <ProjectsGrid ref={ref}>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectTags>
                {project.tags.map((tag, tagIndex) => (
                  <ProjectTag key={tagIndex}>
                    {tag === 'React' && <i className="fab fa-react"></i>}
                    {tag === 'Node.js' && <i className="fab fa-node-js"></i>}
                    {tag === 'TypeScript' && <i className="fab fa-js"></i>}
                    {tag === 'MongoDB' && <i className="fas fa-database"></i>}
                    {tag === 'Firebase' && <i className="fas fa-fire"></i>}
                    {tag === 'Redux' && <i className="fas fa-atom"></i>}
                    {!['React', 'Node.js', 'TypeScript', 'MongoDB', 'Firebase', 'Redux'].some(t => t === tag) && 
                      <i className="fas fa-code"></i>}
                    {tag}
                  </ProjectTag>
                ))}
              </ProjectTags>
              <ProjectDescription>{project.description}</ProjectDescription>
              <ProjectLinks>
                <ProjectLink href={project.github} target="_blank">
                  <i className="fab fa-github"></i> View Code
                </ProjectLink>
                <ProjectLink href={project.live} target="_blank">
                  <i className="fas fa-external-link-alt"></i> Live Demo
                </ProjectLink>
              </ProjectLinks>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects;
