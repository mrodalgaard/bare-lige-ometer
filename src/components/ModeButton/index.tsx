import { Button } from 'components/Button';
import { AppContext } from 'contexts/AppContext';
import { MouseEvent, useCallback, useContext } from 'react';
import { Moon, Sun } from 'react-feather';

export const ModeButton = () => {
  const { mode, toggleMode } = useContext(AppContext);

  const toggleWithAnimation = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      // Get the mouse click position and calculate the end radius
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

      // Start the view transition with clip path animation
      const transition = document.startViewTransition(toggleMode);
      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
          },
          {
            duration: 500,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    },
    [toggleMode]
  );

  return (
    <Button clickedText={mode === 'light' ? 'light' : 'dark'} onClick={toggleWithAnimation}>
      {mode === 'light' ? <Sun size={60} /> : <Moon size={60} />}
    </Button>
  );
};
