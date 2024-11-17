import { Button } from 'components/Button';
import { AppContext } from 'contexts/AppContext';
import { Mode } from 'contexts/ThemeContext';
import { AnalyticsEvent } from 'models/AnalyticsEvent';
import { MouseEvent, useCallback, useContext } from 'react';
import { Moon, Sun, Sunset } from 'react-feather';
import { logEvent } from 'util/analytics';

export const ModeButton = () => {
  const { mode, toggleMode, reducedMotion } = useContext(AppContext);

  const toggleWithAnimation = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      logEvent(AnalyticsEvent.ModeClick);

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
            duration: reducedMotion ? 0 : 500,
            easing: 'ease-out',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    },
    [toggleMode, reducedMotion]
  );

  const getIcon = (mode: Mode) => {
    switch (mode) {
      case Mode.system:
        return <Sunset size={56} />;
      case Mode.light:
        return <Sun size={56} />;
      case Mode.dark:
        return <Moon size={56} />;
    }
  };

  return (
    <Button clickedText={mode} onClick={toggleWithAnimation} aria-label={`Change mode`}>
      {getIcon(mode)}
    </Button>
  );
};
