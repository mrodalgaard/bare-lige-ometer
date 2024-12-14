import { Button } from '.';

describe('Button', () => {
  it('renders and clicks', () => {
    const onClick = cy.stub();

    const Component = () => (
      <Button onClick={onClick} aria-label="ARIA">
        TEST
      </Button>
    );

    cy.mount(<Component />);
    cy.contains('TEST');
    cy.getAria('ARIA').click();
    cy.wrap(onClick).should('have.been.called');
  });

  it('shows clicked text', () => {
    cy.clock();

    const Component = () => (
      <Button clickedText="CLICKED" debounce={100}>
        TEST
      </Button>
    );

    cy.mount(<Component />);
    cy.contains('TEST');
    cy.contains('p', 'CLICKED').should('not.be.visible');
    cy.contains('TEST').click();
    cy.contains('CLICKED').should('be.visible');

    cy.tick(110);
    cy.contains('p', 'CLICKED').should('not.be.visible');

    cy.clock().invoke('restore');
  });
});
