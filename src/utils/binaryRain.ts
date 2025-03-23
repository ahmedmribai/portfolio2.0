/**
 * Binary rain animation for the contact section background
 */
export const initBinaryRain = (): number | undefined => {
  const canvas = document.getElementById('binaryRain') as HTMLCanvasElement;
  if (!canvas) return undefined;

  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;

  // Set canvas dimensions
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Binary characters
  const binary = '01';
  const fontSize = 12;
  const columns = Math.floor(canvas.width / fontSize);
  const drops: number[] = [];

  // Initialize drops
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
  }

  const draw = () => {
    // Add semi-transparent black rectangle to create fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f0'; // Green text
    ctx.font = `${fontSize}px monospace`;

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
      // Select a random binary character
      const text = binary.charAt(Math.floor(Math.random() * binary.length));
      
      // Calculate x position based on column index
      const x = i * fontSize;
      
      // Draw the character
      ctx.fillText(text, x, drops[i] * fontSize);
      
      // Move drop down
      if (Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      // Increment drop position
      drops[i]++;
    }
  };

  // Animation loop
  return setInterval(draw, 33);
};
