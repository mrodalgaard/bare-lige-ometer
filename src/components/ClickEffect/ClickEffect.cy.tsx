import { ClickEffect } from '.';

describe('ClickEffect', () => {
  it('calls back with click position', () => {
    const onClickPosition = cy.stub();

    const Component = () => (
      <ClickEffect onClickPosition={onClickPosition}>
        <p style={{ width: '100vw', height: '100vh' }}>TEST</p>
      </ClickEffect>
    );

    cy.mount(<Component />);
    cy.contains('TEST');

    cy.window().then((win) => {
      cy.get('body').click('topLeft');
      cy.wrap(onClickPosition).should('have.been.calledWith', [0, 0]);

      cy.get('body').click('center');
      cy.wrap(onClickPosition).should('have.been.calledWith', [win.innerWidth / 2, win.innerHeight / 2]);

      cy.get('body').click('bottomRight');
      cy.wrap(onClickPosition).should('have.been.calledWith', [win.innerWidth - 1, win.innerHeight - 1]);
    });
  });
});
