import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 2rem 0;
  justify-content: center;
`;

const Tag = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 20px;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }
  
  &:hover::before {
    left: 150%;
  }
`;

const Icon = styled.span`
  margin-right: 8px;
  color: #3498db;
`;

const skillsData = [
  { name: 'React', icon: 'fab fa-react' },
  { name: 'JavaScript', icon: 'fab fa-js-square' },
  { name: 'TypeScript', icon: 'fab fa-js' },
  { name: 'Node.js', icon: 'fab fa-node-js' },
  { name: 'HTML5', icon: 'fab fa-html5' },
  { name: 'CSS3', icon: 'fab fa-css3-alt' },
  { name: 'Sass', icon: 'fab fa-sass' },
  { name: 'Python', icon: 'fab fa-python' },
  { name: 'Git', icon: 'fab fa-git-alt' },
  { name: 'GitHub', icon: 'fab fa-github' },
  { name: 'Docker', icon: 'fab fa-docker' },
  { name: 'MongoDB', icon: 'fas fa-database' },
  { name: 'Redux', icon: 'fas fa-atom' },
  { name: 'AWS', icon: 'fab fa-aws' },
  { name: 'GraphQL', icon: 'fas fa-project-diagram' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const SkillTags = () => {
  const [shuffledSkills, setShuffledSkills] = useState(skillsData);

  // Shuffle skills every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledSkills(prev => [...prev].sort(() => Math.random() - 0.5));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TagsContainer as={motion.div} variants={container} initial="hidden" animate="show">
      {shuffledSkills.map((skill, index) => (
        <Tag 
          key={`${skill.name}-${index}`}
          variants={item}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon>
            <i className={skill.icon}></i>
          </Icon>
          {skill.name}
        </Tag>
      ))}
    </TagsContainer>
  );
};

export default SkillTags;
