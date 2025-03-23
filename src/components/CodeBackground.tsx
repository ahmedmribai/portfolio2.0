import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;

const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix-like raining code characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]()=+-*&^%$#@!~';
    const columns = Math.floor(canvas.width / 15); // Adjust for character width
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      // Add semi-transparent black rectangle to create fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0'; // Green text
      ctx.font = '15px monospace';

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Select a random character
        const text = characters[Math.floor(Math.random() * characters.length)];
        
        // Calculate x position based on column index
        const x = i * 15;
        
        // Draw the character
        ctx.fillText(text, x, drops[i]);
        
        // Move drop down
        drops[i] += 1;
        
        // Reset drop to top with random delay
        if (drops[i] > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
    };

    // Animation loop
    const interval = setInterval(draw, 40);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <BackgroundContainer>
      <canvas 
        ref={canvasRef} 
        style={{ 
          opacity: 0.15,
        }}
      />
    </BackgroundContainer>
  );
};

export default CodeBackground;
