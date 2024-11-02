import { Button } from '.';

describe('Button', () => {
  it('renders and clicks', () => {
    const onClick = cy.stub().as('onClick');

    cy.mount(
      <Button onClick={onClick} aria-label="ARIA">
        TEST
      </Button>
    );
    cy.contains('TEST');
    cy.get('[aria-label="ARIA"]').click();
    cy.get('@onClick').should('have.been.called');
  });

  it('shows clicked text', () => {
    cy.clock();
    cy.mount(
      <Button clickedText="CLICKED" debounce={100}>
        TEST
      </Button>
    );

    cy.contains('TEST');
    cy.contains('p', 'CLICKED').should('not.be.visible');
    cy.contains('TEST').click();
    cy.contains('CLICKED').should('be.visible');

    cy.tick(110);
    cy.contains('p', 'CLICKED').should('not.be.visible');

    cy.clock().invoke('restore');
  });
});
