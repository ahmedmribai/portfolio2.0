import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
}

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

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterButton = styled(motion.button)<{ active: boolean }>`
  background: ${props => props.active ? 'linear-gradient(45deg, #3498db, #2ecc71)' : '#1a1a1a'};
  color: ${props => props.active ? 'white' : '#888'};
  border: 1px solid ${props => props.active ? 'transparent' : '#333'};
  padding: 10px 16px;
  font-size: 0.9rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(45deg, #3498db, #2ecc71)' : '#222'};
    color: ${props => props.active ? 'white' : '#aaa'};
    transform: translateY(-2px);
  }
`;

const SearchContainer = styled.div`
  max-width: 500px;
  margin: 0 auto 2rem auto;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 20px 12px 45px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 30px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  font-size: 1.2rem;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  color: #888;
  padding: 3rem;
  background: #1a1a1a;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px dashed #333;
`;

const EmptyStateTitle = styled.h3`
  color: #ccc;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1.5rem;
`;

const ProjectCard = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #2a2a2a;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  
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
  flex: 1;
  display: flex;
  flex-direction: column;
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
  margin-bottom: 1.5rem;
  line-height: 1.6;
  flex-grow: 1;
`;

const ProjectMeta = styled.div`
  margin-top: auto;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
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

const ProjectCategory = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  z-index: 2;
  text-transform: capitalize;
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

// Sample projects data
const projectsData: Project[] = [
  {
    id: 'project1',
    title: "E-Commerce Platform",
    description: "A full-stack web application built with React, Node.js, and MongoDB. Features include authentication, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    github: "https://github.com/yourusername/project1",
    live: "https://project1.com",
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Redux'],
    category: 'fullstack'
  },
  {
    id: 'project2',
    title: "Portfolio Website",
    description: "Modern portfolio website with animations and interactive elements. Built with React, TypeScript, and Framer Motion.",
    image: "https://images.unsplash.com/photo-1545239351-ef35f43d514b",
    github: "https://github.com/yourusername/project2",
    live: "https://project2.com",
    tags: ['React', 'TypeScript', 'Framer Motion', 'CSS', 'Emotion'],
    category: 'frontend'
  },
  {
    id: 'project3',
    title: "Task Management App",
    description: "A productivity application with drag-and-drop task management, user authentication, and data visualization.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91",
    github: "https://github.com/yourusername/project3",
    live: "https://project3.com",
    tags: ['React', 'Firebase', 'Redux', 'Material UI', 'React DnD'],
    category: 'frontend'
  },
  {
    id: 'project4',
    title: "API Microservices",
    description: "A collection of microservices built with Node.js, Express, and Docker. Includes authentication, payments, and notification services.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    github: "https://github.com/yourusername/project4",
    live: "https://project4.com",
    tags: ['Node.js', 'Express', 'Docker', 'Kubernetes', 'MongoDB', 'Redis'],
    category: 'backend'
  },
  {
    id: 'project5',
    title: "Mobile Fitness App",
    description: "Cross-platform mobile application for fitness tracking with social features, workout planning, and progress visualization.",
    image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10",
    github: "https://github.com/yourusername/project5",
    live: "https://project5.com",
    tags: ['React Native', 'Redux', 'Firebase', 'Expo', 'Maps API'],
    category: 'mobile'
  },
  {
    id: 'project6',
    title: "DevOps Automation Suite",
    description: "A set of scripts and configurations for automating CI/CD pipelines, infrastructure provisioning, and monitoring.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3",
    github: "https://github.com/yourusername/project6",
    live: "https://project6.com",
    tags: ['Terraform', 'AWS', 'Jenkins', 'Docker', 'Ansible', 'Prometheus'],
    category: 'other'
  },
];

