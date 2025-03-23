import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const CodeContainer = styled(motion.div)`
  position: relative;
  background: #1a1a1a;
  border-radius: 8px;
  padding: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  font-family: 'Source Code Pro', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 0 auto;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #2a2a2a;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  @media (max-width: 768px) {
    font-size: 12px;
    max-width: 100%;
  }
`;

const CodeHeader = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  padding: 0 10px;
  height: 30px;
  align-items: center;
`;

const CodeCircle = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.color};
  margin-right: 6px;
`;

const CodeFilename = styled.div`
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const CodeContent = styled.pre`
  color: #d4d4d4;
  margin: 10px 0 0;
  overflow-x: auto;
  tab-size: 2;
  padding-top: 10px;
`;

const Keyword = styled.span`
  color: #569cd6;
`;

const String = styled.span`
  color: #ce9178;
`;

const Function = styled.span`
  color: #dcdcaa;
`;

const Variable = styled.span`
  color: #9cdcfe;
`;

const Comment = styled.span`
  color: #6a9955;
`;

const LineNumber = styled.span`
  display: inline-block;
  width: 30px;
  color: #858585;
  user-select: none;
`;

interface FloatingCodeProps {
  title?: string;
}

const FloatingCode: React.FC<FloatingCodeProps> = ({ title = 'portfolio.tsx' }) => {
  return (
    <CodeContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <CodeHeader>
        <CodeCircle color="#ff5f56" />
        <CodeCircle color="#ffbd2e" />
        <CodeCircle color="#27c93f" />
        <CodeFilename>{title}</CodeFilename>
      </CodeHeader>
      <CodeContent>
        <div><LineNumber>1</LineNumber><Keyword>import</Keyword> React <Keyword>from</Keyword> <String>'react'</String>;</div>
        <div><LineNumber>2</LineNumber></div>
        <div><LineNumber>3</LineNumber><Keyword>const</Keyword> <Variable>Portfolio</Variable> = () {'=>'} {'{'}</div>
        <div><LineNumber>4</LineNumber>  <Comment>// Skills and experience</Comment></div>
        <div><LineNumber>5</LineNumber>  <Keyword>const</Keyword> <Variable>skills</Variable> = [</div>
        <div><LineNumber>6</LineNumber>    <String>'React'</String>, <String>'TypeScript'</String>, <String>'Node.js'</String>,</div>
        <div><LineNumber>7</LineNumber>    <String>'Next.js'</String>, <String>'Python'</String>, <String>'MongoDB'</String></div>
        <div><LineNumber>8</LineNumber>  ];</div>
        <div><LineNumber>9</LineNumber></div>
        <div><LineNumber>10</LineNumber>  <Keyword>return</Keyword> (</div>
        <div><LineNumber>11</LineNumber>    {'<'}<Function>div</Function> <Variable>className</Variable>={<String>"portfolio"</String>}{'>'}</div>
        <div><LineNumber>12</LineNumber>      {'<'}<Function>h1</Function>{'>'}Ahmed Mribai{'</'}<Function>h1</Function>{'>'}</div>
        <div><LineNumber>13</LineNumber>      {'<'}<Function>p</Function>{'>'}Full Stack Developer{'</'}<Function>p</Function>{'>'}</div>
        <div><LineNumber>14</LineNumber>      {'<'}<Function>ShowSkills</Function> <Variable>items</Variable>={'{skills}'} /{'>'}</div>
        <div><LineNumber>15</LineNumber>    {'</'}<Function>div</Function>{'>'}</div>
        <div><LineNumber>16</LineNumber>  );</div>
        <div><LineNumber>17</LineNumber>{'}'};</div>
        <div><LineNumber>18</LineNumber></div>
        <div><LineNumber>19</LineNumber><Keyword>export</Keyword> <Keyword>default</Keyword> <Variable>Portfolio</Variable>;</div>
      </CodeContent>
    </CodeContainer>
  );
};

export default FloatingCode;
