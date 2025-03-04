import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
`;

const ThemeToggle: React.FC = () => {
  const { toggleTheme } = useTheme();
  const themeMode = useSelector((state: any) => state.theme.mode);
  
  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle theme">
      {themeMode === 'light' ? (
        <FontAwesomeIcon icon={faMoon} />
      ) : (
        <FontAwesomeIcon icon={faSun} />
      )}
    </ToggleButton>
  );
};

export default ThemeToggle;