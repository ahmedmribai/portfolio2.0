import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ThemeProvider from './components/ThemeProvider'
import { ToastProvider } from './components/Toast'
import './index.css'

// Add smooth scrolling behavior to the entire document
document.documentElement.style.scrollBehavior = 'smooth';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
