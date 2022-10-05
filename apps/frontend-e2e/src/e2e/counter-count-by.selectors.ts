const componentSelect = '[data-testid="counter-by"]';

export default {
  getOne: () => cy.get(componentSelect).find('[data-testid="one"]'),
  getThree: () => cy.get(componentSelect).find('[data-testid="three"]'),
  getFive: () => cy.get(componentSelect).find('[data-testid="five"]'),
};
