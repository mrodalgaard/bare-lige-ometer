import { useContext } from 'react';
import { AppContext } from '.';

describe('AppContext', () => {
  it('gets and sets title as query parameter', () => {
    const Component = ({ id = 'title' }: { id?: string }) => {
      const { title, setTitle } = useContext(AppContext);

      return (
        <>
          <h1 id={id}>{title}</h1>
          <button onClick={() => setTitle('New')}>Change</button>
        </>
      );
    };

    cy.mount(<Component />);
    cy.get('#title').should('have.text', '');
    cy.url().should('not.include', 'title');
    cy.get('button').click();
    cy.get('#title').should('have.text', 'New');
    cy.url().should('include', 'title=New');

    cy.mount(<Component id={'title2'} />);
    cy.get('#title2').should('have.text', 'New');
    cy.url().should('include', 'title=New');
  });

  it('gets and sets value as query parameter', () => {
    const Component = ({ id = 'value' }: { id?: string }) => {
      const { value, setValue } = useContext(AppContext);

      return (
        <>
          <h1 id={id}>{value}</h1>
          <button onClick={() => setValue(1)}>Change</button>
        </>
      );
    };

    cy.mount(<Component />);
    cy.get('#value').should('have.text', '');
    cy.url().should('not.include', 'value');
    cy.get('button').click();
    cy.get('#value').should('have.text', '1');
    cy.url().should('include', 'value=1');

    cy.mount(<Component id={'value2'} />);
    cy.get('#value2').should('have.text', '1');
    cy.url().should('include', 'value=1');
  });

  it('stores, rehydrates and toggles mode from local storage', () => {
    const Component = ({ id = 'mode' }: { id?: string }) => {
      const { mode, toggleMode } = useContext(AppContext);

      return (
        <>
          <h1 id={id}>{mode}</h1>
          <button onClick={toggleMode}>Toggle</button>
        </>
      );
    };

    // Stub media query to set initial mode to light
    cy.matchMedia('(prefers-color-scheme: dark)', false);

    // Initial mode state and toggle mode
    cy.mount(<Component />);
    cy.get('#mode').should('have.text', 'light');
    cy.get('button').click();
    cy.get('#mode').should('have.text', 'dark');

    // Rehydrate mode state
    cy.mount(<Component id={'mode2'} />);
    cy.get('#mode2').should('have.text', 'dark');
    cy.get('button').click();
    cy.mount(<Component id={'mode3'} />);
    cy.get('#mode3').should('have.text', 'light');

    // Clear local storage and rehydrate initial state
    cy.clearAllLocalStorage();
    cy.mount(<Component id={'mode4'} />);
    cy.get('#mode4').should('have.text', 'light');
  });

  it('has reducedMotion as state from media query', () => {
    const Component = () => {
      const { reducedMotion } = useContext(AppContext);

      return <h1>{reducedMotion.toString()}</h1>;
    };

    // Stub media query
    cy.matchMedia('(prefers-reduced-motion: no-preference)').then((listener) => {
      cy.mount(<Component />);
      cy.get('h1').should('have.text', 'false');

      // Simulate reduced motion change event
      cy.get('h1').should((h1) => {
        listener({ matches: false } as MediaQueryListEvent);
        expect(h1).to.have.text('true');
      });
    });
  });

  it('handle browsers without match media support', () => {
    const Component = () => {
      const { mode, reducedMotion } = useContext(AppContext);

      return (
        <>
          <h1 id="mode">{mode}</h1>
          <h1 id="reducedMotion">{reducedMotion.toString()}</h1>
        </>
      );
    };

    // Undefine match media
    cy.window().then((win) => {
      (win.matchMedia as unknown) = undefined;
    });

    cy.mount(<Component />);
    cy.get('#mode').should('have.text', 'light');
    cy.get('#reducedMotion').should('have.text', 'true');
  });
});
