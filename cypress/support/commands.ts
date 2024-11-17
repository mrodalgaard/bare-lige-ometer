/// <reference types="cypress" />

Cypress.Commands.add('getTestId', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getAria', (selector, ...args) => {
  return cy.get(`[aria-label="${selector}"]`, ...args);
});

Cypress.Commands.add('meterValue', (selector, value, ...args) => {
  return cy.getAria(selector, ...args).should('have.attr', 'aria-valuenow', value);
});

Cypress.Commands.add(
  'color',
  { prevSubject: 'element' },
  (subject, color?: string | string[], property: string = 'color') => {
    // Check each color if array
    if (Array.isArray(color)) {
      return cy
        .wrap(subject)
        .should('have.css', property)
        .and('satisfy', (value) => color.includes(value));
    }
    return cy.wrap(subject).should('have.css', property, color);
  }
);

Cypress.Commands.add('matchMedia', (query, matches = true) => {
  return cy.window().then((win) => {
    let mediaQueryListener: ((event: MediaQueryListEvent) => void) | undefined;

    // Only stub match media with query if provided
    let stub;
    if (query) {
      stub = cy.stub(win, 'matchMedia').callThrough().withArgs(query);
    } else {
      stub = cy.stub(win, 'matchMedia');
    }

    // Return stubbed match media object with listener callback
    stub.returns({
      matches,
      addEventListener: (_: string, listener: (event: MediaQueryListEvent) => void) => (mediaQueryListener = listener),
      removeEventListener: () => (mediaQueryListener = undefined),
    });

    return (event: MediaQueryListEvent) => mediaQueryListener?.(event);
  });
});
