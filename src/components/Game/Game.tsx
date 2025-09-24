import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Confetti from '../Confetti/Confetti';

const GameContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #000;
  font-family: monospace;
  color: #fff;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;


const GameLayout = styled.div`
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: auto;
  gap: 80px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  background: #000;
  padding: 20px;
  gap: 20px;
  flex: 1;
`;

const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  color: white;
  text-align: center;
  padding: 20px;
`;

const OverlayMessage = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const OverlayButton = styled.button`
  padding: 15px 30px;
  background: white;
  color: black;
  border: none;
  font-family: monospace;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 4px;
  
  &:hover {
    background: #eee;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const NumberGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 20px; /* Match tower padding */
  width: 100%;
  height: 400px; /* Fixed height to match tower */
  align-content: start;
`;

const NumberBlock = styled.button`
  aspect-ratio: 1;
  border: 1px solid #fff;
  background: #fff;
  color: #000;
  font-family: monospace;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover:not(:disabled) {
    background: #000;
    color: #fff;
  }
  
  font-weight: 500;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.default};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.highlight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.small};
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

const TowerArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  min-height: 448px; /* 400px + 48px to match number grid height */
  height: 448px; /* 400px + 48px to match number grid height */
  width: 100%;
  padding: 20px;
  border: 1px solid #333;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  padding: 0 20px;
`;

const StatBox = styled.div`
  font-size: 1.5rem;
  text-align: center;
  width: 100%;
  max-width: 200px;
  padding: 10px;
  border: 1px solid #333;
  border-radius: 4px;
`;

const TipBox = styled.div`
  color: #999;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

const EmptyTowerText = styled.div`
  color: #333;
  font-size: 0.9rem;
`;

const PanelNoPadding = styled(Panel)`
  padding: 0;
`;

const SumValue = styled.strong<{ danger?: boolean }>`
  color: ${({ danger }) => (danger ? '#ff4444' : 'inherit')};
`;

interface TowerBlockProps {
  onClick?: () => void;
}

const TowerBlock = styled.div<TowerBlockProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 44px;
  margin: 2px 0;
  background: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1.1rem;
  font-weight: 500;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #000;
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Game: React.FC = () => {
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [currentSum, setCurrentSum] = useState<number>(0);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  // Removed unused message state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Generate a random target number between 30 and 100
    const newTarget = Math.floor(Math.random() * 71) + 30;
    setTargetNumber(newTarget);
    setCurrentSum(0);
    setSelectedNumbers([]);
    setGameStatus('playing');
    setShowConfetti(false);
  };

  const checkGameStatus = (sum: number) => {
    if (sum === targetNumber) {
      setGameStatus('won');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else if (sum > targetNumber) {
      setGameStatus('lost');
    }
  };

  const handleNumberClick = (number: number, fromTower: boolean = false) => {
    if (gameStatus === 'won') return; // Don't allow changes after winning
    
    let updatedSelectedNumbers: number[];
    let updatedSum: number;
    
    const numberIndex = selectedNumbers.indexOf(number);
    
    if (numberIndex === -1) {
      // Add number - only allow if game is not lost or if we're removing from tower
      if (gameStatus === 'lost' && !fromTower) return;
      
      updatedSelectedNumbers = [...selectedNumbers, number];
      updatedSum = currentSum + number;
    } else {
      // Always allow removing numbers
      updatedSelectedNumbers = [...selectedNumbers];
      updatedSelectedNumbers.splice(numberIndex, 1);
      updatedSum = currentSum - number;
    }
    
    setCurrentSum(updatedSum);
    setSelectedNumbers(updatedSelectedNumbers);
    
    // Check if we're back in a valid state after removing numbers
    if (updatedSum <= targetNumber) {
      setGameStatus('playing');
    }
    
    // Check win/lose conditions
    checkGameStatus(updatedSum);
  };

  // Generate numbers 1-20 for the grid
  const numbers: number[] = Array.from({ length: 20 }, (_, i) => i + 1);

  // Generate tower blocks
  const towerBlocks = selectedNumbers.map((number: number, index: number) => (
    <TowerBlock 
      key={index} 
      onClick={() => handleNumberClick(number, true)}
      title="Klik for at fjerne"
    >
      {number}
    </TowerBlock>
  ));

  return (
    <GameContainer>
      {gameStatus === 'won' && (
        <OverlayContainer>
          <OverlayMessage>Tillykke! Du har vundet!</OverlayMessage>
          <OverlayButton onClick={startNewGame}>Prøv igen</OverlayButton>
        </OverlayContainer>
      )}
      <GameLayout>
        <Panel>
          <TowerArea>
            {gameStatus === 'lost' && (
              <TipBox>
                Klik på et tal for at fjerne det
              </TipBox>
            )}
            {towerBlocks.length > 0 ? towerBlocks : (
              <EmptyTowerText>
                Byg dit tårn her
              </EmptyTowerText>
            )}
          </TowerArea>
          
          <StatsContainer>
            <StatBox>
              Mål: <strong>{targetNumber}</strong>
            </StatBox>
            <StatBox>
              Sum: <SumValue danger={currentSum > targetNumber}>{currentSum}</SumValue>
            </StatBox>
          </StatsContainer>

        </Panel>

        <PanelNoPadding>
          <NumberGrid>
            {numbers.map((number) => (
              <NumberBlock
                key={number}
                onClick={() => handleNumberClick(number)}
                disabled={gameStatus !== 'playing' || selectedNumbers.includes(number)}
              >
                {number}
              </NumberBlock>
            ))}
          </NumberGrid>
        </PanelNoPadding>
      </GameLayout>
      
      <Confetti active={showConfetti} />
    </GameContainer>
  );
};

export default Game;
