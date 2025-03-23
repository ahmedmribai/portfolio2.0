# Ahmed Mribai Portfolio

A modern, dark-themed portfolio website built with React, TypeScript, and Framer Motion.

## Features

- Responsive design with dark theme
- Interactive animations and transitions
- Skills visualization with animated progress bars
- Project showcase with hover effects
- Contact form with EmailJS integration
- Modern UI/UX with gradient accents

## Tech Stack

- React 18
- TypeScript
- Vite
- Emotion (Styled Components)
- Framer Motion
- EmailJS
- Font Awesome Icons
- React Intersection Observer

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Update the Font Awesome kit code in `App.tsx`
5. Start the development server:
   ```bash
   npm run dev
   ```

## Customization

1. Update personal information in `Hero.tsx`
2. Add your projects in `Projects.tsx`
3. Modify skills and their levels in `Skills.tsx`
4. Customize colors and styling in individual component files

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT
