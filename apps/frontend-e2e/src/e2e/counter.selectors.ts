const componentSelect = '[data-testid="counter-play"]';

export default {
  getCurrent: () => cy.get(componentSelect).find('[data-testid="current"]'),
  getIncrement: () => cy.get(componentSelect).find('[data-testid="increment"]'),
  getDecrement: () => cy.get(componentSelect).find('[data-testid="decrement"]'),
};
