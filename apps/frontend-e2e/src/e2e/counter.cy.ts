import po from './counter.selectors';
describe('Counter Component', () => {
  beforeEach(() => {
    cy.visit('/counter');
  });
  describe('initial state', () => {
    it('has a default for current', () => {
      po.getCurrent().should('have.text', 0);
    });
  });

  describe('incrementing', () => {
    it('should increase the count when you increment', () => {
      po.getIncrement().click();
      po.getCurrent().should('have.text', 1);
    });
    it('multiple increments', () => {
      po.getIncrement().click().click().click();
      po.getCurrent().should('have.text', 3);
    });
  });

  describe('decrementing', () => {
    it('should decrease the count when you decrement', () => {
      po.getDecrement().click();
      po.getCurrent().should('have.text', '-1');
    });
    it('multiple increments', () => {
      po.getDecrement().click().click().click();
      po.getCurrent().should('have.text', '-3');
    });
  });
});
