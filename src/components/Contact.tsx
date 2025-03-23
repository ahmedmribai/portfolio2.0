import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { initBinaryRain } from '../utils/binaryRain';
import { useToast } from './Toast';
import ProgressIndicator from './ProgressIndicator';

const ContactSection = styled.section`
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

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled.form`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #2a2a2a;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(45deg, #3498db, #2ecc71);
  }
`;

const FormHeader = styled.div`
  background: #2a2a2a;
  margin: -2rem -2rem 2rem -2rem;
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
  display: flex;
  align-items: center;
`;

const FormTitle = styled.h3`
  color: #fff;
  font-size: 1.2rem;
  margin: 0;
  display: flex;
  align-items: center;
  
  & > i {
    margin-right: 10px;
    color: #3498db;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

const InputGroup = styled.div`
  position: relative;
  
  i {
    position: absolute;
    left: 12px;
    top: 14px;
    color: #888;
    transition: color 0.3s ease;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #888;
  font-family: 'Source Code Pro', monospace;
  
  &::before {
    content: '// ';
    color: #6A9955;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 5px;
  color: #ddd;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Source Code Pro', monospace;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
  
  &:focus + i {
    color: #3498db;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 12px 12px 40px;
  background: #2a2a2a;
  border: 1px solid #333;
  border-radius: 5px;
  color: #ddd;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: 'Source Code Pro', monospace;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
  
  &:focus + i {
    color: #3498db;
  }
`;

const SubmitButton = styled(motion.button)`
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
  margin-top: 1rem;
  font-weight: bold;
  width: 100%;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContactCard = styled(motion.div)`
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  border: 1px solid #2a2a2a;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    border-color: #3498db;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ContactIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: #2a2a2a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3498db;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ContactCardContent = styled.div`
  flex-grow: 1;
`;

const ContactCardTitle = styled.h3`
  color: #fff;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
`;

const ContactCardText = styled.p`
  color: #888;
  margin: 0;
  font-family: 'Source Code Pro', monospace;
`;

const CodeSnippet = styled.div`
  background: #202020;
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Source Code Pro', monospace;
  color: #ddd;
  margin-top: 2rem;
  line-height: 1.5;
  border-left: 4px solid #3498db;
  overflow-x: auto;
  
  .keyword {
    color: #569cd6;
  }
  
  .string {
    color: #ce9178;
  }
  
  .function {
    color: #dcdcaa;
  }
  
  .comment {
    color: #6a9955;
  }
`;

const FormSuccess = styled(motion.div)`
  background: #1a1a1a;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid #2a2a2a;
  text-align: center;
  
  h3 {
    color: #2ecc71;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  p {
    color: #888;
    margin-bottom: 1.5rem;
  }
`;

const BinaryRain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.03;
  z-index: 0;
  overflow: hidden;
`;

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    submitting: false,
    success: false,
  });

  const { showToast } = useToast();

  // Initialize binary rain animation
  useEffect(() => {
    const animationId = initBinaryRain();
    return () => {
      if (animationId !== undefined) {
        clearInterval(animationId);
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(prev => ({ ...prev, submitting: true }));
    
    // Validate form inputs
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setFormState(prev => ({ ...prev, submitting: false }));
      showToast('Please fill in all required fields', 'error');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setFormState(prev => ({ ...prev, submitting: false }));
      showToast('Please enter a valid email address', 'error');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormState(prev => ({ ...prev, submitting: false, success: true }));
      showToast('Your message has been sent successfully!', 'success');
    }, 2000);
  };

  return (
    <ContactSection id="contact">
      <BinaryRain>
        <canvas id="binaryRain" />
      </BinaryRain>
      
      <SectionHeader>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Contact Me
        </SectionTitle>
        <CodeComment>
          // Connect with me or leave a message
        </CodeComment>
      </SectionHeader>
      
      <ContactContainer>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {!formState.success ? (
            <ContactForm onSubmit={handleSubmit}>
              <FormHeader>
                <FormTitle>
                  <i className="fas fa-code"></i> Send Message
                </FormTitle>
              </FormHeader>
              
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>
                <InputGroup>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                  />
                  <i className="fas fa-user"></i>
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Your Email</Label>
                <InputGroup>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="johndoe@example.com"
                  />
                  <i className="fas fa-envelope"></i>
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="subject">Subject</Label>
                <InputGroup>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Project Inquiry"
                  />
                  <i className="fas fa-tag"></i>
                </InputGroup>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="message">Message</Label>
                <InputGroup>
                  <TextArea
                    id="message"
                    name="message"
                    required
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Hello, I would like to discuss a project..."
                  />
                  <i className="fas fa-comment-alt"></i>
                </InputGroup>
              </FormGroup>
              
              <SubmitButton
                type="submit"
                disabled={formState.submitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formState.submitting ? (
                  <>
                    <ProgressIndicator size="small" color="#ffffff" />
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                  </>
                )}
              </SubmitButton>
            </ContactForm>
          ) : (
            <FormSuccess
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>
                <i className="fas fa-check-circle"></i>
                Message Sent!
              </h3>
              <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <SubmitButton
                type="button"
                onClick={() => {
                  setFormState(prev => ({ ...prev, success: false, name: '', email: '', subject: '', message: '' }));
                  showToast('Ready to send a new message', 'info');
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <i className="fas fa-redo"></i>
                Send Another Message
              </SubmitButton>
            </FormSuccess>
          )}
        </motion.div>
        
        <ContactInfo>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ContactCard whileHover={{ y: -5 }}>
              <ContactIconWrapper>
                <i className="fas fa-envelope"></i>
              </ContactIconWrapper>
              <ContactCardContent>
                <ContactCardTitle>Email</ContactCardTitle>
                <ContactCardText>ahmed.mribai@example.com</ContactCardText>
              </ContactCardContent>
            </ContactCard>
            
            <ContactCard whileHover={{ y: -5 }}>
              <ContactIconWrapper>
                <i className="fas fa-map-marker-alt"></i>
              </ContactIconWrapper>
              <ContactCardContent>
                <ContactCardTitle>Location</ContactCardTitle>
                <ContactCardText>Casablanca, Morocco</ContactCardText>
              </ContactCardContent>
            </ContactCard>
            
            <ContactCard whileHover={{ y: -5 }}>
              <ContactIconWrapper>
                <i className="fas fa-globe"></i>
              </ContactIconWrapper>
              <ContactCardContent>
                <ContactCardTitle>Website</ContactCardTitle>
                <ContactCardText>www.ahmedmribai.com</ContactCardText>
              </ContactCardContent>
            </ContactCard>
            
            <CodeSnippet>
              <div><span className="keyword">const</span> <span>contactMe</span> = <span className="function">async</span>() {'=> {'}</div>
              <div>  <span className="comment">// I'm always open to new opportunities</span></div>
              <div>  <span className="keyword">await</span> <span className="function">sendEmail</span>({'{'}</div>
              <div>    to: <span className="string">"ahmed.mribai@example.com"</span>,</div>
              <div>    subject: <span className="string">"Let's work together!"</span></div>
              <div>  {'}'});</div>
              <div>{'}'}</div>
            </CodeSnippet>
          </motion.div>
        </ContactInfo>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
