import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const TerminalContainer = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  font-family: 'Source Code Pro', monospace;
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const TerminalHeader = styled.div`
  background: #2a2a2a;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const TerminalTitle = styled.div`
  margin: 0 auto;
  color: #ddd;
  font-size: 14px;
`;

const TerminalControl = styled.div`
  display: flex;
  position: absolute;
`;

const TerminalButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin-right: 8px;
`;

const TerminalBody = styled.div`
  padding: 16px;
  color: #ddd;
  min-height: 300px;
`;

const TerminalPrompt = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const TerminalUser = styled.span`
  color: #3498db;
`;

const TerminalAt = styled.span`
  color: #aaa;
  margin: 0 2px;
`;

const TerminalMachine = styled.span`
  color: #2ecc71;
`;

const TerminalPath = styled.span`
  color: #f39c12;
  margin-left: 5px;
`;

const CommandOutput = styled.pre`
  margin: 8px 0 16px;
  white-space: pre-wrap;
  word-break: break-all;
  color: #bbb;
  font-size: 14px;
`;

const TerminalCursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 18px;
  background-color: #ddd;
  margin-left: 2px;
  animation: blink 1s step-end infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const AnimatedTerminal = () => {
  const initialCommands = [
    {
      command: 'npm install my-portfolio',
      output: 'Installing dependencies...\n+ react@18.2.0\n+ typescript@5.2.2\n+ vite@5.1.6\n+ framer-motion@11.0.8\nAdded 175 packages in 3.2s'
    },
    {
      command: 'node -v && npm -v',
      output: 'v18.17.1\n9.6.7'
    },
  ];

  return (
    <TerminalContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <TerminalHeader>
        <TerminalControl>
          <TerminalButton color="#ff5f56" />
          <TerminalButton color="#ffbd2e" />
          <TerminalButton color="#27c93f" />
        </TerminalControl>
        <TerminalTitle>ahmed@portfolio: ~/projects</TerminalTitle>
      </TerminalHeader>
      <TerminalBody>
        {initialCommands.map((cmd, index) => (
          <div key={index}>
            <TerminalPrompt>
              <TerminalUser>ahmed</TerminalUser>
              <TerminalAt>@</TerminalAt>
              <TerminalMachine>portfolio</TerminalMachine>
              <span>:</span>
              <TerminalPath>~/projects$ </TerminalPath>
              <span>{cmd.command}</span>
            </TerminalPrompt>
            <CommandOutput>{cmd.output}</CommandOutput>
          </div>
        ))}
        <TerminalPrompt>
          <TerminalUser>ahmed</TerminalUser>
          <TerminalAt>@</TerminalAt>
          <TerminalMachine>portfolio</TerminalMachine>
          <span>:</span>
          <TerminalPath>~/projects$ </TerminalPath>
          <span>_</span>
        </TerminalPrompt>
      </TerminalBody>
    </TerminalContainer>
  );
};

export default AnimatedTerminal;
