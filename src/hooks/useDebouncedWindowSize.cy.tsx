import { useDebouncedWindowSize } from './useDebouncedWindowSize';

describe('useDebouncedWindowSize', () => {
  it('loads on resize', () => {
    const Component = () => {
      const { size, loading } = useDebouncedWindowSize();

      return (
        <>
          <h1 id="size">{JSON.stringify(size)}</h1>
          {loading && <h1 id="loading">Loading</h1>}
        </>
      );
    };

    cy.viewport(500, 500);
    cy.mount(<Component />);
    cy.get('#loading').should('not.exist');
    cy.get('#size').should('have.text', '[500,500]');
    cy.viewport(250, 250);
    cy.get('#loading').should('exist');
    cy.get('#size').should('have.text', '[250,250]');
  });
});
