// theme.ts - Centralized theme configuration

export const colors = {
  // Primary brand colors
  primary: {
    main: '#00f260',       // Vibrant green
    light: '#33f57d',
    dark: '#00b348',
    gradient: 'linear-gradient(90deg, #00f260, #0575e6)'
  },
  // Secondary brand colors
  secondary: {
    main: '#0575e6',      // Blue
    light: '#2e8deb',
    dark: '#0458ad'
  },
  // UI background colors
  background: {
    dark: '#0a0a0a',      // Almost black for main background
    card: '#111111',      // Slightly lighter for cards
    codeBlock: '#1a1a1a',  // For code blocks and terminals
    highlight: '#1e1e1e'   // For highlights
  },
  // Text colors
  text: {
    primary: '#ffffff',    // White for primary text
    secondary: '#aaaaaa',  // Light gray for secondary text
    muted: '#666666',      // Muted text
    highlight: '#00f260'   // Highlighted text
  },
  // Accent colors for various UI elements
  accent: {
    purple: '#bd93f9',    // Dracula-inspired purple
    pink: '#f06292',       // Pink for code elements
    yellow: '#f1fa8c',     // Yellow for highlights
    orange: '#f39c12',     // Orange for highlights
    red: '#ff5f56',        // Terminal red dot
    green: '#27c93f',      // Terminal green dot
    yellow2: '#ffbd2e'     // Terminal yellow dot
  },
  // Border colors
  border: {
    light: 'rgba(50, 50, 50, 0.5)',  // Light border
    main: '#222222'        // Main border color
  }
};

// Typography settings
export const typography = {
  // Font families
  fontFamily: {
    heading: '"Raleway", "Segoe UI", Roboto, sans-serif',   // Decorative font for headings
    body: '"Open Sans", "Segoe UI", Roboto, sans-serif',     // Readable font for content
    code: '"Source Code Pro", monospace'                    // Monospace for code
  },
  // Font weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800
  },
  // Font sizes
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    md: '1.125rem',    // 18px
    lg: '1.25rem',     // 20px
    xl: '1.5rem',      // 24px
    '2xl': '1.75rem',  // 28px
    '3xl': '2rem',     // 32px
    '4xl': '2.5rem',   // 40px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem'   // 60px
  }
};

// Animation settings
export const animations = {
  transition: {
    fast: 'all 0.2s ease',
    medium: 'all 0.3s ease',
    slow: 'all 0.5s ease'
  },
  hover: {
    scale: 'transform: scale(1.05)',
    lift: 'transform: translateY(-5px)',
    glow: 'box-shadow: 0 0 15px rgba(0, 242, 96, 0.5)'
  }
};

// Breakpoints for responsive design
export const breakpoints = {
  xs: '320px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px'
};

// Spacing scale
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem'    // 64px
};

// Export the complete theme
const theme = {
  colors,
  typography,
  animations,
  breakpoints,
  spacing
};

export default theme;
