import { darkColorsRgb, lightColorsRgb } from '../support/utils';

describe("BARE-LIGE-O'METER", () => {
  const title = "BARE-LIGE-O'METER";

  it('renders initial web app', () => {
    cy.visit('/');

    cy.contains(title).color([darkColorsRgb.primary, lightColorsRgb.primary]);
    cy.contains("What is 'bare lige'?");
    cy.meterValue('Percentage meter', 0);
    cy.url().should('match', /^http(.+)\/$/);
  });

  it('shows text and value from query and click', () => {
    [false, true].forEach((darkMode) => {
      const meterColors = (darkMode ? darkColorsRgb : lightColorsRgb).meter;

      cy.injectAxeAndVisit('/?title=TEST&value=50', () => {
        cy.matchMedia('(prefers-color-scheme: dark)', darkMode);
      });

      cy.contains(title).color(meterColors[1]);
      cy.meterValue('Percentage meter', 50);
      cy.get('textarea').should('have.value', 'TEST');

      cy.get('textarea').clear().type('NEW TEXT');
      cy.url().should('include', 'title=NEW+TEXT');

      cy.get('body').click('left');
      cy.contains(title).color(meterColors[0]);
      cy.meterValue('Percentage meter', 14);
      cy.url().should('include', 'value=14');
      cy.checkA11y();

      cy.get('body').click('center');
      cy.contains(title).color(meterColors[1]);
      cy.meterValue('Percentage meter', 50);
      cy.url().should('include', 'value=50');
      cy.checkA11y();

      cy.get('body').click('right');
      cy.contains(title).color(meterColors[2]);
      cy.meterValue('Percentage meter', 86);
      cy.url().should('include', 'value=86');
      cy.checkA11y();
    });
  });

  it('show as number', () => {
    [false, true].forEach((darkMode) => {
      const meterColors = (darkMode ? darkColorsRgb : lightColorsRgb).meter;

      cy.injectAxeAndVisit('/?title=TEST&value=50&meter=number', () => {
        cy.matchMedia('(prefers-color-scheme: dark)', darkMode);
      });

      cy.contains(title).color(meterColors[1]);
      cy.contains('50%').color(meterColors[1]);
      cy.get('textarea').should('have.value', 'TEST');
      cy.checkA11y({
        // Color contrast is not good enough for yellow number in light mode
        exclude: [darkMode ? '' : '.meter'],
      });

      cy.get('body').click('left');
      cy.contains(title).color(meterColors[0]);
      cy.contains('0%').color(meterColors[0]);
      cy.url().should('include', 'value=0');
      cy.checkA11y({
        // Color contrast is not good enough for green number in light mode
        exclude: [darkMode ? '' : '.meter'],
      });

      cy.get('body').click('right');
      cy.contains(title).color(meterColors[2]);
      cy.contains('100%').color(meterColors[2]);
      cy.url().should('include', 'value=100');
      cy.checkA11y();
    });
  });

  it('can change theme mode', () => {
    cy.visit('/');
    cy.matchMedia('(prefers-color-scheme: dark)');

    cy.contains(title).color(darkColorsRgb.primary);
    cy.get('body').color(darkColorsRgb.background, 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('light');
    cy.contains(title).color(lightColorsRgb.primary);
    cy.get('body').color(lightColorsRgb.background, 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('dark');
    cy.get('body').color(darkColorsRgb.background, 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('system');
    cy.contains(title).color(darkColorsRgb.primary);
    cy.get('body').color(darkColorsRgb.background, 'background-color');
  });

  it('can copy and share', () => {
    cy.visit('/');
    cy.getAria('Share').focus().click();
    cy.contains('copied');
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.match(/^http(.+)\/$/);
      });
    });

    cy.visit('/?title=TEST&value=50');
    cy.getAria('Share').focus().click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.match(/^http(.+)\/\?title=TEST&value=50$/);
      });
    });
  });

  it('loads on window resize', () => {
    cy.visit('/?title=TEST&value=50');
    cy.contains(title);
    cy.getTestId('loader').should('not.exist');
    cy.viewport('iphone-6');
    cy.getAria('Percentage meter').should('not.exist');
    cy.getTestId('loader').should('exist');
    cy.getAria('Percentage meter').should('exist');
  });

  it('handles invalid query parameters', () => {
    cy.visit('/?title=undefined&value=200');
    cy.get('textarea').should('have.value', 'undefined');
    cy.meterValue('Percentage meter', 100);

    cy.visit('/?title=+&value=KAMEL');
    cy.get('textarea').should('have.value', ' ');
    cy.meterValue('Percentage meter', 0);

    cy.visit(
      '/?title=%24%7B123%7D%5C%5C%26amp%3B+%2B+%2Fquot%3BHELLOquot"+Robert%27%29%3B+DROP+TABLE+*%3B--+%F0%9F%A5%B3&value=-10'
    );
    cy.get('textarea').should('have.value', '${123}\\\\&amp; + /quot;HELLOquot" Robert\'); DROP TABLE *;-- 🥳');
    cy.meterValue('Percentage meter', 0);

    cy.visit('/?title=&value=');
    cy.get('textarea').should('have.value', '');
    cy.meterValue('Percentage meter', 0);
  });
});