// Get all unique tags from projects
const getAllTags = (projects: Project[]): string[] => {
  const tagsSet = new Set<string>();
  projects.forEach(project => {
    project.tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

// Get all unique categories from projects
const getAllCategories = (projects: Project[]): string[] => {
  const categoriesSet = new Set<string>();
  projects.forEach(project => {
    categoriesSet.add(project.category);
  });
  return Array.from(categoriesSet).sort();
};

const FilterableProjects: React.FC = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const allTags = useMemo(() => getAllTags(projectsData), []);
  const allCategories = useMemo(() => ['all', ...getAllCategories(projectsData)], []);
  
  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      // Filter by category
      if (selectedCategory !== 'all' && project.category !== selectedCategory) {
        return false;
      }
      
      // Filter by tags
      if (selectedTags.length > 0 && !selectedTags.some(tag => project.tags.includes(tag))) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    });
  }, [selectedCategory, selectedTags, searchQuery]);
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategory('all');
    setSearchQuery('');
  };
  
  return (
    <ProjectsSection id="projects">
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </SectionTitle>
        <CodeComment>
          // Filter and explore my portfolio of work
        </CodeComment>
      </SectionHeader>
      
      <SearchContainer>
        <SearchIcon>
          <i className="fas fa-search"></i>
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>
      
      <FiltersContainer>
        {/* Category filters */}
        {allCategories.map(category => (
          <FilterButton
            key={category}
            active={selectedCategory === category}
            onClick={() => handleCategoryChange(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category === 'frontend' && <i className="fas fa-laptop-code"></i>}
            {category === 'backend' && <i className="fas fa-server"></i>}
            {category === 'fullstack' && <i className="fas fa-code-branch"></i>}
            {category === 'mobile' && <i className="fas fa-mobile-alt"></i>}
            {category === 'other' && <i className="fas fa-tools"></i>}
            {category === 'all' && <i className="fas fa-th"></i>}
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </FilterButton>
        ))}
        
        {/* Show clear filters button if any filter is applied */}
        {(selectedTags.length > 0 || selectedCategory !== 'all' || searchQuery) && (
          <FilterButton
            active={false}
            onClick={clearFilters}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fas fa-times"></i> Clear Filters
          </FilterButton>
        )}
      </FiltersContainer>
      
      {/* Technology tag filters */}
      <FiltersContainer>
        {allTags.map(tag => (
          <FilterButton
            key={tag}
            active={selectedTags.includes(tag)}
            onClick={() => toggleTag(tag)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tag === 'React' && <i className="fab fa-react"></i>}
            {tag === 'Node.js' && <i className="fab fa-node-js"></i>}
            {tag === 'TypeScript' && <i className="fab fa-js"></i>}
            {tag === 'MongoDB' && <i className="fas fa-database"></i>}
            {tag === 'Firebase' && <i className="fas fa-fire"></i>}
            {tag === 'Redux' && <i className="fas fa-atom"></i>}
            {tag === 'AWS' && <i className="fab fa-aws"></i>}
            {tag === 'Docker' && <i className="fab fa-docker"></i>}
            {!['React', 'Node.js', 'TypeScript', 'MongoDB', 'Firebase', 'Redux', 'AWS', 'Docker'].includes(tag) && 
              <i className="fas fa-code"></i>}
            {tag}
          </FilterButton>
        ))}
      </FiltersContainer>
      
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <ProjectsGrid 
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key="projects-grid"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                layout
              >
                <ProjectCategory>{project.category}</ProjectCategory>
                <ProjectImage style={{ backgroundImage: `url(${project.image})` }} />
                <ProjectContent>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <ProjectTags>
                    {project.tags.map((tag, tagIndex) => (
                      <ProjectTag key={`${project.id}-${tag}-${tagIndex}`}>
                        {tag === 'React' && <i className="fab fa-react"></i>}
                        {tag === 'Node.js' && <i className="fab fa-node-js"></i>}
                        {tag === 'TypeScript' && <i className="fab fa-js"></i>}
                        {tag === 'MongoDB' && <i className="fas fa-database"></i>}
                        {tag === 'Firebase' && <i className="fas fa-fire"></i>}
                        {tag === 'Redux' && <i className="fas fa-atom"></i>}
                        {tag === 'AWS' && <i className="fab fa-aws"></i>}
                        {tag === 'Docker' && <i className="fab fa-docker"></i>}
                        {!['React', 'Node.js', 'TypeScript', 'MongoDB', 'Firebase', 'Redux', 'AWS', 'Docker'].includes(tag) && 
                          <i className="fas fa-code"></i>}
                        {tag}
                      </ProjectTag>
                    ))}
                  </ProjectTags>
                  <ProjectDescription>{project.description}</ProjectDescription>
                  <ProjectMeta>
                    <ProjectLinks>
                      <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i> View Code
                      </ProjectLink>
                      <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-external-link-alt"></i> Live Demo
                      </ProjectLink>
                    </ProjectLinks>
                  </ProjectMeta>
                </ProjectContent>
              </ProjectCard>
            ))}
          </ProjectsGrid>
        ) : (
          <EmptyState
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            key="empty-state"
          >
            <EmptyStateIcon>
              <i className="fas fa-search"></i>
            </EmptyStateIcon>
            <EmptyStateTitle>No projects found</EmptyStateTitle>
            <p>Try adjusting your filters or search criteria</p>
            <FilterButton
              active={false}
              onClick={clearFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ marginTop: '1.5rem' }}
            >
              <i className="fas fa-redo"></i> Reset Filters
            </FilterButton>
          </EmptyState>
        )}
      </AnimatePresence>
    </ProjectsSection>
  );
};

export default FilterableProjects;
