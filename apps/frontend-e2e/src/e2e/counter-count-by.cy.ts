import po from './counter-count-by.selectors';
import poCounter from './counter.selectors';
describe('Counter Count By', () => {
  beforeEach(() => {
    cy.visit('/counter/by');
  });

  describe('Initial State', () => {
    it('should default to one', () => {
      po.getOne().should('be.disabled');
      po.getThree().should('not.be.disabled');
      po.getFive().should('not.be.disabled');
    });
  });
  describe('selecting another button', () => {
    it('disables the selected and enables the previous', () => {
      po.getThree().click().should('be.disabled');
      po.getOne().should('not.be.disabled');
    });
  });

  describe('changing count by changes the counters behavior', () => {
    // it('when counting by one it increments and decrements by one', () => {

    // });

    it('when counting by three it increments and decrements by three', () => {
      po.getThree().click();
      poCounter.getIncrement().click();
      poCounter.getCurrent().should('have.text', 3);
    });
  });
});
