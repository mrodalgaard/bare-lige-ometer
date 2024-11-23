describe('Web App', () => {
  const title = "BARE-LIGE-O'METER";

  it('renders initial web app', () => {
    cy.visit('/');

    cy.contains(title).color(['rgb(236, 240, 241)', 'rgb(70, 74, 78)']);
    cy.contains("What is 'bare lige'?");
    cy.meterValue('Percentage meter', 0);
    cy.url().should('eq', 'http://localhost:5173/');
  });

  it('shows text and value from query and click', () => {
    cy.visit('/?title=TEST&value=50');

    cy.contains(title).color('rgb(253, 203, 110)');
    cy.meterValue('Percentage meter', 50);
    cy.get('textarea').should('have.value', 'TEST');

    cy.get('textarea').clear().type('NEW TEXT');
    cy.url().should('include', 'title=NEW+TEXT');

    cy.get('body').click('left');
    cy.contains(title).color('rgb(0, 184, 148)');
    cy.meterValue('Percentage meter', 14);
    cy.url().should('include', 'value=14');

    cy.get('body').click('center');
    cy.contains(title).color('rgb(253, 203, 110)');
    cy.meterValue('Percentage meter', 50);
    cy.url().should('include', 'value=50');

    cy.get('body').click('right');
    cy.contains(title).color('rgb(214, 48, 49)');
    cy.meterValue('Percentage meter', 86);
    cy.url().should('include', 'value=86');
  });

  it('show as number', () => {
    cy.visit('/?title=TEST&value=50&meter=number');

    cy.contains(title).color('rgb(253, 203, 110)');
    cy.contains('50%').color('rgb(253, 203, 110)');
    cy.get('textarea').should('have.value', 'TEST');

    cy.get('body').click('left');
    cy.contains(title).color('rgb(0, 184, 148)');
    cy.contains('0%').color('rgb(0, 184, 148)');
    cy.url().should('include', 'value=0');

    cy.get('body').click('right');
    cy.contains(title).color('rgb(214, 48, 49)');
    cy.contains('100%').color('rgb(214, 48, 49)');
    cy.url().should('include', 'value=100');
  });

  it('can change theme mode', () => {
    cy.visit('/');
    cy.matchMedia('(prefers-color-scheme: dark)');

    cy.contains(title).color('rgb(236, 240, 241)');
    cy.get('body').color('rgb(40, 44, 52)', 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('light');
    cy.contains(title).color('rgb(70, 74, 78)');
    cy.get('body').color('rgb(236, 240, 241)', 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('dark');
    cy.get('body').color('rgb(40, 44, 52)', 'background-color');

    cy.getAria('Change mode').click();
    cy.contains('system');
    cy.contains(title).color('rgb(236, 240, 241)');
    cy.get('body').color('rgb(40, 44, 52)', 'background-color');
  });

  it('can copy and share', () => {
    cy.visit('/');
    cy.getAria('Share').focus().click();
    cy.contains('copied');
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('http://localhost:5173/');
      });
    });

    cy.visit('/?title=TEST&value=50');
    cy.getAria('Share').focus().click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq('http://localhost:5173/?title=TEST&value=50');
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
