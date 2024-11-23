import { MeterGauge } from './MeterGauge';
import { MeterNumber } from './MeterNumber';

describe('Meter', () => {
  it('renders and updates gauge', () => {
    cy.mount(<MeterGauge />);

    cy.get('body').click('topLeft');
    cy.meterValue('Percentage meter', 23);
    cy.get('body').click('topRight');
    cy.meterValue('Percentage meter', 77);
  });

  it('renders and updates number', () => {
    cy.viewport(550, 200);
    cy.mount(<MeterNumber />);

    cy.get('body').click('topLeft');
    cy.contains('0%').should('have.css', 'color', 'rgb(0, 184, 148)');
    cy.get('body').click('center');
    cy.contains('50%').should('have.css', 'color', 'rgb(253, 203, 110)');
    cy.get('body').click('bottomRight');
    cy.contains('100%').should('have.css', 'color', 'rgb(214, 48, 49)');
  });
});
