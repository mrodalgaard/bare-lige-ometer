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

Cypress.Commands.add('color', { prevSubject: 'element' }, (subject, color?: string, property: string = 'color') => {
  return cy.wrap(subject).should('have.css', property, color);
});
