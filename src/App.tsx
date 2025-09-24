import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import Game from './components/Game/Game';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Game />
    </ThemeProvider>
  );
}

export default App;
