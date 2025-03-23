import React from 'react';
import { Global, css } from '@emotion/react';
import theme from '../styles/theme';

type ThemeProviderProps = {
  children: React.ReactNode;
};

const globalStyles = css`
  /* Apply consistent animations across the site */
  a, button, .btn, .card, .project-card, .skill-card {
    transition: ${theme.animations.transition.medium};
  }

  /* Hover effects for interactive elements */
  a:hover, button:hover, .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  /* Card hover effects */
  .card:hover, .project-card:hover, .skill-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  }

  /* Button hover glow effects */
  .btn-primary:hover {
    box-shadow: 0 0 15px ${theme.colors.primary.main}80;
  }

  /* Apply consistent colors */
  .text-primary {
    color: ${theme.colors.primary.main};
  }

  .text-secondary {
    color: ${theme.colors.secondary.main};
  }

  .bg-primary {
    background-color: ${theme.colors.primary.main};
  }

  .bg-secondary {
    background-color: ${theme.colors.secondary.main};
  }

  .gradient-text {
    background: ${theme.colors.primary.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* Typography classes */
  .heading-font {
    font-family: ${theme.typography.fontFamily.heading};
  }

  .body-font {
    font-family: ${theme.typography.fontFamily.body};
  }

  .code-font {
    font-family: ${theme.typography.fontFamily.code};
  }

  /* Consistent section styling */
  section {
    padding: ${theme.spacing['3xl']} 0;
  }

  /* Custom focus styles for accessibility */
  :focus-visible {
    outline: 2px solid ${theme.colors.primary.main};
    outline-offset: 2px;
  }
`;

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {children}
    </>
  );
};

export default ThemeProvider;
