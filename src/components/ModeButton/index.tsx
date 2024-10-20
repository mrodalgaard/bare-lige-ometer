import { Button } from 'components/Button';
import { AppContext } from 'contexts/AppContext';
import { useContext } from 'react';
import { Moon, Sun } from 'react-feather';

export const ModeButton = () => {
  const { mode, toggleMode } = useContext(AppContext);

  return (
    <Button clickedText={mode === 'light' ? 'light' : 'dark'} onClick={toggleMode}>
      {mode === 'light' ? <Sun size={60} /> : <Moon size={60} />}
    </Button>
  );
};
