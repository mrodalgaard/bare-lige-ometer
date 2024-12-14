import { darkColorsRgb, lightColorsRgb } from '../../../cypress/support/utils';
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
    cy.contains('0%').color([lightColorsRgb.meter[0], darkColorsRgb.meter[0]]);
    cy.get('body').click('center');
    cy.contains('50%').color([lightColorsRgb.meter[1], darkColorsRgb.meter[1]]);
    cy.get('body').click('bottomRight');
    cy.contains('100%').color([lightColorsRgb.meter[2], darkColorsRgb.meter[2]]);
  });
});
