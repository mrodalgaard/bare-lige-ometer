import { APP_TITLE } from 'util/constants';
import { ShareButton } from '.';

describe('ShareButton', () => {
  it('adds url to clipboard', () => {
    cy.mount(<ShareButton />);
    cy.getAria('Share').click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.contain(location.href);
      });
    });

    // Stub clipboard API to throw error
    cy.window().then((win) => {
      win.navigator.clipboard.writeText('');
      cy.stub(win.navigator.clipboard, 'writeText').throws(new Error('Error'));
    });

    cy.getAria('Share').click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.not.contain(location.href);
      });
    });
  });

  it('shares url', () => {
    // Stub Web Share API to resolve
    cy.window().then((win) => {
      win.navigator.canShare = () => true;
      win.navigator.share = cy.stub().as('share').resolves();
    });

    cy.mount(<ShareButton />);
    cy.getAria('Share').click();
    cy.get('@share').should('have.been.calledWith', { title: APP_TITLE, url: location.href });

    // Stub Web Share API to reject
    cy.window().then((win) => {
      win.navigator.share = cy.stub().throws(new Error('AbortError'));
    });
    cy.getAria('Share').click();

    cy.window().then((win) => {
      win.navigator.share = cy.stub().throws(new Error('Error'));
    });
    cy.getAria('Share').click();
  });
});
