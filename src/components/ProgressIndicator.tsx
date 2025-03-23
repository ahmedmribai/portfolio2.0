import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

interface SpinnerProps {
  size: 'small' | 'medium' | 'large';
  color: string;
}

const getSize = (size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return '20px';
    case 'large':
      return '50px';
    case 'medium':
    default:
      return '35px';
  }
};

const SpinnerContainer = styled.div<{fullScreen: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${props => props.fullScreen ? `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 10, 10, 0.7);
    backdrop-filter: blur(4px);
    z-index: 1000;
  ` : ''}
`;

const Spinner = styled(motion.div)<SpinnerProps>`
  width: ${props => getSize(props.size)};
  height: ${props => getSize(props.size)};
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-top-color: ${props => props.color};
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: 12px;
  color: #ffffff;
  font-family: 'Raleway', 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  text-align: center;
`;

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isLoading = true,
  size = 'medium',
  color = '#00f260',
  text,
  fullScreen = false
}) => {
  if (!isLoading) return null;

  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner 
        size={size} 
        color={color}
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {text && <LoadingText>{text}</LoadingText>}
    </SpinnerContainer>
  );
};

export default ProgressIndicator;
