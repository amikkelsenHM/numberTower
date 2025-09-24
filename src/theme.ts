export const theme = {
  colors: {
    // Inverted dark theme
    primary: '#FFFFFF',    // White
    secondary: '#CCCCCC',  // Light gray
    background: '#000000', // Black background
    surface: '#111111',   // Dark surface
    text: '#FFFFFF',      // White text
    textSecondary: '#999999', // Gray text
    accent: '#FFFFFF',    // White accent
    error: '#FF6B6B',     // Red for errors
    success: '#4BB543',   // Green for success
    border: '#333333',    // Dark border
    highlight: '#222222', // Hover/focus states
  },
  fonts: {
    primary: '"SF Mono", "Roboto Mono", monospace',
    heading: '"Calibre", "Inter", sans-serif',
  },
  spacing: {
    xsmall: '4px',
    small: '8px',
    medium: '16px',
    large: '24px',
    xlarge: '32px',
    xxlarge: '48px',
  },
  borderRadius: {
    small: '4px',
    medium: '6px',
    large: '8px',
    xlarge: '12px',
    circle: '50%',
  },
  shadows: {
    small: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
    medium: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
    large: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
    button: '0 0 10px 2px rgba(100, 255, 218, 0.3)',
  },
  transitions: {
    default: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

export type ThemeType = typeof theme;
