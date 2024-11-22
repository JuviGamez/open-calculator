import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isScientific, setIsScientific] = useState(false);

  const handleNumber = (num) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperator = (op) => {
    setExpression(prev => prev + display + op);
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(expression + display);
      if (!isFinite(result)) {
        setDisplay('Error');
      } else {
        setDisplay(result.toString());
      }
      setExpression('');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleScientific = (operation) => {
    try {
      let result;
      const number = parseFloat(display);
      
      switch(operation) {
        case 'sin':
          result = Math.sin(number * Math.PI / 180);
          break;
        case 'cos':
          result = Math.cos(number * Math.PI / 180);
          break;
        case 'tan':
          result = Math.tan(number * Math.PI / 180);
          break;
        case 'sqrt':
          result = Math.sqrt(number);
          break;
        case 'square':
          result = Math.pow(number, 2);
          break;
        case 'log':
          result = Math.log10(number);
          break;
        case 'ln':
          result = Math.log(number);
          break;
        case 'pi':
          result = Math.PI;
          break;
        case 'e':
          result = Math.E;
          break;
      }

      if (!isFinite(result)) {
        setDisplay('Error');
      } else {
        setDisplay(result.toString());
      }
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <CalcContainer
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
      <GlowEffect />
      <ModeToggle>
        <ModeButton 
          active={!isScientific} 
          onClick={() => setIsScientific(false)}
        >
          Basic
        </ModeButton>
        <ModeButton 
          active={isScientific} 
          onClick={() => setIsScientific(true)}
        >
          Scientific
        </ModeButton>
      </ModeToggle>

      <Display>
        <ExpressionDisplay>{expression}</ExpressionDisplay>
        <AnimatePresence mode="wait">
          <MainDisplay
            key={display}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {display}
          </MainDisplay>
        </AnimatePresence>
      </Display>
      
      <ButtonGrid scientific={isScientific}>
        {isScientific && (
          <>
            <AnimatedButton onClick={() => handleScientific('sin')}>sin</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('cos')}>cos</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('tan')}>tan</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('log')}>log</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('ln')}>ln</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('sqrt')}>√</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('square')}>x²</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('pi')}>π</AnimatedButton>
            <AnimatedButton onClick={() => handleScientific('e')}>e</AnimatedButton>
          </>
        )}
        
        <AnimatedButton onClick={clear}>AC</AnimatedButton>
        <AnimatedButton>()</AnimatedButton>
        <AnimatedButton>%</AnimatedButton>
        <AnimatedButton onClick={() => handleOperator('/')} accent>÷</AnimatedButton>
        
        <AnimatedButton onClick={() => handleNumber('7')}>7</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('8')}>8</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('9')}>9</AnimatedButton>
        <AnimatedButton onClick={() => handleOperator('*')} accent>×</AnimatedButton>
        
        <AnimatedButton onClick={() => handleNumber('4')}>4</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('5')}>5</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('6')}>6</AnimatedButton>
        <AnimatedButton onClick={() => handleOperator('-')} accent>−</AnimatedButton>
        
        <AnimatedButton onClick={() => handleNumber('1')}>1</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('2')}>2</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('3')}>3</AnimatedButton>
        <AnimatedButton onClick={() => handleOperator('+')} accent>+</AnimatedButton>
        
        <AnimatedButton onClick={() => handleNumber('0')} wide>0</AnimatedButton>
        <AnimatedButton onClick={() => handleNumber('.')}>.</AnimatedButton>
        <AnimatedButton onClick={calculate} accent>=</AnimatedButton>
      </ButtonGrid>
    </CalcContainer>
  );
};

const CalcContainer = styled(motion.div)`
  background: ${props => props.theme.calculatorBg};
  padding: 1.5rem;
  border-radius: 24px;
  box-shadow: ${props => props.theme.shadow};
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`;

const GlowEffect = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    ${props => props.theme.accent + '20'} 0%,
    transparent 70%
  );
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
`;

const Display = styled.div`
  padding: 2rem;
  text-align: right;
  background: transparent;
  color: ${props => props.theme.text};
`;

const ExpressionDisplay = styled.div`
  font-family: 'Google Sans', 'Roboto', sans-serif;
  font-size: 16px;
  min-height: 24px;
  opacity: 0.7;
`;

const MainDisplay = styled(motion.div)`
  font-family: 'Google Sans', 'Roboto', sans-serif;
  font-size: 48px;
  font-weight: 500;
  margin-top: 8px;
  word-break: break-all;
  text-shadow: 0 0 10px ${props => props.theme.accent + '40'};
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 1rem;
  ${props => props.scientific && `
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
  `}
`;

const AnimatedButton = styled(motion.button)`
  font-family: 'Google Sans', 'Roboto', sans-serif;
  background: ${props => props.accent ? props.theme.accent : props.theme.buttonBg};
  color: ${props => props.accent ? '#fff' : props.theme.text};
  border: none;
  border-radius: 16px;
  padding: 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  grid-column: ${props => props.wide ? 'span 2' : 'span 1'};
  overflow: hidden;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      45deg,
      transparent,
      ${props => props.accent ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px ${props => props.accent ? 
      props.theme.accent + '40' : 
      'rgba(0,0,0,0.1)'};
  }

  &:active {
    transform: scale(0.95) translateY(0);
  }

  ${props => props.accent && `
    box-shadow: 0 2px 10px ${props.theme.accent + '40'};
  `}
`;

const ModeToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 1rem;
  padding: 4px;
  background: ${props => props.theme.buttonBg};
  border-radius: 12px;
`;

const ModeButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  font-family: 'Google Sans', 'Roboto', sans-serif;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.active ? props.theme.accent : 'transparent'};
  color: ${props => props.active ? '#fff' : props.theme.text};

  &:hover {
    background: ${props => props.active ? props.theme.accent : props.theme.buttonHover};
  }
`;

export default Calculator; 